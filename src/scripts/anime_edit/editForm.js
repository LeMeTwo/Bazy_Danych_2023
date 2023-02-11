/* eslint-disable no-undef */
$().ready(function () {
	const formUrl = 'http://localhost:8081/GetDetailForm';
	let formTab = [];
	fetch(formUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				formTab.push(isNull(String(anime.fid)));
			});
		})
		.catch(err => console.log(err)); //to file

	const addFormUrl = 'http://localhost:8081/GetAddForm';
	fetch(addFormUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'f:' + isNull(anime.fid[0]);
				if (formTab.includes(String(anime.fid))) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editForm').append(name);
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
					$('#editForm').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});