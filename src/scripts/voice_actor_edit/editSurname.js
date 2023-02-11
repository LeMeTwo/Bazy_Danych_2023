/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorSurnameUrl = 'http://localhost:8081/GetVoiceActorSurname';
	fetch(voiceActorSurnameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				const surname =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="surnameHelp" ' +
					'placeholder="Enter surname" value="' + isNull(actor.surname) + '">' +
					'<div id="surnameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
					'</div>';
				$('#editVoiceActorSurname').append(surname);
			});
		})
		.catch(err => console.log(err)); //to file
});