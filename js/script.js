/* Holds the connection with the server */
var ajaxRequest;

/*
 * Load elective's list page
 */
function loadElectives(term){
    document.getElementById('adminProfile').style.display = 'none';
    document.getElementById('adminContent').innerHTML = '<iframe width="100%" height="100%" src="electives.hmtl"></iframe>';
}

/*
 * Connect to the server
 */
function connectToServer(){
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
}

/*
 * Show a table with the electives depending on the selected term
 */
function listElectives(element){
    connectToServer();

    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }

        makeNewColumn("Преглед");

    }

    var params = new URLSearchParams(window.location.search);
    id = params.get('id').toString();
    ajaxRequest.open("GET", "electives.php?id=" + id, true);
    ajaxRequest.send(null);
}

/*
 * Increase the rating of an electtive
 */
function like(name){
    connectToServer();

    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById('like');
            ajaxDisplay.style.opacity = '1';
            ajaxDisplay.style.filter = 'alpha(opacity=100)'; /* For Internet Explorer 8 and earlier */
        }

    }

    ajaxRequest.open("POST", "../php/vote.php?id=like&name=" + name, true);
    ajaxRequest.send(null);
}

/*
 * Decrease the rating of an electtive
 */
function dislike(name){
     connectToServer();

    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById('dislike');
            ajaxDisplay.style.opacity = 1;
            ajaxDisplay.style.filter = 'alpha(opacity=100)'; /* For Internet Explorer 8 and earlier */
        }

    }

    ajaxRequest.open("POST", "../php/vote.php?id=dislike&name=" + name, true);
    ajaxRequest.send(null);
}

/*
 * Add new elective
 */
function addElective(){
    document.getElementById('adminContent').innerHTML = makeEditForm("Добавяне на нова избираема дисциплина");
}

/*
 * Update the information about an elective
 */
function editElective(title, lecturer, credits, cathegory, term){
    document.getElementById('adminContent').innerHTML = makeEditForm("Редактиране на избираема дисциплина", title, lecturer, credits, cathegory, term);
}

/*
 * Delete an elective
 */
function deleteElective(elective){
    connectToServer();
    ajaxRequest.open("POST", "php/deleteElective.php?id=" + elective, true);
    ajaxRequest.send(null);
}

/*
 * Show content of admin page. The content depends on the selected tab.
 */
function changeAdminContent(event, tab){
    document.getElementById('adminProfile').style.display = 'none';
    if(tab == "Edit"){
        
    } else if(tab == "Winter"){
        connectToServer();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                var ajaxDisplay = document.getElementById("adminContent");
                ajaxDisplay.innerHTML = ajaxRequest.responseText;
            }

            makeNewColumn("Редактиране", "winter");

            var img = document.createElement('img');
            img.setAttribute('id', 'addIcon');
            img.setAttribute('title', 'Добави');
            img.setAttribute('onclick', 'addElective()');
            img.setAttribute('src', 'img/add.png');
            document.getElementById('adminContent').appendChild(img);
        }

        ajaxRequest.open("GET", "electives.php?id=winter", true);
        ajaxRequest.send(null);
    } else if(tab == "Summer"){
        connectToServer();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                var ajaxDisplay = document.getElementById("adminContent");
                ajaxDisplay.innerHTML = ajaxRequest.responseText;
            }

            makeNewColumn("Редактиране", "summer");

            var img = document.createElement('img');
            img.setAttribute('id', 'addIcon');
            img.setAttribute('title', 'Добави');
            img.setAttribute('onclick', 'addElective()');
            img.setAttribute('src', 'img/add.png');
            document.getElementById('adminContent').appendChild(img);
        }

        ajaxRequest.open("GET", "electives.php?id=summer", true);
        ajaxRequest.send(null);
    } else if(tab == "Profiles"){
        
    }
}

/*
 * Opem the page with the description of the elective
 */
function viewDescription(){
    var params = new URLSearchParams(window.location.search);
    id = params.get('id').toString();

    if(id == 'winter'){
        window.location.replace("html/UZ.html");
    } else{
        window.location.replace("html/EO.html");
    }
}

/*
 * Add new column to the table with electives according to current location
 */
