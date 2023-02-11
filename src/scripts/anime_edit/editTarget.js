/* eslint-disable no-undef */
$().ready(function () {
	const targetUrl = 'http://localhost:8081/GetDetailTarget';
	let targetTab = [];
	fetch(targetUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				targetTab.push(isNull(String(anime.tid)));
			});
		})
		.catch(err => console.log(err)); //to file

	const addTargetUrl = 'http://localhost:8081/GetAddTarget';
	fetch(addTargetUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 't:' + isNull(anime.tid[0]);
				if (targetTab.includes(String(anime.tid))) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editTarget').append(name);
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
					$('#editTarget').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});