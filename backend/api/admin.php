<?php
// backend/api/admin.php (< 60 lines)
include_once '../config/cors.php';
include_once '../config/Database.php';

$database = new Database();
$conn = $database->getConnection();
$action = $_GET['action'] ?? '';

if ($action === 'getStats') {
    $v = $conn->query('SELECT COUNT(*) as count FROM vehicle')->fetch()['count'];
    $b = $conn
        ->query(
            "SELECT COUNT(b.booking_id) as count FROM booking b JOIN vehicle v ON b.vehicle_id = v.vehicle_id JOIN customer c ON b.customer_id = c.customer_id WHERE b.is_deleted_by_admin = 0 AND b.status NOT IN ('Cancelled','Completed')",
        )
        ->fetch()['count'];
    $c = $conn->query('SELECT COUNT(*) as count FROM customer')->fetch()['count'];
    echo json_encode([
        'success' => true,
        'data' => ['total_vehicles' => $v, 'total_bookings' => $b, 'total_customers' => $c],
    ]);
} elseif ($action === 'getAllUsers') {
    $stmt = $conn->query(
        'SELECT u.user_id, u.email, u.status, c.f_name, c.l_name, c.phone_number FROM user u JOIN customer c ON u.user_id = c.customer_id ORDER BY u.user_id DESC',
    );
    echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} elseif ($action === 'toggleUserStatus') {
    $data = json_decode(file_get_contents('php://input'));
    $stmt = $conn->prepare('UPDATE user SET status = ? WHERE user_id = ?');
    $stmt->execute([$data->status, $data->user_id]);
    echo json_encode(['success' => true, 'message' => 'Status updated']);
}
?>
