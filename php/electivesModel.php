<?php
    require_once "database.php";

    class ElectivesModel{
        private $id;
        private $title;
        private $lecturer;
        private $cathegory;
        private $descritpion;
        private $credits;
        private $year;
        private $bachelorsProgram;
        private $literature;
        private $subjects;
        private $term;
        private $rating;
        private $active;
        private $type;

        public function __construct($title){
            $this->title = $title;
        }

        /**
         * Get the id of the elective
         */
        public function getId(){
            return $this->id;
        }

        /**
         * Get tge title of the elective
         */
        public function getTitle(){
            return $this->title;
        }

        /**
         * Set new title to the elective
         */
        public function setTitle($title){
            $this->title = $title;

            $database = new DataBase();
            $sql = "UPDATE electives SET NAME='$this->title' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating title!");
            $database->closeConnection();
        }

        /**
         * Get the lecturer of the elective
         */
        public function getLecturer(){
            return $this->lecturer;
        }

        /**
         * Set new lecturer to the elective
         */
        public function setLecturer($lecturer){
            $this->lecturer = $lecturer;

            $database = new DataBase();
            $sql = "UPDATE electives SET lecturer='$this->lecturer' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating lecturer!");
            $database->closeConnection();
        }

        /**
         * Get the cathegory of the elective
         */
        public function getCathegory(){
            return $this->cathegory;
        }

        /**
         * Set new cathegory to the elective
         */
        public function setCathegory($cathegory){
            $this->cathegory = $cathegory;

            $database = new DataBase();
            $sql = "UPDATE electives SET cathegory='$this->cathegory' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating category!");
            $database->closeConnection();
        }

        /**
         * Get the description of the elective
         */
        public function getDescription(){
            return $this->description;
        }

        /**
         * Set new description to the elective
         */
        public function setDescription($description){
            $this->description = $description;

            $database = new DataBase();
            $sql = "UPDATE electives SET description='$this->description' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating description!");
            $database->closeConnection();
        }

        /**
         * Get the credits of the elective
         */
        public function getCredits(){
            return $this->credits;
        }

        /**
         * Set new credits of the elective
         */
        public function setCredits($credits){
            $this->credits = $credits;

            $database = new DataBase();
            $sql = "UPDATE electives SET credits='$this->credits' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating credits!");
            $database->closeConnection();
        }

        /**
         * Get the recommended year of the elective
         */
        public function getYear(){
            return $this->year;
        }

        /**
         * Set new recommended year of the elective
         */
        public function setYear($year){
            $this->year = $year;

            $database = new DataBase();
            $sql = "UPDATE electives SET recommendedYear='$this->year' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating year!");
            $database->closeConnection();
        }

        /**
         * Get the recommended bachelors programes of the elective
         */
        public function getBachelorsProgram(){
            return $this->bachelorsProgram;
        }

        /**
         * Set new recommended bachelors programes of the elective
         */
        public function setBachelorsProgram($bachelorsProgram){
            $this->bachelorsProgram = $bachelorsProgram;

            $database = new DataBase();
            $sql = "UPDATE electives SET recommendedBachelorProgram='$this->bachelorsProgram' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating bachelors program!");
            $database->closeConnection();
        }

        /**
         * Get the literature of the elective
         */
        public function getLiterature(){
            return $this->literature;
        }

        /**
         * Set new literature of the elective
         */
        public function setLiterature($literature){
            $this->literature = $literature;

            $database = new DataBase();
            $sql = "UPDATE electives SET literature='$this->literature' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating literature!");
            $database->closeConnection();
        }

        /**
         * Get the subjects of the elective
         */
        public function getSubjects(){
            return $this->subjects;
        }

        /**
         * Set new subjects of the elective
         */
        public function setSubjects($subjects){
            $this->subjects = $subjects;

            $database = new DataBase();
            $sql = "UPDATE electives SET subjects='$this->subjects' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating themes!");
            $database->closeConnection();
        }

        /**
         * Get the term of the elective
         */
        public function getTerm(){
            return $this->term;
        }

        /**
         * Set new term of the elective
         */
        public function setTerm($term){
            $this->term = $term;

            $database = new DataBase();
            $sql = "UPDATE electives SET term='$this->term' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating term!");
            $database->closeConnection();
        }

        /**
         * Get the rating of the elective
         */
        public function getRating(){
            return $this->rating;
        }

        /**
         * Set new rating of the elective
         */
        public function setRating($rating){
            $database = new DataBase();

            if($rating == 'dislike'){
                $sql = "UPDATE electives SET rating='$this->rating'-1 WHERE name='$this->title'";
            } else {
                $sql = "UPDATE electives SET rating='$this->rating'+1 WHERE name='$this->title'";
            }

            $query = $database->executeQuery($sql, "Failed updating rating!");

            $sql = "SELECT rating FROM `electives` WHERE name='$this->title'";
			$query = $database->executeQuery($sql, 'Failed find user');
            $this->rating = $query->fetch(PDO::FETCH_ASSOC)['rating'];
            $database->closeConnection();
        }

        /**
         * Get whether the elective is active or not
         */
        public function getActive(){
            return $this->active;
        }

        /**
         * Change whether the elective is active or not
         */
        public function setActive($active){
            $this->active = $active;

            $database = new DataBase();
            $sql = "UPDATE electives SET active='$this->active' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating active!");
            $database->closeConnection();
        }

        /**
         * Get the type of the elective
         */
        public function getType(){
            return $this->type;
        }

        /**
         * Set new type of the elective
         */
        public function setType($type){
            $this->type = $type;

            $database = new DataBase();
            $sql = "UPDATE electives SET type='$this->type' WHERE id='$this->id'";
            $query = $database->executeQuery($sql, "Failed updating active!");
            $database->closeConnection();
        }

        /**
         * Load elective's information from database
         */
        public function load(){
            $electives = [];

            $database = new DataBase();
            $sql = "SELECT * FROM `electives` WHERE name='$this->title' AND active=1";
			$query = $database->executeQuery($sql, 'Failed find user');
            $electives = $query->fetch(PDO::FETCH_ASSOC);
            $database->closeConnection();
            
            $this->lecturer = $electives['lecturer'];
            $this->cathegory = $electives['cathegory'];
            $this->description = $electives['description'];
            $this->credits = $electives['credits'];
            $this->year = $electives['recommendedYear'];
            $this->bachelorsProgram = $electives['recommendedBachelorProgram'];
            $this->literature = $electives['literature'];
            $this->subjects = $electives['subjects'];
            $this->term = $electives['term'];
            $this->rating = $electives['rating'];
            $this->active = true;
            $this->type = $electives['type'];
        }

        /**
         * Retrieve all electives for winter or summer term from database
         */
        public function getElectives($queryString){
            $database = new DataBase();
            $sql = "SELECT NAME, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE type='active' AND lecturer=id AND ";

           if($queryString === 'winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($queryString === 'summer'){
                $sql = $sql . "term = 'summer'";
            }

            $query = $database->executeQuery($sql, "Failed finding electives!");
            $database->closeConnection();

            return $query;
        }

        /**
         * Retrieve filtered list of electives for winter or summer term from database
         **/
        public function getFilteredElectives($term, $filter, $value){
            $database = new DataBase();
            $sql = "SELECT name, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND ";

            if ($filter === 'lecturer') {
                
                $sql = $sql . "term='$term'" . " AND " . "names LIKE '%$value%'";
            }
            else {
                $sql = $sql . "term='$term'" . " AND " . "$filter LIKE '%$value%'";
            }

            $query = $database->executeQuery($sql, "Failed finding electives!");
            $database->closeConnection();

            return $query;
        }

        /**
         * Insert new elective to the database
         */
        public function insertNewElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $subjects, $term, $rating, $type){
            $database = new DataBase();
            $sql = "SELECT id FROM lecturer WHERE NAMES='$this->lecturer'";
            $query = $database->executeQuery($sql, "Failed finding lecturer!");
            $lecturerID = $query->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO electives VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
            $values = [$title, $lecturerID, $description, $credits, $recommendedYear, $recommendedBachelorProgram, $literature, $subjects, $term, $cathegory, $active, $rating, $type]; 
            $database->insertValues($sql, $values);
            $database->closeConnection();
        }

        /**
         * Retrieve all comments for current elective from database
         */
        public function getComments(){
            $database = new DataBase();
            $sql = "SELECT user, timePosted, content FROM comments WHERE elective='$this->title'";
            $query = $database->executeQuery($sql, "Failed finding lecturer!");
            $comments = $query->fetchAll(PDO::FETCH_ASSOC);
            $database->closeConnection();

            return $comments;
        }

        /**
         * Insert new comment for current elective to database
         */
        public function insertNewComment($comment, $user){
            $database = new DataBase();
            $sql = "INSERT INTO comments(content, elective, user, timePosted) VALUES(?, ?, ?, ?)"; 
            $values = [$comment, $this->title, $user, date('Y-m-d G:i:s')]; 
            $database->insertValues($sql, $values);
            $database->closeConnection();
        }
    }
?>