
$( function() {
    $("li.nav-item").hover(
		function() {
			$(this).css("text-transform", "uppercase");
			$(this).find("a").css({
				//"color": "lightgreen",
				//"text-decoration": "underline"  
			});
	    },
		function() {
			// Mouse leaves 
			$(this).css("text-transform", "none");  
			$(this).find("a").css({
				"color": "", 
				//"text-decoration": "none"  
			});
		},
		function() {
            // Mouse enters 
            $(this).css("text-transform", "uppercase");
        },
        function() {
            // Mouse leaves 
            $(this).css("text-transform", "none");
        }   	
	);
 });