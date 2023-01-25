/* eslint-disable no-undef */
$().ready(function () {
	const characterTitleListUrl = 'http://localhost:8081/GetCharacterTitleList';
	fetch(characterTitleListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = anime.aid[0];
				const title =
                    '<li class="list-group-item">' +
                    '<p style="display: none">' + anime.aid + ' ' + '</p>' +
                    '<a href ="./AnimeDetail.html" ' +
                    'class="text-secondary text-truncate id=' + id + '">' +
                    anime.title +
                    '</a>' +
                    '</li>';
				$('#characterTitleList').append(title);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#characterTitleList').on('click', 'li',function () {
		const data = {};
		data.aid = getNumber($(this).text());
		postData(data, 'PostAnimeId')
			.then(response => response.json())
			.then(data => alert(data));
	});
});