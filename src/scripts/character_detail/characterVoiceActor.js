/* eslint-disable no-undef */
$().ready(function () {
	const titleUrl = 'http://localhost:8081/GetCharacterVoiceActor';
	fetch(titleUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(voiceActor => {
				const id = voiceActor.vid[0];
				const name =
                    '<p style="display: none">' + voiceActor.vid + ' ' + '</p>' +
                    '<a href ="./VoiceActorDetail.html" ' +
                    'class="text-secondary text-truncate id=' + id + '">' +
                    isNullComma(voiceActor.surname) + isNull(voiceActor.name) +
                    '</a>';
				$('#voiceActor').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#voiceActor').click(function() {
		let data = {};
		data.vid = getNumber($(this).text());
		postData(data, 'PostVoiceActorId')
			.then(response => response.json())
			.then(data => alert(data));
	});
});