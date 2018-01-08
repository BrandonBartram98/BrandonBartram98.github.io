//*****************//
//MUSIC PAGE SCRIPT//
//*****************//

//Album Slider
var album_index = 0;  
    displayAlbums(album_index);  
	
    function nextAlbum(n) //Next Album Function
	{  
        displayAlbums(album_index += n);  
    }  
    function currentAlbum(n) //Current Album Function
	{  
        displayAlbums(album_index = n);  
    }  
    function displayAlbums(n) 
	{  
		var i;
        var albums = document.getElementsByClassName("showAlbum");  
        if (n > albums.length) { album_index = 1 }  
        if (n < 1) { album_index = albums.length }  
        for (i = 0; i < albums.length; i++) 
		{  
            albums[i].style.display = "none"; //Hides previous album/image
        }  
        albums[album_index - 1].style.display = "block";
    }