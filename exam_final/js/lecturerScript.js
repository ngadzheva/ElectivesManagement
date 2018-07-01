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
				document.cookie = 'telephone=' + info['telephone'];
				document.cookie = 'visitingHours=' + info['visitingHours'];
				document.cookie = 'office=' + info['office'];
				document.cookie = 'personalPage=' + info['personalPage'];
            }    
        }

        ajaxRequest.open("GET", "../php/lecturerConnection.php", true);
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

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=showMessages&type=" + type, true);
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

        ajaxRequest.open("GET", "../php/lecturerConnection.php?receiver=" + receiver + "&sender=" + sender + "&date=" + date, true);
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
		
        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=writeOff", true);
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
		
        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=writeOn", true);
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

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=mark", true);
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

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=lecturerReferences", true);
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
		
        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=infoElectiveReference&name=" + name, true);
        ajaxRequest.send(null);
	 },
	 
	 showSuggestions: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let suggestions = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = suggestions;
            }   

            makeColumn('Преглед', true);
            makeNewRow();
        }

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=showSuggestions", true);
        ajaxRequest.send(null);
    },
	
	schedule: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let schedule = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = schedule;
            }    
        }

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=schedule", true);
        ajaxRequest.send(null);
    },
	
	exams: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let exams = ajaxRequest.responseText;
                
                document.getElementById('lecturerContent').innerHTML = exams;
            }    
        }

        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=exams", true);
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
		
        ajaxRequest.open("GET", "../php/lecturerConnection.php?id=update", true);
        ajaxRequest.send(null);
	 }	
}


