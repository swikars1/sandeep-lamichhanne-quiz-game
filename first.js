
$(document).ready(function() {
	$('#button').click(function(){
	//Wrapper animation
	anime.timeline({
		 targets: ".welcome",
		 easing: "easeOutExpo",
	})
	 .add({
	 width: [ "100vw"],
	 opacity: 1,
	 duration: 100,
	})
	 .add({
	 delay: 2700,
	 translateX: "100vw",
	 duration: 1,
	 complete: function(anime) {
		 document.querySelector('.welcome').remove();
		 $('.any').show();
		 $('#cric').click(function(){
			 $('.any').hide("slow").fadeOut();
		 });
	 }
	})


	//Loader animation
	anime({
		targets: ".loader",
		delay: 2000,
		duration: 2300,
		width: ["0", "100%"],
		easing: "easeOutExpo",
	});

	//Loader-wrapper animation
	anime({
		targets: ".loader-wrapper",
		delay: 1500,
		duration: 1800,
		opacity: 1,
		easing: "easeOutExpo",
	});
})

})

