<?php
    require "php/electivesController.php";

    $electives = new electivesController();

    $queryString = (isset($_GET['id']) ? $_GET['id'] : null);

    echo $electives->deleteElectives($queryString);
?>