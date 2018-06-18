<?php
require_once "User.php";

class Lecturer extends User{
	
	private $id;
	private $names;
	private $department;
	private $telephone;
	private $visitingHours;
	private $office;
	private $personalPage;
	
	public function __construct($userName, $id ){
			parent::__construct($userName, '');
			$this->id = $id ;
		}
		
	/**
	 * Get id
	 */
	public function getId(){
		return $this->id;
	}
	
	/**
	 * Get lecturer's names
	 */
	public function getNames(){
		return $this->names;
	}
	
	/**
	 * Get department
	 */
	public function getDepartment(){
		return $this->department;
	}
	
	/**
	 * Get telephone
	 */
	public function getTelephone(){
		return $this->telephone;
	}
	
	/**
	 * Get visiting hours
	 */
	public function getVisitingHours(){
		return $this->visitingHours;
	}
	
	/**
	 * Get office
	 */
	public function getOffice(){
		return $this->office;
	}
	
	/**
	 * Get personal page
	 */
	public function getPersonalPage(){
		return $this->personalPage;
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
	 * Set new telephone
	 */
	public function setTelephone($telephone){
		$this->telephone = $telephone;
		$sql = "UPDATE `lecturer` SET telephone = '$telephone'  WHERE id='$this->id'";
        $query = $this->database->executeQuery($sql, "Failed updating telephone!");
	}

	/**
	* Set new visiting hours
	 */
	public function setVisitingHours($visitingHours){
		$this->visitingHours = $visitingHours;
		$sql = "UPDATE `lecturer` SET `visitingHours` = '$visitingHours'  WHERE id='$this->id'";
        $query = $this->database->executeQuery($sql, "Failed updating hours of visit!");
	}
	
	/**
	* Set new office
	*/
	public function setOffice($office){
		$this->office = $office;
		$sql = "UPDATE `lecturer` SET `office` = '$office'  WHERE id='$this->id'";
        $query = $this->database->executeQuery($sql, "Failed updating office!");
	}
	
	/**
	* Set new personal page
	*/
	public function setPersonalPage($personalPage){
		$this->personalPage = $personalPage ;
		$sql = "UPDATE `lecturer` SET `personalPage` = '$personalPage'  WHERE id='$this->id'";
        $query = $this->database->executeQuery($sql, "Failed updating personal page!");
	}
	
	/**
	 * Retrieve references for electives
	 */
	public function getReferences($name){
			$database = new DataBase();
			$sql = "SELECT student.year, COUNT(student.year) AS countYear, student. bachelorProgram , COUNT(student. bachelorProgram ) AS counterprogram FROM `chelectives` JOIN `student` ON chelectives.fn = student.fn WHERE chelectives.name='$name' GROUP BY student.year, student.bachelorProgram";
			$query = $database->executeQuery($sql, 'Failed find user');
			$references = $query->fetchAll(PDO::FETCH_ASSOC);
			return $references;
		}
		
	/**
	 * List of electives
	 */	
	public function getElectivesLecturer(){
			$database = new DataBase();
			$sql = "SELECT name FROM `electives` JOIN `lecturer` ON electives.lecturer=lecturer.id WHERE lecturer.id='$this->id' ";
			$query = $database->executeQuery($sql, 'Failed find user');
			$electivesLecturer = $query->fetchAll(PDO::FETCH_ASSOC);
			return $electivesLecturer;
		}
	
		/**
		 * Retrieve all lecturer's messages from database
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
		 * Insert new message from current lecturer to another user into database
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

		/**
		 * Updating information for an elective
		 */
		public function updateElectivesLecturer($name)
		{
			$database = new DataBase();
			$sql = "SELECT description, literature, subjects FROM `electives` WHERE name='$name'";
			$query = $database->executeQuery($sql, 'Failed find user');
			return $query->fetch(PDO::FETCH_ASSOC);
		}
		
		/**
		 * Updating information for an elective
		 */
		public function writeOffStudent($name, $names, $fn){
			$database = new DataBase();
			$sql = "DELETE FROM `chelectives` WHERE name='$name' AND fn='$fn'";
			$query = $database->executeQuery($sql, 'Failed find user');
		}
		
		/**
		 * Write-off students
		 */
		public function writeOnStudent($nameElective, $name, $fn){
			$database = new DataBase();
			$sql = "INSERT INTO `chelectives`(`name`, `credits`, `fn`) SELECT '$nameElective', credits, '$fn' FROM `electives` WHERE name='$nameElective'";
			$query = $database->executeQuery($sql, 'Failed find user');
		}
		
		/**
		 * Erollment of students
		 */
		public function writeMarkStudent($nameElectives, $names, $fn, $mark){
			$database = new DataBase();
			$sql = "UPDATE `chelectives` SET grade='$mark' WHERE name='$nameElectives' AND fn='$fn'";
			$query = $database->executeQuery($sql, 'Failed find user');
		}
		
		/**
		 * Retrieve information for lecturer from database
		 */		
		public function load() :bool{
			parent:: load();
			$lecturer = [];
			$database = new DataBase();
			$sql = "SELECT * FROM `lecturer` WHERE id='$this->id'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$lecturer = $query->fetch(PDO::FETCH_ASSOC);
			$this->names = $lecturer['names'];
			$this->department = $lecturer['department'];
			$this->telephone = $lecturer['telephone'];
			$this->visitingHours = $lecturer['visitingHours'];
			$this->office = $lecturer['office'];
			$this->personalPage = $lecturer['personalPage'];
			return !!$lecturer;
		}

		public static function insertLecturer($userName, $passwd, $email, $names, $department, $telephone, $visitingHours, $office, $personalPage) : bool {
			if(User::insert($userName, $passwd, "lecturer", $email)) {
				$newLecturer = Lecturer($userName, $names);
				$newLecturer->load();
	
				if($newLecturer->names) {
					return false;
				}
	
				$query = 'INSERT INTO `lecturer` (userName, names, department, telephone, visitingHours, office, personalPage) VALUES(?, ?, ?, ?, ?, ?, ?)';
				$values = [$userName, $names, $department, $telephone, $visitingHours, $office, $personalPage];
	
				$database = new DataBase();
				$database->insertValues($query, $values);
	
				return true;
			}
	
			return false;
		}

}
?>
