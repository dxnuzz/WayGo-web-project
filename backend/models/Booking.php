<?php
class Booking {
    private $conn;
    public function __construct($db) { $this->conn = $db; }

    public function create($customer_id, $vehicle_id, $pickup_date, $return_date, $per_day_amount) {
        if (new DateTime($return_date) < new DateTime($pickup_date)) return ['success' => false, 'message' => 'Invalid date range'];
        
        $check = $this->conn->prepare("SELECT COUNT(*) as cnt FROM booking WHERE vehicle_id = ? AND status = 'Confirmed' AND (pickup_date <= ? AND return_date >= ?)");
        $check->execute([$vehicle_id, $return_date, $pickup_date]);
        if ($check->fetch()['cnt'] > 0) return ['success' => false, 'message' => 'Vehicle already booked for selected dates'];

        $total = max(1, (new DateTime($pickup_date))->diff(new DateTime($return_date))->days) * $per_day_amount;
        $this->conn->beginTransaction();
        $this->conn->prepare("INSERT INTO booking (customer_id, vehicle_id, pickup_date, return_date, per_day_amount, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')")->execute([$customer_id, $vehicle_id, $pickup_date, $return_date, $per_day_amount, $total]);
        $id = $this->conn->lastInsertId();
        $this->conn->prepare("UPDATE vehicle SET availability = 'Rented' WHERE vehicle_id = ?")->execute([$vehicle_id]);
        $this->conn->commit();
        return ['success' => true, 'message' => 'Booking successful', 'booking_id' => $id];
    }

    public function getBookedDates($vehicle_id) {
        $stmt = $this->conn->prepare("SELECT pickup_date, return_date FROM booking WHERE vehicle_id = ? AND status = 'Confirmed' AND return_date >= CURDATE()");
        $stmt->execute([$vehicle_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByCustomerId($customer_id) {
        $stmt = $this->conn->prepare('SELECT b.*, v.vehicle_name, v.licence_number, v.brand FROM booking b JOIN vehicle v ON b.vehicle_id = v.vehicle_id WHERE b.customer_id = ? AND b.is_deleted_by_customer = 0 ORDER BY b.booking_id DESC');
        $stmt->execute([$customer_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $stmt = $this->conn->prepare('SELECT b.*, b.is_deleted_by_customer, v.vehicle_name, v.licence_number, c.f_name, c.l_name FROM booking b JOIN vehicle v ON b.vehicle_id = v.vehicle_id JOIN customer c ON b.customer_id = c.customer_id WHERE b.is_deleted_by_admin = 0 ORDER BY b.booking_id DESC');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function cancel($booking_id, $customer_id) {
        $stmt = $this->conn->prepare("SELECT vehicle_id, TIMESTAMPDIFF(HOUR, created_at, NOW()) as hours_diff FROM booking WHERE booking_id = ? AND customer_id = ? AND status != 'Cancelled'");
        $stmt->execute([$booking_id, $customer_id]);
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if ($row['hours_diff'] >= 3) return ['success' => false, 'message' => 'You can only cancel within 3 hours from booking time.'];
            $this->conn->prepare("UPDATE booking SET status = 'Cancelled' WHERE booking_id = ?")->execute([$booking_id]);
            $this->conn->prepare("UPDATE vehicle SET availability = 'Available' WHERE vehicle_id = ?")->execute([$row['vehicle_id']]);
            return ['success' => true, 'message' => 'Booking cancelled'];
        }
        return ['success' => false, 'message' => 'Booking not found'];
    }

    public function complete($booking_id, $vehicle_id, $actual_return_date = null) {
        $stmt = $this->conn->prepare('SELECT pickup_date, return_date, per_day_amount, total_amount FROM booking WHERE booking_id = ?');
        $stmt->execute([$booking_id]);
        if ($booking = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $add_price = ($actual_return_date && new DateTime($actual_return_date) > new DateTime($booking['return_date'])) ? (new DateTime($booking['return_date']))->diff(new DateTime($actual_return_date))->days * $booking['per_day_amount'] : 0;
            if ($actual_return_date) $this->conn->prepare("UPDATE booking SET status = 'Completed', actual_return_date = ?, additional_price = ? WHERE booking_id = ?")->execute([$actual_return_date, $add_price, $booking_id]);
            else $this->conn->prepare("UPDATE booking SET status = 'Completed' WHERE booking_id = ?")->execute([$booking_id]);
        }
        $this->conn->prepare("UPDATE vehicle SET availability = 'Available' WHERE vehicle_id = ?")->execute([$vehicle_id]);
        return ['success' => true, 'message' => 'Booking completed'];
    }

    public function deleteBooking($booking_id, $role = 'admin') {
        $statusStmt = $this->conn->prepare('SELECT status, is_deleted_by_customer FROM booking WHERE booking_id = ?');
        $statusStmt->execute([$booking_id]);
        $row = $statusStmt->fetch(PDO::FETCH_ASSOC);
        if ($role === 'customer' && $row && in_array($row['status'], ['Completed', 'Cancelled'])) {
            $this->conn->prepare('UPDATE booking SET is_deleted_by_customer = 1 WHERE booking_id = ?')->execute([$booking_id]);
            return ['success' => true, 'message' => 'Booking deleted by customer'];
        }
        if ($role === 'admin' && $row && (in_array($row['status'], ['Cancelled', 'Completed']) || $row['is_deleted_by_customer'] == 1)) {
            $this->conn->prepare('UPDATE booking SET is_deleted_by_admin = 1 WHERE booking_id = ?')->execute([$booking_id]);
            return ['success' => true, 'message' => 'Booking deleted by admin'];
        }
        return ['success' => false, 'message' => 'Cannot delete this booking'];
    }
}
?>
