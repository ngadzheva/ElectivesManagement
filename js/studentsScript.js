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

        ajaxRequest.open("POST", "php/studentsConnection.php", true);
        ajaxRequest.send(null);
    },
    
    editInfo: () => {
        let email = getElementsByName('email')[0].value;
        let pass = getElementsByName('password')[0].value;
        let newPass = getElementsByName('newPassword')[0].value;
        let confirmPass = getElementsByName('confirmPassword')[0].value;

        if(newPass !== confirmPass){
            let p = document.createElement('p');
            p.innerHTML = 'Двете пароли не съвпадат';
            document.getElementById('editForm').appendChild(p);

            return false;
        } else {
            let ajaxRequest = connectToServer.serverRequest();

            ajaxRequest.onreadystatechange = function(){
                if(ajaxRequest.readyState == 4){
                    let response = ajaxRequest.responseText;

                    if(response === 'Incorrect pass'){
                        let p = document.createElement('p');
                        p.innerHTML = 'Грешна парола';
                        document.getElementById('editForm').appendChild(p);

                        return false;
                    } else {
                        window.open('student.html', '_self');
                        let article = document.createElement('article');
                        article.innerHTML = 'Успешно редактиране на данните.';
                        document.getElementById('profile').appendChild(article);
                    }
                    
                }    
            }

            ajaxRequest.open("POST", "php/studentsConnection.php?email=" + email + '&pass=' + pass + '&newPass=' + newPass, true);
            ajaxRequest.send(null);
        }
    },

    references: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let ref = ajaxRequest.responseText;
                
                document.getElementById('studentContent').innerHTML = ref;
            }    
        }

        ajaxRequest.open("POST", "php/creditsReferences.php", true);
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
    "<form name='edit' method='post' onsubmi='return connectToServer.editInfo()'>\n" +
        "<legend class='editProfile'>" + type + "</legend>\n" + 
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
 * Get cookie by cookie name
 * @param {*} cname 
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Edit email and password
 */
function editProfile(){
    document.getElementById('profile').style.display = 'none';
    email = getCookie('email');
    document.getElementById('studentContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);    
}

/**
 * Enroll for elective
 */
function chooseElective(){
    
}

/**
 * Control messages
 */
function message(){
    
}

/**
 * Show student references
 */
function showReferences(){
    document.getElementById('profile').style.display = 'none';
    connectToServer.references();
}

/**
 * Load student's page
 */
var studentPage = () => {
    connectToServer.studentInfo();

    let profile = document.getElementById('profile');
    let electives = document.getElementById('electives');
    let message = document.getElementById('message');
    let references = document.getElementById('references');

    profile.addEventListener('click', editProfile);
    electives.addEventListener('click', chooseElective);
    message.addEventListener('click', message);
    references.addEventListener('click', showReferences);
}

/**
 * List electives depending on the selected
 * @param {*} element 
 * @param {*} term 
 * @param {*} page 
 */
function electives(element, term, page){
    listElectives(element, term, page);
}

/**
 * Load window
 */
window.onload = () => {
    var params = new URLSearchParams(window.location.search);
    id = params.get('id');

    if(id){
        if(id.toString() === 'editProfile'){
            editProfile();
        } else if(id.toString() === 'electives'){
            chooseElectives();
        } else if(id.toString() === 'message'){
            message();
        } else if(id.toString() === 'references'){
            showReferences();
        } 
    } else {
        studentPage();
    }
    
}