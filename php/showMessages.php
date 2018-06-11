<?php
    require_once 'StudentsController.php';

    $student = new StudentsController();

    echo $student->showMessages();
?>