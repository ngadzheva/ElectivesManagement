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

    schedule: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let schedule = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = schedule;
            }    
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=schedule", true);
        ajaxRequest.send(null);
    },

    exams: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let exams = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = exams;
            }    
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=exams", true);
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

    showSuggestions: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let suggestions = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = suggestions;
            }   

            makeColumn('Преглед', true);
            makeNewRow();
        }

        ajaxRequest.open("GET", "php/studentsConnection.php?id=showSuggestions", true);
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
    makeProfileEditForm: (type, email) =>{
        let editForm = "<fieldset id='editForm'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
        "<form name='edit' method='post' action='php/studentsConnection.php'>\n" +
            "<label class='error' id='invalid' style='display: none;'></label>\n" +
            "<label class='editProfile'>E-mail:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='email' name='email' value='" + email + "'></input>\n" +
            "<label class='editProfile'>Парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='password'></input>\n" +
            "<label class='editProfile'>Нова парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='newPassword'></input>\n" +
            "<label class='editProfile'>Потвърди парола:<mark id='star'>*</mark></label>\n" +
            "<input class='editProfile' type='password' name='confirmPassword'></input>\n" +
            "<input class='editProfile' type='submit' value='Запази'></input>\n" +
        "</form>\n" +
        "</fildset>\n";
    
        return editForm;
    },

    /**
     * Make template for form for suggesting new elective
     */
    makeSuggestionForm: (name, year) =>{
        let suggestForm = "<fieldset id='suggestionForm'>\n" +
        "<legend class='makeSuggestion'>Предлагане на избираема дисциплина</legend>\n" + 
        "<form name='suggestion' method='post' action='php/studentsConnection.php'>\n" +
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
    
        document.getElementById('studentContent').innerHTML = suggestForm;
    
        return suggestForm;
    },

    /**
     * Make template of form for sending messages
     */
    makeNewMessageForm: (to, about) => {
        let messageForm = "<fieldset id='messageForm'>\n" +
        "<legend class='sendMessage'>Ново съобщение</legend>\n" + 
        "<form name='message' method='post' action='php/studentsConnection.php'>\n" +
            "<label class='error' id='invalid' style='display: none;'></label>\n" +
            "<label class='sendMessage'>До:<mark id='star'>*</mark></label>\n" +
            "<input class='sendMessage' type='email' name='to' placeholder='lecturer@email.bg' value='" + to + "'></input>\n" +
            "<label class='sendMessage'>Относно:</label>\n" +
            "<input class='sendMessage' type='text' name='about' value='" + about + "'></input>\n" +
            "<textarea class='sendMessage' name='content' placeholder='Напиши своето съобщение тук...'></textarea>\n" +
            "<input class='sendMessage' type='submit' value='Изпрати'></input>\n" +
        "</form>\n" +
        "</fildset>\n";
    
        document.getElementById('studentContent').innerHTML += messageForm;
    
        return messageForm;
    }
};

/**
 * Make last row of table for adding new suggestion
 */
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
    img.setAttribute('src', 'img/add.png');
    td.appendChild(img);
    row.appendChild(td);

    document.getElementById('electivesList').appendChild(row);
}

/**
 * Make last column of table for selecting table's row
 * @param {*} columnType 
 */
function makeNewColumn(columnType){
    let th = document.createElement('th');
    let value = document.createTextNode(columnType);
    th.appendChild(value);
    document.getElementById('firstRow').appendChild(th);

    let tr = document.getElementsByClassName('elective');

    if(columnType === 'Преглед'){
        for(let i = 0; i < tr.length; i++){
            let td = document.createElement('td');
            let img = document.createElement('img');
            img.setAttribute('class', 'viewIcon');
            img.setAttribute('title', 'Преглед');

            let receiver = '';
            let sender = '';
            let date = tr[i].lastChild.innerHTML;

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
        for(let i = 0; i < tr.length; i++){
            let icon = tr[i].lastChild.innerHTML == '' ? 'add.png' : 'delete.png';
            let elective = tr[i].firstChild.innerHTML;
            let credits = tr[i].children[2].innerHTML;
            let action = tr[i].lastChild.innerHTML == '' ? 'Запиши' : 'Отпиши';

            let td = document.createElement('td');
            let img = document.createElement('img');
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
    document.getElementById('new').addEventListener('click', forms.makeNewMessageForm);
}

/**
 * Edit email and password
 */
function editProfile(){
    let email = getCookie('email');
    document.getElementById('studentContent').innerHTML = forms.makeProfileEditForm("Редактиране на профил", email);   
}

/**
 * Enroll for elective
 */
function showElectivesCampaign(){
    connectToServer.showCampaign();
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
    document.location = 'student.html?id=makeSuggestion';
    forms.makeSuggestionForm();
}

/**
 * Control messages
 */
function message(){
    messagesHeader();
    connectToServer.showMessages('income');
}

/**
 * Show student's schedule
 */
function showSchedule(){
    connectToServer.schedule();
}

/**
 * Show student's exams
 */
function showExams(){
    connectToServer.exams();
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
const studentPage = () => {
    connectToServer.studentInfo();

    let electivesCampaign = document.getElementById('electivesCampaign');
    let electivesSuggestions = document.getElementById('electivesSuggestions');
    let schedule = document.getElementById('schedule');
    let exams = document.getElementById('exams');
    let message = document.getElementById('message');
    let references = document.getElementById('references');

    electivesCampaign.addEventListener('click', showElectivesCampaign);
    electivesSuggestions.addEventListener('click', showElectivesSuggestions);
    schedule.addEventListener('click', showSchedule);
    exams.addEventListener('click', showExams);
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
    let id = params.get('id');

    if(id){
        document.getElementById('profile').style.display = 'none';

        if(id.toString() === 'editProfile'){
            let status = getCookie('status');

            if(status !== ''){
                if(status === 'success'){
                    document.getElementById('studentContent').innerHTML =  "<p id='success'>Успешно обновена информация.</p>";
                } else {
                    editProfile();

                    document.getElementById('invalid').innerHTML = status;
                    document.getElementById('invalid').style.display = 'block';
                }

                document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;"; 
            } else {
                editProfile();
            }
            
        } else if(id.toString() === 'electivesCampaign'){
            showElectivesCampaign();
        } else if(id.toString() === 'electivesSuggestions'){
            showElectivesSuggestions();
        } else if(id.toString() === 'makeSuggestion'){
            let status = getCookie('status');
            let name = getCookie('name');
            let description = getCookie('description');
            let year = getCookie('year');
            let term = getCookie('term');
            let cathegory = getCookie('cathegory');

            if(status !== ''){
                if(status === 'success'){
                    document.getElementById('studentContent').innerHTML =  "<p id='success'>Успешно добавено предложение.</p>";
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
        } else if(id.toString() === 'schedule'){
            showSchedule();
        } else if(id.toString() === 'exams'){
            showExams();
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
        } else if(id.toString() === 'newMessage'){
            let status = getCookie('status');
            let to = getCookie('to');
            let about = getCookie('about');
            let content = getCookie('content');

            if(status !== ''){
                if(status === 'success'){
                    document.getElementById('studentContent').innerHTML +=  "<p id='success'>Съобщението е изпратено успешно.</p>";
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
            electives('studentContent', id.toString());
        }
    } else {
        studentPage();
    }  
}