function makeNewColumn(name, term){
    var th = document.createElement('th');
    var value = document.createTextNode(name);
    th.appendChild(value);
    document.getElementById('firstRow').appendChild(th);

    var tr = document.getElementsByClassName('elective');
    
    if(name == "Преглед"){
        for(var i = 0; i < tr.length; i++){
            var td = document.createElement('td');
            var img = document.createElement('img');
            img.setAttribute('class', 'viewIcon');
            img.setAttribute('title', 'Преглед');
            img.setAttribute('onclick', 'viewDescription()');
            img.setAttribute('src', 'img/view.png');
            td.appendChild(img);
            tr[i].appendChild(td);
        }
    } else if(name == "Редактиране"){
        for(var i = 0; i < tr.length; i++){
            var title, lecturer, credits, cathegory;
            var cols = tr[i].getElementsByTagName('td');
            title = cols[0].innerHTML;
            lecturer = cols[1].innerHTML;
            credits = cols[2].innerHTML;
            cathegory = cols[3].innerHTML;

            var td = document.createElement('td');
            var img = document.createElement('img');
            img.setAttribute('class', 'editIcon');
            img.setAttribute('title', 'Редактирай');
            img.setAttribute('onclick', 'editElective("' + title + '", "' + lecturer + '", "' + credits + '", "' + cathegory + '", "' + term + '")');
            img.setAttribute('src', 'img/edit.png');
            td.appendChild(img);

            img = document.createElement('img');
            img.setAttribute('class', 'deleteIcon');
            img.setAttribute('title', 'Изтрий');
            img.setAttribute('onclick', 'deleteElective()');
            img.setAttribute('src', 'img/delete.png');
            td.appendChild(img);

            tr[i].appendChild(td);
        }
    }
}

/*
 * Template of a form for adding/updating an elective
 */
function makeEditForm(type, title, lecturer, credits, cathegory, term){
    if(!title){
        title = "";
    }

    if(!lecturer){
        lecturer = "";
    }

    if(!credits){
        credits = "";
    }

    if(!cathegory){
        cathegory = "";
    }

    if(!term){
        term = "";
    }

    var selectedKP = "", selectedM = "", selectedOKN = "", selectedPM = "", selectedS = "", selectedH = "", selectedQKN = "";
    var selectedWinter = "", selectedSummer = "";

    switch(cathegory){
        case "КП": {
            selectedKP = "selected";
            break;
        }
        case "М": {
            selectedM = "selected";
            break;
        }
        case "ОКН": {
            selectedOKN = "selected";
            break;
        }
        case "ПМ": {
            selectedPM = "selected";
            break;
        }
        case "С": {
            selectedS = "selected";
            break;
        }
        case "Х": {
            selectedH = "selected";
            break;
        }
        case "ЯКН": {
            selectedQKN = "selected";
            break;
        }
    }
    
    switch(term){
        case "winter": {
            selectedWinter = "selected";
            break;
        }
        case "summer": {
            selectedSummer = "selected";
            break;
        }
    }

    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' action='php/addElective.php'>\n" +
        "<legend class='editElective'>" + type + "</legend>\n" + 
        "<label class='editElective'>Избираема дисциплина</label>\n" +
        "<input class='editElective' type='text' name='title' value='" + title + "'></input>\n" +
        "<label class='editElective'>Лектор</label>\n" +
        "<input class='editElective' type='text' name='lecturer' value='" + lecturer + "'></input>\n" +
        "<label class='editElective'>Кредити</label>\n" +
        "<input class='editElective' type='text' name='credits' value='" + credits + "'></input>\n" +
        "<label class='editElective'>Категория</label>\n" +
        "<select class='editElective' >\n" +
            "<option value='КП' " + selectedKP + ">Компютърен практикум</option>" + 
            "<option value='М' " + selectedM + ">Математика</option>" +
            "<option value='ОКН' " + selectedOKN + ">Основи на компютърните науки</option>" +
            "<option value='ПМ' " + selectedPM + ">Приложна математика</option>" +
            "<option value='С' " + selectedS + ">Семинар</option>" +
            "<option value='Х' " + selectedH + ">Хуманитарни</option>" +
            "<option value='ЯКН' " + selectedQKN + ">Ядро на компютърните науки</option>" +
        "</select>" +
        "<label class='editElective'>Семестър</label>\n" +
        "<select class='editElective'>\n" +
            "<option value='winter' " + selectedWinter + ">Зимен</option>" +
            "<option value='summer' " + selectedSummer + ">Летен</option>" +
        "</select>" +
        "<input class='editElective' type='submit' value='Добави'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

/*
 * Close the comments section
 */
function closeComments(){
    document.getElementById('commentsOverlay').style.display = 'none';
}

/*
 * Open the comments section
 */
function openComments(){
    document.getElementById('commentsOverlay').style.display = 'block';
}

/*
 * Post new comment
 */
function postComment(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = day + '.' + month + '.' + year;

    var textarea = document.getElementById('writeComment');

    var comment = textarea.value;
    var newComment = document.createElement('section');
    newComment.setAttribute('class', 'userComments');

    var h4 = document.createElement('h4');
    h4.innerHTML = 'Иван Иванов';

    var time = document.createElement('time');
    time.innerHTML = today;
    h4.appendChild(time);
    
    newComment.appendChild(h4);

    var p = document.createElement('p');
    p.innerHTML = comment;
    newComment.appendChild(p);

    document.getElementById('commentContent').appendChild(newComment);
    textarea.value = '';
}