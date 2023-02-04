/* eslint-disable no-undef */
$().ready(function () {
	const epNumUrl = 'http://localhost:8081/GetDetailEpNum';
	fetch(epNumUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const epNum =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="epNumHelp" ' +
					'placeholder="Enter episode number" value="' + isNull(anime.ep_num) + '">' +
					'<div id="epNumHelp" class="form-text text-muted">' + 'Must be an integer from 1 to 1000.' + '</div>' +
					'</div>';
				$('#editEpNum').append(epNum);
			});
		})
		.catch(err => console.log(err)); //to file
});
