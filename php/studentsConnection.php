<?php
    require_once 'StudentsController.php';

    //session_start();

    /*if(isset($_SESSION['type']) && $_SESSION['type'] == 'admin'){

    } else if(isset($_SESSION['type']) && $_SESSION['type'] == 'lecturer'){

    } else if(isset($_SESSION['type']) && $_SESSION['type'] == 'student'){
        $student = new StudentsController();

        echo json_encode($student->viewInfo());
    }*/

    $student = new StudentsController();

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if($id){
        if($id == 'creditsReferences'){
            echo $student->getReferences();
        } else if($id == 'showCampaign'){
            if($_GET['action'] && $_GET['elective'] && $_GET['credits']){
                $student->changeChosenElectives($_GET['action'], $_GET['elective'], $_GET['credits']);
            }
            echo $student->showElectivesCampaign();
        } else if($id == 'showMessages'){
            echo $student->showMessages($_GET['type']);
        } 
    } else if(isset($_GET['email']) && isset($_GET['pass']) && isset($_GET['newPass'])){
        $newPass = password_hash($_POST['pass'], PASSWORD_DEFAULT);
        $studentInfo = $student->viewInfo();

        if($studentInfo['pass'] == $newPass){
            $student->updateInfo($studentInfo['userName'], $_POST['email'], $studentInfo['pass'], $newPass);
            
            echo 'Successfully updated information';
        } else {
            echo 'Incorrect pass';
        }
    } else if(isset($_GET['to']) && isset($_GET['about']) && isset($_GET['content'])){
        echo $student->sendMessage($_GET['to'], $_GET['about'], $_GET['content']);
    } else if(isset($_GET['receiver'])){
        echo $student->viewMessage($_GET['receiver'], $_GET['sender'], $_GET['date']);
    } else{
        $studentInfo = $student->viewInfo();
        echo json_encode($studentInfo);
    }

    
?>