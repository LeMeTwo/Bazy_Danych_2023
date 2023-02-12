/* eslint-disable no-useless-escape */
/* eslint-disable no-extra-semi */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 8081;

let animeMemory;
let characterMemory;
let voiceActorMemory;

const {Client} = require('pg');
const DATABASE_HOST = 'localhost';
const DATABASE_USER = 'postgres';
const DATABASE_PASSWORD = 'admin';
const DATABASE_NAME = 'postgres';

const connection = new Client({
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	host: DATABASE_HOST,
	port: 5432
});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cors());

app.get('/info', (request, response) => {
	response.json({info: 'Node.js, Express, and Postgres API'});
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});

// Connection to the database
const main = async () => {
	await connection.connect();
	try {
		//test connection to the database
		console.log('Connection established');
	} finally {
		//pray this line doesn't connect
		console.log('Loud and clear');
	}
};

main().catch(console.error);

app.post('/Register', async function (req, res) {
	const userData = req.body;
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json({err: 'error'});
	}

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in userData) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute'});
		}
		if (!safetyRegex.test(userData[key])) {
			console.log('Wrong ' + userData[key]);
			return res.status(400).json({err: 'Forbidden character in body'});
		}
	}

	try {
		console.log('trying to register user');
		const checkIfExists = await connection.query('SELECT * from users where login = \'' + userData.login + '\';');
		if (checkIfExists.rows.length) {
			return res.status(400).json({err: 'Username already exists'});
		}
		await connection.query('INSERT INTO users (login, email, password) values (\'' + userData.login + '\', \'' + userData.email + '\', \'' + userData.password + '\');');
		return res.status(200).json({message: 'Registration successful'});
	} catch (error) {
		return res.status(501);
	}
});

app.post('/Login', async function (req, res) {
	const loginData = req.body;
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json({err: 'error'});
	}
  
	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in loginData) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute'});
		}
		if (!safetyRegex.test(loginData[key])) {
			console.log('Wrong ' + loginData[key]);
			return res.status(400).json({err: 'Forbidden character in body'});
		}
	}

	try {
		console.log('SELECT * from usersdb where login = \'' + loginData.login + '\';');
		console.log('trying to login');
		const selectedAccount = await connection.query('SELECT login, password, is_admin from usersdb where login = \'' + loginData.login + '\';');
		if (selectedAccount.rows.length) {
			if (selectedAccount.rows[0].password === loginData.password) {
				if (selectedAccount.rows[0].is_admin === 1) {
					return res.status(200).json({message: 'Admin=1'});
				}
				return res.status(200).json({message: 'Login successful'});
			} else {
				return res.status(200).json({message: 'Login unsuccessful'});
			}
		} else {
			return res.status(400).json({err: 'Wrong login or password'});
		}
	} catch (error) {
		return res.status(501).json({err: 'Unexpected error'});
	}
});

// Posts used to tests
app.post('/PostAnimeTest', async function (req, res) {
	console.log(req.body);
	console.log('/PostAnimeTest');
	res.status(200);
});

// Posts used to alter the database
app.post('/PostAddAnime', async function (req, res) {
	const anime = req.body;
	console.log('/PostAddAnime');

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	try {
		const selectedTitle = await connection.query(`
		SELECT * from anime where title = '${anime.title}';
	  	`);
		if (selectedTitle.rows.length) {
			return res.status(400).json({err: 'Title exists.'});
		} else {
			const pattern = /^[\d\{\}]+$/;
			if (!pattern.test(anime.ep_num.toString())) {
				return res.status(401).json({err: 'Wrong number of episodes.'});
			}

			await connection.query(`
		  	INSERT INTO anime 
			VALUES (
				'${anime.aid}', 
				'${anime.title}', 
				'${anime.gid}', 
				'${anime.tid}', 
				'${anime.fid}', 
				'${anime.pid}', 
				'${anime.otid}',
				'${anime.oid}', 
				${anime.ep_num}, 
				NULL
		  	);
			`);
			return res.status(200).json({message: 'Anime added.'});
		}
	} catch (error) {
		return res.status(501);
	}
});

