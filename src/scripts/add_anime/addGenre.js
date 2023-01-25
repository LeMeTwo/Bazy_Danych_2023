/* eslint-disable no-undef */
$().ready(function () {
	const addGenreUrl = 'http://localhost:8081/GetAddGenre';
	fetch(addGenreUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'g:' + isNull(anime.gid[0]);
				const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>';
				$('#addGenre').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});