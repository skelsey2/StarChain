//Steven Kelsey JavaScript
/** #id's and .classes **/



$(".disappear").hover(
	function(){
		$(this).css('visibility', 'hidden');
		});
		
$(".disappear").mouseleave(
	function() {
		$(this).css('visibility', 'visible');
		});