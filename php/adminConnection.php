<?php
    require_once 'adminController.php';

    session_start();

    $adminController = new AdminController($_SESSION['userName'], $_SESSION['names']);

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if($id){
         if ($id == 'activeElectives') {
            echo $adminController->showElectives("active");
         } else if ($id == 'suggestedElectives') {
            echo $adminController->showElectives("suggestion");
        } else if ($id == 'disabledElectives') {
            echo $adminController->showElectives("disabled");
         } else if ($id == 'activeUsers') {
            echo $adminController->showUsers(true);
         } else if ($id == 'disableUsers') {
            echo $adminController->showUsers(false); 
         } 
    } else if(isset($_GET['addSuggested'])){
        $adminController->addElective($_GET['addSuggested']);
    } else if( isset($_GET['activateElective'])){
        $adminController->addElective($_GET['activateElective']);        
    } else if(isset($_GET['deactivateElective'])){
        $adminController->removeElective($_GET['deactivateElective']);
    } else if(isset($_GET['activateUser'])){
        $adminController->updateUserInfo($_GET['activateUser'], true);
    } else if(isset($_GET['deactivateUser'])){
        $adminController->updateUserInfo($_GET['deactivateUser'], false);        
    } else if(isset($_POST['email']) && isset($_POST['passwd']) && isset($_POST['newPassword']) && isset($_POST['confirmPassword'])){
        $status = '';
        if($_POST['newPassword'] == $_POST['confirmPassword']){
            $pass = hash('sha256', $_POST['passwd']);
            $newPass = hash('sha256', $_POST['newPassword']);
            $adminInfo = $adminController->viewInfo();

            if($adminInfo['password'] == $pass){
                $adminController->updateInfo($_POST['email'], $newPass);
                
                $status = 'success';
                header("Location: ../admin.html?id=editProfile&status=" . $status);
            } else {
                $status = 'wrongPassword';
                header("Location: ../admin.html?id=editProfile&status=" . $status);
            }
        } else {
            $status = 'notequal';
            header("Location: ../admin.html?id=editProfile&status=" . $status);
        }
        
    } else if(isset($_POST['email']) && isset($_POST['names']) && isset($_POST['userName']) && isset($_POST['password']) && isset($_POST['confirmPassword'])) {
        $user = modifyInput($_POST["userName"]);
        $pass = modifyInput($_POST["password"]);
        $confirmPass = modifyInput($_POST['confirmPassword']);
        $names = modifyInput($_POST['names']);
        $email = modifyInput($_POST['email']);

        if(!$names || !$user || !$email || !$pass || !$confirmPass){
            setcookie('status', 'Моля, попълнете всички задължителни полета.', time() + 240, '/');
            header('Location: ../admin.html?id=addAdmin');
        } else {
            if(mb_strlen($names) > 200){
                setcookie('status', 'Трите имена трябва да са най-много 200 символа.', time() + 240, '/');
                header('Location: ../admin.html?id=addAdmin');
            } else if(mb_strlen($user) > 200){
                setcookie('status', 'Потребителското име трябва да е най-много 200 символа.', time() + 240, '/');
                header('Location: ../admin.html?id=addAdmin');
            } else if(mb_strlen($email) > 200){
                setcookie('status', 'Email-ът трябва да е най-много 200 символа.', time() + 240, '/');                
                header('Location: ../admin.html?id=addAdmin');
            } else if(mb_strlen($pass) > 200){
                setcookie('status', 'Паролата трябва да е най-много 200 символа.', time() + 240, '/');
                header('Location: ../admin.html?id=addAdmin');
            } else if(mb_strlen($pass) <= 8) {
                setcookie('status', 'Паролата трябва да е най-малко 8 символа.', time() + 240, '/');
                header('Location: ../admin.html?id=addAdmin');
            } else if($pass != $confirmPass){
                setcookie('status', 'Двете пароли не съвпадат.', time() + 240, '/');
                header('Location: ../admin.html?id=addAdmin');
            } else {
                setcookie('status', 'Успешно създаване на администраторски профил.', time() + 240, '/');                                
                Admin::insertAdmin($user, $pass, $email, $names);  
                header('Location: ../admin.html?id=addAdmin');              
            }                
        } 
    } else {
        $adminInfo = $adminController->viewInfo();
        echo json_encode($adminInfo);
    }

    function modifyInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
?>