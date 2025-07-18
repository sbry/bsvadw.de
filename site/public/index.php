<?php
include "./php/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function assertRateLimit($key, $limit, $period){
    // Create a secure file name based on the key using SHA-256 hashing
    $dirname = "{$_ENV['TMP']}";
    if(!file_exists($dirname)){
        mkdir($dirname, 0777, true);
        chmod($dirname, 0777);
    }
    $basename = hash('sha256', $key) . '.txt';
    $filename = "$dirname/$basename";

    // Get the IP address of the client, handling proxy headers if present
    $ip = $_SERVER['REMOTE_ADDR'];
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

    // Ensure the IP address is a valid IPv4 or IPv6 address
    if(!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6)){
        json_response("warning", "Ungültige IP Adresse");
    }

    // Initialize the data array
    $data = array();

    // Check if the file exists and read its contents
    if(file_exists($filename)){
        $data = json_decode(file_get_contents($filename), true);
    }

    // Get the current time and reset the count if the period has elapsed
    $current_time = time();
    if(isset($data[$ip]) && $current_time - $data[$ip]['last_access_time'] >= $period){
        $data[$ip]['count'] = 0;
    }

    // Check if the limit has been exceeded
    if(isset($data[$ip]) && $data[$ip]['count'] >= $limit){
        // Return an error message or redirect to an error page
        http_response_code(429);
        header('Retry-After: ' . $period);
        json_response("warning", "Bitte später wieder versuchen");
    }

    // Increment the count and save the data to the file
    if(!isset($data[$ip])){
        $data[$ip] = array('count' => 0, 'last_access_time' => 0);
    }
    $data[$ip]['count']++;
    $data[$ip]['last_access_time'] = $current_time;
    file_put_contents($filename, json_encode($data));

    // Return the remaining time until the limit resets (in seconds)
    return $period - ($current_time - $data[$ip]['last_access_time']);
}

function sendEmail($to, $subject, $body, $reply_to = false){
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    $mail->IsHTML(false);
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SetFrom($_ENV['SMTP_USERNAME'], $_SERVER['SERVER_NAME']);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($to, $to);
    if($reply_to){
        $mail->AddReplyTo($reply_to);
    }
    $return = $mail->Send();
    $mail->smtpClose();
    return $return;
}

function json_request(){
    $request_data = json_decode(file_get_contents('php://input'), TRUE);
    $request_data['path'] = $_GET['path'];
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required(['SMTP_USERNAME', 'SMTP_PASSWORD', 'MAIL_TO']);
    if($request_data['cs'] == md5(date('Y-m-d'))){
        return $request_data;
    }
}

function json_response($status, $body){
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('status' => $status, 'body' => $body));
    exit;
}

// Allow from any origin
if(isset($_SERVER['HTTP_ORIGIN'])){
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if(isset($_SERVER['REQUEST_METHOD']) and $_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
}

$path_map = array(
    'info' => function(){
        phpinfo();
    },
    'kontakt' => function(){
        $request_data = json_request();
        /*
         * assert Rate Limit 2/day.
         */
        assertRateLimit($request_data['path'], 2, 3600 * 24);
        /*
         * make sure we got a message
         */
        if(!isset($request_data['msg']) or !$request_data['msg']){
            json_response("danger", "Keine Nachricht eingegeben");
        }
        $message = wordwrap($request_data['msg'], 70, "\r\n");
        $subject = "[bsvadw.de] Nachricht an Beschwerdeausschuss";
        $reply_to = false;
        if(isset($request_data['abs']) and $request_data['abs'] and filter_var($request_data['abs'], FILTER_VALIDATE_EMAIL)){
            $reply_to = $request_data['abs'];
            $mailed = sendEmail($reply_to, "$subject (Kopie an Absender)", $message);
            $message = "Absender $reply_to \r\n $message";
        }
        $mailed = sendEmail($_ENV['MAIL_TO'], $subject, $message, $reply_to);
        if($mailed){
            json_response("success", "Aktion erfolgreich.");
        }
        else{
            json_response("danger", "Wartungsarbeiten.");
        }
    }
);
if(isset($path_map[$_GET['path']])){
    $reponse_function = $path_map[$_GET['path']];
    $reponse_function();
}


