<?php
require_once '../config/db.php';
require_once '../models/Feedback.php';

$feedbackModel = new Feedback($pdo);
$action = $_GET['action'] ?? '';
if ($action === 'submit') {

    //get review data from the request body
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->user_id) && isset($data->message) && isset($data->rating)){
        $result = $feedbackModel->submitFeedback(
            $data->user_id,
            $data->rating,
            $data->message
        );

      echo json_encode($result);
    }else{
        echo json_encode([
           'success' => false,
            'message' => 'Invalid data'
        ]);
    }
    }elseif($action === 'getAll'){

    //get all reviews for admin
    $feedbacks = $feedbackModel->getAllFeedbacks();

    echo json_encode([
        'success' => true,
        'feedbacks' => $feedbacks
    ]);
   } elseif($action === 'getApproved'){

    //get only approved reviews for the homepage
    $feedbacks = $feedbackModel->getApprovedFeedbacks();

    echo json_encode([
        'success' => true,
        'feedbacks' => $feedbacks
    ]);

}elseif($action === 'toggleVisibility'){

    //show or hide review
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->feedback_id) && isset($data->status)){
        $result = $feedbackModel->toggleVisibility(
            $data->feedback_id,
            $data->status
        );

        echo json_encode($result);
    }else{
        echo json_encode([
            'success' => false,
            'message' => 'Invalid data'
        ]);
    }

    }elseif($action === 'delete') {

    //delete a review
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->feedback_id)){
        $role = $data->role ?? 'admin';

        echo json_encode(
            $feedbackModel->deleteFeedback($data->feedback_id, $role)
        );
    }else{
        echo json_encode([
            'success' => false,
            'message' => 'Invalid data'
        ]);
    }

}else{

    //invalid action request
    echo json_encode([
        'success' => false,
        'message' =>'Invalid action'
    ]);
}
?>