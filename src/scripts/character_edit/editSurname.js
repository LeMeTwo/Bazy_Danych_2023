/* eslint-disable no-undef */
$().ready(function () {
	const characterSurnameUrl = 'http://localhost:8081/GetCharacterSurname';
	fetch(characterSurnameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const surname =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="surnameHelp" ' +
					'placeholder="Enter surname" value="' + isNull(character.surname) + '">' +
					'<div id="surnameHelp" class="form-text text-muted">' + 'Maximum 20 characters long.' + '</div>' +
					'</div>';
				$('#editCharacterSurname').append(surname);
			});
		})
		.catch(err => console.log(err)); //to file
});