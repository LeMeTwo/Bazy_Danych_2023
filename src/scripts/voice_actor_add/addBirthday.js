$().ready(function () {
	const birthday =
		'<div class="mt-1">' +
		'<form>' +
		'<div class="form-group">' +
		'<div class="input-group date" id="datepicker">' +
		'<input type="text" class="form-control">' +
		'<div class="input-group-append">' +
		'<div class="input-group-text bg-white d-block">' +
		'<i class="fa fa-calendar"></i>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</form>' +
		'</div>';
	$('#addVoiceActorBirthday').append(birthday);
});