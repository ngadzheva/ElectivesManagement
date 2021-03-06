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
                document.getElementById('email').innerHTML = info['email'];
                document.cookie = 'email=' + info['email'];
            }    
        }

        ajaxRequest.open("GET", "../php/adminConnection.php", true);
        ajaxRequest.send(null);
    }, 
    
    showActiveElectives: () => {
		let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                document.getElementById('adminContent').innerHTML =  show;
            }   
			
            makeColumn('Преглед', false, "active");
			makeNewColumn('Премахване на избираема');
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?id=activeElectives", true);
        ajaxRequest.send(null);
     },

    showSuggestedElectives: () => {
	    let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                document.getElementById('adminContent').innerHTML =  show;
            }
            makeColumn('Преглед', true, "suggestion");
			makeNewColumn('Добавяне на предложена');
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?id=suggestedElectives", true);
        ajaxRequest.send(null);
    },

    showDisabledElectives: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                document.getElementById('adminContent').innerHTML =  show;
            }   
            
            makeColumn('Преглед', false, "disabled");
            makeNewColumn('Активиране на избираема');
        }
        
        ajaxRequest.open("GET", "../php/adminConnection.php?id=disabledElectives", true);
        ajaxRequest.send(null);
    },


    showActive: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                document.getElementById('adminContent').innerHTML =  show;
            }   
			
			makeNewColumn('Премахване на потребител');
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?id=activeUsers", true);
        ajaxRequest.send(null);
    },
    
    showDisabled: () => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                let show = ajaxRequest.responseText;
                
                document.getElementById('adminContent').innerHTML =  show;
            }   
			
			 makeNewColumn('Активиране на потребител');
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?id=disableUsers", true);
        ajaxRequest.send(null);
    },

    addSuggested: (name) => {
        let ajaxRequest = connectToServer.serverRequest();
        
        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                connectToServer.showSuggestedElectives();
            }   
        }   
		
        ajaxRequest.open("GET", "../php/adminConnection.php?addSuggested=" + name, true);
        ajaxRequest.send(null);
    },
    
    deactivateElective: (name) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                connectToServer.showActiveElectives();
            }   
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?deactivateElective=" + name, true);
        ajaxRequest.send(null);
    },

    activаteElective: (name) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                connectToServer.showDisabledElectives();
            }   
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?activateElective=" + name, true);
        ajaxRequest.send(null);
    },

    activateUser: (name) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                connectToServer.showDisabled();
            }   
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?activateUser=" + name, true);
        ajaxRequest.send(null);
    },

    deactivateUser: (name) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                connectToServer.showActive();
            }   
        }
		
        ajaxRequest.open("GET", "../php/adminConnection.php?deactivateUser=" + name, true);
        ajaxRequest.send(null);
    }

    
}


