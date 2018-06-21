<?php
    require_once 'lecturer.php';
	require_once 'electivesController.php';
	
    class LecturerController{
        private $lecturer;
		private $electives;
		
        public function __construct($userName, $id){
            $this->lecturer = new Lecturer($userName, $id);
            $this->lecturer->load();
			
			$this->electives = new ElectivesController();
  
        }
		
        /**
         * Return lecturer data (names, department, telephone, visitingHours, office and personalPage)
         */
        public function viewInfo(){
            $info = [];
            $info['names'] = $this->lecturer->getNames();
            $info['department'] = $this->lecturer->getDepartment();
            $info['telephone'] = $this->lecturer->getTelephone();
            $info['visitingHours'] = $this->lecturer->getVisitingHours();
            $info['office'] = $this->lecturer->getOffice();
			$info['personalPage'] = $this->lecturer->getPersonalPage();
			$info['email'] = $this->lecturer->getEmail();
			$info['password'] = $this->lecturer->getPasswd();
            return $info;
        }
		
		/**
         * Update lecturer data (email and / or password and / or telephone and / or visitingHours and / or office and / or personalPage )
         */
         public function updateInfo($email, $newPassword, $telephone, $visitingHours, $office, $personalPage){
            $this->lecturer->setEmail($email);
            $this->lecturer->setPasswd($newPassword);
			$this->lecturer->setTelephone($telephone);
            $this->lecturer->setVisitingHours($visitingHours);
			$this->lecturer->setOffice($office);
            $this->lecturer->setPersonalPage($personalPage);
        }
		
	    
		/**
         * Show references
         */
		public function getReferences($name){
            $countSum = 0;
			$template = '<h2 id="referencesHeader">Справки</h2>'. 
            '<table id="electivesReferences">' .
                '<tr id="firstRow">' .
                    '<th>Година</th>'.
                    '<th>Брой записали</th>'.
                    '<th>Специалност</th>'.
					'<th>Брой записали</th>'.
                '</tr>';
            $references = $this->lecturer->getReferences($name);
            foreach($references as $key => $value){
                $ref = $value;
                $template = $template . '<tr class="elective">';
                foreach($ref as $key => $value){
                    if($key == 'countYear'){
                            $countSum = $countSum + $value;
                    }
                    $template = $template . '<td>' . $value . '</td>';
                }
                $template = $template . '</tr>';
            }
            $template = $template . '</table>';
            $template = $template . '<table id="allCredits">' .
            '<tr>
                <td>Общ брой студенти записали дисциплината</td>
                <td></td>
                <td>' . $countSum . '</td>
            </tr>';
            return $template;
        }
		 
		/**
         * List of electives
         */
		 public function electivesLecturer()
		 {
			 $electives = $this->lecturer->getElectivesLecturer();
			 $template= "<table id='electivesList'>\n".
			  "<tr id='firstRow'>\n" .
                    "<th>Избираема дисциплина</th>\n" .
                "</tr>\n";
				 foreach($electives as $key => $value){
                    $elective = $value;
                    $template = $template . '<tr class="elective">';
                    foreach($elective as $key => $value){
                       
                        $template = $template . '<td>' . $value . '</td>';
                        
                    }
                    $template = $template . '</tr>';
                }
               $template = $template . '</table>';
				return $template;
		 }
		 
		
		 /**
         * Show lecturer's messages
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
            $messages = $this->lecturer->getMessages($type);
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
                $receiver = $this->lecturer->getUserName();
            } else {
                $sender = $this->lecturer->getUserName();
            }
            $message = $this->lecturer->getMessage($receiver, $sender, $date);
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
         * Send message from current lecturer to another user
         */
        public function sendMessage($to, $about, $content){
            return $this->lecturer->insertNewMessage($to, $about, $content);
        }
		
		/**
         * Enrollment of student for elective
         */
		public function writeOn($nameElective, $names, $fn){
            return $this->lecturer->writeOnStudent($nameElective, $names, $fn);
        }
		
		/**
         * Write-off student from elective
         */
		public function writeOff($name, $names, $fn){
            return $this->lecturer->writeOffStudent($name, $names, $fn);
        }
		
		/**
         * Writing marks
         */
		public function writeMark($nameElectives, $names, $fn, $mark){
            return $this->lecturer->writeMarkStudent($nameElectives, $names, $fn, $mark);
        }
    } 
?>
