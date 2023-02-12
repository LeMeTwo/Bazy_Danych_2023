/* eslint-disable no-undef */

/* eslint-disable no-unused-vars*/
async function postData(data = {}, suffix) {
	const url = 'http://127.0.0.1:8081/' + suffix;
	return await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}); // parses JSON response into native JavaScript objects
}

function isNull(variable) {
	if (variable == null) {
		return '';
	} else {
		return variable;
	}
}

function isNullComma(variable) {
	if (variable == null) {
		return '';
	} else {
		return variable + ', ';
	}
}

// Used to return id inside {} block
function getNumber(text) {
	if (text == null) {
		return '';
	} else {
		const words = text.split(' ');
		return '{' + words[0] + '}';
	}
}

// Used in voiceActorHome.js to return city separated from the country
function getArray(array) {
	if (array == null) {
		return '';
	} else {
		return array.join(', ');
	}
}

// Used in voiceActorBirthday.js to return date without T-time
function getDate(string) {
	if (string == null) {
		return '';
	} else {
		const date = string.split('T');
		return date[0];
	}
}

// Used in editSex.js to return sex with first letter toUppercase
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Used in addTags.js to prepare id arrays for jsons
function findStringByKey(selectedArray, idArray, key, keyLength) {
	let here;
	const index = selectedArray.findIndex(element => {
		if (element.includes(key)) {
			here = true;
			return true;
		}
	});
	if (here) {
		idArray.push(selectedArray[index].substring(keyLength));
		selectedArray.splice(index, 1);
		here = false;
	}
}

// Used in animeDeleteList.js
function animeDeleteAlert() {
	alert('Anime deleted');
	setTimeout(function () {
		window.location.href = './AnimeDeleteList.html';
	}, 500);
	setTimeout(this);
}

// Used in characterDeleteList.js
function characterDeleteAlert() {
	alert('Character deleted');
	setTimeout(function () {
		window.location.href = './CharacterDeleteList.html';
	}, 500);
	setTimeout(this);
}

// Used in voiceActorDeleteList.js
function voiceActorDeleteAlert() {
	alert('Voice actor deleted');
	setTimeout(function () {
		window.location.href = './VoiceActorDeleteList.html';
	}, 500);
	setTimeout(this);
}

const reloadUsingLocationHash = () => {
	window.location.hash = 'reload';
};