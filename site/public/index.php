<?php
include "./php/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$dotenv->required(['GMAIL_USERNAME', 'GMAIL_PASSWORD', 'MAIL_TO']);


function sendEmail($subject, $body){
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    $mail->IsHTML(false);
    $mail->Username = $_ENV['GMAIL_USERNAME'];
    $mail->Password = $_ENV['GMAIL_PASSWORD'];
    $mail->SetFrom($_ENV['GMAIL_USERNAME'], gethostname());
    // $mail->AddReplyTo('redirect@gmail', 'Support Team');
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($_ENV['MAIL_TO'], "");
    $return = $mail->Send();
    $mail->smtpClose();
    return $return;
}

/*
 * bare minimum
 */
$checksum = md5(date('Y-m-d'));
$request = json_decode(file_get_contents('php://input'), TRUE);
/*
 *
 */
$response = array(
    'self' => $_SERVER['PHP_SELF'],
    'path' =>  $_GET['path'],
    'input' => $request,
    "checksum" => $checksum,
);
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
if($request['checksum'] == $checksum){
    if($request['message'] ?? false){
        $message = wordwrap($request['message'], 70, "\r\n");
        $subject = "[bsvadw.de] Homepage-Kontakt";
        $mailed = sendEmail($subject, $message);
        if($mailed){
            $response['message'] = "Nachricht versendet";
            $response['status'] = "success";
        }
        else{
            $response['message'] = "Wartungsarbeiten";
            $response['status'] = "failure";
        }
    }
}
/*
 * and
 */
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
