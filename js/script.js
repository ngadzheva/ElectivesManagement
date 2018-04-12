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
        // Opera, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch(e){
        // Internet Explorer Browsers
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
    connectToServer(element);

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

function addElective(){
    document.getElementById('adminContent').innerHTML = makeEditForm();
}

function editElective(){
    document.getElementById('adminContent').innerHTML = makeEditForm();
}

function deleteElective(elective){
    connectToServer(elective);
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
            img.setAttribute('src', 'img/add.jpg');
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
            img.setAttribute('src', 'img/add.jpg');
            document.getElementById('adminContent').appendChild(img);
        }

        ajaxRequest.open("GET", "electives.php?id=summer", true);
        ajaxRequest.send(null);
    } else if(tab == "Profiles"){
        
    }
}

function viewDescription(){
    window.location.replace("html/description.html");
}

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

function makeEditForm(){
    var editForm = "<fieldset id='editForm'>\n" +
    "<form name='edit' method='post' action='php/addElective.php'>\n" +
        "<legend class='editElective'>Редактиране</legend>\n" + 
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
        "<input class='editElective' type='submit' value='Редактирай'></input>\n" +
        "<input class='editElective' type='submit' value='Отказ'></input>\n" +
    "</form>\n" +
    "</fildset>\n";

    return editForm;
}

