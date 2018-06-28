<?php
    require_once "database.php";

    class ElectivesModel{
        private $database;
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
            $this->database = new DataBase();
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

            $sql = "UPDATE electives SET NAME='$this->title' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating title!");
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

            $sql = "UPDATE electives SET lecturer='$this->lecturer' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating lecturer!");
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

            $sql = "UPDATE electives SET cathegory='$this->cathegory' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating category!");
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

            $sql = "UPDATE electives SET description='$this->description' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating description!");
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

            $sql = "UPDATE electives SET credits='$this->credits' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating credits!");
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

            $sql = "UPDATE electives SET recommendedYear='$this->year' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating year!");
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

            $sql = "UPDATE electives SET recommendedBachelorProgram='$this->bachelorsProgram' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating bachelors program!");
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

            $sql = "UPDATE electives SET literature='$this->literature' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating literature!");
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

            $sql = "UPDATE electives SET subjects='$this->subjects' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating themes!");
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

            $sql = "UPDATE electives SET term='$this->term' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating term!");
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
            if($rating == 'dislike'){
                $sql = "UPDATE electives SET rating='$this->rating'-1 WHERE name='$this->title'";
            } else {
                $sql = "UPDATE electives SET rating='$this->rating'+1 WHERE name='$this->title'";
            }

            $query = $this->database->executeQuery($sql, "Failed updating rating!");

            $sql = "SELECT rating FROM `electives` WHERE name='$this->title'";
			$query = $this->database->executeQuery($sql, 'Failed find user');
            $this->rating = $query->fetch(PDO::FETCH_ASSOC)['rating'];
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

            $sql = "UPDATE electives SET active='$this->active' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating active!");
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

            $sql = "UPDATE electives SET type='$this->type' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating active!");
        }

        /**
         * Load elective's information from database
         */
        public function load(){
            $electives = [];

            $sql = "SELECT * FROM `electives` WHERE name='$this->title' AND active=1";
			$query = $this->database->executeQuery($sql, 'Failed find user');
            $electives = $query->fetch(PDO::FETCH_ASSOC);
            
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
            $sql = "SELECT NAME, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE type='active' AND lecturer=id AND ";

           if($queryString === 'winter'){
                $sql = $sql . "term = 'winter'";
            } elseif($queryString === 'summer'){
                $sql = $sql . "term = 'summer'";
            }

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $query;
        }

        /**
         * Retrieve filtered list of electives for winter or summer term from database
         **/
        public function getFilteredElectives($term, $filter, $value){
            $sql = "SELECT name, names, credits, recommendedYear, recommendedBachelorProgram, cathegory, rating FROM electives, lecturer WHERE lecturer=id AND ";

            if ($filter == "lecturer") {
                
                $sql = $sql . "term='$term'" . " AND " . "names LIKE '%$value%'";
            }
            else {
                $sql = $sql . "term='$term'" . " AND " . "$filter LIKE '%$value%'";
            }

            $query = $this->database->executeQuery($sql, "Failed finding electives!");

            return $query;
        }

        /**
         * Insert new elective to the database
         */
        public function insertNewElective($title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $subjects, $term, $rating, $type){
            $sql = "SELECT id FROM lecturer WHERE NAMES='$this->lecturer'";
            $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
            $lecturerID = $query->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO electives VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
            $values = [$title, $lecturerID, $description, $credits, $recommendedYear, $recommendedBachelorProgram, $literature, $subjects, $term, $cathegory, $active, $rating, $type]; 
            $this->database->insertValues($sql, $values);
        }

        /**
         * Retrieve all comments for current elective from database
         */
        public function getComments(){
            $sql = "SELECT user, timePosted, content FROM comments WHERE elective='$this->title'";
            $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
            $comments = $query->fetchAll(PDO::FETCH_ASSOC);

            return $comments;
        }

        /**
         * Insert new comment for current elective to database
         */
        public function insertNewComment($comment, $user){
            $sql = "INSERT INTO comments(content, elective, user, timePosted) VALUES(?, ?, ?, ?)"; 
            $values = [$comment, $this->title, $user, date('Y-m-d G:i:s')]; 
            $this->database->insertValues($sql, $values);
        }
    }
?>