<?php
    require_once 'electivesController.php';

    session_start();

    $electives = new ElectivesController();

    if(isset($_GET['elective'])){
        if(isset($_GET['vote'])){
            echo $electives->vote($_GET['vote'], $_GET['elective'], $_GET['type']);
        } else if(isset($_GET['comments'])){
            echo $electives->getComments($_GET['elective'], $_GET['type']);
        } else if(isset($_GET['postedComment'])){
            echo $electives->postComment($_GET['elective'], $_GET['postedComment'], $_SESSION['userName'], $_GET['type']);
        } else {
            echo json_encode($electives->getElectiveInfo($_GET['elective'], $_GET['type']));
        }  
    } 
    
?>