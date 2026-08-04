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

    
}
?>
