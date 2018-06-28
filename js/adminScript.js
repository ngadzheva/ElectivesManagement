const connectToServer =  {
    serverRequest: () => {
        let ajaxRequest;

        try{
            /* Opera, Firefox, Safari */
            ajaxRequest = new XMLHttpRequest();
        } catch(e){
            /* Internet Explorer Browsers */
            try{
                ajaxRequest = new ActiveXObject('Msxml2.XMLHTTP');
            } catch(e){
                try{
                    ajaxRequest = new ActiveXObject('Microsoft.XMLHTTP');
                } catch(e){
                    alert('Something went wrong with your browser!');
                    return false;
                }
            }
        }

        return ajaxRequest;
    },

    adminInfo: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               let info = JSON.parse(response); 
                
                document.getElementById('adminName').innerHTML = info['names'];
                document.cookie = 'email=' + info['email'];
            }    
        }

        ajaxRequest.open("GET", "php/adminConnection.php", true);
        ajaxRequest.send(null);
    }, 
    
    showElectives: () => {
		let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                
                document.getElementById('adminContent').innerHTML +=  show;
            }   
			
			 makeNewColumn('Редактиране');
        }
		
        ajaxRequest.open("GET", "php/adminConnection.php?id=updateElectives", true);
        ajaxRequest.send(null);
     },
     
     infoElective: (name) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let updateInfo = ajaxRequest.responseText;
                
                document.getElementById('adminContent').innerHTML =  makeElectivesEditForm(name, updateInfo);
            }   
        }
        
        ajaxRequest.open("GET", "php/adminConnection.php?id=newInfo&elective=" + name, true);
        ajaxRequest.send(null);
    },

    showUsers: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                
                document.getElementById('adminContent').innerHTML +=  show;
            }   
			
			 makeNewColumn('Редактиране');
        }
		
        ajaxRequest.open("GET", "php/adminConnection.php?id=updateUser", true);
        ajaxRequest.send(null);
    },

    infoUser: (username) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let updateInfo = ajaxRequest.responseText;
                
                document.getElementById('adminContent').innerHTML =  makeUserEditForm(name, updateInfo);
            }   
        }
        
        ajaxRequest.open("GET", "php/adminConnection.php?id=newInfo&username=" + username, true);
        ajaxRequest.send(null);
    }

}


function makeProfileEditForm(type, email){

    var editForm = "<fieldset id='editUserProfile'>\n" +
	"<legend class='editProfile'>" + type + "</legend>\n" +
    "<form name='editProf' method='post' action='php/adminConnection.php'>\n" +
        "<label class='editProfile'>E-mail:</label>\n" +
        "<input class='editProfile' type='text' name='email' value='" + email + "'></input>\n" +
		"<label class='editProfile'>Парола:</label>\n" +
        "<input class='editProfile' type='password' name='passwd'></input>\n" +
        "<label class='editProfile'>Нова парола:</label>\n" +
        "<input class='editProfile' type='password' name='newPassword'></input>\n" +
        "<label class='editProfile'>Потвърди парола:</label>\n" +
        "<input class='editProfile' type='password' name='confirmPassword'></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

function makeElectivesEditForm(name, is){
    var info = JSON.parse(is);
    var editForm = "<fieldset id='editElective'>\n" +
    "<form name='editEl' method='post' onsubmit='return adminConnection.php'>\n" +
        "<legend class='editElective'>Редактиране на избираема дисциплина</legend>\n" + 
		"<label class='editElective'>Име на дисциплината:</label>\n" +
        "<input class='editElective' type='text' name='name'>" + name + "</input>\n" +
        "<label class='editElective'>Описание на дисциплината:</label>\n" +
        "<input class='editElective' type='text' name='description'>" + info['description'] + "</input>\n" +
        "<label class='editElective'>Препорачителна литература:</label>\n" +
        "<input class='editElective' type='text' name='literature'></input>\n" +
		"<label class='editElective'>Теми:</label>\n" +
        "<input class='editElective' type='text' name='subjects'></input>\n" +
        "<input class='editElective' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

/**
 * Make last column of table for selecting table's row
 * @param {*} columnType 
 */
function makeNewColumn(columnType){
    var th = document.createElement('th');
    var value = document.createTextNode(columnType);
    th.appendChild(value);
    document.getElementById('firstRow').appendChild(th);
    var isElective = true;

    var tr = document.getElementsByClassName('elective');
    if(tr.length == 0) {
        tr = decument.getElementsByClassName("user");
        isElective = false;
    }
	
	if(columnType === 'Редактиране'){
		 for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'editIcon');
            img.setAttribute('title', "Редактиране");
            
            var currentElement = tr[i].firstChild.innerHTML;
            if(isElective) {
                img.setAttribute('onclick', 'connectToServer.infoElective("' + currentElement+ '")');
            } else {
                img.setAttribute('onclick', 'connectToServer.infoUser("' + currentElement + '")');
            }
                        
            img.setAttribute('src', 'img/edit.png');
            td.appendChild(img);
            tr[i].appendChild(td); 
		}
	}
}

function editProfileInfo(){
    email = getCookie('email');
    document.getElementById('adminContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);    
}

function editElectivesInfo() {
	connectToServer.showElectives();   
}

function editUserProfiles() {
    connectToServer.showUsers();
}

var adminPage = () => {
    connectToServer.adminInfo();

    let editProfile = document.getElementById('editProfile');
    let editElectives = document.getElementById('editElectives');
    let editUsers = document.getElementById('editUsers');
   
	
    editProfile.addEventListener('click', editProfileInfo);
    editElectives.addEventListener('click', editElectivesInfo);
	editUsers.addEventListener('click', editUserProfiles);
	
}

window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    if(id){
        document.getElementById('profile').style.display = 'none';

        if(id.toString() === 'editProfile'){
            status = params.get('status');

            if(status === 'success'){
                editProfile();
                document.getElementById('studentContent').innerHTML =  "<p id='success'>Успешно обновена информация.</p>";
            } else if(status === 'notfound'){
                editProfile();
                document.getElementById('invalidPass').style.display = 'block';
            } else if(status === 'notequal'){
                editProfile();
                document.getElementById('notEqual').style.display = 'block';
            } else {
                editProfile();
            }
        } else if(id.toString() === 'editElectives'){
            editElectivesInfo();
        } else if(id.toString() === 'editUsers'){
            editUserProfiles();
        }
    } else {
        adminPage();
    }
}