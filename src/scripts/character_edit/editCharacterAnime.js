/* eslint-disable no-undef */
$().ready(function () {
	const characterTitleListUrl = 'http://localhost:8081/GetCharacterTitleList';
	let titleTab = [];
	fetch(characterTitleListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				titleTab.push(isNull(String(anime.aid)));
			});
		})
		.catch(err => console.log(err)); //to file

	const animeListUrl = 'http://localhost:8081/GetAnimeList';
	fetch(animeListUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = anime.aid[0];
				if (titleTab.includes(String(anime.aid))) {
					const title =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.title) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editCharacterAnime').append(title);
				} else {
					const title =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.title) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editCharacterAnime').append(title);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});