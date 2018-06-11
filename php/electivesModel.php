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

        public function __construct($title){
            $this->database = new DataBase("localhost", "uxProj", "root", "");
            $this->title = $title;
        }

        public function getId(){
            return $this->id;
        }

        public function getTitle(){
            return $this->title;
        }

        public function setTitle($title){
            $this->title = $title;

            $sql = "UPDATE electives SET NAME='$this->title' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating title!");
        }

        public function getLecturer(){
            return $this->lecturer;
        }

        public function setLecturer($lecturer){
            $this->lecturer = $lecturer;

            $sql = "UPDATE electives SET lecturer='$this->lecturer' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating lecturer!");
        }

        public function getCathegory(){
            return $this->cathegory;
        }

        public function setCathegory($cathegory){
            $this->cathegory = $cathegory;

            $sql = "UPDATE electives SET cathegory='$this->cathegory' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating category!");
        }

        public function getDescription(){
            return $this->description;
        }

        public function setDescription($description){
            $this->description = $description;

            $sql = "UPDATE electives SET description='$this->description' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating description!");
        }

        public function getCredits(){
            return $this->credits;
        }

        public function setCredits($credits){
            $this->credits = $credits;

            $sql = "UPDATE electives SET credits='$this->credits' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating credits!");
        }

        public function getYear(){
            return $this->year;
        }

        public function setYear($year){
            $this->year = $year;

            $sql = "UPDATE electives SET recommendedYear='$this->year' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating year!");
        }

        public function getBachelorsProgram(){
            return $this->bachelorsProgram;
        }

        public function setBachelorsProgram($bachelorsProgram){
            $this->bachelorsProgram = $bachelorsProgram;

            $sql = "UPDATE electives SET recommendedBachelorProgram='$this->bachelorsProgram' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating bachelors program!");
        }

        public function getLiterature(){
            return $this->literature;
        }

        public function setLiterature($literature){
            $this->literature = $literature;

            $sql = "UPDATE electives SET literature='$this->literature' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating literature!");
        }

        public function getSubjects(){
            return $this->subjects;
        }

        public function setSubjects($subjects){
            $this->subjects = $subjects;

            $sql = "UPDATE electives SET subjects='$this->subjects' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating themes!");
        }

        public function getTerm(){
            return $this->term;
        }

        public function setTerm($term){
            $this->term = $term;

            $sql = "UPDATE electives SET term='$this->term' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating term!");
        }

        public function getRating(){
            return $this->rating;
        }

        public function setRating($rating){
            $this->rating = $rating;

            $sql = "UPDATE electives SET rating='$this->rating' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating rating!");
        }

        public function getActive(){
            return $this->active;
        }

        public function setActive($active){
            $this->active = $active;

            $sql = "UPDATE electives SET active='$this->active' WHERE id='$this->id'";
            $query = $this->database->executeQuery($sql, "Failed updating active!");
        }

        public function load(){
            $electives = [];

            $sql = "SELECT * FROM `electives` WHERE name='$this->title' AND active=1";
			$query = $database->executeQuery($sql, 'Failed find user');
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
        }

        public function insertNewElective(){
            $sql = "SELECT id FROM lecturer WHERE NAMES='$this->lecturer'";
            $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
            $lecturerID = $query->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO electives VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
            $values = [$this->title, $lecturerID, $this->description, $this->credits, $this->recommendedYear, $this->recommendedBachelorProgram, $this->literature, $this->subjects, $this->term, $this->cathegory, $this->active, $this->rating]; 
            $this->database->insertValues($sql, $values);
        }

    }
?>