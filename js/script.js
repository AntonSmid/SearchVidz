// https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=&type=video&key=AIzaSyCVpipS9I-mV0f1v8SiIb_vP78mCHfvxqU&q=


// Searchbar Handler
$(document).ready(function(){
    var searchField = $("#query");    // polje vnosa iskanja
    var icon = $("#search-btn");      // gumb iskanja

   var q;
   var token;
/* 
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=web+design&pageToken=&type=video&key=AIzaSyCVpipS9I-mV0f1v8SiIb_vP78mCHfvxqU";
*/
    
// Focus Event Handler
    $(searchField).on("focus", function(){
        $(this).animate({
            width:"100%"
        }, 400);
        $(icon).animate({
            right: "10px"
        }, 400);
    });
    
// Blur Event Handler
    $(searchField).on("blur", function(){
        if (searchField.val() == ""){
            $(searchField).animate({
                width: "45%"
            }, 400, function(){});
            $(icon).animate({
                right: "350px"
            }, 400, function(){});
        }
    });
    
// on form submit - to je drugace kot v tutorialu - tam je onsubmit
 $("form").submit(function(e) {
    e.preventDefault();
    search();
});   

    
// search function
function search(token, q) {
    // Clear Results
    $("#results").html("");
    $("#buttons").html("");
    
    // Get Form Input
    q = $("#query").val();
    
    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: "snippet, id",
            q: q,
            pageToken: token,
            type: "video",
            key: "AIzaSyCVpipS9I-mV0f1v8SiIb_vP78mCHfvxqU"
        },
        
          function(data){               
              var nextPageToken = data.nextPageToken;
              var prevPageToken = data.prevPageToken;
                // log data
                console.log(data); // 11:55 video 14
                
                $.each(data.items, function(i, item){
                    // get output
                    var output = getOutput(item);
                    
                    // display results
                    $("#results").append(output);
                });
              
              // Buttons for prev and next
              var buttons = getButtons(prevPageToken, nextPageToken);
              
              // Display Buttons
              $("#buttons").append(buttons);
              
            }
    ); // end get
}  // end of search function  

 
// prev page
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');
	// above does not exist in HTML; is written by getButtons() below
	search(token, q);
}

// next page
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');
	// above does not exist in HTML; is written by getButtons() below
	search(token, q);
}

    
    
    
    
    
// Build Output
    function getOutput(item) {
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var description = item.snippet.description;
        var thumb = item.snippet.thumbnails.high.url;
        var channelTitle = item.snippet.channelTitle;
        var videoDate = item.snippet.publishedAt;
       
        // Build Output String // vid. 15 - 3:40
        var output = '<li>' +
            '<div class="list-left">' +
            '<img src="'+thumb+'">' +
            '</div>' +
            '<div class="list-right">' +
            '<h3>' + title + '</h3>' +
            '<small>By <span class="cTitle">' + channelTitle + '</span> on '+ videoDate + '</small>' +
            '<p>' + description + '</p>' +
            '</div>' +
            '</li>' +
            '<div class="clearfix"></div>' +
            '';
        
        return output;                  
    }
    
/*    // Build the buttons 16:35
    function getButtons(prevPageToken, nextPageToken){
        if(!prevPageToken) {
            var btnoutput = '<div class="button-container">' +
                '<button id="next-button" class="btn btn-outline-danger paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" ' +
                ' onclick = "nextPage()">Next Page</button></div>';
        } else {
            var btnoutput = '<div class="button-container">' +
                '<button id="prev-button" class="btn btn-outline-danger paging-button" data-token="' + prevPageToken + '" data-query="' + q + '" ' +
                ' onclick = "prevPage()">Prev Page</button></div>';
            
                '<button id="next-button" class="btn btn-outline-danger paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" ' +
                ' onclick = "nextPage()">Next Page</button></div>';         
        }
        
        return btnoutput;
    }*/


    
// build the buttons to be displayed in our HTML
// I also rewrote this function to get rid of redundancy
function getButtons(prevPageToken, nextPageToken, q) {
	var prevButton = '<button id="prev-button" class="paging-button btn btn-outline-danger"' +
	' data-token="' +prevPageToken+ '" data-query="' +q+ '"' +
	' onclick="prevPage();">Prev Page</button>';

	var nextButton = '<button id="next-button" class="paging-button btn btn-outline-danger"' +
	' data-token="' +nextPageToken+ '" data-query="' +q+ '"' +
	' onclick="nextPage();">Next Page</button>';

	if(!prevPageToken){
		var buttonOutput = '<div class="button-container">' +
		nextButton + '</div>';
		// probably should add if-not-nextPageToken but not going to
		// they might go on forever anyway
	} else {
		var buttonOutput = '<div class="button-container">' +
		prevButton + ' ' +nextButton+ '</div>';
	}
	
	return buttonOutput;
}



    
}) /* end ready*/

/* video 16 / 6:00 lightBox */

