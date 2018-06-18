<?php
    require 'electivesController.php';

    $electives = new electivesController();

    $id = (isset($_POST['id']) ? $_POST['id'] : null);
    $name = (isset($_POST['name']) ? $_POST['name'] : null);

    $rating = $electives->getRating($name);

    if($id === 'like'){
        $rating += 1;
    } else {
        $rating -= 1;
    }

    $electives->updateRating($rating, $name);
?>