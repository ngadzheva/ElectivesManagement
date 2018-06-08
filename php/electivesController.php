<?php
    class ElectivesController{
        require_once "electivesModel.php";
        require_once "database.php";

        private $elective;
        private $database;

        public function __construct(){
            $this->database = new DataBase("localhost", "uxProj", "root", "");
        }

        /**
         * List all electives for winter or summer semester
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
         * Filter electives for winter or summer term
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
         * Return informations for the electives chosen by a student
         **/
        public function getReferences($student){
            $sql = "SELECT name, credits, grade FROM chElectives WHERE fn=$student";

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $this->listReferences($query);
        }

        /**
         * Add new elective to database
         **/
        public function addNewElective($id, $title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $themes, $term, $rating){
            $newElective  = new ElectivesModel($id, $title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $themes, $term, $rating);
            $newElective->insertNewElective();

            header( 'Location: http://' . $_SERVER['HTTP_HOST'] . '/admin.html' );
        }

        /**
         * Delete an elective from database
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
         * Make a table with the electives
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
        /**
         * make a table with the electives chosen by a student
         **/
        private function listReferences($query){
            $template = "<table id='electivesReferences'>\n". 
                "                   <tr id='firstRow'>\n" .
                "                      <th>Избираема дисциплина</th>\n" .
                "                      <th>Кредити</th>\n" .
                "                      <th>Оценка</th>\n" .
                "                   </tr>\n";
            $totalCredits = 0;
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $template = $template . "                   <tr class='elective'>\n";
                foreach($row as $key => $value){
                    if($key === "credits"){
                        $totalCredits = $totalCredits + $value;
                        $template = $template . "                      <td>" . $value . "</td>\n";
                    } else {
                        $template = $template . "                      <td>" . $value . "</td>\n";
                    }
                }

                $template = $template . "                   </tr>\n";
            }
            $template = $template . "<tr>\n" .
                "                      <td>Общ брой кредити:</td>\n" .
                "                      <td></td>\n" .
                "                      <td>" . $totalCredits . "</td>\n" .
                "                   </tr>\n";
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