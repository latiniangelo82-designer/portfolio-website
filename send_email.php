<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanificazione dei dati ricevuti
    $name = strip_tags(trim($_POST["f-name"]));
    $lastname = strip_tags(trim($_POST["l-name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject_form = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Controllo di sicurezza aggiuntivo (se i campi obbligatori sono vuoti)
    if (empty($name) || empty($lastname) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill in all fields correctly."]);
        exit;
    }

    // Configurazione Email
    $recipient = "latini.angelo82@gmail.com";
    $email_subject = "Portfolio Contact: " . (empty($subject_form) ? "Nuovo Messaggio" : $subject_form);
    
    // Contenuto dell'email
    $email_content = "Hai ricevuto un nuovo messaggio dal form del tuo Portfolio.\n\n";
    $email_content .= "Nome: $name $lastname\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Oggetto: $subject_form\n\n";
    $email_content .= "Messaggio:\n$message\n";

    // Header dell'email per evitare di finire in spam
    $email_headers = "From: Portfolio Form <noreply@tuodominio.com>\r\n"; // Cambia tuodominio.com con il tuo dominio reale quando sarai online
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Invio effettivo
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Something went wrong on our server. Please try again later."]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission."]);
}
?>