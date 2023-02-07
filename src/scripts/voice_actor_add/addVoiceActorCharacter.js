/* eslint-disable no-undef */
$().ready(function () {
	const characterListUrl = 'http://localhost:8081/GetCharacterList';
	fetch(characterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const id = character.cid[0];
				const name =
					'<li class="list-group-item">' +
					'<div class="form-check">' +
					'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
					'<label class="form-check-label text-truncate" for="flexCheckData">' +
					isNullComma(character.surname) + isNull(character.name) +
					'</label>' +
					'</div>' +
					'</li>';
				$('#addVoiceActorCharacter').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});