<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $band = filter_var($_POST['band'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $link = filter_var($_POST['link'], FILTER_SANITIZE_URL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    $to = "studio@sla-rock.scot"; // Your station email
    $subject = "New Band Submission: $band";
    
    $body = "Band Name: $band\n";
    $body .= "Email: $email\n";
    $body .= "Link: $link\n\n";
    $body .= "Message:\n$message";

    $headers = "From: webmaster@sla-rock.scot\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Submission received! Rock on."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Server error. Please email us directly."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
