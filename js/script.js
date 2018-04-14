/* Holds the connection with the server */
var ajaxRequest;

/*
 * Toggle the description row - initially it is hidden. When clicked on elective's row,
 * it's description row is shown. On next click, it's hidden again.
 */
function showDescription(){
    /*
     * If the content of the row is hidden, change 'display' property to 'block' in 
     *  order to show it. Else, change it to 'none' to hide it
     */
    var elective = document.getElementsByClassName('elective');
	var description= document.getElementsByClassName('description');
				
	for (var i=0; i<description.length; i++){
		description[i].style.display = 'none';
		elective[i].elem = description[i];
		elective[i].addEventListener('click',function(event){
		    var style = event.target.elem.style;
			if (style.display=='none'){
				style.display = 'block';
            } else{
				style.display = 'none';
            }
		});
	}
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
function editElective(){
    document.getElementById('adminContent').innerHTML = makeEditForm("Редактиране на избираема дисциплина");
}

/*
 * Delete an elective
 */
function deleteElective(elective){
    connectToServer();
    ajaxRequest.open("GET", "php/deleteElective.php?id=" + elective, true);
    ajaxRequest.send(null);
}

/*
 * Show content of admin page. The content depends on the selected tab.
 */
function changeAdminContent(event, tab){
    if(tab == "Edit"){
        
    } else if(tab == "Winter"){
        connectToServer();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                var ajaxDisplay = document.getElementById("adminContent");
                ajaxDisplay.innerHTML = ajaxRequest.responseText;
            }

            makeNewColumn("Редактиране");

            var img = document.createElement('img');
            img.setAttribute('id', 'addIcon');
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

            makeNewColumn("Редактиране");

            var img = document.createElement('img');
            img.setAttribute('id', 'addIcon');
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
function makeNewColumn(name){
    var th = document.createElement('th');
    var value = document.createTextNode(name);
    th.appendChild(value);
    document.getElementById('firstRow').appendChild(th);

    var tr = document.getElementsByClassName('elective');
    var td = document.createElement('td');
    
    if(name == "Преглед"){
        var img = document.createElement('img');
        img.setAttribute('class', 'viewIcon');
        img.setAttribute('onclick', 'viewDescription()');
        img.setAttribute('src', 'img/view.png');
        td.appendChild(img);
    } else if(name == "Редактиране"){
        var img = document.createElement('img');
        img.setAttribute('class', 'editIcon');
        img.setAttribute('onclick', 'editElective()');
        img.setAttribute('src', 'img/edit.png');
        td.appendChild(img);

        img = document.createElement('img');
        img.setAttribute('class', 'deleteIcon');
        img.setAttribute('onclick', 'deleteElective()');
        img.setAttribute('src', 'img/delete.png');
        td.appendChild(img);
    }

    for(var i = 0; i < tr.length; i++){
        tr[i].appendChild(td);
    }
}

/*
 * Template of a form for adding/updating an elective
 */
function makeEditForm(type){
    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' action='php/addElective.php'>\n" +
        "<legend class='editElective'>" + type + "</legend>\n" + 
        "<label class='editElective'>Избираема дисциплина</label>\n" +
        "<input class='editElective' type='text' name='title'></input>\n" +
        "<label class='editElective'>Лектор</label>\n" +
        "<input class='editElective' type='text' name='lecturer'></input>\n" +
        "<label class='editElective'>Описание</label>\n" +
        "<textarea class='editElective' rows='10' name='description'></textarea>\n" +
        "<label class='editElective'>Кредити</label>\n" +
        "<input class='editElective' type='text' name='credits'></input>\n" +
        "<label class='editElective'>Категория</label>\n" +
        "<input class='editElective' type='text' name='cathegory'></input>\n" +
        "<label class='editElective'>Семестър</label>\n" +
        "<input class='editElective' type='text' name='term'></input>\n" +
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

/*
 * Show content of lecturer page. The content depends on the selected tab.
 */
function changeLectureContent(event, tab){
    if(tab == "Student"){
        
    } else if(tab == "Evaluation"){
      
    } else if(tab == "Message"){
        
    } else if(tab == "References"){
        
    } else if(tab == "Editing"){
        
    } else if(tab == "New"){
        
    }
}
