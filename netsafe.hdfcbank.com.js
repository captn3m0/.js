$(document).ready(function() {
	window.setTimeout(function() {
		$('input[value=DYNAMIC]').prop('checked', true);
		$('#submitBtn').click();
	}, 200);

	if ($('#txtOtpPassword')) {
		$('#txtOtpPassword').focus();
	}
});