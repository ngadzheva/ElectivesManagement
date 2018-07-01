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
            return currentCookie.substring(name.length, currentCookie.length);
        }
    }
    return '';
}

/**
 * Send data to server and retrieve data from server
 */
const connectToServer =  {
    serverRequest: () => {
        let ajaxRequest;

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

        return ajaxRequest;
    },

    load: (elective) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               let info = JSON.parse(response); 
                
                document.getElementById('lecturerContent').innerHTML = info['lecturer'];
                document.getElementById('ratingCount').innerHTML += info['rating'];
                document.getElementById('termType').innerHTML += info['term'];
                document.getElementById('yearType').innerHTML += info['year'];
                document.getElementById('bachelorProgrameType').innerHTML += info['bachelorPrograme'];
                document.getElementById('numOfCredits').innerHTML += info['credits'];
                document.getElementById('cathegoryType').innerHTML += info['cathegory'];
                document.getElementById('descriptionContent').innerHTML = info['description'];
                document.getElementById('subjectsContent').innerHTML = info['subjects'];
                document.getElementById('literatureContent').innerHTML = info['literature'];
            }    
        }

        ajaxRequest.open('GET', '../php/description.php?type=active&elective=' + elective, true);
        ajaxRequest.send(null);
    },

    dislike: () => {
        let ajaxRequest = connectToServer.serverRequest();
        let elective = getCookie('elective');

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               
               document.getElementById('ratingCount').innerHTML = '<mark id="bold">Рейтинг: </mark>' + response;
               document.getElementById('like').style.opacity = '0.5';
               document.getElementById('like').style.filter = 'alpha(opacity=50)';
               document.getElementById('dislike').style.opacity = '1';
               document.getElementById('dislike').style.filter = 'alpha(opacity=100)';
            }    
        }

        ajaxRequest.open('GET', '../php/description.php?type=active&vote=dislike&elective=' + elective, true);
        ajaxRequest.send(null);
    }, 

    like: () => {
        let ajaxRequest = connectToServer.serverRequest();
        let elective = getCookie('elective');

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               
               document.getElementById('ratingCount').innerHTML = '<mark id="bold">Рейтинг: </mark>' + response;
               document.getElementById('dislike').style.opacity = '0.5';
               document.getElementById('dislike').style.filter = 'alpha(opacity=50)';
               document.getElementById('like').style.opacity = '1';
               document.getElementById('like').style.filter = 'alpha(opacity=100)';
            }    
        }

        ajaxRequest.open('GET', '../php/description.php?type=active&vote=like&elective=' + elective, true);
        ajaxRequest.send(null);
    },

    getComments: (elective) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               
               document.getElementById('userCommentsList').innerHTML = response;
            }    
        }

        ajaxRequest.open('GET', '../php/description.php?type=active&comments&elective=' + elective, true);
        ajaxRequest.send(null);
    }, 
    
    postComment: (elective, comment) => {
        let ajaxRequest = connectToServer.serverRequest();

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
               let response = ajaxRequest.responseText;
               
               document.getElementById('userCommentsList').innerHTML = response;
            }    
        }

        ajaxRequest.open('GET', '../php/description.php?type=active&elective=' + elective +  '&postedComment=' + comment, true);
        ajaxRequest.send(null);
    }
};

/*
 * Close the comments section
 */
function closeComments(){
    document.getElementById('commentsOverlay').style.display = 'none';
}

/*
 * Open the comments section
 */
function openComments(){
    let elective = getCookie('elective');

    connectToServer.getComments(elective);
    document.getElementById('commentsOverlay').style.display = 'block';
}

/*
 * Post new comment
 */
function postComment(){
    let elective = getCookie('elective');

    let textarea = document.getElementById('writeComment');
    let comment = textarea.value;
    connectToServer.postComment(elective, comment);

    textarea.value = '';
}

function back(){
    let lastLocation = getCookie('lastLocation');
    window.open(lastLocation, '_self');
}

/**
 * Set listeners
 */
const listeners = {
    setClick: () => {
        document.getElementById('dislike').addEventListener('click', connectToServer.dislike);
        document.getElementById('like').addEventListener('click', connectToServer.like);
        document.getElementById('back').addEventListener('click', back);
        document.getElementById('comment').addEventListener('click', openComments);
        document.getElementsByClassName('closebtn')[0].addEventListener('click', closeComments);
    }
};

/**
 * Load description page
 */
const descriptionPage = () => {
    let elective = getCookie('elective');

    document.getElementById('title').innerHTML = elective;

    connectToServer.load(elective);

    listeners.setClick();
};

/**
 * Load window
 */
window.onload = () => {
    descriptionPage();
};