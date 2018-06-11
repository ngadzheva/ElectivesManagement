<?php
	require_once "User.php";

	class Student extends User{
		private $fn;
		private $names;
		private $year;
		private $bachelorProgram;
			
		public function __construct($userName, $fn){
			parent::__construct($userName, '');
			$this->fn= $fn;
		}
		
		/**
		 * Get faculty number
		 */
		public function getFn(){
			return $this->fn;
		}
		
		/**
		 * Get student's names
		 */
		public function getNames(){
			return $this->names;
		}
		
		/**
		 * Get year
		 */
		public function getYear(){
			return $this->year;
		}
		
		/**
		 * Get bachelor program
		 */
		public function getBachelorProgram(){
			return $this->bachelorProgram;
		}

		/**
		 * Get password
		 */
		public function getPassword(){
			return parent::getPasswd();
		}

		/**
		 * Get email
		 */
		public function getEmail(){
			return parent::getEmail();
		}

		/**
		 * Get user name
		 */
		public function getUserName(){
			return parent::getUserName();
		}
		
		/**
		 * Set new year
		 */
		public function setYear($year){
			$this->year = $year;
			$sql = "UPDATE `student` SET year='$year'  WHERE year='$year'";
			$query = $this->database->executeQuery($sql, "Failed updating year!");
		}

		/**
		 * Set new password
		 */
		public function setPassword($password){
			return parent::setPasswd($password);
		}

		/**
		 * Set new email
		 */
		public function setEmail($email){
			return parent::setEmail($email);
		}

		/**
		 * Retrieve information for student from database
		 */
		public function load() :bool{
			parent:: load();

			$student = [];

			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT * FROM `student` WHERE fn='$this->fn'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$student = $query->fetch(PDO::FETCH_ASSOC);

			$this->names = $student['names'];
			$this->year = $student['year'];
			$this->bachelorProgram = $student['bachelorProgram'];

			return !!$student;
		}

		/**
		 * Insert new student to database
		 */
		public function insert(){
			$existingUser = new Student($this->userName, $this->fn);
			$existingUser->load();

			if($existingUser->fn){
				return false;
			}

			parent:: insert();

			$database = new DataBase("localhost", "uxProj", "root", "");
			$query = 'INSERT INTO `students` (fn, userName, names, year, bachelorProgram) VALUES(?, ?, ?, ?, ?)';
			$values = [$this->fn, parent:: getUserName(), $this->names, $this->year, $this->getBachelorProgram];

			return $database->insertValues($query, $values);
		}

		/**
		 * Retrieve references for electives, credits and grades from database
		 */
		public function getReferences(){
			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT name, grade, credits FROM `chelectives` WHERE fn='$this->fn'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$references = $query->fetchAll(PDO::FETCH_ASSOC);

			return $references;
		}

		/**
		 * Retrieve the last electives campaign from database
		 */
		public function getLastElectivesCampaign(){
			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT * FROM `campaign` ORDER BY startDate DESC";
			$query = $database->executeQuery($sql, 'Failed find user');
			$lastCampaign = $query->fetch(PDO::FETCH_ASSOC);

			return $lastCampaign;
		}

		/**
		 * Retrieve all student's messages
		 */
		public function getMessages(){
			$userName = parent::getUserName();

			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT sender, about, sdate FROM `messages` WHERE receiver='$userName'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$messages = $query->fetchAll(PDO::FETCH_ASSOC);

			return $messages;
		}

		/**
		 * Retrieve current message
		 */
		public function getMessage(){
			$userName = parent::getUserName();

			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT * FROM `messages` WHERE receiver='$userName'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$messages = $query->fetch(PDO::FETCH_ASSOC);

			return $messages;
		}
	}
?>
