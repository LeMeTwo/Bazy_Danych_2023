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
					'<div class="form-check">' +
					'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
					'<label class="form-check-label text-truncate" for="flexCheckData">' +
					isNull(anime.title) +
					'</label>' +
					'</div>' +
					'</li>';
				$('#addCharacterAnime').append(title);
			});
		})
		.catch(err => console.log(err)); //to file
});