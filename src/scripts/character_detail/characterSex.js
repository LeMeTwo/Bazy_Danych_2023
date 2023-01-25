/* eslint-disable no-undef */
$().ready(function () {
	const characterSexUrl = 'http://localhost:8081/GetCharacterSex';
	fetch(characterSexUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				$('#sex').append(isNull(character.sex));
			});
		})
		.catch(err => console.log(err)); //to file
});