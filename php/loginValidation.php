<?php
    require_once "database.php";

    session_start();

    $database = new DataBase();

    $user = modifyInput($_POST["user"]);
    $pass = modifyInput($_POST["password"]);

    if(!$user && !$pass){
        $_SESSION['loginError'] = 'Въведете потребителско име и парола.';
        header('Location: ../login.php');
    } else if(!$user){
       $_SESSION['loginError'] = 'Въведете потребителско име.';
       header('Location: ../login.php');
    } else if(!$pass){
        $_SESSION['loginError'] = 'Въведете парола.';
        header('Location: ../login.php');
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
                } else if($exist['userType'] == 'lecturer'){
                    $sql = "SELECT id FROM lecturer WHERE userName='$user'";
                    $query = $database->executeQuery($sql, "Failed finding $user!");
                    $lecturer = $query->fetch(PDO::FETCH_ASSOC);
                    $_SESSION['id'] = $lecturer['id'];
                }

                header('Location: ../' . $exist['userType'] . '.html'); 
            } else {
                $_SESSION['loginError'] = 'Грешна парола.';
                header('Location: ../login.php');
            }
        } else {
            $_SESSION['loginError'] = 'Грешно потребителско име.';
            header('Location: ../login.php');
        }
    }

    function modifyInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }
?>
