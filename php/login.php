<?php
    require_once "database.php";

    $database = new DataBase("localhost", "uxProj", "root", "");

    $user = $_POST["user"];
    $pass = $_POST["pass"];

    $sql = "SELECT passwd FROM users WHERE userName = $user";
    $query = $database->executeQuery($sql, "Failed finding $user!");
    $hash = $query->fetch(PDO::FETCH_ASSOC)['passwd'];

    $isTrue = false;
    $userType = "";

    if($hash != null){
        $isTrue = password_verify($pass, $hash);

        if($isTrue){
            $sql = "SELECT userType FROM users WHERE userName = $user";
            $query = $database->executeQuery($sql, "Failed finding $user!");
            $userType = $query->fetch(PDO::FETCH_ASSOC)['userType'];
        }
    } 

    echo $userType;
?>