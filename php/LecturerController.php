<?php
    require_once 'lecturer.php';

    class LecturerController{
        private $lecturer;
        public function __construct(){

            $this->lecturer = new Lecturer('hrhristov', 'Христо Димов Христов');
            $this->lecturer->load();
  
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
            return $info;
        }
		
        
    }
?>
