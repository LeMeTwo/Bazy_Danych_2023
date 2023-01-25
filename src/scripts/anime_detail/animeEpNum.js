/* eslint-disable no-undef */
$().ready(function () {
	const epNumUrl = 'http://localhost:8081/GetDetailEpNum';
	fetch(epNumUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				$('#epNum').append(isNull(anime.ep_num));
			});
		})
		.catch(err => console.log(err)); //to file
});