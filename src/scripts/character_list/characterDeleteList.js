/* eslint-disable no-undef */
$().ready(function () {
	const characterListUrl = 'http://localhost:8081/GetCharacterList';
	fetch(characterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const id = character.cid[0];
				const title =
					'<li class="list-group-item d-flex flex-nowrap justify-content-between">' +
					'<p style="display: none">' + isNull(character.cid) + ' ' + '</p>' +
					'<h class="text-secondary text-truncate id=' + id + '">' +
					isNullComma(character.surname) + isNull(character.name) +
					'</h>' +
					'<button type="submit" id="deleteCharacterButton" onclick="characterDeleteAlert()" ' +
					'class="btn btn-outline-secondary py-0">' + 'X' +
					'</button>' +
					'</li>';
				$('#characterList').append(title);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#characterList').on('click', 'button', function () {
		const data = {};
		data.cid = getNumber($(this).parent().text());
		postData(data, 'PostDeleteCharacter')
			.then(response => response.json());
	});
});