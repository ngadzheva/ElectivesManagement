<?php
    require "electivesController.php";

    $electives = new electivesController();

    $student = (isset($_GET['student']) ? $_GET['student'] : null);
    
    echo $electives->getReferences($student);
?>