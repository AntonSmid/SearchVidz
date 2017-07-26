// Searchbar Handler
$(document).ready(function(){
    var searchField = $("#query");    // polje vnosa iskanja
    var icon = $("#search-btn");      // gumb iskanja
    
    
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
    
    
}) /* end ready*/

