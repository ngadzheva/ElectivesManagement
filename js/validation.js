function validate(){
    var user = document.getElementsByName('user')[0].value;
    var password = document.getElementsByName('password')[0].value;

    if(user === 'admin' && password === 'admin'){
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
    }
}