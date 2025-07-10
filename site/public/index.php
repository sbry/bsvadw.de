<?php
include "./php/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmail($subject, $body){
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
    $mail->AddAddress($_ENV['MAIL_TO'], $_ENV['MAIL_TO']);
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
    if($request['checksum'] == md5(date('Y-m-d'))){
        return $request;
    }
}

function response($status, $message){
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('status' => $status, 'message' => $message));
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
        if(!isset($request['message']) or !$request['message']){
            response("failure", "Keine Nachricht gefunden.");
        }
        $message = wordwrap($request['message'], 70, "\r\n");
        $mailed = sendEmail("[bsvadw.de] Homepage-Kontakt", $message);
        if($mailed){
            response("success", "Aktion erfolgreich.");
        }
        else{
            response("failure", "Wartungsarbeiten.");
        }
    }
);

$request = request();
if(isset($path_map[$request['path']])){
    $path = $path_map[$request['path']]($request);
}
