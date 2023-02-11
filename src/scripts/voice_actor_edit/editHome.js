/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorHomeUrl = 'http://localhost:8081/GetVoiceActorHome';
	fetch(voiceActorHomeUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				const home =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="homeHelp" ' +
					'placeholder="Enter home" value="' + isNull(getArray(actor.home)) + '">' +
					'<div id="homeHelp" class="form-text text-muted">' + 'Prefecture name or City name, Country' + '</div>' +
					'</div>';
				$('#editVoiceActorHome').append(home);
			});
		})
		.catch(err => console.log(err)); //to file
});