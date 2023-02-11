/* eslint-disable no-undef */
$().ready(function () {
	const characterAgeUrl = 'http://localhost:8081/GetCharacterAge';
	fetch(characterAgeUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const age =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="ageHelp" ' +
					'placeholder="Enter age" value="' + isNull(character.age) + '">' +
					'<div id="ageHelp" class="form-text text-muted">' + 'Must be an integer from 1 to 100.' + '</div>' +
					'</div>';
				$('#editCharacterAge').append(age);
			});
		})
		.catch(err => console.log(err)); //to file
});
