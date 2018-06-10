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
    $studentInfo = $student->viewInfo();


    if(isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['newPass']) ){
        $newPass = password_hash($_POST['pass'], PASSWORD_DEFAULT);
        if($studentInfo['pass'] == $newPass){
            $student->updateInfo($studentInfo['userName'], $_POST['email'], $studentInfo['pass'], $newPass);
            
            echo 'Successfully updated information';
        } else {
            echo 'Incorrect pass';
        }
    } elseif(isset($_POST['references'])){
        echo $student->getReferences();
    }else {
        echo json_encode($studentInfo);
    }

    
?>