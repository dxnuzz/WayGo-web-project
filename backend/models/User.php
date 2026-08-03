<?php
class User{
    private $conn;
    public function __construct($db){
        $this->conn = $db;
    }   

    public function register($email, $password, $fname, $lname,$phone){
        try {
            //strat transaction to save user and customer data together
            $this->conn->beginTransaction();

            //check whether the email already exists
            $stmt = $this->conn->prepare("SELECT user_id FROM user WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0){
                return [
                    'success' => false,
                    'message' => 'Email already exists'
                ];
            }

        //encrypt password before saving
        $hash=password_hash($password, PASSWORD_BCRYPT);

        $this->conn
        ->prepare("INSERT INTO user (email, password, status) VALUES (?, ?, 'Active')")
        ->execute([$email, $hash]);
        
        $uid=$this->conn->lastInsertId();

        //inserting customer details
        $this->conn
        ->prepare("INSERT INTO customer (customer_id, f_name, l_name, phone_number) VALUES (?, ?, ?, ?)")
        ->execute([$uid, $fname, $lname, $phone]);

        $this->conn->commit();

        return [
            'success' => true,
            'message' => 'Registration successful'
        ];

        } catch (Exception $e) {
            //undo change f an error occurd
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }

            return [
                'success' => false,
                'message' => 'Registration failed.'];
            
        }
    }

    public function login($email, $password){
        $stmt = $this->conn->prepare(
            "SELECT u.user_id,u.email,u.password,u.status,a.admin_id
            FROM user u
            LEFT JOIN admin a ON u.user_id = a.admin_id
            where u.email = ?"
        );
        $stmt->execute([$email]);

        if($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            //check account sttus
            if($row['status'] ==='Suspended'){
                return [
                    'success' => false,
                    'message' => 'Account is suspended'
                ];
            }

            //verifynig entered pwd
            if(password_verify($password, $row['password'])){
                //return user data
                return [
                    'success' => true,
                    'user_id' => $row['user_id'],
                    'email' => $row['email'],
                    'role' => $row['admin_id'] ? 'admin' : 'customer'
                ];
            }
            return [
                'success' => false,
                'message' => 'Invalid username or password'
            ];
        }
        return [
            'success' => false,
            'message' => 'User not found'
        ];
    }

    public function getProfile($user_id){
        $stmt = $this->conn->prepare(
            "SELECT SELECT u.email, c.f_name, c.l_name, c.phone_number
             FROM user u
             JOIN customer c ON u.user_id = c.customer_id
             WHERE u.user_id = ?"
        );
        $stmt->execute([$user_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function updateProfile($user_id, $fname, $lname, $phone, $password){
        //update customer info
        $this->conn
            ->prepare(
                'UPDATE customer
                 SET f_name = ?, l_name = ?, phone_number = ?
                 WHERE customer_id = ?'
            )
            ->execute([$fname, $lname, $phone, $user_id]);

            //update pwd if only new one is provided
            if (!empty($password)) {
            $this->conn
                ->prepare('UPDATE user SET password = ? WHERE user_id = ?')
                ->execute([
                    password_hash($password, PASSWORD_BCRYPT),
                    $user_id
                ]);
    }
    return [
        'success' => true,
        'message' => 'Profile updated successfully'
    ];
    }
}


?>