<?php
    require "php/electivesController.php";

    $electives = new electivesController();

    $term = (isset($_GET['id']) ? $_GET['id'] : null);
    
    if (isset($_GET['filter']) && isset($_GET['value'])) {    
        echo $electives->filterElectives($term, $_GET['filter'], $_GET['value']);
    }
    else {
        echo $electives->viewElectives($term);
    }
?>