<?php
    require_once 'admin.php';
    require_once 'electivesController.php';
    require_once 'StudentsController.php';
    require_once 'lecturer.php';

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

        public function addElective($electiveName){            
            $query = "UPDATE `electives` SET type='active' WHERE name='$electiveName'";
            $values = [$electiveName];
            $d = new DataBase();
			$d->executeQuery($query, "Failed updating password!");
        }

        public function removeElective($electiveName){
            $query = "UPDATE `electives` SET type='disabled' WHERE name='$electiveName'";
            $values = [$electiveName];
            $d = new DataBase();
            
            // $admin->getDataBase()->updateValues($query, $values);
            $d->executeQuery($query, "Failed updating password!");
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


        public function showElectives($type){
            $electives = $this->admin->getElectives($type);
            $template =  "<table id='electivesList'>\n". 
                    "<tr id='firstRow'>\n" .
                        "<th>Избираема дисциплина</th>\n" .
                        "<th>Курс</th>\n" .
                        "<th>Специалност</th>\n" .
                        "<th>Семестър</th>\n" .
                        "<th>Категория</th>\n" .
                        "<th>Преподавател</th>\n" .
                    "</tr>\n";
            if($electives){
                foreach($electives as $key => $value){
                    $elective = $value;
                    $template = $template . '<tr class="elective">';
                    foreach($elective as $key => $value){
                        if($key == 'term'){
                            if($value == 'winter'){
                                $template = $template . '<td>Зимен</td>';
                            } else{
                                $template = $template . '<td>Летен</td>';
                            }
                        } else {
                            $template = $template . '<td>' . $value . '</td>';
                        }
                    }
                    $template = $template . '</tr>';
                }
                $template = $template . '</table>';
            } 

            return $template;
        }

        public function showUsers($type){
            $template = "<table id='electivesList'>\n". 
                    "<tr id='firstRow'>\n" .
                        "<th>Потребителско име</th>\n" .
                        "<th>Три имена</th>\n" .
                    "</tr>\n";

            $classes = array("student", "lecturer", "admin");
            foreach ($classes as $class) {
                $users = $this->admin->getUsers($class, $type);
                if($users){
                    foreach($users as $key => $value){
                        $user = $value;
                        $template = $template . '<tr class="user">';
                        foreach($user as $key => $value){
                            $template = $template . '<td>' . $value . '</td>';
                        }
                        $template = $template . '</tr>';
                    }
                   
                } 
            }
            $template = $template . '</table>';

            return $template;
        }
        
    }
    
?>