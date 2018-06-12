
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
	
	lecturerInfo: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let response = ajaxRequest.responseText;
                let info = JSON.parse(response); 
                
                document.getElementById('lecturerName').innerHTML = info['names'];
                document.getElementById('department').innerHTML = info['department'];
                document.getElementById('telephone').innerHTML = info['telephone'];
                document.getElementById('visitingHours').innerHTML = info['visitingHours'];
				document.getElementById('office').innerHTML = info['office'];
				document.getElementById('personalPage').innerHTML = info['personalPage'];
                document.cookie = 'email=' + info['email'];
            }    
        }

        ajaxRequest.open("GET", "php/lecturerConnection.php", true);
        ajaxRequest.send(null);
    }
	
}
	

/**
 * Get cookie by cookie name
 * @param {*} cookieName 
 */
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i <cookies.length; i++) {
        var currentCookie = cookies[i];
        while (currentCookie.charAt(0) == ' ') {
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) == 0) {
            return currentCookie.substring(name.length, currentCookie.length);
        }
    }
    return "";
}

function makeProfileEditForm(type, email){

    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' onsubmi='return connectToServer.editInfo()'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
        "<label class='editProfile'>E-mail:</label>\n" +
        "<input class='editProfile' type='text' name='email' value='" + email + "'></input>\n" +
        "<label class='editProfile'>Нова парола:</label>\n" +
        "<input class='editProfile' type='password' name='newPassword'></input>\n" +
        "<label class='editProfile'>Потвърди парола:</label>\n" +
        "<input class='editProfile' type='password' name='confirmPassword'></input>\n" +
		"<label class='editProfile'>Телефон:</label>\n" +
        "<input class='editProfile' type='text' name='newTelephone'></input>\n" +
		"<label class='editProfile'>Часове за посещение:</label>\n" +
        "<input class='editProfile' type='text' name='newVisitingHours'></input>\n" +
		"<label class='editProfile'>Офис:</label>\n" +
        "<input class='editProfile' type='text' name='newOffice'></input>\n" +
		"<label class='editProfile'>Лична страница:</label>\n" +
        "<input class='editProfile' type='text' name='newPersonalPage'></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

function makeElectivesEditForm(type){
	  var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' onsubmi='return connectToServer.editInfo()'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
		"<label class='editProfile'>Име на дисциплината:</label>\n" +
        "<input class='editProfile' type='text' name='description'></input>\n" +
        "<label class='editProfile'>Описание на дисциплината:</label>\n" +
        "<input class='editProfile' type='text' name='description'></input>\n" +
        "<label class='editProfile'>Препорачителна литература:</label>\n" +
        "<input class='editProfile' type='text' name='literature'></input>\n" +
		"<label class='editProfile'>Теми:</label>\n" +
        "<input class='editProfile' type='text' name='subjects'></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

function editProfile(){
	 email = getCookie('email');
	document.getElementById('lecturerContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);   
}

function chooseStudent (){
	
}

function writingEvaluation(){
	
}


function messages(){
	
}

function showReferences(){
	
}

function updateElective() {
	
	document.getElementById('lecturerContent').innerHTML = makeElectivesEditForm("Редактиране на избираема дисциплина");   
}

function newElective() {

}

/**
 * Load lecturer's page
 */
var lecturerPage = () => {
    connectToServer.lecturerInfo();

    let profile = document.getElementById('profile');
    let chooseStudent = document.getElementById('chooseStudent');
    let writingEvaluation = document.getElementById('writingEvaluation');
    let message = document.getElementById('message');
	let showReferences = document.getElementById('showReferences');
    let updateElective = document.getElementById('updateElective');
    let newElective = document.getElementById('newElective');
	
    profile.addEventListener('click', editProfile);
    chooseStudent.addEventListener('click', chooseStudent);
    writingEvaluation.addEventListener('click', writingEvaluation);
    message.addEventListener('click', messages);
	showReferences.addEventListener('click', showReferences);
    updateElective.addEventListener('click', updateElective);
    newElective.addEventListener('click', newElective);
}

/**
 * Load window
 */
window.onload = () => {
    var params = new URLSearchParams(window.location.search);
    id = params.get('id');

    if(id){
        document.getElementById('profile').style.display = 'none';

        if(id.toString() === 'editProfile'){
            editProfile();
        } else if(id.toString() === 'chooseStudent'){
            chooseStudent();
        } else if(id.toString() === 'writingEvaluation'){
			writingEvaluation();
        } else if(id.toString() === 'messages'){
            messages();
        } else if(id.toString() === 'showReferences'){
           showReferences();
        } else if(id.toString() === 'updateElective'){
           updateElective();
        } else if(id.toString() === 'newElective'){
			newElective();
        } 
    } else {
        lecturerPage();
    }
    
}
