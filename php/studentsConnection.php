<?php
    require_once 'StudentsController.php';

    session_start();

    $student = new StudentsController($_SESSION['userName'], $_SESSION['fn']);

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
    } else if(isset($_GET['receiver'])){
        echo $student->viewMessage($_GET['receiver'], $_GET['sender'], $_GET['date']);
    } else if(isset($_POST['to']) && isset($_POST['about']) && isset($_POST['content'])){
        $status = $student->sendMessage($_POST['to'], $_POST['about'], $_POST['content']);
        header("Location: ../student.html?id=newMessage&status=" . $status);
    } else if(isset($_POST['email']) && isset($_POST['passwd']) && isset($_POST['newPassword']) && isset($_POST['confirmPassword'])){
        $status = '';

        if($_POST['newPassword'] == $_POST['confirmPassword']){
            $pass = hash('sha256', $_POST['passwd']);
            $newPass = hash('sha256', $_POST['newPassword']);
            $studentInfo = $student->viewInfo();

            if($studentInfo['pass'] == $pass){
                $student->updateInfo($_POST['email'], $newPass);
                
                $status = 'success';
                header("Location: ../student.html?id=editProfile&status=" . $status);
            } else {
                $status = 'notfound';
                header("Location: ../student.html?id=editProfile&status=" . $status);
            }
        } else {
            $status = 'notequal';
            header("Location: ../student.html?id=editProfile&status=" . $status);
        }
        
    } else{
        $studentInfo = $student->viewInfo();

        echo json_encode($studentInfo);
    }

    
?>