function makeProfileEditForm(type, email){

    var editForm = "<fieldset id='editForm'>\n" +
	"<legend class='editProfile'>" + type + "</legend>\n" +
    "<form name='editProf' method='post' action='../php/adminConnection.php'>\n" +
        "<label class='error' id='invalid' style='display: none;'></label>\n" +
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

function addAdminForm(){
    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='addAdmin' method='post' action='../php/adminConnection.php'>\n" +
        "<legend class='editProfile'>Добавяне на администратор</legend>\n" + 
        "<label class='error' id='status' style='display: none;'></label>\n" +
        "<label class='editProfile'>Три имена:</label>\n" + 
        "<input class='editProfile' type='text' name='names'></input>\n" +
        "<label class='editProfile'>E-mail:</label>\n" +
        "<input class='editProfile' type='text' name='email' value=''></input>\n" +
        "<label class='editProfile'>Потребителско име:</label>\n" +
        "<input class='editProfile' type='text' name='userName'></input>\n" +
        "<label class='editProfile'>Парола:</label>\n" +
        "<input class='editProfile' type='password' name='password'></input>\n" +
        "<label class='editProfile'>Повтори парола:</label>\n" +
        "<input class='editProfile' type='password' name='confirmPassword'></input>\n" +
        "<input class='editProfile' type='submit' value='Запази'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

function addUserForm() {
    var editForm =  "<fieldset id='registerForm'>\n" +
    "<legend class='register'>Регистрация</legend>\n" +
    "<form name='register' method='post' action='../php/adminConnection.php'>\n" +
        "<label class='error' id='status' style='display: none;'></label>\n" +
        "<label class='register'>Три имена<mark id='star'>*</mark></label>\n" +
        "<input class='register' type='text' name='names' id='names'></input>\n" +
        "<label class='register'>Потребителско име<mark id='star'>*</mark></label>\n" +
        "<input class='register' type='text' name='user' id='userName'></input>\n" +
        "<label class='register'>Email<mark id='star'>*</mark></label>\n" +
        "<input class='register' type='email' name='email' id='email'></input>\n" +
        "<label class='register'>Парола<mark id='star'>*</mark></label>\n" +
        "<input class='register' type='password' name='password' id='pass'></input>\n" +
        "<label class='register'>Повтори парола<mark id='star'>*</mark></label>\n" +
        "<input class='register' type='password' name='confirmPassword' id='confirmPass'></input>\n" +
        "<label class='register'>Тип потребител<mark id='star'>*</mark></label>\n" +
        "<select class='register' name='userType' id='userType' onchange='changeUserType()'>\n" +
            "<option value='-' selected='selected'>-</option>\n" +
            "<option value='student'>студент</option>\n" +
            "<option value='lecturer'>лектор</option>\n" +
        "</select>\n" +
        "<label class='student'>Факултетен номер<mark id='star'>*</mark></label>\n" +
        "<input class='student' type='number' name='fn' id='fn' min='10000' max='99999'></input>\n" +
        "<label class='student'>Курс<mark id='star'>*</mark></label>\n" +
        "<input class='student' type='number' min='1' max='4' name='year' id='year'></input>\n" +
        "<label class='student'>Специалност<mark id='star'>*</mark></label>\n" +
        "<select class='student' name='bachelorPrograme'>\n" +
            "<option value='-' select='selected'>-</option>\n" +
            "<option value='Информатика'>Информатика</option>\n" +
            "<option value='Информационни системи'>Информационни системи</option>\n" +
            "<option value='Компютърни науки'>Компютърни науки</option>\n" +
            "<option value='Математика'>Математика</option>\n" +
            "<option value='Математика и информатика'>Математика и информатика</option>\n" +
            "<option value='Приложна математика'>Приложна математика</option>\n" +
            "<option value='Софтуерно инженерство'>Софтуерно инженерство</option>\n" +
            "<option value='Статистика'>Статистика</option>\n" +
        "</select>\n" +
        "<label class='lecturer'>Катедра<mark id='star'>*</mark></label>\n" +
        "<input class='lecturer' type='text' name='department' id='department'></input>\n" +
        "<label class='lecturer'>Телефон</label>\n" +
        "<input class='lecturer' type='tel' pattern='+359 [0-9]{1,4} [0-9]{2} [0-9]{2} [0-9]{2,3}' placeholder='+359 2 9999 999' name='telephone' id='telephone'></input>\n" +
        "<label class='lecturer'>Приемно време</label>\n" +
        "<input class='lecturer' type='text' name='visitingHours' id='visitingHours'></input>\n" +
        "<label class='lecturer'>Кабинет</label>\n" +
        "<input class='lecturer' type='text' name='office' id='office'></input>\n" +
        "<label class='lecturer'>Персонална страница</label>\n" +
        "<input class='lecturer' type='text' name='personalPage' id='personalPage'></input>\n" +
        "<input class='register' type='submit' id='regButton' value='Регистрация'></input>\n" +
    "</form>\n" +
    "</fieldset>\n"
    return editForm;
}

function makeColumn(name, isSuggestion, type){
    let th = document.createElement('th');
    let value = document.createTextNode(name);
    th.appendChild(value);
    document.getElementById('firstRow').appendChild(th);

    let tr = document.getElementsByClassName('elective');
    
    if(name == 'Преглед'){
        for(let i = 0; i < tr.length; i++){
            let td = document.createElement('td');
            let img = document.createElement('img');
            img.setAttribute('class', 'viewIcon');
            img.setAttribute('title', 'Преглед');

            let elective = tr[i].childNodes[0].innerHTML;
            img.setAttribute('onclick', 'viewDescription("' + elective + '", ' + isSuggestion + ', "' + type + '")');            
            img.setAttribute('src', '../img/view.png');
            td.appendChild(img);
            tr[i].appendChild(td);
        }
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
    if(tr.length == 0) {
        tr = document.getElementsByClassName("user");
    }
	
	if(columnType === 'Добавяне на предложена'){
		for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'addIcon');
            img.setAttribute('title', "Добавяне");
            
            var currentElement = tr[i].firstChild.innerHTML;
            
            img.setAttribute('onclick', 'connectToServer.addSuggested("' + currentElement + '")');       
            img.setAttribute('src', '../img/add.png');
            td.appendChild(img);
            tr[i].appendChild(td); 
		}
	} else if(columnType === 'Премахване на избираема'){
		for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'deleteIcon');
            img.setAttribute('title', "Премахване");
            
            var currentElement = tr[i].firstChild.innerHTML;
            
            img.setAttribute('onclick', 'connectToServer.deactivateElective("' + currentElement + '")');       
            img.setAttribute('src', '../img/delete.png');
            td.appendChild(img);
            tr[i].appendChild(td); 
		}
	} else if(columnType === 'Активиране на избираема'){
		for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'addIcon');
            img.setAttribute('title', "Активиране");
            
            var currentElement = tr[i].firstChild.innerHTML;
            
            img.setAttribute('onclick', 'connectToServer.activаteElective("' + currentElement + '")');       
            img.setAttribute('src', '../img/add.png');
            td.appendChild(img);
            tr[i].appendChild(td); 
		}
	} else if(columnType === 'Премахване на потребител'){
		for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'deleteIcon');
            img.setAttribute('title', "Премахване");
            
            var currentElement = tr[i].firstChild.innerHTML;
            
            img.setAttribute('onclick', 'connectToServer.deactivateUser("' + currentElement + '")');       
            img.setAttribute('src', '../img/delete.png');
            td.appendChild(img);
            tr[i].appendChild(td); 
		}
    } else if(columnType === 'Активиране на потребител'){
		for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img= document.createElement('img');
            img.setAttribute('class', 'addIcon');
            img.setAttribute('title', "Активиране");
            
            var currentElement = tr[i].firstChild.innerHTML;
            
            img.setAttribute('onclick', 'connectToServer.activateUser("' + currentElement + '")');       
            img.setAttribute('src', '../img/add.png');
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
    console.log(name);
    
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

const display = {
    none: () => {
        let student = document.getElementsByClassName('student');
        for(let i = 0; i < student.length; i++){
            student[i].style.display = 'none';
        }

        let lecturer = document.getElementsByClassName('lecturer');
        for(let i = 0; i < lecturer.length; i++){
            lecturer[i].style.display = 'none';
        }

        document.getElementById('regButton').style.display = 'none';
    },

    block: (classType) => {
        let userType = document.getElementsByClassName(classType);
        for(let i = 0; i < userType.length; i++){
            userType[i].style.display = 'block';
        }

        document.getElementById('regButton').style.display = 'block';
    }
};

function changeUserType() {
    let select = document.getElementById('userType');
    let userType = select.options[select.selectedIndex].value;

    display.none();

    if(userType !== '-') {
        display.block(userType);
    }
}

function editProfileInfo(){
    email = getCookie('email');
    document.getElementById('adminContent').innerHTML = makeProfileEditForm("Редактиране на профил", email);    
}

function addAdmin(){
    document.getElementById('adminContent').innerHTML = addAdminForm();    
}

function addUser(){
    document.getElementById('adminContent').innerHTML = addUserForm();
    display.none();  
}

function showActiveElectives() {
    document.getElementById('adminContent').innerHTML = connectToServer.showActiveElectives();
}

function showSuggestedElectives() {
    document.getElementById('adminContent').innerHTML = connectToServer.showSuggestedElectives();
}

function showDisabledElectives() {
    document.getElementById('adminContent').innerHTML = connectToServer.showDisabledElectives();
}

function showActive() {
    document.getElementById('adminContent').innerHTML = connectToServer.showActive();
}

function showDisabled() {
    document.getElementById('adminContent').innerHTML = connectToServer.showDisabled();
}

var adminPage = () => {
    connectToServer.adminInfo();

    let editProfile = document.getElementById('editProfile');
    let suggestedElectives = document.getElementById('suggestedElectives');
    let removeElectives = document.getElementById('removeElectives');
    let activateElectives = document.getElementById('activateElectives');
    let addAdmin = document.getElementById('addAdmin');
    let deleteUsers = document.getElementById('deleteUsers');
    let activateUsers = document.getElementById('activateUsers');
	
    editProfile.addEventListener('click', editProfileInfo);
    suggestedElectives.addEventListener('click', showSuggestedElectives);
    removeElectives.addEventListener('click', showActiveElectives);
    activateElectives.addEventListener('click', showDisabledElectives);
    addAdmin.addEventListener('click', addAdmin);
    deleteUsers.addEventListener('click', showActive);
    activateUsers.addEventListener('click', showDisabled);
}

window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    if(id){
        document.getElementById('profile').style.display = 'none';

        if(id.toString() === 'editProfile'){
            status = params.get('status');

            if(status === 'success'){
                document.getElementById('adminContent').innerHTML =  "<p id='success'>Успешно обновена информация.</p>";
            } else if(status === 'wrongPassword'){
                editProfileInfo();
                document.getElementById('invalid').innerHTML = "Грешна парола.";
                document.getElementById('invalid').style.display = 'block';
            } else if(status === 'notequal'){
                editProfileInfo();
                document.getElementById('invalid').innerHTML =  "Несъответстващи пароли.";                
                document.getElementById('invalid').style.display = 'block';
            } else {
                editProfileInfo();
            }
        } else if(id.toString() === 'suggestedElectives'){
            showSuggestedElectives();
        } else if(id.toString() === 'removeElectives'){
            showActiveElectives();
        } else if(id.toString() === 'activateElectives'){
            showDisabledElectives();
        } else if(id.toString() === 'addUser') {
            let status = getCookie('status');
            let userType = getCookie('userType');

            if(status != '') {
                addUser();
                display.block(userType);
                document.getElementById('userType').value = userType;
                document.getElementById('status').innerHTML =  status;                
                document.getElementById('status').style.display = 'block';
                document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            } else {
                addUser();
            }
        } else if(id.toString() === 'addAdmin'){
            let status = getCookie('status');

            if(status != '') {
                addAdmin();
                document.getElementById('status').innerHTML =  status;                
                document.getElementById('status').style.display = 'block';
                document.cookie = "status=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;";
            } else {
                addAdmin();
            }
            
        } else if(id.toString() === 'deleteUsers'){
            showActive();
        } else if(id.toString() === 'activateUsers'){
            showDisabled();
        } else if(id.toString() === 'winter' || id.toString() === 'summer'){
            listElectives('adminContent', id.toString());
		}
    } else {
        adminPage();
    }
}