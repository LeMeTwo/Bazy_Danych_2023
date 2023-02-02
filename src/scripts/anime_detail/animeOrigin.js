/* eslint-disable no-undef */
$().ready(function () {
	const originUrl = 'http://localhost:8081/GetDetailOrigin';
	fetch(originUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const name =
					'<li class="list-group-item text-nowrap">' + isNull(anime.name) + '</li>';
				$('#origin').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});