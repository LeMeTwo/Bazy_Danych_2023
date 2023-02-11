$().ready(function () {
	const home =
		'<div class="mb-3">' +
		'<input type="text" class="form-control" aria-describedby="homeHelp" placeholder="Enter home">' +
		'<div id="homeHelp" class="form-text text-muted">' + 'Prefecture name or City name, Country' + '</div>' +
		'</div>';
	$('#addVoiceActorHome').append(home);
});