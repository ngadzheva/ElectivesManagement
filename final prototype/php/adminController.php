<?php
    require_once 'admin.php';
    require_once 'electivesController.php';
    require_once 'StudentsController.php';
    require_once 'lecturer';

    class AdminController{
        private $admin;
        private $electives;

        public function __construct($userName, $names){
            $this->admin = new Admin($userName, $names);
            $this->admin->load();

            $this->electives = new ElectivesController();
        }

        public function viewInfo(){
            $info = [];

            $info['names'] = $this->admin->getNames();
            $info['email'] = $this->admin->getEmail();
            $info['password'] = $this->admin->getPasswd();
            
            return $info;
        }

        public function updateInfo($email, $newPassword){
            $this->admin->setEmail($email);
            $this->admin->setPasswd($newPassword);
        }

        public function addElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $themes, $term){
            $electives->addNewElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $themes, $term, 0);
        }

        public function deleteElective($name){
            $electives->deleteElective($name);
        }

        public function updateUserInfo($userName, $active) {
            $user = new User($userName, " ");
            $user->load();
            $user->setActive($active);
        }
        
        public function deleteUser($userName){
            $this->updateUserInfo($userName, false);
        }

        public function addAdmin($userName, $password, $email, $names){
            if(!Admin::insertAdmin($userName, $passwd, $email, $names)) {
                //error message
            }

            //return to insertion form
        }

        public function addStudent($userName, $passwd, $email, $fn, $names, $year, $getBachelorProgram){
            if(!Student::insertStudent($userName, $passwd, $email, $fn, $names, $year, $getBachelorProgram)) {
                //error message
            }

            //return to insertion form
        }

        public function addLecturer($userName, $passwd, $email, $names, $department, $telephone, $visitingHours, $office, $personalPage) {
            if(!Lecturer::insertLecturer($userName, $passwd, $email, $names, $department, $telephone, $visitingHours, $office, $personalPage)) {
                //error message
            }

            //return to insertion form
        }
        
    }
    
?>