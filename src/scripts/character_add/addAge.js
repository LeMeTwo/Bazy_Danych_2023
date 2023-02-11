$().ready(function () {
	const age =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="ageHelp" placeholder="Enter age">' +
		'<div id="ageHelp" class="form-text text-muted">' + 'Must be an integer from 1 to 1000000.' + '</div>' +
		'</div>';
	$('#addCharacterAge').append(age);
});