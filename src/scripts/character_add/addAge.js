$().ready(function () {
	const age =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="epNumHelp" placeholder="Enter age">' +
		'<div id="epNumHelp" class="form-text text-muted">' + 'Must be an integer from 1 to 1000000.' + '</div>' +
		'</div>';
	$('#addCharacterAge').append(age);
});