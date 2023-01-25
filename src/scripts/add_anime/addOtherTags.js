/* eslint-disable no-undef */
$().ready(function () {
	const addOtherTagsUrl = 'http://localhost:8081/GetAddOtherTags';
	fetch(addOtherTagsUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'h:' + isNull(anime.otid[0]);
				const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>';
				$('#addOtherTags').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});