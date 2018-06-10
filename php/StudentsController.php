<?php
    require_once 'Student.php';

    class StudentsController{
        private $student;

        public function __construct(){
            //if(isset($_SESSION['user']) && isset($_SESSION['fn'])){
                //$student = new Student($_SESSION['user'], $_SESSION['fn']);
            $this->student = new Student('nmgadzheva', '61938');
            $this->student->load();
            //} 
        }

        /**
         * Return student data (names, faculty number, bachelor program and year)
         */
        public function viewInfo(){
            $info = [];

            $info['names'] = $this->student->getNames();
            $info['fn'] = $this->student->getFn();
            $info['bachelorProgram'] = $this->student->getBachelorProgram();
            $info['year'] = $this->student->getYear();

            return $info;
        }

        /**
         * Update student data (email and / or password)
         */
         public function updateInfo($userName, $email, $password, $newPassword){
            $this->student->setEmail($email);
            $this->student->setPasswd($newPassword);
        }

        /**
         * Show references for electives, credits and grades
         */
        public function getReferences(){
            $creditsSum = 0;
            $grade = 0;

            $template = '<table id="electivesReferences">' .
                '<tr id="firstRow">' .
                    '<td>Избираема дисциплина</td>'.
                    '<td>Оценка</td>'.
                    '<td>Кредити</td>'.
                '</tr>';

            $references = $this->student->getReferences();

            foreach($references as $key => $value){
                $ref = $value;

                $template = $template . '<tr class="elective">';

                foreach($ref as $key => $value){
                    if($key == 'grade'){
                        $grade = $value;
                    }

                    if($key == 'credits'){
                        if($grade && $grade > 2){
                            $creditsSum = $creditsSum + $value;
                        }
                    }

                    $template = $template . '<td>' . $value . '</td>';
                }

                $template = $template . '</tr>';
            }

            $template = $template . '</table>';

            $template = $template . '<table id="electivesReferences">' .
            '<tr>
                <td>Общ брой кредити</td>
                <td></td>
                <td>' . $creditsSum . '</td>
            </tr>';

            return $template;
        }
    }
?>