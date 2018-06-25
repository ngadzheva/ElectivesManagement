const validations = {
    showErrors: (errors) => {
        let error = document.createElement('label');
        error.innerHTML = errors;
        error.setAttribute('class', 'error');

        let form = document.getElementsByName('register')[0];
        form.insertBefore(error, form.childNodes[0]);
    }
};

const display = {
    none: () => {
        let student = document.getElementsByClassName('student');
        for(let i = 0; i < student.length; i++){
            student[i].style.display = 'none';
        }

        let lecturer = document.getElementsByClassName('lecturer');
        for(let i = 0; i < lecturer.length; i++){
            lecturer[i].style.display = 'none';
        }
    },

    block: (classType) => {
        let userType = document.getElementsByClassName(classType);
        for(let i = 0; i < userType.length; i++){
            userType[i].style.display = 'block';
        }
    }
};

const select = {
    value: () => {
        let select = document.getElementById("userType");
        let userType = select.options[select.selectedIndex].value;

        display.none();
        display.block(userType);
    }
}

const listeners = {
    onchange: () => {
        document.getElementById('userType').addEventListener('change', select.value);
    }
};

window.onload = () => {
    display.none();
    listeners.onchange();

    let params = new URLSearchParams(window.location.search);
    status = params.get('status');

    if(status === 'requiredn'){
        let errors = 'Въведете три имена.';
        validations.showErrors(errors);
    } else if(status === 'requiredp'){
        let errors = 'Въведете парола.';
        validations.showErrors(errors);
    } else if(status === 'requiredu'){
        let errors = 'Въведете потребителско име.';
        validations.showErrors(errors);
    } else if(status === 'requirede'){
        let errors = 'Въведете email.';
        validations.showErrors(errors);
    } else if(status === 'diff'){
        let errors = 'Двете пароли не съвпадат.';
        validations.showErrors(errors);
    } else if(status === 'requiredut'){
        let errors = 'Изберете тип потребител.';
        validations.showErrors(errors);
    } else if(status === 'requiredfn'){
        let errors = 'Въведете факултетен номер.';
        validations.showErrors(errors);
    } else if(status === 'requiredy'){
        let errors = 'Въведете курс.';
        validations.showErrors(errors);
    } else if(status === 'requiredbp'){
        let errors = 'Въведете специалност';
        validations.showErrors(errors);
    } else if(status === 'requiredd'){
        let errors = 'Въведете катедра.';
        validations.showErrors(errors);
    } 
}