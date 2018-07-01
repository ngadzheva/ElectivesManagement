/**
 * Get cookie by cookie name
 * @param {*} cookieName 
 */
function getCookie(cookieName) {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for(let i = 0; i <cookies.length; i++) {
        let currentCookie = cookies[i];
        while (currentCookie.charAt(0) == ' ') {
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) == 0) {
            return decodeURIComponent(currentCookie.substring(name.length, currentCookie.length).replace(/\+/g, ' '));
        }
    }
    return '';
}

/**
 * Show and hide input fields for student and lecturer
 */
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

/**
 * Display input fields for student or lecturer depending on selected user type
 */
const select = {
    value: () => {
        let select = document.getElementById('userType');
        let userType = select.options[select.selectedIndex].value;

        display.none();
        display.block(userType);
    }
}

/**
 * Add onchange listener
 */
const listeners = {
    onchange: () => {
        document.getElementById('userType').addEventListener('change', select.value);
    }
};

/**
 * Load window
 */
window.onload = () => {
    display.none();
    listeners.onchange();

    let userType = getCookie('userType');
    let bachelorPrograme = getCookie('bachelorPrograme');

    if(userType === 'student'){
        display.block('student');
        document.getElementsByName('userType')[0].value = userType;
        document.cookie = 'userType=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;'; 
    } else if(userType === 'lecturer'){
        display.block('lecturer');
        document.getElementsByName('userType')[0].value = userType;
        document.cookie = 'userType=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;'; 
    }

    if(bachelorPrograme !== ''){
        document.getElementsByName('bachelorPrograme')[0].value = bachelorPrograme;
        document.cookie = 'bachelorPrograme=; expires=Thu, 01 Jan 1996 00:00:00 UTC; path=/;'; 
    }
}