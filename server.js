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

app.post('/Login', async function (req, res) {
	const query = 'SELECT * FROM users WHERE login = \'${userQuery[0]}\' and password = \'${userQuery[1]}\'';
	const [rows] = await connection.query(query);
	res.json(rows);
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
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json({err: 'error'});
	}

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body'});
		}
	}

	try {
		console.log('SELECT * from anime where title = \'' + anime.title + '\';');
		console.log('trying to add');
		const selectedTitle = await connection.query('SELECT * from anime where title = \'' + anime.title + '\';');
		if (selectedTitle.rows.length) {
			return res.status(400).json({err: 'Title exists'});
		} else {
			console.log('Adding anime');
			await connection.query(
				'INSERT INTO anime VALUES (' +
				'\'' + anime.aid + '\', \'' + anime.title + '\', \'' + anime.gid + '\', ' +
				'\'' + anime.tid + '\', \'' + anime.fid + '\', \'' + anime.pid + '\', ' +
				'\'' + anime.otid + '\', \'' + anime.oid + '\', ' + anime.ep_num + ', NULL);'
			);
			console.log('/PostAddAnime');
			return res.status(200).json({message: 'Anime added'});
		}
	} catch (error) {
		console.log('/PostAddAnime Error');
		return res.status(501);
	}
});

app.post('/PostEditAnime', async function (req, res) {
	const anime = req.body;
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json({err: 'error'});
	}

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body'});
		}
	}

	try {
		console.log('SELECT * from anime where aid = \'' + anime.aid + '\';');
		console.log('trying to edit');
		const selectedTitle = await connection.query('SELECT * from anime where aid = \'' + anime.aid + '\';');
		if (selectedTitle.rows.length) {
			await connection.query('UPDATE anime set ' +
				'aid=\'' + anime.aid + '\', ' + 'title=\'' + anime.title + '\', ' + 'gid=\'' + anime.gid + '\', ' +
				'tid=\'' + anime.tid + '\', ' + 'fid=\'' + anime.fid + '\', ' + 'pid=\'' + anime.pid + '\', ' +
				'otid=\'' + anime.otid + '\', ' + 'oid=\'' + anime.oid + '\', ' + 'ep_num=\'' + anime.ep_num + '\' ' +
				'WHERE aid=\'' + anime.aid + '\';'
			);
			return res.status(501).json({err: 'Anime edited'});
		} else {
			console.log('No anime to edit found');
			console.log('/EditAddAnime');
			return res.status(400).json({err: 'Title is missing'});
		}
	} catch (error) {
		console.log('/EditAnime Error');
		return res.status(501);
	}
});

app.post('/PostDeleteAnime', async function (req, res) {
	const anime = req.body;
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json({err: 'error'});
	}

	const safetyRegex = /[^;+]+$/;
	for (const key in anime) {
		if (!safetyRegex.test(key)) {
			console.log('Wrong ' + key);
			return res.status(400).json({err: 'Forbidden character in attribute'});
		}
		if (!safetyRegex.test(anime[key])) {
			console.log('Wrong ' + anime[key]);
			return res.status(400).json({err: 'Forbidden character in body'});
		}
	}

	try {
		console.log('SELECT * from anime where aid = \'' + anime.aid + '\';');
		console.log('trying to delete');
		const selectedTitle = await connection.query('SELECT * from anime where aid = \'' + anime.aid + '\';');
		if (selectedTitle.rows.length) {
			await connection.query('DELETE from anime WHERE aid=\'' + anime.aid + '\';'
			);
			return res.status(501).json({err: 'Anime edited'});
		} else {
			console.log('Anime already removed');
			console.log('/DeleteAnime');
			return res.status(400).json({err: 'Anime already removed'});
		}
	} catch (error) {
		console.log('/DeleteAnime Error');
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
	console.log(animeMemory);
	console.log(characterMemory);
	console.log('/PostAnimeAndCharacterID');
	res.status(200);
});

app.post('/PostVoiceActorId', async function (req, res) {
	voiceActorMemory = req.body;
	console.log(characterMemory);
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
		'SELECT g.name FROM anime a INNER JOIN genre g ON (a.gid @> g.gid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailGenre');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailTarget', async function (req, res) {
	const result = (await connection.query(
		'SELECT t.name FROM anime a INNER JOIN target t ON (a.tid @> t.tid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailTarget');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailForm', async function (req, res) {
	const result = (await connection.query(
		'SELECT f.name FROM anime a INNER JOIN form f ON (a.fid @> f.fid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailForm');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailPlace', async function (req, res) {
	const result = (await connection.query(
		'SELECT p.name FROM anime a INNER JOIN place p ON (a.pid @> p.pid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailPlace');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailOtherTags', async function (req, res) {
	const result = (await connection.query(
		'SELECT ot.name FROM anime a INNER JOIN other_tags ot ON (a.otid @> ot.otid) WHERE aid = \'' + animeMemory.aid + '\' ;'
	));
	console.log('/GetDetailOtherTags');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

app.get('/GetDetailOrigin', async function (req, res) {
	const result = (await connection.query(
		'SELECT o.name FROM anime a INNER JOIN origin o ON (a.oid @> o.oid) WHERE aid = \'' + animeMemory.aid + '\' ;'
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

// Gets used by CharacterDetail.html
app.get('/GetCharacterTitleList', async function (req, res) {
	const result = (await connection.query(
		'SELECT aid, title FROM anime WHERE cid @> \'' + characterMemory.cid + '\' ;'
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
		'SELECT v.vid, v.name, v.surname FROM voice_actor v inner join character c ON (c.vid @> v.vid) WHERE c.cid = \'' + characterMemory.cid + '\' ;'
	));
	console.log('/GetCharacterVoiceActor');
	const jResponse = result.rows;
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json(JSON.parse(JSON.stringify(jResponse)));
});

// Gets used by VoiceActorDetail.html
app.get('/GetVoiceActorCharacterList', async function (req, res) {
	const result = (await connection.query(
		'SELECT c.cid, c.name, c.surname, a.aid, a.title FROM character c inner join anime a ON (a.cid @> c.cid) WHERE vid @> \'' + voiceActorMemory.vid + '\' ;'
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