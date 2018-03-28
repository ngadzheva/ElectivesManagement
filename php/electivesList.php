<?php
    require "database.php";

    $database = new DataBase("localhost", "uxproj", "root", "");
    $sql = "SELECT NAME, lecturer, cathegory, credits, rating FROM electives WHERE ";

    if($_SERVER['QUERY_STRING'] === 'id=winter'){
        $sql = $sql . "term = 'winter'";
    } elseif($_SERVER['QUERY_STRING'] === 'id=summer'){
        $sql = $sql . "term = 'summer'";
    }

    $query = $database->executeQuery($sql, "Failed finding electives!");

    $template = "<table>\n". 
                "                   <tr>\n" .
                "                      <th>Избираема дисциплина</th>\n" .
                "                      <th>Лектор</th>\n" .
                "                      <th>Категория</th>\n" .
                "                      <th>Кредити</th>\n" .
                "                      <th>Рейтинг</th>\n" .
                "                   </tr>\n";

    while($row = $query->fetch(PDO::FETCH_ASSOC)){
        $template = $template . "                   <tr>\n";
        foreach($row as $key => $value){
           /* if($key === "lecturer"){
                $sql = "SELECT "
            }*/
           // echo $value;
            $template = $template . "                      <td>" . $value . "</td>\n";
        }

        $template = $template . "                   </tr>\n";
    }

    $template = $template . "           </table>\n";

    echo $template;
?>