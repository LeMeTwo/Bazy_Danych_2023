/* eslint-disable no-undef */
$().ready(function () {
	const button =
		'<button type="submit" id="addVoiceActorButton" ' +
		'class="btn btn-outline-secondary btn-lg text-truncate">' + 'Add Voice Actor' +
		'</button>';
	$('#addVoiceActorButton').append(button);
});

$(function () {
	let cid = '';
	const maxVidUrl = 'http://localhost:8081/GetMaxVid';
	fetch(maxVidUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(voiceActor => {
				cid = isNull(voiceActor.max[0] + 1);
			});
		})
		.catch(err => console.log(err)); //to file

	$('#add_voice_actor_form').submit(function (e) {
		e.preventDefault();

		let selected = [];
		let text = [];

		// Add each text value to the array
		$('#add_voice_actor_form input[type=text]').each(function () {
			text.push(this.value);
		});

		// Checkout
		if (text[0].length === 0) {
			alert('You must enter a name.');
			text[0] = '';
		}
		if (text[0].length >= 21) {
			alert('Name can be maximum 20 characters long.');
			text[0] = '';
		}
		if (text[1].length >= 21) {
			alert('Surname can be maximum 20 characters long.');
			text[1] = '';
		}
		// No compulsion to add a surname
		if (text[1].length === 0) {
			text[1] = null;
		}

		let input = text[3].split(',');
		let words = [];
		let lines = [];
		let home = '';
		for (let i = 0; i < input.length; i++) {
			input[i] = input[i].trim();
			words[i] = input[i].split(/\s+/);
			lines[i] = '';
			for (let j = 0; j < words[i].length; j++) {
				lines[i] = lines[i] + words[i][j] + ' ';
			}
			lines[i] = lines[i].trim();
			home = home + lines[i] + ',';
		}
		home = home.slice(0, -1);

		// Add selected sex to the array
		$('#add_voice_actor_form select').each(function () {
			text.push(parseInt(this.value));
		});

		let sex;
		switch (text[4]) {
		case 1:
			sex = 'male';
			break;
		case 2:
			sex = 'female';
			break;
		case 3:
			sex = 'other';
			break;
		default:
			sex = '';
		}

		// Add each selected checkbox value to the array
		$('#add_voice_actor_form input[type=checkbox]:checked').each(function () {
			selected.push(this.value);
		});

		let data = {
			'cid': '{' + cid + '}',
			'name': text[0],
			'surname': text[1],
			'date': text[2],
			'home': '{' + home + '}',
			'sex': sex,
			'aid': '{' + selected.join(',') + '}',
		};

		if (data.name !== '' && data.surname !== '') {
			if (data.surname == null) {
				data.surname = '';
			}
			postData(data, 'PostAddVoiceActor')
				.then(response => response.json());

			alert('Voice actor added');
			setTimeout(function () {
				window.location.href = '../Admin.html';
			}, 2000);
			setTimeout(this);
		} else {
			alert('You failed.');
		}
	});
});