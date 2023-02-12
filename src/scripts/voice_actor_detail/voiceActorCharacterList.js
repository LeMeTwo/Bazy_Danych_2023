/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorCharacterListUrl = 'http://localhost:8081/GetVoiceActorCharacterList';
	fetch(voiceActorCharacterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				if (character.surname === '') {
					character.surname = null;
				}
				const cid = character.cid[0];
				const aid = character.aid[0];
				const name =
					'<li class="list-group-item list-group-item-exception">' +
					'<p style="display: none">' + character.cid + ' ' + '</p>' +
					'<a href ="./CharacterDetail.html" ' +
					'class="text-secondary text-truncate id=' + cid + '">' +
					isNullComma(character.surname) + isNull(character.name) +
					'</a>' +
					'<p class="d-inline">' + ' in ' + '</p>' +
					'<p style="display: none">' + character.aid + ' ' + '</p>' +
					'<a href ="./AnimeDetail.html" ' +
					'class="text-secondary text-truncate id=' + aid + '">' +
					isNull(character.title) +
					'</a>' +
					'</li>';
				$('#actorCharacterList').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#actorCharacterList').on('click', 'li', function () {
		const data = {
			'cid': getNumber($(this).children().eq(0).text()),
			'aid': getNumber($(this).children().eq(3).text())
		};
		postData(data, 'PostAnimeAndCharacterID')
			.then(response => response.json())
			.then(data => alert(data));
	});
});