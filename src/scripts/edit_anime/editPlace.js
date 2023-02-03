/* eslint-disable no-undef */
$().ready(function () {
	const placeUrl = 'http://localhost:8081/GetDetailPlace';
	let placeTab = [];
	fetch(placeUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				placeTab.push(isNull(anime.name));
			});
		})
		.catch(err => console.log(err)); //to file

	const addPlaceUrl = 'http://localhost:8081/GetAddPlace';
	fetch(addPlaceUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'p:' + isNull(anime.pid[0]);
				if (placeTab.includes(anime.name)) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editPlace').append(name);
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
					$('#editPlace').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});