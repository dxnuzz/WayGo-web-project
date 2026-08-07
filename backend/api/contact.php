<?php

include_once '../config/cors.php';
include_once '../config/Database.php';
include_once '../models/Contact.php';

$database = new Database();
$db = $database->getConnection();
$contact = new Contact($db);

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($action === 'getByUser' && !empty($_GET['user_id'])) {
        echo json_encode($contact->getUserMessages($_GET['user_id']));
    } else {
        echo json_encode($contact->getMessages());
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    if ($action === 'reply' && isset($data->id) && isset($data->reply)) {
        echo json_encode($contact->replyMessage($data->id, $data->reply));
    } elseif ($action === 'delete' && isset($data->id)) {
        $role = $data->role ?? 'admin';
        echo json_encode($contact->deleteMessage($data->id, $role));
    } elseif (isset($data->name) && isset($data->email) && isset($data->message)) {
        echo json_encode(
            $contact->addMessage($data->user_id ?? null, $data->name, $data->email, $data->message),
        );
    }
}
?>
