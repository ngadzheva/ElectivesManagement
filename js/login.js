const validations = {
    showErrors: (errors) => {
        let error = document.createElement('label');
        error.innerHTML = errors;
        error.setAttribute('class', 'error');

        let form = document.getElementsByName('login')[0];
        form.insertBefore(error, form.childNodes[0]);
    }
}

window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    status = params.get('status');

    if(status === 'required'){
        let errors = 'Въведете потребителско име и парола.';
        validations.showErrors(errors);
    } else if(status === 'requiredp'){
        let errors = 'Въведете парола.';
        validations.showErrors(errors);
    } else if(status === 'requiredu'){
        let errors = 'Въведете потребителско име.';
        validations.showErrors(errors);
    } else if(status === 'wrong'){
        let errors = 'Грешни потребителско име и парола.';
        validations.showErrors(errors);
    } else if(status === 'wrongu'){
        let errors = 'Грешно потребителско име.';
        validations.showErrors(errors);
    } else if(status === 'wrongp'){
        let errors = 'Грешна парола.';
        validations.showErrors(errors);
    }
}