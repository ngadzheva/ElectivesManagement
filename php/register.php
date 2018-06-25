<?php
    require_once "student.php";
    require_once "lecturer.php";

    session_start();

    $database = new DataBase();

    $user = $_POST["user"];
    $pass = $_POST["password"];
    $confirmPass = $_POST['confirmPassword'];
    $names = $_POST['names'];
    $email = $_POST['email'];
    $userType = $_POST['userType'];


    /*if(!$names){
        header('Location: ../register.html?status=requiredn');
    }

    if(!$user){
        header('Location: ../register.html?status=requiredu');
    }

    if(!$email){
        header('Location: ../register.html?status=requirede');
    }

    if(!$pass){
        header('Location: ../register.html?status=requiredp');
    }

    if($pass != $confirmPass){
        header('Location: ../register.html?status=diff');
    }*/
    
    if($userType == '-'){
        header('Location: ../register.html?status=requiredut');
    } else if($userType == 'student'){
        $fn = $_POST['fn'];
        $year = $_POST['year'];
        $bachelorPrograme = $_POST['bachelorPrograme'];

       /* if(!$fn){
            header('Location: ../register.html?status=requiredfn');
        }

        if(!$year){
            header('Location: ../register.html?status=requiredy');
        }

        if(!$bachelorPrograme){
            header('Location: ../register.html?status=requiredbp');
        }*/

        $student = new Student($user, $fn);
        $student->insertStudent($user, hash('sha256', $pass), $email, $fn, $names, $year, $bachelorPrograme);

        header('Location: ../login.html');
    } else {
        $department = $_POST['department'];
        $telephone = $_POST['telephone'];
        $visitingHours = $_POST['visitingHours'];
        $office = $_POST['office'];
        $personalPage = $_POST['personalPage'];

        /*if(!$department){
            header('Location: ../register.html?status=requiredd');
        }*/

        $lecturer = new Lecturer($user, '');
        $lecturer->insertLecturer($user, hash('sha256', $pass), $email, $names, $department, $telephone, $visitingHours, $office, $personalPage);

        header('Location: ../login.html');
    }   
?>
