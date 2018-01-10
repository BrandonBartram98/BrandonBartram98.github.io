//*****************//
//MUSIC PAGE SCRIPT//
//*****************//

// Album Slider

// Variables
var album_index = 1;  // Index initialized at 1, first album (The Spark) is displayed on load
    displayAlbums(album_index);  
	
    function nextAlbum(n) // Next Album Function
	{  
        displayAlbums(album_index += n);  
    }  
    function currentAlbum(n) // Current Album Function
	{  
        displayAlbums(album_index = n);  
    }  
    function displayAlbums(n) 
	{  
		var i;
        var albums = document.getElementsByClassName("showAlbum");  // Get images
        if (n > albums.length) { album_index = 1 }  
        if (n < 1) { album_index = albums.length }  
        for (i = 0; i < albums.length; i++) 
		{  
            albums[i].style.display = "none"; // Hides previous album/image
        }  
        albums[album_index - 1].style.display = "block";
    }