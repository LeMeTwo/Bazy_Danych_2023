/* eslint-disable no-undef */
$().ready(function () {
	const addOriginUrl = 'http://localhost:8081/GetAddOrigin';
	fetch(addOriginUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				const id = 'o:' + isNull(anime.oid[0]);
				const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>';
				$('#addOrigin').append(name);
			});
		})
		.catch(err => console.log(err)); //to file
});