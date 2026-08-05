<?php
class Admin
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getStats()
    {
        $stats = [];

        $stmt = $this->conn->query('SELECT COUNT(*) as count FROM vehicle');
        $stats['total_vehicles'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        $stmt = $this->conn->query('SELECT COUNT(*) as count FROM booking');
        $stats['total_bookings'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        $stmt = $this->conn->query('SELECT COUNT(*) as count FROM customer');
        $stats['total_customers'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        return $stats;
    }

    public function getAllUsers()
    {
        $stmt = $this->conn
            ->query("SELECT u.user_id, u.email, u.status, c.f_name, c.l_name, c.phone_number 
                                    FROM user u 
                                    JOIN customer c ON u.user_id = c.customer_id");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function toggleUserStatus($user_id, $status)
    {
        $stmt = $this->conn->prepare('UPDATE user SET status = ? WHERE user_id = ?');
        return $stmt->execute([$status, $user_id]);
    }
}
?>
