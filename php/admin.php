<?php

require "User.php"

class Admin extends User{
	
	require_once( "database.php");
	private $id;
	private $names;
	
	public function __construct($id, $names){
		$this->database = new DataBase("localhost", "uxProj", "root", "");
		$this->id= $id;
		$this->names=$names;
	}
	
	public function get_id(){
		return $this->id;
	}
	
	public function get_names(){
		return $this->names;
	}

?>
