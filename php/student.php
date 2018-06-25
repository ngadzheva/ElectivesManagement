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

			$database = new DataBase();
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
		public static function insertStudent($userName, $passwd, $email, $fn, $names, $year, $bachelorProgram){
			if (User::insert($userName, $passwd, "student", $email)) {				
				$query = 'INSERT INTO student(fn, userName, names, year, bachelorProgram) VALUES(?, ?, ?, ?, ?)';
				$values = [$fn, $userName, $names, $year, $bachelorProgram];
	
				$database = new DataBase();
				$database->insertValues($query, $values);
	
				return true;
			}
	
			return false;
			
		}

		/**
		 * Retrieve references for electives, credits and grades from database
		 */
		public function getReferences(){
			$database = new DataBase();
			$sql = "SELECT name, grade, credits, enrolledDate FROM `chElectives` WHERE fn='$this->fn'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$references = $query->fetchAll(PDO::FETCH_ASSOC);

			return $references;
		}

		/**
		 * Retrieve the last electives campaign from database
		 */
		public function getLastElectivesCampaign(){
			$database = new DataBase();
			$sql = "SELECT * FROM `campaign` ORDER BY startDate DESC";
			$query = $database->executeQuery($sql, 'Failed find user');
			$lastCampaign = $query->fetch(PDO::FETCH_ASSOC);

			return $lastCampaign;
		}

		/**
		 * Retrieve new electives suggestions from database
		 */
		public function getSuggestions(){
			$database = new DataBase();
			$sql = "SELECT name, recommendedYear, recommendedBachelorProgram, term, cathegory, rating FROM `electives` WHERE type='suggestion'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$suggestions = $query->fetchAll(PDO::FETCH_ASSOC);

			return $suggestions;
		}

		/**
		 * Retrieve student's schedule from database
		 */
		public function getSchedule(){
			$database = new DataBase();
			$sql = "SELECT elective, lecturesType, day, hours, hall FROM schedule, chelectives WHERE elective=name AND fn='$this->fn' AND grade=0";
			$query = $database->executeQuery($sql, 'Failed find user');
			$suggestions = $query->fetchAll(PDO::FETCH_ASSOC);

			return $suggestions;
		}

		/**
		 * Retrieve student's exams from database
		 */
		public function getExams(){
			$database = new DataBase();
			$sql = "SELECT elective, examType, date, hall FROM exams, chelectives WHERE elective=name AND fn='$this->fn' AND grade=0";
			$query = $database->executeQuery($sql, 'Failed find user');
			$suggestions = $query->fetchAll(PDO::FETCH_ASSOC);

			return $suggestions;
		}

		/**
		 * Insert new suggestion for elective into database
		 */
		public function insertNewSuggestedElective($name, $description, $year, $bachelorPrograme, $term, $cathegory){
			$recommendedBachelorPrograme = '';

			foreach($bachelorPrograme as $key => $value){
				$recommendedBachelorPrograme = $recommendedBachelorPrograme . $value . ' ';
			}
			
			$database = new DataBase();
			$query = 'INSERT INTO electives(name, description, recommendedYear, recommendedBachelorProgram, term, cathegory, active, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
			$values = [$name, $description, $year, $recommendedBachelorPrograme, $term, $cathegory, true, 'suggestion'];

			$database->insertValues($query, $values);
		}

		/**
		 * Retrive list of all available electives in electives campaign 
		 * without those which were enrolled in other campaign 
		 * (i.e. chosen electives for which the student has valid grade, 
		 * i.e. different from zero)
		 */
		public function getElectivesToChoose($term){
			$database = new DataBase();
			$term = (date('M') >= 9 && date('M') <= 12) ? 'winter' : 'summer';

			$sql = "SELECT el.NAME, NAMES, el.credits, recommendedYear, recommendedBachelorProgram, cathegory, rating, grade FROM ( electives AS el JOIN lecturer AS l ON active = TRUE AND lecturer = l.id) LEFT JOIN chElectives AS ch ON el.NAME = ch.NAME WHERE term='$term' AND (grade = 0 OR grade IS NULL)";
			$query = $database->executeQuery($sql, 'Failed find user');
			$electivesToChoose = $query->fetchAll(PDO::FETCH_ASSOC);

			return $electivesToChoose;
		}

		/**
		 * Insert new chosen elective in database for the student
		 */
		public function insertNewChosenElective($elective, $credits){
			$database = new DataBase();
			$query = 'INSERT INTO `chElectives` (name, credits, fn) VALUES(?, ?, ?)';
			$values = [$elective, $credits, $this->fn];

			$database->insertValues($query, $values);
		}

		/**
		 * Delete chosen elective from database for the student
		 */
		public function deleteChosenElective($elective){
			$database = new DataBase();
			$sql = "DELETE FROM `chElectives` WHERE name='$elective'";
			$query = $database->executeQuery($sql, 'Failed find user');
		}

		/**
		 * Retrieve all student's messages from database
		 */
		public function getMessages($type){
			$userName = parent::getUserName();

			$userType = ($type == 'income' ? 'receiver' : 'sender');
			$userToShow = ($type == 'income' ? 'sender' : 'receiver');

			$database = new DataBase();
			$sql = "SELECT opened, $userToShow, about, sdate FROM `messages` WHERE $userType='$userName'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$messages = $query->fetchAll(PDO::FETCH_ASSOC);

			return $messages;
		}

		/**
		 * Retrieve current message from database
		 */
		public function getMessage($receiver, $sender, $date){
			$userName = parent::getUserName();

			$database = new DataBase();
			$sql = "SELECT * FROM `messages` WHERE receiver='$receiver' AND sender='$sender' AND sdate='$date'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$messages = $query->fetch(PDO::FETCH_ASSOC);

			$this->setMessageSeen($receiver, $sender, $date);

			return $messages;
		}

		/**
		 * Set current message seen in database
		 */
		public function setMessageSeen($receiver, $sender, $date){
			$userName = parent::getUserName();

			$database = new DataBase();
			$sql = "UPDATE `messages` SET opened=TRUE WHERE receiver='$receiver' AND sender='$sender' AND sdate='$date'";
			$query = $database->executeQuery($sql, 'Failed find user');

		}

		/**
		 * Insert new message from current student to another user into database
		 */
		public function insertNewMessage($to, $about, $content){
			$database = new DataBase();
			$sql = "SELECT userName FROM `users` WHERE email='$to'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$receiver = $query->fetch(PDO::FETCH_ASSOC);

			if($receiver){
				$query = 'INSERT INTO messages(sdate, about, content, sender, receiver, opened) VALUES(?, ?, ?, ?, ?, ?)';
				$values = [date('Y-m-d G:i:s'), $about, $content, parent::getUserName(), $receiver['userName'], TRUE];

				$database->insertValues($query, $values);

				return 'success';
			} else {
				return 'notfound';
			}
		}
	}
?>
