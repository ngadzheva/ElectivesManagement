<?php
    require "database.php";

    class ElectivesController{
        private $database; 

        function __construct(){
            $this->database = new DataBase("localhost", "uxProj", "root", "asdf");
        }

        /**
         * list all electives for winter or summer semester
         **/
        public function viewElectives($queryString){
            $sql = "SELECT NAME, names, credits, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND ";

           if($queryString === 'winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($queryString === 'summer'){
                $sql = $sql . "term = 'summer'";
            }

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * filters electives for winter or summer semester
         **/
        public function filterElectives($term, $filter, $value){
            $sql = "SELECT name, names, credits, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND ";

            if ($filter == "lecturer") {
                
                $sql = $sql . "term='$term'" . " AND " . "names='$value'";
            }
            else {
                $sql = $sql . "term='$term'" . " AND " . "$filter='$value'";
            }

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * add new elective to database
         **/
        public function addNewElective($name, $lecturer, $shortDescription, $credits, $cathegory, $term){
            $sql = "SELECT id FROM lecturer WHERE NAMES = '$lecturer'";
            $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
            $lecturerID = $query->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO electives VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
            $values = ["$name", $lecturerID, " ", "$shortDescription", $credits, "$term", "$cathegory", 0];
            $this->database->insertValues($sql, $values);

            header( 'Location: http://' . $_SERVER['HTTP_HOST'] . '/admin.html' );
        }

        /**
         * delete an elective from database
         **/
        public function deleteElective($name){
            $sql = "SELECT term FROM electives WHERE NAME = $name";
            $query = $this->database->executeQuery($sql, "Failed finding term!");
            $term = $query->fetch(PDO::FETCH_ASSOC)['term'];

            $sql = "DELETE FROM electives WHERE NAME = $name";
            $query = $this->database->executeQuery($sql, "Failed deleting electives!");

            $this->viewElectives($term);
        }

        /**
         * update the information for an elective to database
         **/
        public function updateElective($name, $lecturer, $fullDescription, $shortDescription, $credits, $cathegory, $rating, $id){
            $sql = "UPDATE electives SET NAME = $name, lecturer = $lecturer, fullDescription = $fullDescription, shortDescription = $shortDescription, credits = $credits, cathegory = $cathegory, rating = $rating WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating electives!");
        }

        /**
         * make a table with the electives
         **/
        private function listElectives($query){
            $template = "<table id='electivesList' onload='showDescription()'>\n". 
                "                   <tr id='firstRow'>\n" .
                "                      <th>Избираема дисциплина</th>\n" .
                "                      <th>Лектор</th>\n" .
                "                      <th>Кредити</th>\n" .
                "                      <th>Категория</th>\n" .
                "                      <th>Рейтинг</th>\n" .
                "                   </tr>\n";

            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $template = $template . "                   <tr class='elective'>\n";
                $name = "";
                foreach($row as $key => $value){
                    if($key === "NAME"){
                        $name = $value;
                        $template = $template . "                      <td>" . $name . "</td>\n";
                    } else {
                        $template = $template . "                      <td>" . $value . "</td>\n";
                    }
                }

                $template = $template . "                   </tr>\n";
            }
            $template = $template . "                </table>\n";

            return $template;
        }

        /*
         * get elective's rating
         */
         public function getRating($name): int{
             $sql = "SELECT rating FROM electives WHERE NAME = $name";
             $query = $this->database->executeQuery($sql, "Failed finding $name's rating!");

             return $query->fetch(PDO::FETCH_ASSOC)['rating'];
         }

         /*
         * change elective's rating
         */
         public function updateRating($rating, $name){
            $sql = "UPDATE electives SET rating = $rating WHERE name = $name";
            $query = $this->database->executeQuery($sql, "Failed updating $name's rating!");
         }
    }

    
?>