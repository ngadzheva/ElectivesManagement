/* Holds the connection with the server */
var ajax;

/*
 * Connect to the server
 */
function connect(){
    try{
        /* Opera, Firefox, Safari */
        ajax = new XMLHttpRequest();
    } catch(e){
        /* Internet Explorer Browsers */
        try{
            ajax = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e){
            try{
                ajax = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(e){
                alert('Something went wrong with your browser!');
                return false;
            }
        }
    }
}

/**
 * Filter electives 
 */
function filterElectives(element) {
    connect();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            var ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = makeFilterForm(element) + /*makeSortForm(element) +*/  ajax.responseText;

            makeNewColumn("Преглед", id); 
        }
    }

    var form = new FormData(document.querySelector('form'));
    var filter = form.get("filter");
    
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id').toString();
    var value = form.get("value");

    ajax.open("GET", "electives.php?id=" + id + "&filter=" + filter + "&value=" + value, true);
    ajax.send(null);
}

/**
 * Sort electives 
 */
function sortElectives(element) {
    connect();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            var ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = makeFilterForm(element) + /*makeSortForm(element) +*/ ajax.responseText;

            makeNewColumn("Преглед", id); 
        }
    }

    var form = new FormData(document.querySelector('form'));
    var sort = form.get("sort");
    
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id').toString();
    var value = form.get("value");

    ajax.open("GET", "electives.php?id=" + id + "&sort=" + sort + "&value=" + value, true);
    ajax.send(null);
}

/**
 * Make filter form
 */
function makeFilterForm(element){
    var filterForm = "<form class='filter' method='get' action=''>" + 
    "<input class='search' type='text' name='value'></input>" +
    "<select class='search' name='filter'>" +
        "<option value='name'>Име на дисциплина</option>" +
        "<option value='lecturer'>Име на лектор</option>" +                                
        "<option value='cathegory'>Категория</option>" +
        "<option value='rating'>Рейтинг на дисциплина</option>" +
    "</select>" +
    "<input type='button' value='Филтриране' onclick='filterElectives(\"" + element + "\")'></input>" +
    "</form>";

    return filterForm;
}

/**
 * Make sort form
 */
function makeSortForm(element){
    var filterForm = "<form class='sort' method='get' action=''>" + 
    "<select class='search' name='sort'>" +
        "<option value='name'>Име на дисциплина</option>" +
        "<option value='lecturer'>Име на лектор</option>" +                                
        "<option value='cathegory'>Категория</option>" +
        "<option value='rating'>Рейтинг на дисциплина</option>" +
    "</select>" +
    "<input type='button' value='Сортиране' onclick='sortElectives(\"" + element + "\")'></input>" +
    "</form>";

    return filterForm;
}

/*
 * Show a table with the electives depending on the selected term
 */
function listElectives(element, term){
    connect();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            var ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = makeFilterForm(element)  + /*makeSortForm(element) +*/ ajax.responseText;
        }

        makeColumn("Преглед", term);
    }

    var id;
    if(term){
        document.getElementById('profile').style.display = 'none';
        id = term;
    } else {
        var params = new URLSearchParams(window.location.search);
        id = params.get('id').toString();
    }

    ajax.open("GET", "electives.php?id=" + id, true);
    ajax.send(null);
}

/*
 * Add new column to the table with electives according to current location
 */
function makeColumn(name, term){
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
            img.setAttribute('onclick', 'viewDescription("' + term + '")');            
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
 * Opem the page with the description of the elective
 */
function viewDescription(term){
    if(term == 'winter'){
        window.location.replace("html/UZ.html");
    } else{
        window.location.replace("html/EO.html");
    }
}