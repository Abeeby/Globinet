<?php
// Configuration CORS pour permettre les requêtes depuis votre domaine
header('Access-Control-Allow-Origin: *'); // Remplacez * par votre domaine en production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit();
}

// Récupérer les données JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validation des données
$errors = [];

if (empty($data['name'])) {
    $errors[] = 'Le nom est requis';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

if (empty($data['message'])) {
    $errors[] = 'Le message est requis';
}

// Si erreurs, les retourner
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit();
}

// Configuration de l'email
$to = 'votre-email@domaine.com'; // REMPLACEZ PAR VOTRE EMAIL
$subject = 'Nouveau message depuis Globinet';

// Construire le message
$message = "Nouveau message reçu depuis votre site web:\n\n";
$message .= "Nom: " . htmlspecialchars($data['name']) . "\n";
$message .= "Email: " . htmlspecialchars($data['email']) . "\n";

if (!empty($data['company'])) {
    $message .= "Entreprise: " . htmlspecialchars($data['company']) . "\n";
}

if (!empty($data['project'])) {
    $message .= "Type de projet: " . htmlspecialchars($data['project']) . "\n";
}

if (!empty($data['budget'])) {
    $message .= "Budget: " . htmlspecialchars($data['budget']) . "\n";
}

$message .= "\nMessage:\n" . htmlspecialchars($data['message']) . "\n";

// Headers de l'email
$headers = [
    'From' => htmlspecialchars($data['email']),
    'Reply-To' => htmlspecialchars($data['email']),
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Convertir les headers en string
$headers_string = '';
foreach ($headers as $key => $value) {
    $headers_string .= $key . ': ' . $value . "\r\n";
}

// Envoyer l'email
try {
    $sent = mail($to, $subject, $message, $headers_string);
    
    if ($sent) {
        // Optionnel : Envoyer un email de confirmation à l'expéditeur
        $confirm_subject = "Confirmation de votre message - Globinet";
        $confirm_message = "Bonjour " . htmlspecialchars($data['name']) . ",\n\n";
        $confirm_message .= "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\n";
        $confirm_message .= "Cordialement,\nL'équipe Globinet";
        
        $confirm_headers = [
            'From' => $to,
            'Reply-To' => $to,
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'text/plain; charset=UTF-8'
        ];
        
        $confirm_headers_string = '';
        foreach ($confirm_headers as $key => $value) {
            $confirm_headers_string .= $key . ': ' . $value . "\r\n";
        }
        
        mail($data['email'], $confirm_subject, $confirm_message, $confirm_headers_string);
        
        // Réponse de succès
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Message envoyé avec succès'
        ]);
    } else {
        throw new Exception('Échec de l\'envoi de l\'email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur lors de l\'envoi du message',
        'details' => $e->getMessage()
    ]);
}

// Optionnel : Logger les messages dans un fichier
$log_file = 'contact_log.txt';
$log_entry = date('Y-m-d H:i:s') . ' - ' . json_encode($data) . "\n";
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
?>
