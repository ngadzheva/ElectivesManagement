<?php
    class DataBase{
        private $connection;

        public function __construct($host, $db, $user, $password){
            try{
                $this->connection = new PDO("mysql:host=$host;dbname=$db", $user, $password);
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();
            }
            
        }

        public function executeQuery($query, $errorMessage){
            try{
                $this->connection->prepare($query)->execute();
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