app.post('/PostAddCharacter', async function (req, res) {
	const anime = req.body;
	console.log('/PostAddCharacter');

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	try {
		const selectedCharacter = await connection.query(`
		SELECT * from character where cid = '${anime.cid}';
	  	`);
		if (selectedCharacter.rows.length) {
			return res.status(400).json({err: 'Character exists.'});
		} else {
			if (anime.cid === 'Nan') {
				anime.cid = {};
			}

			let age = anime.age ? `'${anime.age}'` : 'NULL';
			await connection.query(`
			INSERT INTO character 
			VALUES (
				'${anime.cid}', 
				'${anime.name}', 
				'${anime.surname}', 
				'${anime.aid}', 
				'${anime.sex}', 
				 ${age}
			);
			`);
			return res.status(200).json({message: 'Character added.'});
		}
	} catch (error) {
		console.log(error);
		console.log(`
		INSERT INTO character 
		VALUES (
			'${anime.cid}', 
			'${anime.name}', 
			'${anime.surname}', 
			'${anime.aid}', 
			'${anime.sex}', 
			'${anime.age}'
		);
	  	`);
		return res.status(501);
	}
});

app.post('/PostAddVoiceActor', async function (req, res) {
	const anime = req.body;
	console.log('/PostAddVoiceActor');

	if (!anime.vid || !anime.name || !anime.sex) {
		console.log('Required field unfilled.');
		return res.status(400).json({err: 'vid, name and sex are required fields.'});
	}

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			console.log('Forbidden character ' + safetyRegex.key + safetyRegex.anime[key]);
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	try {
		const selectedCharacter = await connection.query(`
		SELECT * from voice_actor where vid = '${anime.vid}';
		`);
		if (selectedCharacter.rows.length) {
			return res.status(400).json({err: 'Voice actor exists.'});
		} else {
			let birth = anime.birth ? `'${anime.birth}'` : 'NULL';
			let home = anime.home ? `'${anime.home}'` : 'NULL';
			let cid = anime.cid || '';

			console.log(`
			INSERT INTO voice_actor 
			VALUES (
			  '${anime.vid}', 
			  '${anime.name}', 
			  '${anime.surname}',
			  '${anime.sex}', 
			   ${birth}, 
			   ${home},
			  '${cid}'
			);
		  	`);

			await connection.query(`
			INSERT INTO voice_actor 
			VALUES (
			  '${anime.vid}', 
			  '${anime.name}', 
			  '${anime.surname}',
			  '${anime.sex}', 
			   ${birth}, 
			   ${home},
			  '${cid}'
			);
		  	`);
			return res.status(200).json({message: 'Voice Actor added.'});
		}
	} catch (error) {
		console.log(error);
		return res.status(501);
	}
});

