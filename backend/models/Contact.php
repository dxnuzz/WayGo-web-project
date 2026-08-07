<?php
class Contact
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function addMessage($user_id, $name, $email, $message)
    {
        try {
            $stmt = $this->conn->prepare(
                'INSERT INTO contact_messages (user_id, name, email, message) VALUES (?, ?, ?, ?)',
            );
            $stmt->execute([$user_id, $name, $email, $message]);
            return ['success' => true, 'message' => 'Message sent successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'message' => 'Failed to send message: ' . $e->getMessage()];
        }
    }

    public function getMessages()
    {
        try {
            // Admin sees messages unless they are deleted by admin, or if they are pending AND deleted by customer
            $stmt = $this->conn->prepare(
                "SELECT * FROM contact_messages WHERE is_deleted_by_admin = 0 AND NOT (status = 'Pending' AND is_deleted_by_customer = 1) ORDER BY created_at DESC",
            );
            $stmt->execute();
            return ['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to fetch messages: ' . $e->getMessage(),
            ];
        }
    }

    public function getUserMessages($user_id)
    {
        try {
            $stmt = $this->conn->prepare(
                'SELECT * FROM contact_messages WHERE user_id = ? AND is_deleted_by_customer = 0 ORDER BY created_at DESC',
            );
            $stmt->execute([$user_id]);
            return ['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to fetch messages: ' . $e->getMessage(),
            ];
        }
    }

    public function replyMessage($id, $reply)
    {
        try {
            $stmt = $this->conn->prepare(
                "UPDATE contact_messages SET reply = ?, status = 'Replied' WHERE id = ?",
            );
            $stmt->execute([$reply, $id]);
            return ['success' => true, 'message' => 'Reply sent successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'message' => 'Failed to send reply: ' . $e->getMessage()];
        }
    }

    public function deleteMessage($id, $role = 'admin')
    {
        try {
            if ($role === 'admin') {
                // Admin can delete contact messages only if status is 'Replied'
                $statusStmt = $this->conn->prepare(
                    'SELECT status FROM contact_messages WHERE id = ?',
                );
                $statusStmt->execute([$id]);
                $row = $statusStmt->fetch(PDO::FETCH_ASSOC);
                if (!($row && $row['status'] === 'Replied')) {
                    return [
                        'success' => false,
                        'message' => 'Admin can only delete messages that are replied',
                    ];
                }
                $stmt = $this->conn->prepare(
                    'UPDATE contact_messages SET is_deleted_by_admin = 1 WHERE id = ?',
                );
                $stmt->execute([$id]);
                return ['success' => true, 'message' => 'Message deleted for admin view'];
            } elseif ($role === 'customer') {
                // Customer delete only marks the message as deleted for their view, does not remove it from the database
                $stmt = $this->conn->prepare(
                    'UPDATE contact_messages SET is_deleted_by_customer = 1 WHERE id = ?',
                );
                $stmt->execute([$id]);
                return ['success' => true, 'message' => 'Message marked as deleted by customer'];
            } else {
                return ['success' => false, 'message' => 'Invalid role specified'];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to delete message: ' . $e->getMessage(),
            ];
        }
    }
}
?>
