/* eslint-disable no-undef */
$().ready(function () {
	const genreUrl = 'http://localhost:8081/GetDetailGenre';
	let genreTab = [];
	fetch(genreUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				genreTab.push(isNull(anime.name));
			});
		})
		.catch(err => console.log(err)); //to file

	const editGenreUrl = 'http://localhost:8081/GetAddGenre';
	fetch(editGenreUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'g:' + isNull(anime.gid[0]);
				if (genreTab.includes(anime.name)) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editGenre').append(name);
				} else {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editGenre').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});