app.post('/PostEditAnime', async function (req, res) {
	const anime = req.body;
	console.log('/PostEditAnime');

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	try {
		const selectedTitle = await connection.query('SELECT * from anime where aid =\'' + anime.aid + '\';');

		if (selectedTitle.rows.length) {
			await connection.query('BEGIN');
			let query = 'UPDATE anime set ';
			if (anime.aid) {
				query += 'aid=\'' + anime.aid + '\', ';
			}
			if (anime.title) {
				query += 'title=\'' + anime.title + '\', ';
			}
			if (anime.gid) {
				query += 'gid=\'' + anime.gid + '\', ';
			}
			if (anime.tid) {
				query += 'tid=\'' + anime.tid + '\', ';
			}
			if (anime.fid) {
				query += 'fid=\'' + anime.fid + '\', ';
			}
			if (anime.pid) {
				query += 'pid=\'' + anime.pid + '\', ';
			}
			if (anime.otid) {
				query += 'otid=\'' + anime.otid + '\', ';
			}
			if (anime.oid) {
				query += 'oid=\'' + anime.oid + '\', ';
			}
			if (anime.ep_num) {
				query += 'ep_num=\'' + anime.ep_num + '\', ';
			}
			if (anime.cid) {
				query += 'cid=\'' + anime.cid + '\', ';
			}
			query = query.slice(0, -2);
			query += ' WHERE aid=\'' + anime.aid + '\';';
			console.log(query);
			await connection.query(query);
			await connection.query('COMMIT');
			return res.status(200).json({msg: 'Anime edited.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/EditAnime Error');
		let query = 'UPDATE anime set ';
		if (anime.aid) {
			query += 'aid=\'' + anime.aid + '\', ';
		}
		if (anime.title) {
			query += 'title=\'' + anime.title + '\', ';
		}
		if (anime.gid) {
			query += 'gid=\'' + anime.gid + '\', ';
		}
		if (anime.tid) {
			query += 'tid=\'' + anime.tid + '\', ';
		}
		if (anime.fid) {
			query += 'fid=\'' + anime.fid + '\', ';
		}
		if (anime.pid) {
			query += 'pid=\'' + anime.pid + '\', ';
		}
		if (anime.otid) {
			query += 'otid=\'' + anime.otid + '\', ';
		}
		if (anime.oid) {
			query += 'oid=\'' + anime.oid + '\', ';
		}
		if (anime.ep_num) {
			query += 'ep_num=\'' + anime.ep_num + '\', ';
		}
		if (anime.cid) {
			query += 'cid=\'' + anime.cid + '\', ';
		}
		query = query.slice(0, -2);
		query += ' WHERE aid=\'' + anime.aid + '\';';
		console.log(query);
		await connection.query(query);
		await connection.query('ROLLBACK');
		return res.status(501);
	}
});

app.post('/PostEditVoiceActor', async function (req, res) {
	const anime = req.body;
	console.log('/PostEditVoiceActor');

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	for (const field in anime) {
		if (!anime[field]) {
			anime[field] = null;
		}
	}

	for (const field in anime) {
		if (anime[field] === null) {
			anime[field] = null;
		} else {
			anime[field] = `'${anime[field]}'`;
		}
	}

	try {
		const selectedTitle = await connection.query(
			'SELECT * from voice_actor where vid = ' + anime.vid + ';'
		);
		if (selectedTitle.rows.length) {
			await connection.query('BEGIN');
			let query = 'UPDATE voice_actor set ';
			if (anime.vid) {
				query += 'vid=' + anime.vid + ', ';
			}
			if (anime.name) {
				query += 'name=' + anime.name + ', ';
			}
			if (anime.surname) {
				query += 'surname=' + anime.surname + ', ';
			} else {
				query += 'surname=NULL, ';
			}
			if (anime.sex) {
				query += 'sex=' + anime.sex + ', ';
			}
			if (anime.birth) {
				query += 'birth=' + anime.birth + ', ';
			} else {
				query += 'birth=NULL, ';
			}
			if (anime.home) {
				query += 'home=' + anime.home + ', ';
			} else {
				query += 'home=NULL, ';
			}
			if (anime.cid) {
				query += 'cid=' + anime.cid + ', ';
			}
			query = query.slice(0, -2);
			query += ' WHERE vid=' + anime.vid + ';';
			console.log(query);
			await connection.query(query);
			await connection.query('COMMIT');
			return res.status(200).json({msg: 'Voice Actor edited.'});
		} else {
			return res.status(400).json({err: 'Voice Actor is missing.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/EditVoiceActor Error');
		let query = 'UPDATE voice_actor set ';

		if (anime.vid) {
			query += 'vid=' + anime.vid + ', ';
		}
		if (anime.name) {
			query += 'name=' + anime.name + ', ';
		}
		if (anime.surname) {
			query += 'surname=' + anime.surname + ', ';
		}
		if (anime.sex) {
			query += 'sex=' + anime.sex + ', ';
		}
		if (anime.birth) {
			query += 'birth=' + anime.birth + ', ';
		}
		if (anime.home) {
			query += 'home=' + anime.home + ', ';
		}
		if (anime.aid) {
			query += 'aid=' + anime.aid + ', ';
		}
		query = query.slice(0, -2);
		query += ' WHERE vid=' + anime.vid + ';';
		console.log(query);
		await connection.query('ROLLBACK');
		return res.status(501);
	}
});

app.post('/PostEditCharacter', async function (req, res) {
	const anime = req.body;
	console.log('/PostEditCharacter');

	const safetyRegex = /^.*(--|;|--\+).*$/;
	for (const key in anime) {
		if (safetyRegex.test(key) || safetyRegex.test(anime[key])) {
			return res.status(400).json({err: 'Forbidden character in attribute or body.'});
		}
	}

	for (const field in anime) {
		if (!anime[field]) {
			anime[field] = null;
		}
	}

	for (const field in anime) {
		if (anime[field] === null) {
			anime[field] = null;
		} else {
			anime[field] = `'${anime[field]}'`;
		}
	}

	try {
		const selectedTitle = await connection.query('SELECT * from character where cid = ' + anime.cid + ';');
		if (selectedTitle.rows.length) {
			await connection.query('BEGIN');
			let query = 'UPDATE character set ';
			if (anime.cid) {
				query += 'cid=' + anime.cid + ', ';
			}
			if (anime.name) {
				query += 'name=' + anime.name + ', ';
			}
			if (anime.surname) {
				query += 'surname=' + anime.surname + ', ';
			} else {
				query += 'surname=NULL, ';
			}
			if (anime.aid) {
				query += 'aid=' + anime.aid + ', ';
			}
			if (anime.sex) {
				query += 'sex=' + anime.sex + ', ';
			}
			if (anime.age) {
				query += 'age=' + anime.age + ', ';
			} else {
				query += 'age=NULL  ';
			}
			query = query.slice(0, -2);
			query += ' WHERE cid=' + anime.cid + ';';
			console.log(query);
			await connection.query(query);
			await connection.query('COMMIT');
			return res.status(200).json({msg: 'Character edited.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/EditCharacter Error');
		await connection.query('ROLLBACK');
		return res.status(501);
	}
});

app.post('/PostDeleteAnime', async function (req, res) {
	const anime = req.body;
	console.log('/PostDeleteAnime');

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute.'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body.'});
		}
	}

	try {
		console.log('SELECT * from anime where aid = \'' + anime.aid + '\';');
		const selectedTitle = await connection.query('SELECT * from anime where aid = \'' + anime.aid + '\';');
		if (selectedTitle.rows.length) {
			await connection.query('DELETE from anime WHERE aid=\'' + anime.aid + '\';'
			);
			return res.status(501).json({err: 'Anime deleted.'});
		} else {
			return res.status(400).json({err: 'Anime already removed.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/DeleteAnime Error');
		return res.status(501);
	}
});

app.post('/PostDeleteVoiceActor', async function (req, res) {
	const anime = req.body;
	console.log('/PostDeleteVoiceActor');

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute.'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body.'});
		}
	}

	try {
		console.log('SELECT * from voice_actor where vid = \'' + anime.vid + '\';');
		const selectedTitle = await connection.query('SELECT * from voice_actor where vid = \'' + anime.vid + '\';');
		if (selectedTitle.rows.length) {
			await connection.query('DELETE from voice_actor WHERE vid=\'' + anime.vid + '\';'
			);
			return res.status(501).json({err: 'Voice Actor deleted.'});
		} else {
			return res.status(400).json({err: 'Voice Actor already removed.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/DeleteVoiceActor Error');
		return res.status(501);
	}
});

app.post('/PostDeleteCharacter', async function (req, res) {
	const anime = req.body;
	console.log('/PostDeleteCharacter');

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute.'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body.'});
		}
	}

	try {
		console.log('SELECT * from character where cid = \'' + anime.cid + '\';');
		const selectedTitle = await connection.query('SELECT * from character where cid = \'' + anime.cid + '\';');
		if (selectedTitle.rows.length) {
			await connection.query('DELETE from character WHERE cid=\'' + anime.cid + '\';'
			);
			return res.status(501).json({err: 'Character deleted.'});
		} else {
			return res.status(400).json({err: 'Character already removed.'});
		}
	} catch (error) {
		console.log(error);
		console.log('/DeleteCharacter Error');
		return res.status(501);
	}
});

