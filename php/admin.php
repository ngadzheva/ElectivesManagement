<?php

require "User.php";

class Admin extends User{
	
	private $id;
	private $names;
	private $database;
	
	public function __construct($id, $names){
		$this->database = new DataBase();
		$this->id= $id;
		$this->names=$names;
	}
	
	public function get_id(){
		return $this->id;
	}
	
	public function get_names(){
		return $this->names;
	}
}
?>
