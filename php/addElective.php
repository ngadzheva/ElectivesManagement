<?php
    require "electivesController.php";

    $electives = new electivesController();

    $title = (isset($_POST['title']) ? $_POST['title'] : null);
    $lecturer = (isset($_POST['lecturer']) ? $_POST['lecturer'] : null);
    $credits = (isset($_POST['credits']) ? $_POST['credits'] : null);
    $cathegory = (isset($_POST['cathegory']) ? $_POST['cathegory'] : null);
    $description = (isset($_POST['description']) ? $_POST['description'] : null);
    $term = (isset($_POST['term']) ? $_POST['term'] : null);
   
    $electives->addNewElective($title, $lecturer, $description, $credits, $cathegory, $term)
?>