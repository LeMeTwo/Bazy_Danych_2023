$().ready(function () {
	const surname =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="surnameHelp" placeholder="Enter surname">' +
		'<div id="surnameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
		'</div>';
	$('#addVoiceActorSurname').append(surname);
});