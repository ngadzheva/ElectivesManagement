<?php
    require_once 'LecturerController.php';
	session_start();
    $lecturer = new LecturerController($_SESSION['userName'], $_SESSION['id']);
     $id = isset($_GET['id']) ? $_GET['id'] : null;
		 
    if($id){
        if($id == 'lecturerReferences'){
			echo $lecturer->electivesLecturer();
		}  else if ($id =='update') {
			echo $lecturer->electivesLecturer();
		}   else if($id == 'newInfo'){
			echo json_encode($lecturer->updateElectives($_GET['name']));
		} 	else if($id == 'infoElectiveReference'){
			echo $lecturer->getReferences($_GET['name']);
		}   else if($id == 'writeOff') {
			echo $lecturer->electivesLecturer();
		}	else if($id == 'writeOn') { 
			echo $lecturer->electivesLecturer(); 
		}   else if($id == 'mark') {
			echo $lecturer->electivesLecturer();
		}  	else if($id == 'showMessages'){
			echo $lecturer->showMessages($_GET['type']);
		}
	} else if(isset($_POST['name']) && isset($_POST['names']) && isset($_POST['fn'])){
		$status = $lecturer->writeOff($_POST['name'], $_POST['names'], $_POST['fn']);
		header("Location: ../lecturer.html?id=electivesCampaignOff&status=" . $status);
	} else if(isset($_POST['nameElectives']) && isset($_POST['names']) && isset($_POST['fn']) && isset($_POST['mark'])){
		$status = $lecturer->writeMark($_POST['nameElectives'], $_POST['names'], $_POST['fn'], $_POST['mark']);
		header("Location: ../lecturer.html?id=writingEvaluation&status=" . $status);
	} else if(isset($_POST['nameElective']) && isset($_POST['names']) && isset($_POST['fn'])){
			$status = $lecturer->writeOn($_POST['nameElective'], $_POST['names'], $_POST['fn']);
			header("Location: ../lecturer.html?id=electivesCampaignOn&status=" . $status);
	} else if(isset($_GET['receiver'])){
		echo $lecturer->viewMessage($_GET['receiver'], $_GET['sender'], $_GET['date']);
	}  else if(isset($_POST['to']) && isset($_POST['about']) && isset($_POST['content'])){
		$status = $lecturer->sendMessage($_POST['to'], $_POST['about'], $_POST['content']);
		header("Location: ../lecturer.html?id=newMessage&status=" . $status);
	} else if(isset($_POST['email']) && isset($_POST['passwd']) && isset($_POST['newPassword']) && isset($_POST['confirmPassword']) && isset($_POST['newTelephone']) && isset($_POST['newVisitingHours']) && isset($_POST['newOffice']) && isset($_POST['newPersonalPage'])){
			$status = '';
			if($_POST['newPassword'] == $_POST['confirmPassword']){
				$pass = hash('sha256', $_POST['passwd']);
				$newPass = hash('sha256', $_POST['newPassword']);
				$lecturerInfo = $lecturer->viewInfo();
				if($lecturerInfo['password'] == $pass){
					$lecturer->updateInfo($_POST['email'], $_POST['newPass'], $_POST['newTelephone'], $_POST['newVisitingHours'], $_POST['newOffice'], $_POST['newPersonalPage']);
					
					$status = 'success';
					header("Location: ../lecturer.html?id=editProfile&status=" . $status);
				} else { 
					$status = 'notfound';
					header("Location: ../lecturer.html?id=editProfile&status=" . $status);
				}
			} else {
					$status = 'notequal';
					header("Location: ../lecturer.html?id=editProfile&status=" . $status);
			}
        } else{
			$lecturerInfo = $lecturer->viewInfo();
			echo json_encode($lecturerInfo);
		}
    
?>
