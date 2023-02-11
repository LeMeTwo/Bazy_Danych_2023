$().ready(function () {
	const name =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="nameHelp" placeholder="Enter name">' +
		'<div id="nameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
		'</div>';
	$('#addCharacterName').append(name);
});