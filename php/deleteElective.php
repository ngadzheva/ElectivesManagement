<?php
    require "electivesController.php";

    $electives = new electivesController();

    $queryString = (isset($_POST['id']) ? $_POST['id'] : null);
    
    //echo $electives->deleteElectives($queryString);
?>