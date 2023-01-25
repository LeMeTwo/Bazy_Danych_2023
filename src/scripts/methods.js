/* eslint-disable no-undef */
/* eslint-disable no-unused-vars*/
async function postData(data = {}, suffix) {
	let url = 'http://127.0.0.1:8081/' + suffix;
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
	if(variable == null) {return '';} else {return variable;}
}

function isNullComma(variable) {
	if(variable == null) {return '';} else {return variable + ', ';}
}

// Used to return id inside {} block
function getNumber(text) {
	if (text == null) {return '';}
	else {
		let words = text.split(' ');
		return '{' + words[0] + '}';
	}
}

// Used in voiceActorHome.js to return city separated from the country
function getArray(array) {
	if(array == null) {return '';} else {return array.join(', ');}
}

// Used in voiceActorBirthday.js to return date without T-time
function getDate(string) {
	if (string == null) {return '';}
	else {
		let date = string.split('T');
		return date[0];
	}
}

// Used in addTags.js to prepare id arrays for jsons
function findStringByKey(selectedArray, idArray, key, keyLength) {
	let here;
	let index = selectedArray.findIndex(element => {
		if(element.includes(key)) {
			here = true;
			return true;
		}
	});
	if(here) {
		idArray.push(selectedArray[index].substring(keyLength));
		selectedArray.splice(index, 1);
		here = false;
	}
}