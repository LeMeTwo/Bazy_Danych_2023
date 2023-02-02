/* eslint-disable no-undef */
$().ready(function () {
	const targetUrl = 'http://localhost:8081/GetDetailTarget';
	fetch(targetUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const name =
					'<li class="list-group-item text-nowrap">' + isNull(anime.name) + '</li>';
				$('#target').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});