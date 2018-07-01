<?php
    require_once 'electivesModel.php';
    require_once 'database.php';
    
    class ElectivesController{
        private $elective;
        private $db;

        public function __construct(){
            $this->db = new DataBase();
        }

        /**
         * List all electives for winter or summer semester
         **/
        public function viewElectives($queryString){
           $electives = new ElectivesModel('');

            $query = $electives->getElectives($queryString);

            return $this->listElectives($query);
        }

        /**
         * Filter electives for winter or summer term
         **/
        public function filterElectives($term, $filter, $value){
            $electives = new ElectivesModel('');

            $query = $electives->getFilteredElectives($term, $filter, $value);

            return $this->listElectives($query);
        }

        /**
         * Add new elective to database
         **/
        public function addNewElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $subjects, $term, $rating, $type){
            $newElective  = new ElectivesModel($title);
            $newElective->insertNewElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $subjects, $term, $rating, $type);

            header( 'Location: http://' . $_SERVER['HTTP_HOST'] . '/admin.html' );
        }

        /**
         * Delete an elective from database
         **/
        public function deleteElective($name){
            $elective = new ElectiveModel($name);
            $elective->load('active');
            
            $elective->setType('notactive');
            $elective->setActive(false);

            $this->viewElectives($term);
        }

        /**
         * update the information for an elective to database
         **/
        public function updateElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $subjects, $term, $rating, $type){
            $elective = new ElectiveModel($name);
            $elective->load($type);
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
                $name = '';
                foreach($row as $key => $value){
                    if($key === 'NAME'){
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
         * Get elective's description
         */
        public function getElectiveInfo($elective, $type){
            $this->elective = [];

            $electives = new ElectivesModel($elective);

            $electives->load($type);

            $this->elective['lecturer'] = $this->lecturerInfo($electives->getLecturer());
            $this->elective['rating'] = $electives->getRating() ? $electives->getRating() : 0;
            $this->elective['term'] = $electives->getTerm() == 'winter' ? 'Зимен' : 'Летен';
            $this->elective['year'] = $electives->getYear() ? $electives->getYear() : '-';
            $this->elective['bachelorPrograme'] = $electives->getBachelorsProgram() ? $electives->getBachelorsProgram() : '-';
            $this->elective['credits'] = $electives->getCredits() ? $electives->getCredits() : '-';
            $this->elective['cathegory'] = $electives->getCathegory() ? $electives->getCathegory() : '-';
            $this->elective['description'] = $electives->getDescription() ? $electives->getDescription() : '-';
            $this->elective['subjects'] = $this->subjectsList($electives->getSubjects());
            $this->elective['literature'] = $this->literatureList($electives->getLiterature());

            return $this->elective;
        }

        /**
         * Retrieve the information for the lecturer of current elective from database
         */
        private function lecturerInfo($lecturer){
            $sql = "SELECT names, department, telephone, visitingHours, office, email, personalPage FROM lecturer AS l, users AS u WHERE id='$lecturer' AND l.userName=u.userName";
            $query = $this->db->executeQuery($sql, "Failed finding lecturer!");
            $lecturerInfo = $query->fetch(PDO::FETCH_ASSOC);

            if($lecturerInfo){
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
            }  else {
                $template = '';
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

            if($subjectsInfo){
                foreach($subjectsInfo as $key => $value){
                    $template = $template . '<tr>' .
                        '<td>' . $num .'</td>' .
                        '<td>' . $key .'</td>' .
                        '<td>' . $value .'</td>' .
                    '</tr>';
    
                    $num++;
                }
            } else {
                $template = '';
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

            if($literatureInfo){
               foreach($literatureInfo as $key => $value){
                    if($value == 'Допълнителна' && $num == 0){
                        $template = $template . '</ul>' . $additionalLiterature . '<ul>';

                        $num++;
                    }

                    $template = $template . '<li>' . $key . '</li>';
                }

                $template = $template . '</ul>'; 
            } else {
                $template = '';
            }
            
            return $template;
        }

        /**
         * Change current elective rating
         */
        public function vote($voteType, $elective, $type){
            $electives = new ElectivesModel($elective);

            $electives->load($type);

            $electives->setRating($voteType);

            return $electives->getRating();
        }

        /**
         * Show all comments for current elective
         */
        public function getComments($elective, $type){
            $electives = new ElectivesModel($elective);

            $electives->load($type);

            $comments = $electives->getComments();
            $template = '';

            foreach($comments as $key => $value){
                $comment = $value;
                $template = $template . '<section class="userComments">';

                foreach($comment as $key => $value){
                    if($key == 'user'){
                        $value = $value ? $value : 'Гост';

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
        public function postComment($elective, $comment, $user, $type){
            $electives = new ElectivesModel($elective);

            $electives->load($type);

            $electives->insertNewComment($comment, $user);

            return $this->getComments($elective, $type);
        }
    }
?>