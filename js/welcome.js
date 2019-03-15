$(document).ready(function() {

	const button = $('#button');
	button.on('click', () => {
		$('#button').css("pointer-events","none").fadeOut('slow');
		//Wrapper animation
		anime.timeline({
			targets: ".welcome",
			easing: "easeOutExpo",
		})
		.add({
		width: ["0vw", "100vw"],
		opacity: 2,
		duration: 5,
		})
		.add({
		delay: 2700,
		translateX: "100vw",
		duration: 1500,
		complete: function(anime) {
			$('.welcome').remove();
		}
		})
		//Loader animation
		anime({
			targets: ".loader-wrapper",
			delay: 100,
			duration: 1800,
			opacity: 1,
			easing: "easeOutExpo",
	});
	anime({
			targets: ".loader",
			delay: 1000,
			duration: 2300,
			width: ["0", "100%"],
			easing: "easeOutExpo",
	});
		//Loader-wrapper animation
		
	})
});
