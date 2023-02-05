$().ready(function () {
	const home =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="titleHelp" placeholder="Enter home">' +
		'<div id="titleHelp" class="form-text text-muted">' + 'Prefecture name or City name, Country' + '</div>' +
		'</div>';
	$('#addVoiceActorHome').append(home);
});