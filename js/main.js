
/** Listener on Form Submit */

/**
 * getElementByID -> pass id
 * addEventListener -> 'listenToSomethingOrEvent', functionToExecute .
 */
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(eventParameter) {
    // get form values.
    var siteName =document.getElementById('siteName').value;
    var siteURL =document.getElementById('siteURL').value;
    
    /**
     *  validate empty fields,
     *  and validate url Regular Expression.
     */
    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }
    
    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // initialize it
        var bookmarks = [];
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else { // if there is something in localStorage

        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // Re-Set it back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks.
    fetchBookmarks();

    // i added an eventParameter to prevent default behaviour and see what is going on when i submit.
    eventParameter.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmark from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if (bookmarks[i].url === url) {
            // then delete it.
            bookmarks.splice(i, 1);
        }
    }
    // Reset the localStorage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks.
    fetchBookmarks();
}



/**
 * Fetch bookmarks to homepage.
 */
function fetchBookmarks(){
    // first, get bookmarks from localStorage.
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // we want to put them into their div with id "bookmarksResult"
    var bookmarksResult = document.getElementById("bookmarksResult");

    // build the output
    bookmarksResult.innerHTML = '';

    // loop through outputs
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name; // it will contain it like that: 'name1name2name3'
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML += 
        '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
        +'</h3>'+
        '</div>';

    }
    
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Empty fields not allowed');

        // to stop it.
        return false;
    }

    // RegEx for the url field
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('pls use a valid url');
        return false;
    }
    // if it get to the end and passes so,
    return true;
}