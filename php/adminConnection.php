<?php
    require_once 'adminController.php';
    require_once 'student.php';
    require_once 'lecturer.php';

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
    } else if(isset($_POST['fn']) || isset($_POST['department'])) {
        $user = modifyInput($_POST['user']);
        $pass = modifyInput($_POST['password']);
        $confirmPass = modifyInput($_POST['confirmPassword']);
        $names = modifyInput($_POST['names']);
        $email = modifyInput($_POST['email']);
        $userType = modifyInput($_POST['userType']);

        if(!$names || !$user || !$email || !$pass || !$confirmPass) {
            setcookie('status', 'Моля, попълнете всички задължителни(*) полета.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if(mb_strlen($names) > 200){
            setcookie('status', 'Трите имена трябва да са най-много 200 символа.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if(mb_strlen($user) > 200){
            setcookie('status', 'Потребителското име трябва да е най-много 200 символа.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if(mb_strlen($email) > 200){
            setcookie('status', 'Email-ът трябва да е най-много 200 символа.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if(mb_strlen($pass) > 200){
            setcookie('status', 'Паролата трябва да е най-много 200 символа.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if($pass != $confirmPass){
            setcookie('status', 'Двете пароли не съвпадат.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        }else {
            if($userType === 'student') {
                addStudent($user, $pass, $confirmPass, $names, $email);
            } else {
                addLecturer($user, $pass, $confirmPass, $names, $email, $userType);
            }
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
        editProfile($adminController);        
    } else if(isset($_POST['email']) && isset($_POST['names']) && isset($_POST['userName']) && isset($_POST['password']) && isset($_POST['confirmPassword'])) {
        createAdmin();
    } else {
        $adminInfo = $adminController->viewInfo();
        echo json_encode($adminInfo);
    }

    function editProfile($adminController){
        $status = '';
        if($_POST['newPassword'] == $_POST['confirmPassword']){
            $pass = hash('sha256', $_POST['passwd']);
            $newPass = hash('sha256', $_POST['newPassword']);
            $adminInfo = $adminController->viewInfo();

            if($adminInfo['password'] == $pass){
                $adminController->updateInfo($_POST['email'], $newPass);
                
                $status = 'success';
                header("Location: ../html/admin.html?id=editProfile&status=" . $status);
            } else {
                $status = 'wrongPassword';
                header("Location: ../html/admin.html?id=editProfile&status=" . $status);
            }
        } else {
            $status = 'notequal';
            header("Location: ../html/admin.html?id=editProfile&status=" . $status);
        }
    }

    function createAdmin() {
        $user = modifyInput($_POST["userName"]);
        $pass = modifyInput($_POST["password"]);
        $confirmPass = modifyInput($_POST['confirmPassword']);
        $names = modifyInput($_POST['names']);
        $email = modifyInput($_POST['email']);

        if(!$names || !$user || !$email || !$pass || !$confirmPass){
            setcookie('status', 'Моля, попълнете всички полета.', time() + 240, '/');
            header('Location: ../html/admin.html?id=addAdmin');
        } else {
            if(mb_strlen($names) > 200){
                setcookie('status', 'Трите имена трябва да са най-много 200 символа.', time() + 240, '/');
                setcookie('userType', "student", time() + 240, '/');
                header('Location: ../html/admin.html?id=addAdmin');
            } else if(mb_strlen($user) > 200){
                setcookie('status', 'Потребителското име трябва да е най-много 200 символа.', time() + 240, '/');
                header('Location: ../html/admin.html?id=addAdmin');
            } else if(mb_strlen($email) > 200){
                setcookie('status', 'Email-ът трябва да е най-много 200 символа.', time() + 240, '/');                
                header('Location: ../html/admin.html?id=addAdmin');
            } else if(mb_strlen($pass) > 200){
                setcookie('status', 'Паролата трябва да е най-много 200 символа.', time() + 240, '/');
                header('Location: ../html/admin.html?id=addAdmin');
            } else if(mb_strlen($pass) <= 8) {
                setcookie('status', 'Паролата трябва да е най-малко 8 символа.', time() + 240, '/');
                header('Location: ../html/admin.html?id=addAdmin');
            } else if($pass != $confirmPass){
                setcookie('status', 'Двете пароли не съвпадат.', time() + 240, '/');
                header('Location: ../html/admin.html?id=addAdmin');
            } else {                                
                $status = Admin::insertAdmin($user, hash('sha256', $pass), $email, $names);
                if($status) {
                    setcookie('status', 'Успешно създаване на администраторски профил.', time() + 240, '/');
                } else {
                    setcookie('status', 'Неуспешно създаване на администраторски профил.', time() + 240, '/');
                }
                header('Location: ../html/admin.html?id=addAdmin');              
            }                
        }
    }

    function addStudent($user, $pass, $confirmPass, $names, $email){
        $fn = $_POST['fn'];
        $year = $_POST['year'];
        $bachelorPrograme = modifyInput($_POST['bachelorPrograme']);

        if(!$fn || !$year || !$bachelorPrograme){
            setcookie('status', 'Моля, попълнете всички полета.', time() + 240, '/');
            setcookie('userType', "student", time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } 

        if(mb_strlen($bachelorPrograme) > 200){
            setcookie('status', 'Името на бакалавърската програма трябва да е най-много 200 символа.', time() + 240, '/');
            setcookie('userType', "student", time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        }

        if (Student::insertStudent($user, hash('sha256', $pass), $email, $fn, $names, $year, $bachelorPrograme)){
            setcookie('status', 'Успешно създаване на студентски профил.', time() + 240, '/');
            setcookie('userType', "student", time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else {
            setcookie('status', 'Съществува потребител с въведеното потребителско име / email.', time() + 240, '/');
            setcookie('userType', "student", time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        }

    }

    function addLecturer($user, $pass, $confirmPass, $names, $email, $userType) {
        $department = modifyInput($_POST['department']);
        $telephone = modifyInput($_POST['telephone']);
        $visitingHours = modifyInput($_POST['visitingHours']);
        $office = modifyInput($_POST['office']);
        $personalPage = modifyInput($_POST['personalPage']);

        if(mb_strlen($department) < 0 || mb_strlen($department) > 200) {
            setcookie('status', 'Поле Kатедра е празно или твърде дълго', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if($telephone > 20) {
            setcookie('status', 'Телефон тможе да е максимум 20 символа', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if($visitingHours > 50) {
            setcookie('status', 'Приемо време може да е максимум 50 символа', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if($office > 100) {
            setcookie('status', 'Кабинет може да е максимум 100 символа', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else if($personalPage > 200) {
            setcookie('status', 'Персонална страница може да е максимум 200 символа', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        }

        if (Lecturer::insertLecturer($user, hash('sha256', $pass), $email, $names, $department, $telephone, $visitingHours, $office, $personalPage)){
            setcookie('status', 'Успешно създаване на лекторски профил.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        } else {
            setcookie('status', 'Съществува потребител с въведеното потребителско име / email.', time() + 240, '/');
            setcookie('userType', $userType, time() + 240, '/');
            header('Location: ../html/admin.html?id=addUser');
        }        
    }

    function modifyInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
?>