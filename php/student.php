<?php

require "User.php";

class Student extends User{
	
	private $fn;
	private $names;
	private $year;
	private $bachelorProgram;
	private $database;
		
	public function __construct($fn, $names, $year, $bachelorProgram){
		$this->database = new DataBase("localhost", "uxProj", "root", "");
		$this->fn= $fn;
		$this->names=$names;
		$this->year=$year;
		$this->bachelorProgram=$bachelorProgram;
	}
	
	public function get_fn(){
		return $this->fn;
	}
	
	public function get_names(){
		return $this->names;
	}
	
	public function get_year(){
		return $this->year;
	}
	
	public function get_bachelorProgram(){
		return $this->bachelorProgram;
	}
	
	public function set_year($year){
		$this->year = $year;
		$sql = "UPDATE student SET year = $year  WHERE year = $year ";
        $query = $this->database->executeQuery($sql, "Failed updating year!");
	}
}	
?>
