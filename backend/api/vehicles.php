<?php

include_once '../config/cors.php';
include_once '../config/Database.php';
include_once '../models/Vehicle.php';

$database = new Database();
$db = $database->getConnection();
$vehicle = new Vehicle($db);

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($action === 'getOne' && !empty($_GET['id'])) {
        echo json_encode(['success' => true, 'data' => $vehicle->getById($_GET['id'])]);
    } else {
        echo json_encode(['success' => true, 'data' => $vehicle->getAll($_GET)]);
    }
} elseif ($method === 'POST') {
    $data = $_POST;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $targetDir = '../uploads/vehicles/';
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $fileName = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetFilePath = $targetDir . $fileName;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $data['image_path'] =
                $protocol .
                '://' .
                $_SERVER['HTTP_HOST'] .
                '/WayGo-web/backend/uploads/vehicles/' .
                $fileName;
        }
    }
    if ($action === 'add') {
        echo json_encode($vehicle->add($data['admin_id'] ?? 1, $data));
    } elseif ($action === 'edit' && !empty($data['vehicle_id'])) {
        echo json_encode($vehicle->update($data['vehicle_id'], $data));
    }
} elseif ($method === 'DELETE' && $action === 'delete') {
    echo json_encode($vehicle->delete($_GET['id'] ?? 0));
}
?>
