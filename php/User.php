<?php

class User{
	
	require_once( "database.php");
	private $userName;
	private $passwd;
	private $userType;
	private $active;
	private $email;
	
	public function __construct($userName, $passwd, $userType, $email){
		$this->database = new DataBase("localhost", "uxProj", "root", "");
		$this->userName= $userName;
		$this->passwd=$passwd;
		$this->userType=$userType;
		$this->active = true;
		$this->email=$email;
	}
	
	public function get_userName(){
		return $this->userName;
	}
	
	public function get_passwd(){
		return $this->passwd;
	}
	
	public function get_userType(){
		return $this->userType;
	}
	
	public function get_active(){
		return $this->active;
	}
	
	public function get_email(){
		return $this->email;
	}
	
	public function set_email($email){
		$this->email=$email;
		$sql = "UPDATE users SET email = $email WHERE userName = $userName";
        $query = $this->database->executeQuery($sql, "Failed updating email!");
	}
	
	public function set_passwd($passwd){
		$this->passwd=$passwd;
		$sql = "UPDATE users SET passwd = $passwd WHERE userName = $userName";
        $query = $this->database->executeQuery($sql, "Failed updating password!");
	}
	
	public function set_active($active){
		$this->active = $active;
		$sql = "UPDATE users SET active = $active WHERE userName = $userName";
        $query = $this->database->executeQuery($sql, "Failed updating active!");
	}
	
?>