// Posts used to get data from the frontend
app.post('/PostAnimeId', async function (req, res) {
	animeMemory = req.body;
	console.log(animeMemory);
	console.log('/PostAnimeId');
	res.status(200);
});

app.post('/PostCharacterId', async function (req, res) {
	characterMemory = req.body;
	console.log(characterMemory);
	console.log('/PostCharacterId');
	res.status(200);
});

app.post('/PostAnimeAndCharacterId', async function (req, res) {
	animeMemory = {'aid': req.body.aid};
	characterMemory = {'cid': req.body.cid};
	console.log(req.body);
	console.log('/PostAnimeAndCharacterID');
	res.status(200);
});

app.post('/PostVoiceActorId', async function (req, res) {
	voiceActorMemory = req.body;
	console.log(voiceActorMemory);
	console.log('/PostVoiceActorId');
	res.status(200);
});

// Get used by AnimeList.html, AnimeEditList.html and AnimeDeleteList.html
app.get('/GetAnimeList', async function (req, res) {
	const result = (await connection.query(
		'SELECT aid, title FROM anime;'
	));
	console.log('/GetAnimeList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by AnimeDetail.html and AnimeEdit.html
app.get('/GetDetailTitle', async function (req, res) {
	const result = (await connection.query(
		'SELECT aid, title FROM anime WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailTitle');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailCharacterList', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, name, surname FROM character WHERE aid @> \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailCharacterList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailGenre', async function (req, res) {
	const result = (await connection.query(
		'SELECT g.gid, g.name FROM anime a INNER JOIN genre g ON (a.gid @> g.gid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailGenre');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailTarget', async function (req, res) {
	const result = (await connection.query(
		'SELECT t.tid, t.name FROM anime a INNER JOIN target t ON (a.tid @> t.tid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailTarget');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailForm', async function (req, res) {
	const result = (await connection.query(
		'SELECT f.fid, f.name FROM anime a INNER JOIN form f ON (a.fid @> f.fid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailForm');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailPlace', async function (req, res) {
	const result = (await connection.query(
		'SELECT p.pid, p.name FROM anime a INNER JOIN place p ON (a.pid @> p.pid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailPlace');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailOtherTags', async function (req, res) {
	const result = (await connection.query(
		'SELECT ot.otid, ot.name FROM anime a INNER JOIN other_tags ot ON (a.otid @> ot.otid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailOtherTags');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailOrigin', async function (req, res) {
	const result = (await connection.query(
		'SELECT o.oid, o.name FROM anime a INNER JOIN origin o ON (a.oid @> o.oid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailOrigin');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailEpNum', async function (req, res) {
	const result = (await connection.query(
		'SELECT ep_num FROM anime WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailEpNum');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by AnimeAdd.html and AnimeEdit.html
app.get('/GetMaxAid', async function (req, res) {
	const result = (await connection.query(
		'SELECT max(aid) FROM anime;'
	));
	console.log('/GetAddGenre');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetEditAid', async function (req, res) {
	const result = (await connection.query(
		'SELECT aid FROM anime WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetAddGenre');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddGenre', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM genre;'
	));
	console.log('/GetAddGenre');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddTarget', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM target;'
	));
	console.log('/GetAddTarget');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddForm', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM form;'
	));
	console.log('/GetAddForm');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddPlace', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM place;'
	));
	console.log('/GetAddPlace');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddOtherTags', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM other_tags;'
	));
	console.log('/GetAddOtherTags');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetAddOrigin', async function (req, res) {
	const result = (await connection.query(
		'SELECT * FROM origin;'
	));
	console.log('/GetAddOrigin');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Get used by CharacterList.html, CharacterEditList.html and CharacterDeleteList.html

app.get('/GetCharacterList', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, name, surname FROM character;'
	));
	console.log('/GetCharacterList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by CharacterDetail.html and CharacterEdit.html
app.get('/GetCharacterTitleList', async function (req, res) {
	const result = (await connection.query(
		'SELECT aid, title FROM anime WHERE aid <@ (SELECT aid FROM character WHERE cid @> \'' + characterMemory.cid + '\') ;'
	));
	console.log('/GetCharacterTitleList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetCharacterName', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, name FROM character WHERE cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterName');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetCharacterSurname', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, surname FROM character WHERE cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterSurname');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetCharacterAge', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, age FROM character WHERE cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterAge');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetCharacterSex', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid, sex FROM character WHERE cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterSex');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetCharacterVoiceActor', async function (req, res) {
	const result = (await connection.query(
		'SELECT v.vid, v.name, v.surname FROM voice_actor v WHERE v.cid @> \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterVoiceActor');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by CharacterAdd.html and CharacterEdit.html
app.get('/GetMaxCid', async function (req, res) {
	const result = (await connection.query(
		'SELECT max(cid) FROM character;'
	));
	console.log('/GetMaxCid');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetEditCid', async function (req, res) {
	const result = (await connection.query(
		'SELECT cid FROM character WHERE cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetEditCid');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Get used by VoiceActorList.html,VoiceActorEditList.html and VoiceActorDeleteList.html
app.get('/GetVoiceActorList', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, name, surname FROM voice_actor;'
	));
	console.log('/GetVoiceActorList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by VoiceActorDetail.html and VoiceActorEdit.html
app.get('/GetVoiceActorCharacterList', async function (req, res) {
	const result = (await connection.query(
		'SELECT c.cid, c.name, c.surname, a.aid, a.title FROM character c LEFT JOIN (SELECT aid, title FROM anime) as a ON (a.aid <@ c.aid) WHERE c.cid <@ (SELECT cid FROM voice_actor WHERE vid @> \'' + voiceActorMemory.vid + '\') ;'
	));
	console.log('/GetVoiceActorCharacterList');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetVoiceActorName', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, name FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetVoiceActorName');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetVoiceActorSurname', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, surname FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetVoiceActorSurname');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetVoiceActorBirthday', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, birth FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetVoiceActorBirthday');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetVoiceActorSex', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, sex FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetVoiceActorSex');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetVoiceActorHome', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid, home FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetVoiceActorHome');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by VoiceActorAdd.html and VoiceActorEdit.html
app.get('/GetMaxVid', async function (req, res) {
	const result = (await connection.query(
		'SELECT max(vid) FROM voice_actor;'
	));
	console.log('/GetMaxVid');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetEditVid', async function (req, res) {
	const result = (await connection.query(
		'SELECT vid FROM voice_actor WHERE vid = \'' + voiceActorMemory.vid + '\' ;'
	));
	console.log('/GetEditVid');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});
