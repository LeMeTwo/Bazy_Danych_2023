$().ready(function () {
	const surname =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="titleHelp" placeholder="Enter surname">' +
		'<div id="titleHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
		'</div>';
	$('#addCharacterSurname').append(surname);
});