/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorSexUrl = 'http://localhost:8081/GetVoiceActorSex';
	fetch(voiceActorSexUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				const selectedSex = capitalizeFirstLetter(actor.sex);
				let value;
				switch (selectedSex) {
				case 'Male':
					value = '1';
					break;
				case 'Female':
					value = '2';
					break;
				case 3:
					value = '3';
					break;
				}
				const sex =
					'<div class="mt-1">' +
					'<select class="form-select" aria-label="Choose sex">' +
					'<option selected value="' + value + '">' + selectedSex + '</option>' +
					'<option value="1">Male</option>' +
					'<option value="2">Female</option>' +
					'<option value="3">Other</option>' +
					'</select>' +
					'</div>';
				$('#editVoiceActorSex').append(sex);
			});
		})
		.catch(err => console.log(err)); //to file
});