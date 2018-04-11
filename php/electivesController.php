<?php
    require "database.php";

    class ElectivesController{
        private $database; 

        function __construct(){
            $this->database = new DataBase("localhost", "uxProj", "root", "");
        }

        /**
         * list all electives for winter or summer semester
         **/
        public function viewElectives($queryString){
            $sql = "SELECT NAME, lecturer, shortDescription, credits, cathegory, rating FROM electives WHERE ";

            /*if($_SERVER['QUERY_STRING'] === 'id=winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($_SERVER['QUERY_STRING'] === 'id=summer'){
                $sql = $sql . "term = 'summer'";
            }*/

           if($queryString === 'winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($queryString === 'summer'){
                $sql = $sql . "term = 'summer'";
            }

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * add new elective to database
         **/
        private function addNewElective($name, $lecturer, $fullDescription, $shortDescription, $credits, $cathegory, $rating){
            $sql = "INSERT INTO electives VALUES($NAME, $lecturer, $fullDescription, $shortDescription, $credits, $cathegory, $rating)";
            $query = $this->database->executeQuery($sql, "Failed finding electives!");
        }

        /**
         * delete an elective from database
         **/
        private function deleteElective( $id){
            $sql = "DELETE FROM electives WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed deleting electives!");
        }

        /**
         * update the information for an elective to database
         **/
        private function updateElective($name, $lecturer, $fullDescription, $shortDescription, $credits, $cathegory, $rating, $id){
            $sql = "UPDATE electives SET NAME = $name, lecturer = $lecturer, fullDescription = $fullDescription, shortDescription = $shortDescription, credits = $credits, cathegory = $cathegory, rating = $rating WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating electives!");
        }

        /**
         * make a table with the electives
         **/
        private function listElectives($query){
            $template = "<table id='electivesList' onload='showDescription()'>\n". 
                "                   <tr>\n" .
                "                      <th>Избираема дисциплина</th>\n" .
                "                      <th>Лектор</th>\n" .
                "                      <th>Кредити</th>\n" .
                "                      <th>Категория</th>\n" .
                "                      <th>Рейтинг</th>\n" .
                "                   </tr>\n";

            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $template = $template . "                   <tr class='elective'>\n";
                $description = "";
                foreach($row as $key => $value){
                    if($key === "lecturer"){
                        $sql = "SELECT DISTINCT NAMES FROM lecturer, electives WHERE id = lecturer";
                        $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
                
                        $lecturer = $query->fetch(PDO::FETCH_ASSOC);

                        $template = $template . "                      <td>" . $lecturer['NAMES'] . "</td>\n";
                    } elseif($key == "shortDescription"){
                        $description = $value;
                    }else {
                        $template = $template . "                      <td>" . $value . "</td>\n";
                    }
                }

                $template = $template . "                   </tr>\n";
            }

            $template = $template . "                   <tr class='description'>\n" . "                      <td colspan='5'>" . $description . "</td>\n" . "                   </tr>\n";
            $template = $template . "                </table>\n";

            return $template;
        }
    }
?>