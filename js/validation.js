function validate(){
    var user = document.forms['login']['user'].value;
    var password = document.forms['login']['password'].value;

    if(user === 'admin' && password === 'admin'){
        var action = document.forms['login'].getAttribute('action');
        action.value = 'admin.html';

        return true;
    } else if(user === 'lecturer' && password === 'lecturer'){
        var action = document.forms['login'].getAttribute('action');
        action.value = 'lecturer.html';

        return true;
    } else if(user === 'student' && password === 'student'){
        var action = document.forms['login'].getAttribute('action');
        action.value = 'student.html';

        return true;
    } else {
        var error = document.createElement('label');
        var att = document.createAttribute('id');
        att.value = 'error';
        error.appendChild(att);
        var value = document.createTextNode('Невалидно име или парола!');
        error.appendChild(value);
        var userNameLabel = document.getElementsByClassName('login')[1];
        document.forms['login'].insertBefore(userNameLabel, error);

        return false;
    }
}