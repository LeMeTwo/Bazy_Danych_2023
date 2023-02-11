/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorNameUrl = 'http://localhost:8081/GetVoiceActorName';
	fetch(voiceActorNameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				const name =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="nameHelp" ' +
					'placeholder="Enter name" value="' + isNull(actor.name) + '">' +
					'<div id="nameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
					'</div>';
				$('#editVoiceActorName').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});