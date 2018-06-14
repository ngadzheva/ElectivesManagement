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

    studentInfo: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               let info = JSON.parse(response); 
                
                document.getElementById('studentName').innerHTML = info['names'];
                document.getElementById('fn').innerHTML = info['fn'];
                document.getElementById('bachelorProgram').innerHTML = info['bachelorProgram'];
                document.getElementById('year').innerHTML = info['year'];
                document.cookie = 'email=' + info['email'];
            }    
        }

        ajaxRequest.open("GET", "php/studentsConnection.php", true);
        ajaxRequest.send(null);
    },

    references: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let ref = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = ref;
            }    
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=creditsReferences", true);
        ajaxRequest.send(null);
    },
    
    showCampaign: (action, elective, credits) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let campaign = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = campaign;
            }   

            makeNewColumn('Запиши');
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=showCampaign&action=" + action + "&elective=" + elective + "&credits=" + credits, true);
        ajaxRequest.send(null);
    },

    showMessages: (type) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let messages = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML += messages;
            }   
            
            makeNewColumn('Преглед');
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=showMessages&type=" + type, true);
        ajaxRequest.send(null);
    },

    viewMessage: (receiver, sender, date) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let messages = ajaxRequest.responseText;
                
                document.getElementById('messagesList').style.display = 'none';
                document.getElementById('studentContent').innerHTML +=  messages;
            }   
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?receiver=" + receiver + "&sender=" + sender + "&date=" + date, true);
        ajaxRequest.send(null);
    }
}

/**
 * Make template for edit form
 * @param {*} type 
 * @param {*} email 
 */
function makeProfileEditForm(type, email){

    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' action='php/studentsConnection.php'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
        "<label class='error' id='invalidPass' style='display: none;'>Невалидна парола.</label>\n" +
        "<label class='error' id='notEqual' style='display: none;'>Двете пароли не съвпадат</label>\n" +
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
            var icon = tr[i].lastChild.innerHTML == '' ? 'add.png' : 'delete.png';
            var elective = tr[i].firstChild.innerHTML;
            var credits = tr[i].children[2].innerHTML;
            var action = tr[i].lastChild.innerHTML == '' ? 'Запиши' : 'Отпиши';

            var td = document.createElement('td');
            var img = document.createElement('img');
            img.setAttribute('class', 'enrolIcon');
            img.setAttribute('title', action);
            img.setAttribute('onclick', 'connectToServer.showCampaign("' + action + '","' + elective + '","' + credits + '")');            
            img.setAttribute('src', 'img/' + icon);
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

/**
 * Edit email and password
 */
function editProfile(){
    email = getCookie('email');
    document.getElementById('studentContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);    
}

/**
 * Enroll for elective
 */
function showElectivesCampaign(){
    connectToServer.showCampaign();
}

/**
 * Make template of form for sending messages
 */
function makeNewMessageForm(){
    var messageForm = "<fieldset id='messageForm'>\n" +
    "<form name='message' method='post' action='php/studentsConnection.php'>\n" +
        "<legend class='sendMessage'>Ново съобщение</legend>\n" + 
        "<label class='error' id='invalidEmail' style='display: none;'>Невалиден email.</label>\n" +
        "<label class='sendMessage'>До:</label>\n" +
        "<input class='sendMessage' type='text' name='to' placeholder='lecturer@email.bg'></input>\n" +
        "<label class='sendMessage'>Относно:</label>\n" +
        "<input class='sendMessage' type='text' name='about'></input>\n" +
        "<textarea class='sendMessage' name='content' placeholder='Напиши своето съобщение тук...'></textarea>\n" +
        "<input class='sendMessage' type='submit' value='Изпрати'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    document.getElementById('studentContent').innerHTML += messageForm;

    return messageForm;
}

/**
 * Make message page header
 */
function messagesHeader(){
    let section = document.createElement('section');
    section.setAttribute('id', 'messagesNav');

    let incomeMessages = document.createElement('a');
    incomeMessages.setAttribute('href', 'student.html?id=incomeMessages');
    incomeMessages.setAttribute('class', 'messagesButton');
    incomeMessages.setAttribute('id', 'income');
    incomeMessages.innerHTML = 'Входящи съобщения';

    let sentMessages = document.createElement('a');
    sentMessages.setAttribute('href', 'student.html?id=sentMessages');
    sentMessages.setAttribute('class', 'messagesButton');
    sentMessages.setAttribute('id', 'sent');
    sentMessages.innerHTML = 'Изходящи съобщения';
    
    let newMessage = document.createElement('a');
    newMessage.setAttribute('href', 'student.html?id=newMessage');
    newMessage.setAttribute('class', 'messagesButton');
    newMessage.setAttribute('id', 'new');
    newMessage.innerHTML = 'Ново съобщение';

    section.appendChild(incomeMessages);
    section.appendChild(sentMessages);
    section.appendChild(newMessage);

    document.getElementById('studentContent').appendChild(section);

    document.getElementById('income').addEventListener('click', connectToServer.showMessages);
    document.getElementById('sent').addEventListener('click', connectToServer.showMessages);
    document.getElementById('new').addEventListener('click',makeNewMessageForm);
}

/**
 * Control messages
 */
function message(){
    messagesHeader();
    connectToServer.showMessages('income');
}

/**
 * Show student references
 */
function showReferences(){
    connectToServer.references();
}

/**
 * Load student's page
 */
var studentPage = () => {
    connectToServer.studentInfo();

    let profile = document.getElementById('profile');
    let electivesCampaign = document.getElementById('electivesCampaign');
    let message = document.getElementById('message');
    let references = document.getElementById('references');

    profile.addEventListener('click', editProfile);
    electivesCampaign.addEventListener('click', showElectivesCampaign);
    message.addEventListener('click', message);
    references.addEventListener('click', showReferences);
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
 * Load window
 */
window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    id = params.get('id');

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
            
        } else if(id.toString() === 'electivesCampaign'){
            showElectivesCampaign();
        } else if(id.toString() === 'messages'){
            message();
        } else if(id.toString() === 'references'){
            showReferences();
        } else if(id.toString() === 'incomeMessages'){
            messagesHeader();
            connectToServer.showMessages('income');
        } else if(id.toString() === 'sentMessages'){
            messagesHeader();
            connectToServer.showMessages('sent');
        }else if(id.toString() === 'newMessage'){
            let status = params.get('status');

            if(status === 'success'){
                messagesHeader();
                document.getElementById('studentContent').innerHTML +=  "<p id='success'>Съобщението е изпратено успешно.</p>";
            } else if(status === 'notfound'){
                messagesHeader();
                makeNewMessageForm();

                document.getElementById('invalidEmail').style.display = 'block';
            } else {
                messagesHeader();
                makeNewMessageForm();
            }
        } else if(id.toString() === 'winter' || id.toString() === 'summer'){
            electives('studentContent', id.toString());
        }
    } else {
        studentPage();
    }
    
}