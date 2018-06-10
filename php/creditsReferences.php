<?php
    require_once 'StudentsController.php';

    //session_start();

    $student = new StudentsController();

    echo $student->getReferences();
?>