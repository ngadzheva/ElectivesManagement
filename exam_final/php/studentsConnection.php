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
        } else if($id == 'showSuggestions'){
            echo $student->showElectivesSuggestions();
        } else if($id == 'schedule'){
            echo $student->showSchedule();
        } else if($id == 'exams'){
            echo $student->showExams();
        } else if($id == 'showMessages'){
            echo $student->showMessages($_GET['type']);
        } 
    } else if(isset($_GET['receiver'])){
        echo $student->viewMessage($_GET['receiver'], $_GET['sender'], $_GET['date']);
    } else if(isset($_POST['to']) && isset($_POST['about']) && isset($_POST['content'])){
        $to = modifyInput($_POST['to']);
        $about = modifyInput($_POST['about']);
        $content = modifyInput($_POST['content']);

        setcookie('to', $to, time() + 240, '/');
        setcookie('about', $about, time() + 240, '/');
        setcookie('content', $content, time() + 240, '/');

        if(!$to){
            setcookie('status', 'Моля, попълнете всички задължителни полета.', time() + 240, '/');
            header('Location: ../html/student.html?id=newMessage');
        } else {

            if(strlen($to) > 200){
                setcookie('status', 'Email-ът на получателя трябва да е най-много 200 символа.', time() + 240, '/');
                header('Location: ../html/student.html?id=newMessage');
            } else if(mb_strlen($about) > 200){
                setcookie('status', 'Полето относно трябва да съдържа най-много 200 символа.', time() + 240, '/');
                header('Location: ../html/student.html?id=newMessage');
            } else if(mb_strlen($content) > 2000){
                setcookie('status', 'Съобщението трябва да съдържа най-много 2000 символа.', time() + 240, '/');
                header('Location: ../html/student.html?id=newMessage');
            } else {
                $status = $student->sendMessage($to, $about, $content);

                if($status == 'notfound'){
                    setcookie('status', 'Не е открит потребител с въведения email.', time() + 240, '/');
                } else {
                    setcookie('status', 'success', time() + 240, '/');
                }

                header('Location: ../html/student.html?id=newMessage');
            }         
        }
    } else if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['newPassword']) && isset($_POST['confirmPassword'])){
        $email = modifyInput($_POST['email']);
        $password = modifyInput($_POST['password']);
        $newPassword = modifyInput($_POST['newPassword']);
        $confirmPassword = modifyInput($_POST['confirmPassword']);

        setcookie('email', $email, time() + 240, '/');

        if(!$email || !$password || !$newPassword || !$confirmPassword){
            setcookie('status', 'Моля, попълнете всички задължителни полета.', time() + 240, '/');
            header('Location: ../html/student.html?id=editProfile');
        } else if(strlen($email) > 200){
            setcookie('status', 'Email-ът трябва да е най-много 200 символа.', time() + 240, '/');
            header('Location: ../html/student.html?id=editProfile');
        } else if(mb_strlen($password) > 200 || mb_strlen($newPassword) > 200 || mb_strlen($confirmPassword) > 200){
            setcookie('status', 'Паролата трябва да е най-много 200 символа.', time() + 240, '/');
            header('Location: ../html/student.html?id=editProfile');
        } else{
            if($newPassword == $confirmPassword){
                $pass = hash('sha256', $password);
                $newPass = hash('sha256', $newPassword);
                $studentInfo = $student->viewInfo();
    
                if($studentInfo['password'] == $pass){
                    $student->updateInfo($email, $newPass);
    
                    setcookie('status', 'success', time() + 240, '/');
                    header('Location: ../html/student.html?id=editProfile');
                } else {
                    setcookie('status', 'Невалидна парола.', time() + 240, '/');
                    header('Location: ../html/student.html?id=editProfile');
                }
            } else {
                setcookie('status', 'Двете пароли не съвпадат.', time() + 240, '/');
                header('Location: ../html/student.html?id=editProfile');
            }
        }        
    } else if(isset($_POST['name']) && isset($_POST['description']) && isset($_POST['year']) && isset($_POST['bachelorPrograme']) && isset($_POST['term']) && isset($_POST['cathegory'])){
        $name = modifyInput($_POST['name']);
        $description = modifyInput($_POST['description']);
        $year = modifyInput($_POST['year']);
        $bachelorPrograme = modifyInput($_POST['bachelorPrograme']);
        $term = modifyInput($_POST['term']);
        $cathegory = modifyInput($_POST['cathegory']);

        setcookie('name', $name, time() + 240, '/');
        setcookie('description', $description, time() + 240, '/');
        setcookie('year', $year, time() + 240, '/');
        setcookie('term', $term, time() + 240, '/');
        setcookie('cathegory', $cathegory, time() + 240, '/');

        if(!$name || !$description){
            setcookie('status', 'Моля, попълнете всички задължителни полета.', time() + 240, '/');
        } else if(mb_strlen($name) > 200){
            setcookie('status', 'Името на избираемата дисциплина трябва да е най-много 200 символа.', time() + 240, '/');
        } else if(mb_strlen($description) > 2000){
            setcookie('status', 'Описанието на избираемата дисциплина трябва да е най-много 2000 символа.', time() + 240, '/');
        } else {
            setcookie('status', 'success', time() + 240, '/');

            $student->suggestNewElective($_POST['name'], $_POST['description'], $_POST['year'], $_POST['bachelorPrograme'], $_POST['term'], $_POST['cathegory']);
        }

        header('Location: ../html/student.html?id=makeSuggestion');
    } else{
        $studentInfo = $student->viewInfo();

        echo json_encode($studentInfo);
    }

    function modifyInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }
?>