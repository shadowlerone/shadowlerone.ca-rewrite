function student() {
	console.log('Collapsing #demo')
	$('#demo').removeClass('show');
	
	if ($('.error').length > 0){
		// $('.error').each().removeClass('error')
	}
	console.log('error = false');
	var error = false;
	myRe = /[A-L]/i
	var day = [];

	// error
	if($('#student')[0].value.length == 0 || $('#s')[0].value.length == 0){
		$('#student').addClass('error');
		$('#s').addClass('error');
		console.log('input error; error = true');
		error = true;
	}

	// day
	if($('#R1')[0].checked === true){
		day = ['Monday','Wednesday'];
	} else if ($('#R2')[0].checked === true){
		day = ['Tuesday','Thursday'];
	} else {
		// Error
		$('.form-check-inline').addClass('error');
		console.log('button error;error = true');
		error = true
	}
	if (error === true){
		return;
	}
	if (myRe.test(document.getElementById('student').value[0])){
		$('#demo').html(`In Person: ${day[0]} <br> On ZOOM: ${day[1]}`);
	} else {
		$('#demo').html(`In Person: ${day[1]} <br> On ZOOM: ${day[0]}`);
	}
	$('#demo').delay(1500).collapse('show')
}