/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorListUrl = 'http://localhost:8081/GetVoiceActorList';
	fetch(voiceActorListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(voiceActor => {
				const id = voiceActor.vid[0];
				const name =
					'<li class="list-group-item">' +
					'<p style="display: none">' + isNull(voiceActor.vid) + ' ' + '</p>' +
					'<a href ="./VoiceActorDetail.html" ' +
					'class="text-secondary text-truncate id=' + id + '">' +
					isNullComma(voiceActor.surname) + isNull(voiceActor.name) +
					'</a>' +
					'</li>';
				$('#voiceActorList').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#voiceActorList').on('click', 'li', function () {
		const data = {};
		data.vid = getNumber($(this).text());
		postData(data, 'PostVoiceActorId')
			.then(response => response.json())
			.then(data => alert(data));
	});
});