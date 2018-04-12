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
function connectToServer(element){
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

    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById(element);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }

        if(element == 'electives'){
                document.getElementsByClassName('Edit').style.display = 'none';
            }
    }
}

/*
 * Show a table with the electives depending on the selected term
 */
function listElectives(element){
    connectToServer(element);
    var params = new URLSearchParams(window.location.search);
    id = params.get('id').toString();
    ajaxRequest.open("GET", "electives.php?id=" + id, true);
    ajaxRequest.send(null);
}

/*
 * Show content of admin page. The content depends on the selected tab.
 */
function changeAdminContent(event, tab){
    if(tab == "Edit"){
        
    } else if(tab == "Winter"){
        connectToServer("adminContent");
        ajaxRequest.open("GET", "electives.php?id=winter", true);
        ajaxRequest.send(null);
    } else if(tab == "Summer"){
        connectToServer("adminContent");
        ajaxRequest.open("GET", "electives.php?id=summer", true);
        ajaxRequest.send(null);
    } else if(tab == "Profiles"){
        
    }
}

