/* eslint-disable no-undef */
$().ready(function () {
	const titleListUrl = 'http://localhost:8081/GetAnimeList';
	fetch(titleListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = anime.aid[0];
				const title =
					'<li class="list-group-item d-flex flex-nowrap justify-content-between">' +
					'<p style="display: none">' + isNull(anime.aid) + ' ' + '</p>' +
					'<h class="text-secondary text-truncate id=' + id + '">' +
					isNull(anime.title) +
					'</h>' +
					'<button type="submit" id="deleteAnimeButton" onclick="deleteAlert()" ' +
					'class="btn btn-outline-secondary py-0">' + 'X' +
					'</button>' +
					'</li>';
				$('#animeList').append(title);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#animeList').on('click', 'button', function () {
		const data = {};
		data.aid = getNumber($(this).parent().text());
		postData(data, 'PostDeleteAnime')
			.then(response => response.json());
	});
});