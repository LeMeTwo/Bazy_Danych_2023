/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorBirthdayUrl = 'http://localhost:8081/GetVoiceActorBirthday';
	fetch(voiceActorBirthdayUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				const birth = isNull(getDate(actor.birth));
				const birthday =
					'<div class="mt-1">' +
					'<form>' +
					'<div class="form-group">' +
					'<div class="input-group date" id="editDatepicker">' +
					'<input type="text" value="' + birth + '" class="form-control">' +
					'<div class="input-group-append">' +
					'<div class="input-group-text bg-white d-block">' +
					'<i class="fa fa-calendar"></i>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</form>' +
					'</div>';
				$('#editVoiceActorBirthday').append(birthday);
			});
		})
		.catch(err => console.log(err)); //to file
});