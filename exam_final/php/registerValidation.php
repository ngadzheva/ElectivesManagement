<?php
    require_once 'student.php';
    require_once 'lecturer.php';

    session_start();

    $database = new DataBase();

    $user = modifyInput($_POST['user']);
    $pass = modifyInput($_POST['password']);
    $confirmPass = modifyInput($_POST['confirmPassword']);
    $names = modifyInput($_POST['names']);
    $email = modifyInput($_POST['email']);
    $userType = modifyInput($_POST['userType']);
    $fn = $_POST['fn'];
    $year = $_POST['year'];
    $bachelorPrograme = $_POST['bachelorPrograme'];
    $department = modifyInput($_POST['department']);
    $telephone = modifyInput($_POST['telephone']);
    $visitingHours = modifyInput($_POST['visitingHours']);
    $office = modifyInput($_POST['office']);
    $personalPage = modifyInput($_POST['personalPage']);

    $_SESSION['names'] = $names;
    $_SESSION['user'] = $user;
    $_SESSION['email'] = $email;
    $_SESSION['fn'] = $fn;
    $_SESSION['year'] = $year;
    $_SESSION['department'] = $department;
    $_SESSION['telephone'] = $telephone;
    $_SESSION['visitingHours'] = $visitingHours;
    $_SESSION['office'] = $office;
    $_SESSION['personalPage'] = $personalPage;

    setcookie('userType', $userType, time() + 240, '/');
    setcookie('bachelorPrograme', $bachelorPrograme, time() + 240, '/');

    if(!$names || !$user || !$email || !$pass){
        $_SESSION['registrationError'] = 'Моля, попълнете всички задължителни полета.';
        header('Location: ./register.php');
    } else {
        if(mb_strlen($names) > 200){
            $_SESSION['registrationError'] = 'Трите имена трябва да са най-много 200 символа.';
            header('Location: ./register.php');
        } else if(mb_strlen($user) > 200){
            $_SESSION['registrationError'] = 'Потребителското име трябва да е най-много 200 символа.';
            header('Location: ./register.php');
        } else if(mb_strlen($email) > 200){
            $_SESSION['registrationError'] = 'Email-ът трябва да е най-много 200 символа.';
            header('Location: ./register.php');
        } else if(mb_strlen($pass) > 200){
            $_SESSION['registrationError'] = 'Паролата трябва да е най-много 200 символа.';
            header('Location: ./register.php');
        } else if($pass != $confirmPass){
            $_SESSION['registrationError'] = 'Двете пароли не съвпадат.';
            header('Location: ./register.php');
        } else {
            $sql = "SELECT * FROM users WHERE userName='$user' || email= '$email'";
            $query = $database->executeQuery($sql, "Failed finding $user!");
            $exist = $query->fetch(PDO::FETCH_ASSOC);

            if($exist){
                $_SESSION['registrationError'] = 'Съществува потребител с въведеното потребителско име / парола.';
                header('Location: ./register.php');
            } else {
                if($userType == '-'){
                    $_SESSION['registrationError'] = 'Моля, попълнете всички задължителни полета.';
                    header('Location: ./register.php');
                } else if($userType == 'student'){                    
                   if(!$fn || !$year || !$bachelorPrograme){
                        $_SESSION['registrationError'] = 'Моля, попълнете всички задължителни полета.';
                        header('Location: ./register.php');
                    } 
    
                    if(mb_strlen($bachelorPrograme) > 200){
                        $_SESSION['registrationError'] = 'Името на бакалавърската програма трябва да е най-много 200 символа.';
                        header('Location: ./register.php');
                    }
            
                    $student = new Student($user, $fn);
                    $student->insertStudent($user, hash('sha256', $pass), $email, $fn, $names, $year, $bachelorPrograme);

                    $database->closeConnection();
            
                    session_destroy();
                    setcookie('userType', $userType, time() - 240, '/');
                    setcookie('bachelorPrograme', $bachelorPrograme, time() - 240, '/');

                    header('Location: ./login.php');
                } else {                    
                    if(!$department){
                        $_SESSION['registrationError'] = 'Моля, попълнете всички задължителни полета.';
                        header('Location: ./register.php');
                    } else if(mb_strlen($department) > 100){
                        $_SESSION['registrationError'] = 'Името на катедрата трябва да е най-много 100 символа.';
                        header('Location: ./register.php');
                    } else if(strlen($telephone) > 20){
                        $_SESSION['registrationError'] = 'Телефонният номер трябва да е най-много 20 символа.';
                        header('Location: ./register.php');
                    } else if (!preg_match ('/\+359 [0-9]{1,4} [0-9]{2} [0-9]{2} [0-9]{2,3}/', $telephone)){
                        $_SESSION['registrationError'] = 'Телефонният номер не е валиден.';
                        header('Location: ./register.php');
                    } else if(mb_strlen($visitingHours) > 50){
                        $_SESSION['registrationError'] = 'Приемното време трябва да е обозначено в най-много 50 символа.';
                        header('Location: ./register.php');
                    } else if(mb_strlen($office) > 100){
                        $_SESSION['registrationError'] = 'Името на кабинета трябва да е най-много 100 символа.';
                        header('Location: ./register.php');
                    } else if(strlen($personalPage) > 200){
                        $_SESSION['registrationError'] = 'Адресът на личната страница трябва да е най-много 200 символа.';
                        header('Location: ./register.php');
                    }
            
                    $lecturer = new Lecturer($user, '');
                    $lecturer->insertLecturer($user, hash('sha256', $pass), $email, $names, $department, $telephone, $visitingHours, $office, $personalPage);

                    $database->closeConnection();
            
                    session_destroy();
                    setcookie('userType', $userType, time() - 240, '/');

                    header('Location: ./login.php');
                } 
            }
        }  
    }  
    
    function modifyInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }
?>
