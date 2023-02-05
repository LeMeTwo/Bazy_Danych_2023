/* eslint-disable no-undef */
$().ready(function () {
	const animeListUrl = 'http://localhost:8081/GetAnimeList';
	fetch(animeListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = anime.aid[0];
				const title =
					'<li class="list-group-item">' +
					'<p style="display: none">' + isNull(anime.aid) + ' ' + '</p>' +
					'<a href ="./AnimeEdit.html" ' +
					'class="text-secondary text-truncate id=' + id + '">' +
					isNull(anime.title) +
					'</a>' +
					'</li>';
				$('#animeList').append(title);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#animeList').on('click', 'li', function () {
		const data = {};
		data.aid = getNumber($(this).text());
		postData(data, 'PostAnimeId')
			.then(response => response.json())
			.then(data => alert(data));
	});
});