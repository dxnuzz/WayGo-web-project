<?php
class Feedback
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Submit a new feedback to the database
    public function submitFeedback($user_id, $rating, $message)
    {
        try {
            $stmt = $this->conn->prepare(
                'INSERT INTO feedbacks (user_id, rating, message) VALUES (?, ?, ?)',
            );
            $stmt->execute([$user_id, $rating, $message]);
            return ['success' => true, 'message' => 'Feedback submitted successfully'];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error submitting feedback: ' . $e->getMessage(),
            ];
        }
    }

    // Get all feedbacks for the admin dashboard
    public function getAllFeedbacks()
    {
        try {
            $stmt = $this->conn
                ->prepare("SELECT f.feedback_id, f.rating, f.message, f.created_at, f.show_on_home, f.is_deleted_by_customer, u.email, c.f_name, c.l_name 
                                          FROM feedbacks f
                                          JOIN user u ON f.user_id = u.user_id
                                          JOIN customer c ON u.user_id = c.customer_id
                                          WHERE f.is_deleted_by_admin = 0
                                          ORDER BY f.created_at DESC");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [];
        }
    }

    // Get only approved feedbacks to display on the home page
    public function getApprovedFeedbacks()
    {
        try {
            $stmt = $this->conn
                ->prepare("SELECT f.feedback_id, f.rating, f.message, c.f_name, c.l_name 
                                          FROM feedbacks f
                                          JOIN user u ON f.user_id = u.user_id
                                          JOIN customer c ON u.user_id = c.customer_id
                                          WHERE f.show_on_home = 1
                                          ORDER BY f.created_at DESC LIMIT 6");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [];
        }
    }

    // Change whether a feedback is visible on the home page
    public function toggleVisibility($feedback_id, $status)
    {
        try {
            $stmt = $this->conn->prepare(
                'UPDATE feedbacks SET show_on_home = ? WHERE feedback_id = ?',
            );
            $stmt->execute([$status, $feedback_id]);
            return ['success' => true, 'message' => 'Visibility updated'];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating visibility: ' . $e->getMessage(),
            ];
        }
    }

    // Delete feedback
    public function deleteFeedback($feedback_id, $role = 'admin')
    {
        try {
            $column = $role === 'admin' ? 'is_deleted_by_admin' : 'is_deleted_by_customer';
            $stmt = $this->conn->prepare("UPDATE feedbacks SET $column = 1 WHERE feedback_id = ?");
            $stmt->execute([$feedback_id]);
            return ['success' => true, 'message' => 'Feedback deleted'];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error deleting feedback: ' . $e->getMessage(),
            ];
        }
    }
}
?>