function makeNewRow(){
    let row = document.createElement('tr');
    row.setAttribute('id', 'lastRow');
    
    for(let i = 0; i < 6; i++){
        let td = document.createElement('td');
        row.appendChild(td);
    }

    let td = document.createElement('td');
    let img = document.createElement('img');
    img.setAttribute('class', 'addIcon');
    img.setAttribute('title', 'Добави предложение');
    img.setAttribute('onclick','makeSuggestion()');
    img.setAttribute('src', '../img/add.png');
    td.appendChild(img);
    row.appendChild(td);

    document.getElementById('electivesList').appendChild(row);
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
            img.setAttribute('src', '../img/view.png');
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
			img.addEventListener('click', function(currentElective) {
				return function(){ document.getElementById('electivesList').style.display = 'none';
				forms.writeOnStudent(currentElective);
			}}(currentElective));
				
			 img.setAttribute('src', '../img/add.png');
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
			img.addEventListener('click', function(currentElective) {
				return function(){ document.getElementById('electivesList').style.display = 'none';
				forms.writeOffStudent(currentElective);
			}}(currentElective));
			 img.setAttribute('src', '../img/delete.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
		 
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
				img.addEventListener('click', function(currentElective) {
				return function(){ document.getElementById('electivesList').style.display = 'none';
				forms.writeMarkStudent(currentElective);
			}}(currentElective));
			 img.setAttribute('src', '../img/edit.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
		 
		}
	 }
	 
	  if(columnType === 'Редактиране'){
		 for(var i = 0; i < tr.length; i++){
			 var td = document.createElement('td');
			 var img= document.createElement('img');
			 img.setAttribute('class', 'enrolIcon');
			 img.setAttribute('title', "Редактиране");
			 
			 var currentElective = tr[i].firstChild.innerHTML;			
			img.addEventListener('click', function(currentElective) {
			return function(){ document.getElementById('electivesList').style.display = 'none';
			forms.makeElectivesEditForm(currentElective);
			}}(currentElective));
			 img.setAttribute('src', '../img/edit.png');
			 td.appendChild(img);
			 tr[i].appendChild(td);
		 
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
			 img.setAttribute('src', '../img/edit.png');
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
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for(let i = 0; i <cookies.length; i++) {
        let currentCookie = cookies[i];
        while (currentCookie.charAt(0) == ' ') {
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) == 0) {
            return  decodeURIComponent(currentCookie.substring(name.length, currentCookie.length).replace(/\+/g, ' '));
        }
    }
    return "";
}

const forms = {
    /**
     * Make template for edit form
     * @param {*} type 
     * @param {*} email 
     */
    makeProfileEditForm: (type, email, telephone, visitingHours, office, personalPage) =>{
        let editForm = "<fieldset id='editForm'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
        "<form name='edit' method='post' action='../php/lecturerConnection.php'>\n" +
            "<label class='error' id='invalid' style='display: none;'></label>\n" +
            "<label class='editProfile'>E-mail:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='email' name='email' value='" + email + "'></input>\n" +
            "<label class='editProfile'>Парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='password'></input>\n" +
            "<label class='editProfile'>Нова парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='newPassword'></input>\n" +
            "<label class='editProfile'>Потвърди парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='confirmPassword'></input>\n" +
			"<label class='editProfile'>Телефон:</label>\n" +
			"<input class='editProfile' type='text' name='telephone' value='" + telephone + "'></input>\n" +
			"<label class='editProfile'>Часове за посещение:</label>\n" +
			"<input class='editProfile' type='text' name='visitingHours' value='" + visitingHours + "'></input>\n" +
			"<label class='editProfile'>Офис:</label>\n" +
			"<input class='editProfile' type='text' name='office' value='" + office + "'></input>\n" +
			"<label class='editProfile'>Лична страница:</label>\n" +
			"<input class='editProfile' type='text' name='personalPage' value='" + personalPage + "'></input>\n" +
            "<input class='editProfile' type='submit' value='Запази'></input>\n" +
        "</form>\n" +
        "</fildset>\n";
    
        return editForm;
    },
	
	/**/

    /**
     * Make template for form for suggesting new elective
     */
    makeSuggestionForm: (name, year) =>{
        let suggestForm = "<fieldset id='suggestionForm'>\n" +
        "<legend class='makeSuggestion'>Предлагане на избираема дисциплина</legend>\n" + 
        "<form name='suggestion' method='post' action='../php/lecturerConnection.php'>\n" +
            "<label class='error' id='invalid' style='display: none;'></label>\n" +
            "<label class='makeSuggestion'>Име на дисциплината:<mark id='star'>*</mark></label>\n" +
            "<input class='makeSuggestion' type='text' name='name' value='" + name + "'></input>\n" +
            "<label class='makeSuggestion'>Кратко описание:<mark id='star'>*</mark></label>\n" +
            "<textarea class='makeSuggestion' name='description' placeholder='Напиши своето предложение тук...'></textarea>\n" +
            "<label class='makeSuggestion'>Курс:</label>\n" +
            "<input class='makeSuggestion' type='number' name='year' min='1' max='4' value='" + year + "'></input>\n" +
            "<label class='makeSuggestion'>Специалност:</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='Всички' checked></input>" +
            "<label class='makeSuggestion' for='-'>-</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='И'></input>" +
            "<label class='makeSuggestion' for='И'>И</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='ИС'></input>" +
            "<label class='makeSuggestion' for='ИС'>ИС</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='КН'></input>" +
            "<label class='makeSuggestion' for='КН'>КН</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='M'></input>" +
            "<label class='makeSuggestion' for='М'>М</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='МИ'></input>" +
            "<label class='makeSuggestion' for='МИ'>МИ</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='ПМ'></input>" +
            "<label class='makeSuggestion' for='ПМ'>ПМ</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='СИ'></input>" +
            "<label class='makeSuggestion' for='СИ'>СИ</label>\n" +
            "<input class='makeSuggestion' type='checkbox' name='bachelorPrograme[]' value='Стат'></input>" +
            "<label class='makeSuggestion' for='Стат'>Стат</label>\n" +
            "<label class='makeSuggestion'>Семестър:</label>\n" +
            "<select class='makeSuggestion' name='term'>" +
                "<option value='-' select='selected'>-</option>" +
                "<option value='winter'>Зимен</option>" +
                "<option value='summer'>Летен</option>" +
            "</select>" +
            "<label class='makeSuggestion'>Категория:</label>\n" +
            "<select class='makeSuggestion' name='cathegory'>" +
                "<option value='-' select='selected'>-</option>" +
                "<option value='КП'>КП</option>" +
                "<option value='М'>М</option>" +
                "<option value='ОКН'>ОКН</option>" +
                "<option value='ПМ'>ПМ</option>" +
                "<option value='С'>С</option>" +
                "<option value='Х'>Х</option>" +
                "<option value='ЯКН'>ЯКН</option>" +
            "</select>" +
            "<input class='makeSuggestion' type='submit' value='Предложи'></input>\n" +
        "</form>\n" +
        "</fildset>\n";
    
        document.getElementById('lecturerContent').innerHTML = suggestForm;
    
        return suggestForm;
    },

    /**
     * Make template of form for sending messages
     */
    makeNewMessageForm: (to, about) => {
        let messageForm = "<fieldset id='messageForm'>\n" +
        "<legend class='sendMessage'>Ново съобщение</legend>\n" + 
        "<form name='message' method='post' action='../php/lecturerConnection.php'>\n" +
            "<label class='error' id='invalid' style='display: none;'></label>\n" +
            "<label class='sendMessage'>До:<mark id='star'>*</mark></label>\n" +
            "<input class='sendMessage' type='email' name='to' placeholder='student@email.bg' value='" + to + "'></input>\n" +
            "<label class='sendMessage'>Относно:</label>\n" +
            "<input class='sendMessage' type='text' name='about' value='" + about + "'></input>\n" +
            "<textarea class='sendMessage' name='content' placeholder='Напиши своето съобщение тук...'></textarea>\n" +
            "<input class='sendMessage' type='submit' value='Изпрати'></input>\n" +
        "</form>\n" +
        "</fildset>\n";
    
        document.getElementById('lecturerContent').innerHTML += messageForm;
    
        return messageForm;
    },
	
	 /**
     * Make template for form for writing off a student
     */
	writeOffStudent: (name) => {
	
		var writeForm = "<fieldset id='writeForm'>\n" +
		"<legend class='writeOff'>Отпиши студент от избираема дисциплина</legend>\n" + 
		"<form name='message' method='post' action='../php/lecturerConnection.php'>\n" +
			"<label class='error' id='invalid' style='display: none;'></label>\n" +
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
	},
	
	/**
     * Make template for form for writing a student
     */
	writeOnStudent: (name) => {
		var writeForm = "<fieldset id='writeForm'>\n" +
		"<legend class='writeOn'>Запиши студент за избираема дисциплина</legend>\n" + 
		"<form name='message' method='post' action='../php/lecturerConnection.php'>\n" +
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
	},
	
	/**
     * Make template for form for writing marks
     */
	writeMarkStudent: (name) => {
		
		var writeForm = "<fieldset id='writeForm'>\n" +
		"<legend class='writeMark'>Нанасяне на оценка на студент</legend>\n" +
		"<form name='message' method='post' action='../php/lecturerConnection.php'>\n" +
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
	},
	
	/**
     * Make template for form for updating an elective
     */
	makeElectivesEditForm(name){
	  
	
		var editForm = "<fieldset id='editForm'>\n" +
		"<form name='editElectives' method='post' action='../php/lecturerConnection.php'>\n" +
        "<legend class='editProfile'>Редактиране на избираема дисциплина</legend>\n" + 
		"<label class='editElective'>Избираема дисциплина</label>\n" +
        "<input class='editElective' type='text' name='name' value='" + name + "'></input>\n" +
        "<label class='editProfile'>Описание на дисциплината:</label>\n" +
        "<input class='editProfile' type='text' name='description' ></input>\n" +
        "<label class='editProfile'>Препоръчителна литература:</label>\n" +
        "<input class='editProfile' type='text' name='literature' ></input>\n" +
		"<label class='editProfile'>Теми:</label>\n" +
        "<input class='editProfile' type='text' name='subjects' ></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
		"</form>\n" +
		"</fildset>\n";
	
		document.getElementById('lecturerContent').innerHTML += editForm;

		return editForm;
	}
};


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
    document.getElementById('new').addEventListener('click',forms.makeNewMessageForm);
}

