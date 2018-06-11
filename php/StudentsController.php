<?php
    require_once 'Student.php';
    require_once 'electivesController.php';

    class StudentsController{
        private $student;
        private $electives;

        public function __construct(){
            //if(isset($_SESSION['user']) && isset($_SESSION['fn'])){
                //$student = new Student($_SESSION['user'], $_SESSION['fn']);
            $this->student = new Student('nmgadzheva', '61938');
            $this->student->load();
            //} 

            $this->electives = new ElectivesController();
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
            $info['email'] = $this->student->getEmail();

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
                    '<th>Избираема дисциплина</th>'.
                    '<th>Оценка</th>'.
                    '<th>Кредити</th>'.
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

            $template = $template . '<table id="allCredits">' .
            '<tr>
                <td>Общ брой кредити</td>
                <td></td>
                <td>' . $creditsSum . '</td>
            </tr>';

            return $template;
        }

        /**
         * Show current electives campaign
         */
        public function showElectivesCampaign(){
            $lastCampaign = $this->student->getLastElectivesCampaign();

            $currentDate = date("Y-m-d");

            if($currentDate >= $lastCampaign['startDate'] && $currentDate <= $lastCampaign['endDate']){
                $term = '';

                if(date('n') >= 9 && date('n') <= 12){
                    $term = 'winter';
                } 
                if (date('n') >= 2 && date('n') <= 7){
                    $term = 'summer';
                }

                return $this->electives->viewElectives($term);
            } else {
                return 'В момента няма активна кампания.';
            }
        }

        /**
         * Show student's messages
         */
        public function showMessages($type){
            $template = '<table id="messagesList">' .
                '<tr id="firstRow">' .
                    '<th>Подател</th>'.
                    '<th>Относно</th>'.
                    '<th>Дата</th>'.
                '</tr>';

            $messages = $this->student->getMessages($type);

            foreach($messages as $key => $value){
                $message = $value;

                $template = $template . '<tr class="elective">';

                foreach($message as $key => $value){
                    $template = $template . '<td>' . $value . '</td>';
                }

                $template = $template . '</tr>';
            }

            $template = $template . '</table>';

            return $template;
        }

        /**
         * View selected message
         */
        public function viewMessage(){
            $message = $this->student->getMessage();

            $template = '<table id="viewMessage">' .
                '<tr id="firstRow">' .
                    '<th>Подател:</th>' . 
                    '<td>' . $message['sender'] . '</td>' .
                '</tr>' .
                '<tr>' .
                    '<th>Получател:</th>' . 
                    '<td>' . $message['receiver'] . '</td>' .
                '</tr>' .
                '<tr>' .
                    '<th>Относно:</th>' . 
                    '<td>' . $message['about'] . '</td>' .
                '</tr>' .
                '<tr>' .
                    '<th>Дата:</th>' . 
                    '<td>' . $message['sdate'] . '</td>' .
                '</tr>' .
                '<tr>' .
                    '<td colspan="2">' .$message['content'] . '</td>' .
                '</tr>' .
            '</table>';

            return $template;
        }

        /**
         * Send message from current student to another user
         */
        public function sendMessage($to, $about, $content){
            return $this->student->insertNewMessage($to, $about, $content);
        }
    }
?>