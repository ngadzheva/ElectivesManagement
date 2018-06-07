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
	private $database;
	
	public function __construct($id, $names, $department, $telephone, $visitingHours, $office, $personalPage){
		$this->database = new DataBase("localhost", "uxProj", "root", "");
		$this->id = $id;
		$this->names = $names;
		$this->department = $department;
		$this->telephone = $telephone;
		$this->visitingHours = $visitingHours;
		$this->office = $office;
		$this->personalPage = $personalPage;	
	}
	
	public function get_id(){
		return $this->id;
	}
	
	public function get_name(){
		return $this->names;
	}
	
	public function get_userType(){
		return $this->userType;
	}
	
	public function get_department(){
		return $this->department;
	}
	
	public function get_telephone(){
		return $this->telephone;
	}
	
	public function get_visitingHours(){
		return $this->visitingHours;
	}
	
	public function get_office(){
		return $this->office;
	}
	
	public function get_personalPage(){
		return $this->personalPage;
	}
	
	public function set_telephone($telephone){
		$this->telephone = $telephone;
		$sql = "UPDATE lecturer SET telephone = $telephone  WHERE id = $id";
        $query = $this->database->executeQuery($sql, "Failed updating telephone!");
	}
	
	public function set_visitingHours($visitingHours){
		$this->visitingHours = $visitingHours;
		$sql = "UPDATE lecturer SET visitingHours = $visitingHours  WHERE id = $id";
        $query = $this->database->executeQuery($sql, "Failed updating hours of visit!");
	}

		public function set_office($office){
		$this->office = $office;
		$sql = "UPDATE lecturer SET office = $office  WHERE id = $id";
        $query = $this->database->executeQuery($sql, "Failed updating office!");
	}
	
	public function set_personalPage($personalPage ){
		$this->personalPage = $personalPage ;
		$sql = "UPDATE lecturer SET personalPage  = $personalPage  WHERE personalPage  = $personalPage";
        $query = $this->database->executeQuery($sql, "Failed updating personal page!");
	}
}
?>
