/* eslint-disable no-undef */
$().ready(function () {
	const genreUrl = 'http://localhost:8081/GetDetailGenre';
	fetch(genreUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const name =
                    '<li class="list-group-item text-nowrap">' + isNull(anime.name) + '</li>';
				$('#genre').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});