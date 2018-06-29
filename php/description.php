<?php
    require_once 'electivesController.php';

    session_start();

    $electives = new ElectivesController();

    if(isset($_COOKIE['elective'])){
        if(isset($_GET['vote'])){
            echo $electives->vote($_GET['vote'], $_COOKIE['elective']);
        } else if(isset($_GET['comments'])){
            echo $electives->getComments($_COOKIE['elective']);
        } else if(isset($_GET['postedComment'])){
            echo $electives->postComment($_COOKIE['elective'], $_GET['postedComment'], $_SESSION['userName']);
        } else {
            echo json_encode($electives->getElectiveInfo($_COOKIE['elective']));
        }  
    } 
    
?>