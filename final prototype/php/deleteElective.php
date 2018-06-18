<?php
    require "electivesController.php";

    $electives = new electivesController();

    $queryString = (isset($_POST['id']) ? $_POST['id'] : null);
    
    header('Location: ../admin.html');
    exit;
    //echo $electives->deleteElectives($queryString);
?>