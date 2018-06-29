/*
 * Connect to the server
 */
function connect(){
    let ajax;

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

    return ajax;
}

/**
 * Filter electives 
 */
function filterElectives(element) {
    let ajax = connect();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            let ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = makeFilterForm(element) + ajax.responseText;

            makeColumn('Преглед'); 
        }
    }

    let form = new FormData(document.querySelector('form'));
    let filter = form.get('filter');
    
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id').toString();
    let value = form.get('value');

    ajax.open('GET', 'electives.php?id=' + id + '&filter=' + filter + '&value=' + value, true);
    ajax.send(null);
}

/**
 * Make filter form
 */
function makeFilterForm(element){
    let filterForm = "<form class='filter' method='get' action=''>" + 
    "<input class='search' type='text' name='value'></input>" +
    "<select class='search' name='filter'>" +
        "<option value='name'>Име на дисциплина</option>" +
        "<option value='lecturer'>Име на лектор</option>" +   
        "<option value='credits'>Кредити</option>" + 
        "<option value='recommendedYear'>Курс</option>" +    
        "<option value='recommendedBachelorProgram'>Специалност</option>" +                        
        "<option value='cathegory'>Категория</option>" +
        "<option value='rating'>Рейтинг на дисциплина</option>" +
    "</select>" +
    "<input type='button' value='Филтриране' onclick='filterElectives(\"" + element + "\")'></input>" +
    "</form>";

    return filterForm;
}

/*
 * Show a table with the electives depending on the selected term
 */
function listElectives(element, term){
    let ajax = connect();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            let ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = makeFilterForm(element)  + /*makeSortForm(element) +*/ ajax.responseText;
        }

        makeColumn('Преглед');
    }

    let id;
    if(term){
        document.getElementById('profile').style.display = 'none';
        id = term;
    } else {
        let params = new URLSearchParams(window.location.search);
        id = params.get('id').toString();
    }

    ajax.open('GET', 'electives.php?id=' + id, true);
    ajax.send(null);
}

/*
 * Add new column to the table with electives according to current location
 */
function makeColumn(name, isSuggestion){
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

            let elective = isSuggestion ? tr[i].childNodes[0].innerHTML : tr[i].childNodes[1].innerHTML;
            img.setAttribute('onclick', 'viewDescription("' + elective + '", ' + isSuggestion + ')');            
            img.setAttribute('src', 'img/view.png');
            td.appendChild(img);
            tr[i].appendChild(td);
        }
    } else if(name == 'Редактиране'){
        for(let i = 0; i < tr.length; i++){
            let title, lecturer, credits, cathegory;
            let cols = tr[i].getElementsByTagName('td');
            title = cols[0].innerHTML;
            lecturer = cols[1].innerHTML;
            credits = cols[2].innerHTML;
            cathegory = cols[3].innerHTML;

            let td = document.createElement('td');
            let img = document.createElement('img');
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
function viewDescription(elective, isSuggestion){
    document.cookie = 'elective=' + elective;
    document.cookie = 'lastLocation=' + window.location.href;

    let page = isSuggestion ? 'suggestion.html' : 'description.html';
    window.location.replace(page);
}