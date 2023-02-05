/* eslint-disable no-undef */
$().ready(function () {
	const button =
		'<button type="submit" id="addAnimeButton" ' +
		'class="btn btn-outline-secondary btn-lg text-truncate">' + 'Add anime' +
		'</button>';
	$('#addAnimeButton').append(button);
});

$(function () {
	let aid = '';
	const maxAidUrl = 'http://localhost:8081/GetMaxAid';
	fetch(maxAidUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(anime => {
				aid = isNull(anime.max[0] + 1);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#add_anime_form').submit(function (e) {
		e.preventDefault();

		let selected = [];
		let text = [];
		let gid = [];
		let tid = [];
		let oid = [];
		let fid = [];
		let otid = [];
		let pid = [];

		// Add each text value to the array
		$('#add_anime_form input[type=text]').each(function () {
			text.push(this.value);
		});

		// Checkout
		if (text[0].length === 0) {
			alert('You must enter the title.');
			text[0] = '';
		}
		if (text[0].length >= 100) {
			alert('Title can be maximum 100 characters long.');
			text[0] = '';
		}
		if (isNaN(text[1])) {
			alert('Episode number must be an integer from 1 to 1000.');
			text[1] = null;
		} else {
			text[1] = parseFloat(text[1]);
			if (!Number.isSafeInteger(text[1] - parseInt(text[1]))) {
				alert('Episode number must be an integer from 1 to 1000.');
				text[1] = null;
			} else {
				text[1] = parseInt(text[1]);
				if (text[1] <= 0 || text[1] >= 1001) {
					alert('Episode number must be an integer from 1 to 1000.');
					text[1] = null;
				}
			}
		}

		// Add each selected checkbox value to the array
		$('#add_anime_form input[type=checkbox]:checked').each(function () {
			selected.push(this.value);
		});

		while (selected.length > 0) {
			findStringByKey(selected, gid, 'g:', 2);
			findStringByKey(selected, tid, 't:', 2);
			findStringByKey(selected, oid, 'o:', 2);
			findStringByKey(selected, fid, 'f:', 2);
			findStringByKey(selected, otid, 'h:', 2);
			findStringByKey(selected, pid, 'p:', 2);
		}

		let data = {
			'aid': '{' + aid + '}',
			'title': text[0],
			'ep_num': text[1],
			'gid': '{' + gid.join(',') + '}',
			'tid': '{' + tid.join(',') + '}',
			'oid': '{' + oid.join(',') + '}',
			'fid': '{' + fid.join(',') + '}',
			'otid': '{' + otid.join(',') + '}',
			'pid': '{' + pid.join(',') + '}',
		};

		if (data.title !== '' && data.ep_num !== null) {
			postData(data, 'PostAddAnime')
				.then(response => response.json());

			alert('Anime added');
			setTimeout(function () {
				window.location.href = '../Admin.html';
			}, 2000);
			setTimeout(this);
		} else {
			alert('You failed.');
		}
	});
});

