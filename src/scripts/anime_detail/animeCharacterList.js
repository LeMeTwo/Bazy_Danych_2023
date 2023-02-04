/* eslint-disable no-undef */
$().ready(function () {
	const characterListUrl = 'http://localhost:8081/GetDetailCharacterList';
	fetch(characterListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(character => {
				const id = character.cid[0];
				const name =
					'<li class="list-group-item">' +
					'<p style="display: none">' + character.cid + ' ' + '</p>' +
					'<a href ="./CharacterDetail.html" ' +
					'class="text-secondary text-truncate id=' + id + '">' +
					isNullComma(character.surname) + isNull(character.name) +
					'</a>' +
					'</li>';
				$('#animeCharacterList').append(name);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#animeCharacterList').on('click', 'li', function () {
		let data = {};
		data.cid = getNumber($(this).text());
		postData(data, 'PostCharacterID')
			.then(response => response.json())
			.then(data => alert(data));
	});
});