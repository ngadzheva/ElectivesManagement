<?php
    require_once "database.php";

    session_start();

    $database = new DataBase("localhost", "uxProj", "root", "");

    $user = $_POST["user"];
    $pass = $_POST["password"];

    if(!$user && !$pass){
        header('Location: ../login.html?status=required');
    } else if(!$user){
        header('Location: ../login.html?status=requiredu');
    } else if(!$pass){
        header('Location: ../login.html?status=requiredp');
    } else {
        $sql = "SELECT * FROM users WHERE userName='$user'";
        $query = $database->executeQuery($sql, "Failed finding $user!");
        $exist = $query->fetch(PDO::FETCH_ASSOC);

        if($exist){
            if($exist['passwd'] == hash('sha256', $pass)){
                $_SESSION['userName'] = $exist['userName'];

                if($exist['userType'] == 'student'){
                    $sql = "SELECT fn FROM student WHERE userName='$user'";
                    $query = $database->executeQuery($sql, "Failed finding $user!");
                    $student = $query->fetch(PDO::FETCH_ASSOC);

                    $_SESSION['fn'] = $student['fn'];
                }

                header('Location: ../' . $exist['userType'] . '.html'); 
            } else {
                header('Location: ../login.html?status=wrongp');
            }
        } else {
            header('Location: ../login.html?status=wrongu');
        }
    }

    
?>