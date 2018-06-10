<?php
	require_once 'database.php';

	class User{
		
		private $userName;
		private $passwd;
		private $userType;
		private $active;
		private $email;
		
		public function __construct($userName, $passwd){
			$this->userName= $userName;
			if($passwd != ''){
				$this->passwd= password_hash($passwd, PASSWORD_DEFAULT);
			}
		}
		
		/**
		 * Get user name
		 */
		public function getUserName(){
			return $this->userName;
		}
		
		/**
		 * Get password
		 */
		public function getPasswd(){
			return $this->passwd;
		}
		
		/**
		 * Get user type
		 */
		public function getUserType(){
			return $this->userType;
		}
		
		/**
		 * Get status
		 */
		public function getActive(){
			return $this->active;
		}
		
		/**
		 * Get email
		 */
		public function getEmail(){
			return $this->email;
		}
		
		/**
		 * Set new email
		 */
		public function setEmail($email){
			$this->email=$email;
			$sql = "UPDATE `users` SET email='$email'  WHERE userName='$userName'";
			$query = $this->database->executeQuery($sql, "Failed updating email!");
		}
		
		/**
		 * Set new password
		 */
		public function setPasswd($passwd){
			$this->passwd=$passwd;
			$sql = "UPDATE users SET passwd='$passwd' WHERE userName='$userName'";
			$query = $this->database->executeQuery($sql, "Failed updating password!");
		}
		
		/**
		 * Set new status
		 */
		public function setActive($active){
			$this->active = $active;
			$sql = "UPDATE users SET active='$active' WHERE userName='$userName'";
			$query = $this->database->executeQuery($sql, "Failed updating active!");
		}

		/**
		 * Load user's information from database
		 */
		public function load(){
			$user = [];

			$database = new DataBase("localhost", "uxProj", "root", "");
			$sql = "SELECT * FROM `users` WHERE userName = '$this->userName'";
			$query = $database->executeQuery($sql, 'Failed find user');
			$user = $query->fetch(PDO::FETCH_ASSOC);

			$this->passwd = $user['passwd'];
			$this->userType = $user['userType'];
			$this->active = $user['active'];
			$this->email = $user['email'];

			return !!$user;
		}

		/**
		 * Insert new user to database
		 */
		public function insert(){
			$existingUser = new User($this->userName, $this->passwd);
			$existingUser->load();

			if($existingUser->userName){
				return false;
			}

			$database = new DataBase("localhost", "uxProj", "root", "");
			$query = 'INSERT INTO `users` (userName, passwd, userType, active, email) VALUES(?, ?, ?, ?, ?)';
			$values = [$this->userName, $this->passwd, $this->userType, $this->active, $this->email];

			return $database->insertValues($query, $values);
		}
	}	
?>
