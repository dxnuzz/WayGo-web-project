<?php
// backend/api/bookings.php (< 60 lines)
include_once '../config/cors.php';
include_once '../config/Database.php';
include_once '../models/Booking.php';

$database = new Database();
$booking = new Booking($database->getConnection());
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($action === 'getByCustomer' && !empty($_GET['customer_id'])) {
        echo json_encode([
            'success' => true,
            'data' => $booking->getByCustomerId($_GET['customer_id']),
        ]);
    } elseif ($action === 'getBookedDates' && !empty($_GET['vehicle_id'])) {
        echo json_encode([
            'success' => true,
            'data' => $booking->getBookedDates($_GET['vehicle_id']),
        ]);
    } else {
        echo json_encode(['success' => true, 'data' => $booking->getAll()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    if ($action === 'create') {
        echo json_encode(
            $booking->create(
                $data->customer_id,
                $data->vehicle_id,
                $data->pickup_date,
                $data->return_date,
                $data->per_day_amount,
            ),
        );
    } elseif ($action === 'cancel') {
        echo json_encode($booking->cancel($data->booking_id, $data->customer_id));
    } elseif ($action === 'complete') {
        echo json_encode(
            $booking->complete(
                $data->booking_id,
                $data->vehicle_id,
                $data->actual_return_date ?? null,
            ),
        );
    } elseif ($action === 'delete') {
        $role = $data->role ?? 'admin';
        echo json_encode($booking->deleteBooking($data->booking_id, $role));
    }
}
?>
