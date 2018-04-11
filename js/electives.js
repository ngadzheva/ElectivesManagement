function listElectives(){
    var ajaxRequest;

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
            var ajaxDisplay = document.getElementById('electives');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id').toString();
    ajaxRequest.open("GET", "electives.php?id=" + id, true);
    ajaxRequest.send(null);
}

