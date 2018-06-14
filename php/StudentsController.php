<?php
    require_once 'Student.php';
    require_once 'electivesController.php';

    class StudentsController{
        private $student;
        private $electives;

        public function __construct($userName, $fn){
            $this->student = new Student($userName, $fn);
            $this->student->load();

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
            $info['password'] = $this->student->getPasswd();

            return $info;
        }

        /**
         * Update student data (email and / or password)
         */
         public function updateInfo($email, $newPassword){
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

                        if($value == 0){
                            $value = '';
                        }
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

                $electivesToChoose = $this->student->getElectivesToChoose($term);

                $template = "<table id='electivesList'>\n". 
                "<tr id='firstRow'>\n" .
                    "<th>Избираема дисциплина</th>\n" .
                    "<th>Лектор</th>\n" .
                    "<th>Кредити</th>\n" .
                    "<th>Курс</th>\n" .
                    "<th>Специалност</th>\n" .
                    "<th>Категория</th>\n" .
                    "<th>Рейтинг</th>\n" .
                    "<th>Статус</th>\n" .
                "</tr>\n";

                foreach($electivesToChoose as $key => $value){
                    $elective = $value;

                    $template = $template . '<tr class="elective">';

                    foreach($elective as $key => $value){
                        if($key == 'grade'){
                            if($value != ''){
                                $template = $template . '<td>Записана</td>';
                            }else {
                                $template = $template . '<td></td>';
                            }
                        } else {
                            $template = $template . '<td>' . $value . '</td>';
                        }
                    }

                    $template = $template . '</tr>';
                }

                $template = $template . '</table>';

                return $template;
            } else {
                return '<p id="notActive">В момента няма активна кампания.</p>';
            }
        }

        /**
         * Change chosen electives
         */
        public function changeChosenElectives($action, $elective, $credits){
            if($action == 'Запиши'){
                $this->student->insertNewChosenElective($elective, $credits);
            } else {
                $this->student->deleteChosenElective($elective);
            }
        }

        /**
         * Show student's messages
         */
        public function showMessages($type){
            $header = '';
            $userTyper = '';

            if($type == 'income'){
                $header = '<h2 id="messagesHeader">Входящи съобщения</h2>';
                $userType = 'Подател';
            } else {
                $header = '<h2 id="messagesHeader">Изходящи съобщения</h2>';
                $userType = 'Получател';
            }

            $template = $header . '<table id="messagesList">' .
                '<tr id="firstRow">' .
                    '<th>' . $userType . '</th>'.
                    '<th>Относно</th>'.
                    '<th>Дата</th>'.
                '</tr>';

            $messages = $this->student->getMessages($type);
            $id = 0;

            foreach($messages as $key => $value){
                $message = $value;

                $template = $template . '<tr class="elective" id="' . $id .'">';
                $isOpened = '';

                foreach($message as $key => $value){
                    if($key == 'opened'){
                        $isOpened = $value;
                    } else {
                        $template = $template . '<td opened="' . $isOpened . '">' . $value . '</td>';
                    }
                    
                }

                $template = $template . '</tr>';
                $id = $id + 1;
            }

            $template = $template . '</table>';

            return $template;
        }

        /**
         * View selected message
         */
        public function viewMessage($receiver, $sender, $date){
            if($receiver == ''){
                $receiver = $this->student->getUserName();
            } else {
                $sender = $this->student->getUserName();
            }

            $message = $this->student->getMessage($receiver, $sender, $date);

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