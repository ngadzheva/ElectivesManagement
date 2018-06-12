<?php
require "User.php";
class Lecturer extends User{
	
	private $id;
	private $names;
	private $department;
	private $telephone;
	private $visitingHours;
	private $office;
	private $personalPage;
	
	public function __construct($userName, $names){
			parent::__construct($userName, '');
			$this->names = $names ;
		}
		

	public function getId(){
		return $this->id;
	}
	
	public function getNames(){
		return $this->names;
	}
	
	public function getDepartment(){
		return $this->department;
	}
	
	public function getTelephone(){
		return $this->telephone;
	}
	
	public function getVisitingHours(){
		return $this->visitingHours;
	}
	
	public function getOffice(){
		return $this->office;
	}
	
	public function getPersonalPage(){
		return $this->personalPage;
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
	
	public function setPassword($password){
			return parent::setPasswd($password);
		}
	
	public function setEmail($email){
		return parent::setEmail($email);
	}
		
	public function setTelephone($telephone){
		$this->telephone = $telephone;
		$sql = "UPDATE lecturer SET telephone = $telephone  WHERE userName='$this->userName";
        $query = $this->database->executeQuery($sql, "Failed updating telephone!");
	}
	
	public function setVisitingHours($visitingHours){
		$this->visitingHours = $visitingHours;
		$sql = "UPDATE lecturer SET visitingHours = $visitingHours  WHERE userName='$this->userName";
        $query = $this->database->executeQuery($sql, "Failed updating hours of visit!");
	}
		public function setOffice($office){
		$this->office = $office;
		$sql = "UPDATE lecturer SET office = $office  WHERE userName='$this->userName";
        $query = $this->database->executeQuery($sql, "Failed updating office!");
	}
	
	public function setPersonalPage($personalPage ){
		$this->personalPage = $personalPage ;
		$sql = "UPDATE lecturer SET personalPage  = $personalPage  WHERE userName='$this->userName";
        $query = $this->database->executeQuery($sql, "Failed updating personal page!");
	}
	
	public function load() :bool{
			parent:: load();
			$lecturer = [];
			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT * FROM `lecturer` WHERE userName='$this->userName'";
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

}
?>
