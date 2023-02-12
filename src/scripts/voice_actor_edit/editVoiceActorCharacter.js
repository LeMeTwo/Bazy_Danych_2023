/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorCharacterListUrl = 'http://localhost:8081/GetVoiceActorCharacterList';
	let characterTab = [];
	fetch(voiceActorCharacterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				characterTab.push(isNull(String(character.cid)));
			});
		})
		.catch(err => console.log(err)); //to file

	const characterListUrl = 'http://localhost:8081/GetCharacterList';
	fetch(characterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				if (character.surname === '') {
					character.surname = null;
				}
				const id = character.cid[0];
				if (characterTab.includes(String(character.cid))) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNullComma(character.surname) + isNull(character.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editVoiceActorCharacter').append(name);
				} else {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNullComma(character.surname) + isNull(character.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editVoiceActorCharacter').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});