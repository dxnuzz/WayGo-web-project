<?php
class Vehicle {
    private $conn;
    public function __construct($db) { $this->conn = $db; }

    public function getAll($filters = []) {
        $query = 'SELECT * FROM vehicle WHERE 1=1';
        $params = [];
        foreach (['brand', 'color', 'type', 'availability'] as $f) {
            if (!empty($filters[$f]) && $filters[$f] !== 'All') { $query .= " AND $f = ?"; $params[] = $filters[$f]; }
        }
        if (!empty($filters['price_max'])) { $query .= ' AND rental_price_per_day <= ?'; $params[] = $filters['price_max']; }
        if (!empty($filters['seats'])) { $query .= ' AND seats >= ?'; $params[] = $filters['seats']; }
        $stmt = $this->conn->prepare($query . ' ORDER BY vehicle_id ASC');
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare('SELECT * FROM vehicle WHERE vehicle_id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function add($admin_id, $data) {
        try {
            $sql = "INSERT INTO vehicle (admin_id, licence_number, vehicle_name, type, brand, color, image_path, rental_price_per_day, seats, fuel_type, transmission, description, availability) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'Available')";
            $this->conn->prepare($sql)->execute([ $admin_id, $data['licence_number'], $data['vehicle_name'], $data['type'], $data['brand'], $data['color'], $data['image_path'] ?? null, $data['rental_price_per_day'], $data['seats'], $data['fuel_type'] ?? 'Petrol', $data['transmission'] ?? 'Auto', $data['description'] ]);
            return ['success' => true, 'message' => 'Vehicle added'];
        } catch (PDOException $e) { return ['success' => false, 'message' => 'SQL Error: ' . $e->getMessage()]; }
    }

    public function update($vehicle_id, $data) {
        $img = !empty($data['image_path']) ? ', image_path=?' : '';
        $sql = "UPDATE vehicle SET licence_number=?, vehicle_name=?, type=?, brand=?, color=?, rental_price_per_day=?, seats=?, fuel_type=?, transmission=?, description=? $img WHERE vehicle_id=?";
        $params = [ $data['licence_number'], $data['vehicle_name'], $data['type'], $data['brand'], $data['color'], $data['rental_price_per_day'], $data['seats'], $data['fuel_type'], $data['transmission'], $data['description'] ];
        if (!empty($data['image_path'])) $params[] = $data['image_path'];
        $params[] = $vehicle_id;
        $this->conn->prepare($sql)->execute($params);
        return ['success' => true, 'message' => 'Vehicle updated'];
    }

    public function delete($vehicle_id) {
        try {
            $this->conn->prepare('DELETE FROM vehicle WHERE vehicle_id = ?')->execute([$vehicle_id]);
            return ['success' => true, 'message' => 'Vehicle deleted'];
        } catch (PDOException $e) { return ['success' => false, 'message' => 'Cannot delete vehicle with existing bookings.']; }
    }
}
?>