/**
 * Edit email, password, telephone, visiting hours, office, personal page
 */
function editProfile(){
    let email = getCookie('email');
	let telephone = getCookie('telephone');
	let visitingHours = getCookie('visitingHours');
	let office = getCookie('office');
	let personalPage = getCookie('personalPage');
	if(personalPage === 'null'){
		personalPage = '';
		document.getElementById('lecturerContent').innerHTML = forms.makeProfileEditForm("Редактиране на профил", email, telephone, visitingHours, office, personalPage);  
	} else {
		document.getElementById('lecturerContent').innerHTML = forms.makeProfileEditForm("Редактиране на профил", email, telephone, visitingHours, office, personalPage);
	}		
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

/**
  * Update an elective
  */
function updateElective() {
	connectToServer.showElectives(); 
}

/**
 * Show new electives suggestions
 */
function showElectivesSuggestions(){
    connectToServer.showSuggestions();
}

/**
 * Make suggestion for new elective
 */
function makeSuggestion(){
    document.location = 'lecturer.html?id=makeSuggestion';
    forms.makeSuggestionForm();
}

/**
 * Show schedule
 */
function showSchedule(){
    connectToServer.schedule();
}

/**
 * Show exams
 */
function showExams(){
    connectToServer.exams();
}



/**
 * Load lecturer's page
 */
var lecturerPage = () => {
    connectToServer.lecturerInfo();

    let electivesCampaignOff = document.getElementById('electivesCampaignOff');
	let electivesCampaignOn = document.getElementById('electivesCampaignOn');
    let writingEvaluation = document.getElementById('writingEvaluation');
    let message = document.getElementById('message');
	let references = document.getElementById('references');
	let electivesSuggestions = document.getElementById('electivesSuggestions');
	let schedule = document.getElementById('schedule');
	let exams = document.getElementById('exams');
    let updateElective = document.getElementById('updateElective');
   
	
    electivesCampaignOff.addEventListener('click', showElectivesCampaign);
	electivesCampaignOn.addEventListener('click', showElectivesCampaignOn);
    writingEvaluation.addEventListener('click', writingEvaluation);
    message.addEventListener('click', message);
	references.addEventListener('click', showReferences);
	electivesSuggestions.addEventListener('click', showElectivesSuggestions);
	schedule.addEventListener('click', showSchedule);
	exams.addEventListener('click', showExams);
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
				let status = getCookie('status');

				if(status !== ''){
					if(status === 'success'){
						document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно обновена информация.</p>";
					} else {
						editProfile();

						document.getElementById('invalid').innerHTML = status;
						document.getElementById('invalid').style.display = 'block';
					}

					document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;"; 
            } else {
                editProfile();
            }
            
           
		} else if(id.toString() === 'makeSuggestion'){
            let status = getCookie('status');
            let name = getCookie('name');
            let description = getCookie('description');
            let year = getCookie('year');
            let term = getCookie('term');
            let cathegory = getCookie('cathegory');

            if(status !== ''){
                if(status === 'success'){
                    document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно добавено предложение.</p>";
                } else {
                    forms.makeSuggestionForm(name, year);
                    document.getElementsByName('description')[0].value = description;
                    document.getElementsByName('cathegory')[0].value = cathegory;
                    document.getElementsByName('term')[0].value = term;

                    document.getElementById('invalid').innerHTML = status;
                    document.getElementById('invalid').style.display = 'block';
                }

                document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            } else {
                forms.makeSuggestionForm(name, year);
            }
            
            document.cookie = "name=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "description=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "year=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "term=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "cathegory=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
        }  
		else if(id.toString() === 'electivesCampaignOff'){
			status = params.get('status');
			 
			 if(status === 'success'){
                document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно отписване на студент.</p>";
            } else if(status === 'notfound'){
				document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Неуспешно отписване на студент.</p>";
            } else {
				showElectivesCampaign();
			}
        } else if(id.toString() === 'electivesCampaignOn'){
			status = params.get('status');
			 
			 if(status === 'success'){
                document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно записване на студент.</p>";
            } else if(status === 'notfound'){
				document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Неуспешно записване на студент.</p>";
            } else {
				showElectivesCampaignOn();
			}
        } else if(id.toString() === 'writingEvaluation'){
			status = params.get('status');
			 
			 if(status === 'success'){
                document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно нанесена оценка.</p>";
            } else if(status === 'notfound'){
				document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Неуспешно нанесена оценка.</p>";
            } else {
				writingEvaluation();
			}
			
        } else if(id.toString() === 'electivesSuggestions'){
            showElectivesSuggestions();
        } else if(id.toString() === 'messages'){
            message();
        } else if(id.toString() === 'references'){
           showReferences();
        } else if(id.toString() === 'updateElective'){
		   	status = params.get('status');
			 
			 if(status === 'success'){
                document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Успешно редактиране на избираема дисциплина.</p>";
            } else if(status === 'notfound'){
				document.getElementById('lecturerContent').innerHTML =  "<p id='success'>Неуспешно редактиране на избираема дисциплина.</p>";
            } else {
				updateElective();
			}
        } else if(id.toString() === 'schedule'){
            showSchedule();
        } else if(id.toString() === 'exams'){
            showExams();
        } else if(id.toString() === 'incomeMessages'){
            messagesHeader();
            connectToServer.showMessages('income');
        } else if(id.toString() === 'sentMessages'){
            messagesHeader();
            connectToServer.showMessages('sent');
        } else if(id.toString() === 'newMessage'){
            let status = getCookie('status');
            let to = getCookie('to');
            let about = getCookie('about');
            let content = getCookie('content');

            if(status !== ''){
                if(status === 'success'){
                    document.getElementById('lecturerContent').innerHTML +=  "<p id='success'>Съобщението е изпратено успешно.</p>";
                } else {
                    messagesHeader();
                    forms.makeNewMessageForm(to, about);

                    document.getElementsByName('content')[0].value = content;

                    document.getElementById('invalid').innerHTML = status;
                    document.getElementById('invalid').style.display = 'block';
                }

                document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;"; 
            } else {
                messagesHeader();
                forms.makeNewMessageForm(to, about);
            }

            document.cookie = "to=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "about=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            document.cookie = "content=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
        } else if(id.toString() === 'winter' || id.toString() === 'summer'){
            electives('lecturerContent', id.toString());
		}
    } else {
        lecturerPage();
    }
    
}
