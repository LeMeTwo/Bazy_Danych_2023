/* eslint-disable no-undef */
$().ready(function () {
	const titleUrl = 'http://localhost:8081/GetDetailTitle';
	fetch(titleUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const title =
					'<div class="mb-3">' +
					'<input type="text" class="form-control" aria-describedby="titleHelp" ' +
					'placeholder="Enter title" value="' + isNull(anime.title) + '">' +
					'<div id="titleHelp" class="form-text text-muted">' + 'Maximum 100 characters long.' + '</div>' +
					'</div>';
				$('#editTitle').append(title);
			});
		})
		.catch(err => console.log(err)); //to file
});