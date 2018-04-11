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
 * Show content of admin page. The content depends on the selected tab.
 */
function changeAdminContent(event, tab){
    var i, tabContent, tabLinks;

    /*
     * Get all elements with class='tabContent' and hide them
     */
    tabContent = document.getElementsByClassName('tabContent');
    for(i = 0; i < tabContent.length; i++){
        tabContent[i].style.display = "none";
    }

    /*
     * Get all elements with class='tabLinks' and remove the class 'active'
     */
    tabLinks = document.getElementsByClassName('tabLinks');
    for(i = 0; i < tabLinks.length; i++){
        tabLinks[i].className = tabLinks[i].className.replace('active', '');
    }

    /*
     * Show the current tab and add 'active' class to the link that opened the tab
     */
    document.getElementById(tab).style.display = "block";
    event.currentTarget.classNAme += 'active';
}

