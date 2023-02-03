/* eslint-disable no-undef */
$().ready(function () {
	const otherTagsUrl = 'http://localhost:8081/GetDetailOthertags';
	let otherTagsTab = [];
	fetch(otherTagsUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				otherTagsTab.push(isNull(anime.name));
			});
		})
		.catch(err => console.log(err)); //to file

	const addOtherTagsUrl = 'http://localhost:8081/GetAddOtherTags';
	fetch(addOtherTagsUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'h:' + isNull(anime.otid[0]);
				if (otherTagsTab.includes(anime.name)) {
					const name =
						'<li class="list-group-item">' +
						'<div class="form-check">' +
						'<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData" checked>' +
						'<label class="form-check-label text-truncate" for="flexCheckData">' +
						isNull(anime.name) +
						'</label>' +
						'</div>' +
						'</li>';
					$('#editOtherTags').append(name);
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
					$('#editOtherTags').append(name);
				}
			});
		})
		.catch(err => console.log(err)); //to file
});