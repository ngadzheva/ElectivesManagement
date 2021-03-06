<?php
    class DataBase{
        private $connection;

        public function __construct(){
            require_once 'Config.php';
            Config::_init();

            $host = CONFIG['db']['host'];
            $db = CONFIG['db']['name'];
            $user = CONFIG['db']['user'];
            $password = CONFIG['db']['password'];
            
            try{
                $this->connection = new PDO("mysql:host=$host;dbname=$db", $user, $password,
                                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();
            }
            
        }

        public function executeQuery($query, $errorMessage){
            try{
                return $this->connection->query($query);
            } catch(PDOException $e){
                echo $errorMessage . $e->getMessage();
                $this->connection->rollBack();
            }
        }

        public function insertValues($query, $values){
            try{
                $this->connection->prepare($query)->execute($values);
            } catch(PDOException $e){
                echo "Inserting values into table failed: " . $e->getMessage();
                $this->connection->rollBack();
            }
        }

        public function closeConnection(){
            $this->connection = null;
        }
    }
?>