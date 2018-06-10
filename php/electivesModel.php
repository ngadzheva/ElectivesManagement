<?php
    require_once "database.php";

    class ElectivesModel{
        private $database;
        private $id;
        private $title;
        private $lecturer;
        private $category;
        private $descritpion;
        private $credits;
        private $year;
        private $bachelorsProgram;
        private $literature;
        private $themes;
        private $term;
        private $rating;
        private $active;

        /*public function __construct(){
            $this->database = new DataBase("localhost", "uxProj", "root", "");
            $this->id = 0;
            $this->title = "";
            $this->lecturer = 0;
            $this->category = "";
            $this->description = "";
            $this->credits = 0;
            $this->year = 0;
            $this->bachelorsProgram = "";
            $this->literature = "";
            $this->themes = "";
            $this->term = "";
            $this->rating = 0;
            $this->active = true;
        }*/

        public function __construct($id, $title, $lecturer, $category, $description, $credits, $year, $bachelorsProgram, $literature, $themes, $term, $rating){
            $this->database = new DataBase("localhost", "uxProj", "root", "");
            $this->id = $id;
            $this->title = $title;
            $this->lecturer = $lecturer;
            $this->category = $category;
            $this->description = $description;
            $this->credits = $credits;
            $this->year = $year;
            $this->bachelorsProgram = $bachelorsProgram;
            $this->literature = $literature;
            $this->themes = $themes;
            $this->term = $term;
            $this->rating = $rating;
            $this->active = true;
        }

        public function getId(){
            return $this->id;
        }

        public function getTitle(){
            return $this->title;
        }

        public function setTitle($title){
            $this->title = $title;

            $sql = "UPDATE electives SET NAME = $title WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating title!");
        }

        public function getLecturer(){
            return $this->lecturer;
        }

        public function setLecturer($lecturer){
            $this->lecturer = $lecturer;

            $sql = "UPDATE electives SET lecturer = $lecturer WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating lecturer!");
        }

        public function getCategory(){
            return $this->category;
        }

        public function setCategory($category){
            $this->category = $category;

            $sql = "UPDATE electives SET category = $category WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating category!");
        }

        public function getDescription(){
            return $this->description;
        }

        public function setDescription($description){
            $this->description = $description;

            $sql = "UPDATE electives SET description = $description WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating description!");
        }

        public function getCredits(){
            return $this->credits;
        }

        public function setCredits($credits){
            $this->credits = $credits;

            $sql = "UPDATE electives SET credits = $credits WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating credits!");
        }

        public function getYear(){
            return $this->year;
        }

        public function setYear($year){
            $this->year = $year;

            $sql = "UPDATE electives SET year = $year WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating year!");
        }

        public function getBachelorsProgram(){
            return $this->bachelorsProgram;
        }

        public function setBachelorsProgram($bachelorsProgram){
            $this->bachelorsProgram = $bachelorsProgram;

            $sql = "UPDATE electives SET bachelorsProgram = $bachelorsProgram WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating bachelors program!");
        }

        public function getLiterature(){
            return $this->literature;
        }

        public function setLiterature($literature){
            $this->literature = $literature;

            $sql = "UPDATE electives SET literature = $literature WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating literature!");
        }

        public function getThemes(){
            return $this->themes;
        }

        public function setThemes($themes){
            $this->themes = $themes;

            $sql = "UPDATE electives SET themes = $themes WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating themes!");
        }

        public function getTerm(){
            return $this->term;
        }

        public function setTerm($term){
            $this->term = $term;

            $sql = "UPDATE electives SET term = $term WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating term!");
        }

        public function getRating(){
            return $this->rating;
        }

        public function setRating($rating){
            $this->rating = $rating;

            $sql = "UPDATE electives SET rating = $rating WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating rating!");
        }

        public function getActive(){
            return $this->active;
        }

        public function setActive($active){
            $this->active = $active;

            $sql = "UPDATE electives SET active = $active WHERE id = $id";
            $query = $this->database->executeQuery($sql, "Failed updating active!");
        }

        public function insertNewElective(){
            $sql = "SELECT id FROM lecturer WHERE NAMES = '$lecturer'";
            $query = $this->database->executeQuery($sql, "Failed finding lecturer!");
            $lecturerID = $query->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO electives VALUES(?, ?, ?, ?, ?, ?, ?, ?)"; // to do
            $values = ["$name", $lecturerID, " ", "$shortDescription", $credits, "$term", "$cathegory", 0]; // to do
            $this->database->insertValues($sql, $values);
        }

    }
?>