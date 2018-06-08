function validate(){
    var user = document.getElementsByName('user')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var valid = true;

    /*if(user === 'admin' && password === 'admin'){
        var action = document.getElementsByName('login')[0].setAttribute('action', 'admin.html');

        return true;
    } else if(user === 'lecturer' && password === 'lecturer'){
        var action = document.getElementsByName('login')[0].setAttribute('action', 'lecturer.html');

        return true;
    } else if(user === 'student' && password === 'student'){
        var action = document.getElementsByName('login')[0].setAttribute('action', 'student.html');

        return true;
    } else {
        var error = document.createElement('label');
        error.setAttribute('id', 'error');
        var value = document.createTextNode('Невалидно име или парола!');
        error.appendChild(value);
        var userNameLabel = document.getElementsByClassName('login')[1];
        document.getElementsByName('login')[0].insertBefore(userNameLabel, error);

        return false;
    }*/

    if (user === ""){
        document.getElementById("emptyUserName").style.display = "block";

        valid = false;
    } 

    if(password === ""){
        document.getElementById("emptyPassword").style.display = "block";

        valid = false;
    }

    if(valid){
        var ajaxRequest;

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

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                var userType = ajaxRequest.responseText;
                if(userType !== ""){
                    document.getElementById("login")[0].setAttribute("action", userType + ".html");
                } else {
                    document.getElementById("wrongData").style.display = "block";

                    return false;
                }
            }    
        }

        ajaxRequest.open("POST", "login.php?user=" + user + "&pass=" + password, true);
        ajaxRequest.send(null);
    } else {
        return valid;
    }
}