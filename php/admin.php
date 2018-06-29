<?php

require "User.php";

class Admin extends User{
	
	private $names;
	
	public function __construct($userName, $names){
		parent::__construct($userName, '');
		$this->names=$names;
	}
	
	public function getNames(){
		return $this->names;
	}

	public function getPassword(){
		return parent::getPasswd();
	}

	public function getEmail(){
		return parent::getEmail();
	}

	public function getUserName(){
		return parent::getUserName();
	}

	public function getDatabase(){
		return parent::getDataBase();
	}
	
	public function setNames($names){
		$this->names = $names;
	}

	public function setPassword($password){
		return parent::setPasswd($password);
	}
	
	public function setEmail($email){
		return parent::setEmail($email);
	}

	public static function insertAdmin($userName, $passwd, $email, $names){
		if (User::insert($userName, $passwd, "admin", $email)) {
			$query = 'INSERT INTO `admin` (userName, names) VALUES(?, ?)';
			$values = [$userName, $names];

			$database = new DataBase();
			$database->insertValues($query, $values);

			return true;
		}

		return false;
	}

	public function getElectives($type){
		$database = parent::getDatabase();
		$sql = "SELECT name, recommendedYear, recommendedBachelorProgram, term, cathegory, lecturer FROM `electives` WHERE type='$type' ";
		$query = $database->executeQuery($sql, 'Failed find user');
		$electives = $query->fetchAll(PDO::FETCH_ASSOC);
		return $electives;
	}

	public function getUsers($userType, $isActive){
		$database = parent::getDatabase();
		if ($userType == "student") {
			$sql = "SELECT users.userName, names FROM `users` JOIN `student` ON users.userName = student.userName WHERE userType='$userType' AND active='$isActive'";
		} else if ($userType == "lecturer") {
			$sql = "SELECT users.userName, names FROM `users` JOIN `lecturer` ON users.userName = lecturer.userName WHERE userType='$userType' AND active='$isActive'";
		} else {
			$curentUsername = parent::getUserName();
			$sql = "SELECT users.userName, names FROM `users` JOIN `admin` ON users.userName = admin.userName WHERE userType='$userType' AND admin.userName<>'$curentUsername' AND active='$isActive'";			
		}
		
		$query = $database->executeQuery($sql, 'Failed find user');
		$users = $query->fetchAll(PDO::FETCH_ASSOC);
		return $users;
	}
	

	public function load() :bool{
		parent:: load();

		$admin = [];
		$uName = parent::getUserName();
		$db = parent::getDatabase();
		$sql = "SELECT * FROM `admin` WHERE userName='$uName'";
		$query = $db->executeQuery($sql, 'Failed find user');
		$admin = $query->fetch(PDO::FETCH_ASSOC);
		$this->names = $admin['names'];

		
		return !!$admin;
	}
}
?>
