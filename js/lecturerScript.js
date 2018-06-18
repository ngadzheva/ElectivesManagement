/**
 * Send data to server and retrieve data from server
 */
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
    },
	
    showMessages: (type) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let messages = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML += messages;
            }   
            
            makeNewColumn('Преглед');
        }

        ajaxRequest.open("GET", "php/lecturerConnection.php?id=showMessages&type=" + type, true);
        ajaxRequest.send(null);
    },

    viewMessage: (receiver, sender, date) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let messages = ajaxRequest.responseText;
                
                document.getElementById('messagesList').style.display = 'none';
                document.getElementById('lecturerContent').innerHTML +=  messages;
            }   
        }

        ajaxRequest.open("GET", "php/lecturerConnection.php?receiver=" + receiver + "&sender=" + sender + "&date=" + date, true);
        ajaxRequest.send(null);
	},	
	 
	 showElectives: () => {
		let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML +=  show;
            }   
			
			 makeNewColumn('Редактиране');
        }
		
        ajaxRequest.open("GET", "php/lecturerConnection.php?id=update", true);
        ajaxRequest.send(null);
	 },
	 
	 infoElective: (name) => {
		 let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let updateInfo = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML =  makeElectivesEditForm(name, updateInfo);
            }   
        }
		
        ajaxRequest.open("GET", "php/lecturerConnection.php?id=newInfo&name=" + name, true);
        ajaxRequest.send(null);
	 },

	 writeOffStudent: () => {
		 let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let writeOff = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = writeOff;
            }   
			makeNewColumn('Отпиши');
        }
		
        ajaxRequest.open("GET", "php/lecturerConnection.php?id=writeOff", true);
        ajaxRequest.send(null);
	 },
	 
	  writeOnStudent: () => {
		 let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let writeOn = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = writeOn;
            }   
			makeNewColumn('Запиши');
        }
		
        ajaxRequest.open("GET", "php/lecturerConnection.php?id=writeOn", true);
        ajaxRequest.send(null);
	 },
	 	 	 
	 writingEvaluation: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let mark = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = mark;
            }   

            makeNewColumn('Оценка');
        }

        ajaxRequest.open("GET", "php/lecturerConnection.php?id=mark", true);
        ajaxRequest.send(null);
    },
	
	
	references: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let ref = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = ref;
            }    
			
			makeNewColumn('Справки');
        }

        ajaxRequest.open("GET", "php/lecturerConnection.php?id=lecturerReferences", true);
        ajaxRequest.send(null);
    },
		
	infoElectiveReference: (name) => {
		 let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let updateInfo = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = updateInfo;
            }   
        }
		
        ajaxRequest.open("GET", "php/lecturerConnection.php?id=infoElectiveReference&name=" + name, true);
        ajaxRequest.send(null);
	 }
	
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

    var tr = document.getElementsByClassName('elective');

    if(columnType === 'Преглед'){
        for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img = document.createElement('img');
            img.setAttribute('class', 'viewIcon');
            img.setAttribute('title', 'Преглед');

            var receiver = '';
            var sender = '';
            var date = tr[i].lastChild.innerHTML;

            if(document.getElementById('firstRow').firstChild.innerHTML === 'Подател'){
                sender = tr[i].firstChild.innerHTML;
            } else {
                receiver = tr[i].firstChild.innerHTML;
            } 

            img.setAttribute('onclick', 'connectToServer.viewMessage("' + receiver + '", "' + sender + '", "' + date + '")');            
            img.setAttribute('src', 'img/view.png');
            td.appendChild(img);
            tr[i].appendChild(td);
        }
	}

    if(columnType === 'Запиши'){
        for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			img.setAttribute('id', 'On');
			 img.setAttribute('title', "Записване");
			 
			 var currentElective = tr[i].firstChild.innerHTML;
			 img.setAttribute('src', 'img/add.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
			 document.getElementById('On').addEventListener('click',function(){
				writeOnStudent(currentElective);
			});
		 
		}
    }
	
	
	if(columnType === 'Редактиране'){
		 for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			 img.setAttribute('title', "Редактиране");
			 
			 var currentElective = tr[i].firstChild.innerHTML;
			 img.setAttribute('onclick', 'connectToServer.infoElective("' + currentElective + '")');            
			 img.setAttribute('src', 'img/edit.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
		 
		}
	 }
	 
	if(columnType === 'Отпиши'){
		 for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			img.setAttribute('id', 'Off');
			 img.setAttribute('title', "Отписване");
			 
			 var currentElective = tr[i].firstChild.innerHTML;
			 img.setAttribute('src', 'img/delete.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
			 document.getElementById('Off').addEventListener('click',function(){
				 writeOffStudent(currentElective);
				 });
		 
		}
	 }
	 
	 if(columnType === 'Оценка'){
		 for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			 img.setAttribute('id', 'mark');
			 img.setAttribute('title', "Нанеси оценка");
			 
			 var currentElective = tr[i].firstChild.innerHTML;  
			 img.setAttribute('src', 'img/edit.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
			 document.getElementById('mark').addEventListener('click', function(){
				 writeMarkStudent(currentElective);
				 });
		 
		}
	 }
	 
	  if(columnType === 'Справки'){
		 for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			 img.setAttribute('title', "Справка");
			 
			 var currentElective = tr[i].firstChild.innerHTML;
			 img.setAttribute('onclick', 'connectToServer.infoElectiveReference("' + currentElective + '")');            
			 img.setAttribute('src', 'img/edit.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
		 
		}
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
	"<legend class='editProfile'>" + type + "</legend>\n" +
    "<form name='edit' method='post' action='php/lecturerConnection.php'>\n" +
        "<label class='editProfile'>E-mail:</label>\n" +
        "<input class='editProfile' type='text' name='email' value='" + email + "'></input>\n" +
		"<label class='editProfile'>Парола:</label>\n" +
        "<input class='editProfile' type='password' name='passwd'></input>\n" +
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

function makeElectivesEditForm(name, is){
	  var info = JSON.decode(is);
	  var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' onsubmi='return connectToServer.editInfo()'>\n" +
        "<legend class='editProfile'>Редактиране на избираема дисциплина</legend>\n" + 
		"<label class='editProfile'>Име на дисциплината:</label>\n" +
        "<input class='editProfile' type='text' name='name'>" + name + "</input>\n" +
        "<label class='editProfile'>Описание на дисциплината:</label>\n" +
        "<input class='editProfile' type='text' name='description'>" + info['description'] + "</input>\n" +
        "<label class='editProfile'>Препорачителна литература:</label>\n" +
        "<input class='editProfile' type='text' name='literature'></input>\n" +
		"<label class='editProfile'>Теми:</label>\n" +
        "<input class='editProfile' type='text' name='subjects'></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}


function makeNewMessageForm(){
    var messageForm = "<fieldset id='messageForm'>\n" +
	"<legend class='sendMessage'>Ново съобщение</legend>\n" + 
    "<form name='message' method='post' action='php/lecturerConnection.php'>\n" +
        "<label class='error' id='invalidEmail' style='display: none;'>Невалиден email.</label>\n" +
        "<label class='sendMessage'>До:</label>\n" +
        "<input class='sendMessage' type='text' name='to' placeholder='student@email.bg'></input>\n" +
        "<label class='sendMessage'>Относно:</label>\n" +
        "<input class='sendMessage' type='text' name='about'></input>\n" +
        "<textarea class='sendMessage' name='content' placeholder='Напиши своето съобщение тук...'></textarea>\n" +
        "<input class='sendMessage' type='submit' value='Изпрати'></input>\n" +
    "</form>\n" +
    "</fildset>\n";
	
    document.getElementById('lecturerContent').innerHTML += messageForm;

    return messageForm;
}


function writeOnStudent(name){
    var writeForm = "<fieldset id='writeForm'>\n" +
	"<legend class='writeOn'>Запиши студент за избираема дисциплина</legend>\n" + 
    "<form name='message' method='post' action='php/lecturerConnection.php'>\n" +
        "<label class='writeOn'>Име на дисциплината:</label>\n" +
        "<input class='writeOn' type='text' name='nameElective' value='" + name + "'></input>\n" +
        "<label class='writeOn'>Студент:</label>\n" +
        "<input class='writeOn' type='text' name='names'></input>\n" +
        "<label class='writeOn'>Факултетен номер:</label>\n" +
        "<input class='writeOn' type='number' name='fn'></input>\n" +
        "<input class='writeOn' type='submit' value='Запиши'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    document.getElementById('lecturerContent').innerHTML += writeForm;

    return writeForm;
}

function writeOffStudent(name){
    var writeForm = "<fieldset id='writeForm'>\n" +
	"<legend class='writeOff'>Отпиши студент от избираема дисциплина</legend>\n" + 
    "<form name='message' method='post' action='php/lecturerConnection.php'>\n" +
        "<label class='writeOn'>Име на дисциплината:</label>\n" +
        "<input class='writeOn' type='text' name='name' value='" + name + "'></input>\n" +
        "<label class='writeOff'>Студент:</label>\n" +
        "<input class='writeOff' type='text' name='names'></input>\n" +
        "<label class='writeOff'>Факултетен номер:</label>\n" +
        "<input class='writeOff' type='number' name='fn'></input>\n" +
        "<input class='writeOff' type='submit' value='Отпиши'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    document.getElementById('lecturerContent').innerHTML += writeForm;

    return writeForm;
}

function writeMarkStudent(name){
    var writeForm = "<fieldset id='writeForm'>\n" +
	"<legend class='writeMark'>Нанасяне на оценка на студент</legend>\n" +
    "<form name='message' method='post' action='php/lecturerConnection.php'>\n" +
        "<label class='writeOn'>Име на дисциплината:</label>\n" +
        "<input class='writeOn' type='text' name='nameElectives' value='" + name + "'></input>\n" +
        "<label class='writeMark'>Студент:</label>\n" +
        "<input class='writeMark' type='text' name='names'></input>\n" +
        "<label class='writeMark'>Факултетен номер:</label>\n" +
        "<input class='writeMark' type='number' name='fn'></input>\n" +
		"<label class='writeMark'>Оценка:</label>\n" +
        "<input class='writeMark' type='number' name='mark'></input>\n" +
        "<input class='writeMark' type='submit' value='Нанеси'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    document.getElementById('lecturerContent').innerHTML += writeForm;

    return writeForm;
}

/**
 * List electives depending on the selected
 * @param {*} element 
 * @param {*} term 
 * @param {*} page 
 */
function electives(element, term){
    listElectives(element, term);
}

/**
 * Make message page header
 */
/**
 * Make message page header
 */
function messagesHeader(){
    let section = document.createElement('section');
    section.setAttribute('id', 'messagesNav');

    let incomeMessages = document.createElement('a');
    incomeMessages.setAttribute('href', 'lecturer.html?id=incomeMessages');
    incomeMessages.setAttribute('class', 'messagesButton');
    incomeMessages.setAttribute('id', 'income');
    incomeMessages.innerHTML = 'Входящи съобщения';

    let sentMessages = document.createElement('a');
    sentMessages.setAttribute('href', 'lecturer.html?id=sentMessages');
    sentMessages.setAttribute('class', 'messagesButton');
    sentMessages.setAttribute('id', 'sent');
    sentMessages.innerHTML = 'Изходящи съобщения';
    
    let newMessage = document.createElement('a');
    newMessage.setAttribute('href', 'lecturer.html?id=newMessage');
    newMessage.setAttribute('class', 'messagesButton');
    newMessage.setAttribute('id', 'new');
    newMessage.innerHTML = 'Ново съобщение';

    section.appendChild(incomeMessages);
    section.appendChild(sentMessages);
    section.appendChild(newMessage);

    document.getElementById('lecturerContent').appendChild(section);

    document.getElementById('income').addEventListener('click', connectToServer.showMessages);
    document.getElementById('sent').addEventListener('click', connectToServer.showMessages);
    document.getElementById('new').addEventListener('click',makeNewMessageForm);
}

/**
 * Edit email, password, telephone, visiting hours, office, personal page
 */
function editProfile(){
    email = getCookie('email');
    document.getElementById('lecturerContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);    
}

function showElectivesCampaign (){
	connectToServer.writeOffStudent();
}

function showElectivesCampaignOn (){
	connectToServer.writeOnStudent();
}

function writingEvaluation(){
	connectToServer.writingEvaluation();
}

/**
 * Control messages
 */
function message(){
    messagesHeader();
    connectToServer.showMessages('income');
}

/**
 * Show references
 */
function showReferences(){
	connectToServer.infoElectiveReference('name');
	connectToServer.references();
}

function updateElective() {
	connectToServer.showElectives();   
}

/**
 * Load lecturer's page
 */
var lecturerPage = () => {
    connectToServer.lecturerInfo();

    let profile = document.getElementById('profile');
    let electivesCampaignOff = document.getElementById('electivesCampaignOff');
	let electivesCampaignOn = document.getElementById('electivesCampaignOn');
    let writingEvaluation = document.getElementById('writingEvaluation');
    let message = document.getElementById('message');
	let references = document.getElementById('references');
    let updateElective = document.getElementById('updateElective');
   
	
    profile.addEventListener('click', editProfile);
    electivesCampaignOff.addEventListener('click', showElectivesCampaign);
	electivesCampaignOn.addEventListener('click', showElectivesCampaignOn);
    writingEvaluation.addEventListener('click', writingEvaluation);
    message.addEventListener('click', message);
	references.addEventListener('click', showReferences);
    updateElective.addEventListener('click', updateElective);
	
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
            status = params.get('status');

            if(status === 'success'){
                editProfile();
                document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно обновена информация.</p>";
            } else if(status === 'notfound'){
                editProfile();
                document.getElementById('invalidPass').style.display = 'block';
            } else if(status === 'notequal'){
                editProfile();
                document.getElementById('notEqual').style.display = 'block';
            } else {
                editProfile();
            }
            
		} else if(id.toString() === 'electivesCampaignOff'){
            showElectivesCampaign();
        } else if(id.toString() === 'electivesCampaignOn'){
            showElectivesCampaignOn();
        } else if(id.toString() === 'writingEvaluation'){
			writingEvaluation();
        } else if(id.toString() === 'messages'){
            message();
        } else if(id.toString() === 'references'){
           showReferences();
        } else if(id.toString() === 'updateElective'){
           updateElective();
        }  else if(id.toString() === 'incomeMessages'){
            messagesHeader();
            connectToServer.showMessages('income');
        } else if(id.toString() === 'sentMessages'){
            messagesHeader();
            connectToServer.showMessages('sent');
        } else if(id.toString() === 'newMessage'){
            let status = params.get('status');

            if(status === 'success'){
                messagesHeader();
                document.getElementById('lecturerContent').innerHTML +=  "<p id='success'>Съобщението е изпратено успешно.</p>";
            } else if(status === 'notfound'){
                messagesHeader();
                makeNewMessageForm();

                document.getElementById('invalidEmail').style.display = 'block';
            } else {
                messagesHeader();
                makeNewMessageForm();
            }
        } else if(id.toString() === 'winter' || id.toString() === 'summer'){
            electives('lecturerContent', id.toString());
		}
    } else {
        lecturerPage();
    }
    
}
