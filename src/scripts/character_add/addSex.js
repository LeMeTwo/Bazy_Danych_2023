$().ready(function () {
	const sex =
		'<div class="mt-1">' +
		'<select class="form-select" aria-label="Choose sex">' +
		'<option value="1">Male</option>' +
		'<option value="2">Female</option>' +
		'<option value="3">Other</option>' +
		'</select>' +
		'</div>';
	$('#addCharacterSex').append(sex);
});