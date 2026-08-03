<?php
include_once '../config/cors.php';
include_once '../config/Database.php';
include_once '../models/User.php';

$database=new Database();
$db=$database->getConnection();
$user=new User($db);

$data=json_decode(file_get_contents("php://input"));
$action=$_GET['action'] ?? '';

if($action==='register'){
    if(
        !empty($data->email)&&
        !empty($data->password)&&
        !empty($data->f_name)&&
        !empty($data->l_name)
        !empty($data->phone_number)
    ){
        $result=$user->register(
            $data->email,
            $data->password,
            $data->f_name,
            $data->l_name,
            $data->phone_number
            );
            echo json_encode($result);
    }else{
        echo json_encode(['success'=>false,'message'=>'All fields are required']);
            
    }
}else if($action==='login'){
    if(!empty($data->email)&&!empty($data->password)){
        $result=$user->login($data->email,$data->password);
        echo json_encode($result);
    }else{
        echo json_encode(['success'=>false,'message'=>'Email and password are required']);
    }
}else if($action==='getProfile'){
    if(!emmpty($_GET['user_id'])){
        $profile=$user->getProfile($_GET['user_id']);
        echo json_encode(['success'=>true,'data'=>$profile]);
    }else{
        echo json_encode(['success'=>false,'message'=>'missing user_id']);
    }
}else if ($action === 'updateProfile') {
    if (
        !empty($data->user_id) &&
        !empty($data->f_name) &&
        !empty($data->l_name) &&
        !empty($data->phone_number)
    ) {
        $result = $user->updateProfile(
            $data->user_id,
            $data->f_name,
            $data->l_name,
            $data->phone_number,
            $data->password ?? '',
        );
        echo json_encode($result);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incomplete data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
