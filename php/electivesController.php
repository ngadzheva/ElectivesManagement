<?php
    require_once "electivesModel.php";
    require_once "database.php";
    
    class ElectivesController{
        private $elective;
        private $db;

        public function __construct(){
            $this->db = new DataBase("localhost", "uxProj", "root", "");
        }

        /**
         * List all electives for winter or summer semester
         **/
        public function viewElectives($queryString){
            $sql = "SELECT NAME, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE active=TRUE AND lecturer=id AND ";

           if($queryString === 'winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($queryString === 'summer'){
                $sql = $sql . "term = 'summer'";
            }

            $query = $this->db->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * Filter electives for winter or summer term
         **/
        public function filterElectives($term, $filter, $value){
            $sql = "SELECT name, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND ";

            if ($filter == "lecturer") {
                
                $sql = $sql . "term='$term'" . " AND " . "names='$value'";
            }
            else {
                $sql = $sql . "term='$term'" . " AND " . "$filter LIKE '%$value%'";
            }

            $query = $this->db->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * Sort electives for winter or summer term
         **/
        public function sortElectives($term, $sort, $value){
            $sql = "SELECT name, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND term='$term' ORDER BY '$sort' ";

            $query = $this->db->executeQuery($sql, "Failed finding electives!");

            return $this->listElectives($query);
        }

        /**
         * Return informations for the electives chosen by a student
         **/
        public function getReferences($student){
            $sql = "SELECT name, credits, grade FROM chElectives WHERE fn=$student";

            $query = $this->db->executeQuery($sql, "Failed finding electives!");

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
            $query = $this->db->executeQuery($sql, "Failed finding term!");
            $term = $query->fetch(PDO::FETCH_ASSOC)['term'];

            $sql = "DELETE FROM electives WHERE NAME = $name";
            $query = $this->db->executeQuery($sql, "Failed deleting electives!");

            $this->viewElectives($term);
        }

        /**
         * update the information for an elective to database
         **/
        public function updateElective($name, $lecturer, $fullDescription, $shortDescription, $credits, $cathegory, $rating, $id){
            $sql = "UPDATE electives SET NAME = $name, lecturer = $lecturer, fullDescription = $fullDescription, shortDescription = $shortDescription, credits = $credits, cathegory = $cathegory, rating = $rating WHERE id = $id";
            $query = $this->db->executeQuery($sql, "Failed updating electives!");
        }

        /**
         * Make a table with the electives
         **/
        private function listElectives($query){
            $template = "<table id='electivesList' onload='showDescription()'>\n". 
                "<tr id='firstRow'>\n" .
                    "<th>Избираема дисциплина</th>\n" .
                    "<th>Лектор</th>\n" .
                    "<th>Кредити</th>\n" .
                    "<th>Курс</th>\n" .
                    "<th>Специалност</th>\n" .
                    "<th>Категория</th>\n" .
                    "<th>Рейтинг</th>\n" .
                "</tr>\n";

            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $template = $template . "<tr class='elective'>\n";
                $name = "";
                foreach($row as $key => $value){
                    if($key === "NAME"){
                        $name = $value;
                        $template = $template . "<td>" . $name . "</td>\n";
                    } else {
                        $template = $template . "<td>" . $value . "</td>\n";
                    }
                }

                $template = $template . "</tr>\n";
            }
            $template = $template . "</table>\n";

            return $template;
        }
        /**
         * make a table with the electives chosen by a student
         **/
        private function listReferences($query){
            $template = "<table id='electivesReferences'>\n". 
                "<tr id='firstRow'>\n" .
                    "<th>Избираема дисциплина</th>\n" .
                    "<th>Кредити</th>\n" .
                    "<th>Оценка</th>\n" .
                "</tr>\n";
            $totalCredits = 0;
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $template = $template . "<tr class='elective'>\n";
                foreach($row as $key => $value){
                    if($key === "credits"){
                        $totalCredits = $totalCredits + $value;
                        $template = $template . "<td>" . $value . "</td>\n";
                    } else {
                        $template = $template . "<td>" . $value . "</td>\n";
                    }
                }

                $template = $template . "</tr>\n";
            }
            $template = $template . "<tr>\n" .
                    "<td>Общ брой кредити:</td>\n" .
                    "<td></td>\n" .
                    "<td>" . $totalCredits . "</td>\n" .
                "</tr>\n".
            "</table>\n";

            return $template;
        }

        /*
         * get elective's rating
         */
         public function getRating($name): int{
             $sql = "SELECT rating FROM electives WHERE NAME = $name";
             $query = $this->db->executeQuery($sql, "Failed finding $name's rating!");

             return $query->fetch(PDO::FETCH_ASSOC)['rating'];
         }

         /*
         * change elective's rating
         */
         public function updateRating($rating, $name){
            $sql = "UPDATE electives SET rating = $rating WHERE name = $name";
            $query = $this->db->executeQuery($sql, "Failed updating $name's rating!");
         }

         /**
         * Get elective's description
         */
        public function getElectiveInfo($elective){
            $this->elective = [];

            $electives = new ElectivesModel($elective);

            $electives->load();

            $this->elective['lecturer'] = $this->lecturerInfo($electives->getLecturer());
            $this->elective['rating'] = $electives->getRating();
            $this->elective['term'] = $electives->getTerm() == 'winter' ? 'Зимен' : 'Летен';
            $this->elective['year'] = $electives->getYear();
            $this->elective['bachelorPrograme'] = $electives->getBachelorsProgram();
            $this->elective['credits'] = $electives->getCredits();
            $this->elective['cathegory'] = $electives->getCathegory();
            $this->elective['description'] = $electives->getDescription();
            $this->elective['subjects'] = $this->subjectsList($electives->getSubjects());
            $this->elective['literature'] = $this->literatureList($electives->getLiterature());

            return $this->elective;
        }

        /**
         * 
         */
        private function lecturerInfo($lecturer){
            $sql = "SELECT names, department, telephone, visitingHours, office, email, personalPage FROM lecturer AS l, users AS u WHERE id='$lecturer' AND l.userName=u.userName";
            $query = $this->db->executeQuery($sql, "Failed finding lecturer!");
            $lecturerInfo = $query->fetch(PDO::FETCH_ASSOC);

            $template = '<h3>' . $lecturerInfo['names'] . '</h3>' .
                '<h4>' . $lecturerInfo['department'] . '</h4>' .
                '<p><mark id="bold">Email: </mark>' . $lecturerInfo['email'] . '</p>';

            if($lecturerInfo['telephone']){
                $template = $template . '<p><mark id="bold">Телефон: </mark>' . $lecturerInfo['telephone'] . '</p>';
            }

            if($lecturerInfo['office']){
                $template = $template . '<p><mark id="bold">Кабинет: </mark>' . $lecturerInfo['office'] . '</p>';
            }

            if($lecturerInfo['visitingHours']){
                $template = $template . '<p><mark id="bold">Приемно време: </mark>' . $lecturerInfo['visitingHours'] . '</p>';
            }
                
            if($lecturerInfo['personalPage']){
                $template = $template . '<p><mark id="bold">Лична страница: </mark>' . $lecturerInfo['personalPage'] . '</p>';
            }    

            return $template;
        }

        /**
         * Make subjects table
         */
        private function subjectsList($subjects){
            $template = '<table id="subjectsTable">' .
                '<tr>' . 
                    '<th>N</th>' .
                    '<th>Тема</th>' . 
                    '<th>Хорариум</th>' . 
                '</tr>';

            $subjectsInfo = json_decode($subjects, true);
            $num = 1;

            foreach($subjectsInfo as $key => $value){
                $template = $template . '<tr>' .
                    '<td>' . $num .'</td>' .
                    '<td>' . $key .'</td>' .
                    '<td>' . $value .'</td>' .
                '</tr>';

                $num++;
            }

            return $template;
        }

        /**
         * Make literature list
         */
        private function literatureList($literature){
            $mainLiterature = '<h3>Основна</h3>';
            $additionalLiterature = '<h3>Допълнителна</h3>';

            $template = $mainLiterature . '<ul>';

            $literatureInfo = json_decode($literature, true);

            $num = 0;

            foreach($literatureInfo as $key => $value){
               if($value == 'Допълнителна' && $num == 0){
                   $template = $template . '</ul>' . $additionalLiterature . '<ul>';

                   $num++;
               }

               $template = $template . '<li>' . $key . '</li>';
            }

            $template = $template . '</ul>';

            return $template;
        }

        /**
         * Change current elective rating
         */
        public function vote($voteType, $elective){
            $electives = new ElectivesModel($elective);

            $electives->load();

            $electives->setRating($voteType);

            return $electives->getRating();
        }

        /**
         * Show all comments for current elective
         */
        public function getComments($elective){
            $electives = new ElectivesModel($elective);

            $electives->load();

            $comments = $electives->getComments();
            $template = '';

            foreach($comments as $key => $value){
                $comment = $value;
                $template = $template . '<section class="userComments">';

                foreach($comment as $key => $value){
                    if($key == 'user'){
                        $value = $value ? $value : "Гост";

                        $template = $template . '<h4>' . $value;
                    } else if($key == 'timePosted'){
                        $template = $template . '<time>' . $value . '</time>' . '</h4>';
                    } else {
                        $template = $template . '<p>' .  $value . '</p>';
                    }
                }

                $template = $template . '</section>';
            }

            return $template;
        }

        /**
         * Post new comment for current elective
         */
        public function postComment($elective, $comment, $user){
            $electives = new ElectivesModel($elective);

            $electives->load();

            $electives->insertNewComment($comment, $user);

            return $this->getComments($elective);
        }
    }
?>