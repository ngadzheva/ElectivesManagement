<?php
    require_once 'LecturerController.php';

    $lecturer = new LecturerController();
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if($id){
        if($id == 'showMessages'){
            echo $lecturer->showMessages($_GET['type']);
        } else if($id == 'viewMessage'){
            echo $lecturer->viewMessage();
        }
    } else{
        $lecturerInfo = $lecturer->viewInfo();
        echo json_encode($lecturerInfo);
    }
    
?>
