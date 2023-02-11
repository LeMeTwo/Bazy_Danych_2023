/* eslint-disable no-undef */
$().ready(function () {
	const characterNameUrl = 'http://localhost:8081/GetCharacterName';
	fetch(characterNameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const name =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="nameHelp" ' +
					'placeholder="Enter name" value="' + isNull(character.name) + '">' +
					'<div id="nameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
					'</div>';
				$('#editCharacterName').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});
