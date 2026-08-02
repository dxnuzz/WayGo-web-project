<?php
include_once '../config/cors.php';
include_once '../config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents('php://input'));
$action = $_GET['action'] ?? '';
