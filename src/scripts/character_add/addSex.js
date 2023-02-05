$().ready(function () {
	const sex =
		'<div class="mb-3">' +
		'<select class="form-select" aria-label="Choose sex">' +
		'<option value="1">Male</option>' +
		'<option value="2">Female</option>' +
		'<option value="3">Other</option>' +
		'</select>' +
		'</div>';
	$('#addCharacterSex').append(sex);
});