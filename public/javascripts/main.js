playback_toggle = function (audio) {
	if (audio.paused) {
		audio.play();
	} else { audio.pause() }
}

animate_image = function (e) {
	console.log(e.target)
	if(e.target.attributes.animsrc.value !== undefined) {
		e.target.src = e.target.attributes.animsrc.value
	}	
}
static_image = function (e) {
	console.log(e)
	if(e.target.attributes.staticsrc.value !== undefined) {
		e.target.src = e.target.attributes.staticsrc.value
	}
}


$(document).ready(function () {
	$(".slideanim").each(function () {
		$(this).addClass("slide");
	});
	$(".villager-image").hover(animate_image, static_image)
});