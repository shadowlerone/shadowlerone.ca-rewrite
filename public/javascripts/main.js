playback_toggle = function (audio) {
	if (audio.paused) {
		audio.play();
	} else { audio.pause() }
}

$(document).ready(function () {
	$(".slideanim").each(function () {
		$(this).addClass("slide");
	});
});