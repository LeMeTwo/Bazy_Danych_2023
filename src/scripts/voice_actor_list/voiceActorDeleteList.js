/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorListUrl = 'http://localhost:8081/GetVoiceActorList';
	fetch(voiceActorListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(voiceActor => {
				if (voiceActor.surname === '') {
					voiceActor.surname = null;
				}
				const id = voiceActor.vid[0];
				const name =
					'<li class="list-group-item d-flex flex-nowrap justify-content-between">' +
					'<p style="display: none">' + isNull(voiceActor.vid) + ' ' + '</p>' +
					'<h class="text-secondary text-truncate id=' + id + '">' +
					isNullComma(voiceActor.surname) + isNull(voiceActor.name) +
					'</h>' +
					'<button type="submit" id="deleteVoiceActorButton" onclick="voiceActorDeleteAlert()" ' +
					'class="btn btn-outline-secondary py-0">' + 'X' +
					'</button>' +
					'</li>';
				$('#voiceActorList').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#voiceActorList').on('click', 'button', function () {
		const data = {};
		data.vid = getNumber($(this).parent().text());
		postData(data, 'PostDeleteVoiceActor')
			.then(response => response.json());
	});
});