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
					'<p style="display: none">' + isNull(character.cid) + ' ' + '</p>' +
					'<a href ="./CharacterDetail.html" ' +
					'class="text-secondary text-truncate id=' + id + '">' +
					isNullComma(character.surname) + isNull(character.name) +
					'</a>' +
					'</li>';
				$('#characterList').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#characterList').on('click', 'li', function () {
		const data = {};
		data.cid = getNumber($(this).text());
		postData(data, 'PostCharacterId')
			.then(response => response.json())
			.then(data => alert(data));
	});
});