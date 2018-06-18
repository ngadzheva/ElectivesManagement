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
			$admin = new Admin($userName, $password);
			$admin->load();

			if ($admin->userName) {
				return false;
			}

			$query = 'INSERT INTO `admin` (userName, names) VALUES(?, ?)';
			$values = [$userName, $names];

			$database = new DataBase();
			$database->insertValues($query, $values);

			return true;
		}

		return false;
	}
	

	public function load() :bool{
		parent:: load();

		$admin = [];

		$sql = "SELECT * FROM `admin` WHERE userName='$this->userName'";
		$query = $this->database->executeQuery($sql, 'Failed find user');
		$admin = $query->fetch(PDO::FETCH_ASSOC);
		$this->names = $admin['names'];

		
		return !!$admin;
	}


}
?>
