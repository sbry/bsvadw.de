<?php
include "./php/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

function request(){
    $request = json_decode(file_get_contents('php://input'), TRUE);
    $request['path'] = $_GET['path'];
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required(['SMTP_USERNAME', 'SMTP_PASSWORD', 'MAIL_TO']);
    if($request['cs'] == md5(date('Y-m-d'))){
        return $request;
    }
}

function response($status, $body){
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
    'kontakt' => function($request){
        if(!isset($request['msg']) or !$request['msg']){
            response("danger", "Keine Nachricht eingegeben");
        }
        $message = wordwrap($request['msg'], 70, "\r\n");
        $subject = "[bsvadw.de] Nachricht an Beschwerdeausschuss";
        $reply_to = false;

        if(isset($request['abs']) and $request['abs'] and filter_var($request['abs'], FILTER_VALIDATE_EMAIL)){
            $reply_to = $request['abs'];
            $mailed = sendEmail($reply_to, "$subject (Kopie an Absender)", $message);
            $message = "Absender $reply_to \r\n $message";
        }
        $mailed = sendEmail($_ENV['MAIL_TO'], $subject, $message, $reply_to);
        if($mailed){
            response("success", "Aktion erfolgreich.");
        }
        else{
            response("danger", "Wartungsarbeiten.");
        }
    }
);

$request = request();
if(isset($path_map[$request['path']])){
    $path = $path_map[$request['path']]($request);
}


