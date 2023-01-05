const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 8081

var animeMemory;
var characterMemory;

const users = {}
const {Client} = require('pg');
const { connectionString } = require('pg/lib/defaults');
const DATABASE_HOST='localhost';
const DATABASE_USER='postgres';
const DATABASE_PASSWORD='admin';
const DATABASE_NAME='postgres';

const clientA = new Client({
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: 5432
  });

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.get('/info', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Connection to the database
const main = async () => {
  await clientA.connect();
  try {
    //test connection to the database
    console.log('Connection established');
  } finally {
    // pray this line doesn't connect
    //await clientA.end();
    console.log('Loud and clear')
  }
}

main().catch(console.error);

// Posts used to tests
app.post('/PostAnimeTest', async function(req, res) {
    console.log(characterMemory);
    console.log(animeMemory);
    console.log("/PostAnimeTest");
    res.status(200)
})

// Posts used to get data from the frontend
app.post('/PostAnimeId', async function(req, res) {
    animeMemory = req.body;
    console.log(animeMemory);
    console.log("/PostAnimeId");
    res.status(200)
})

app.post('/PostCharacterId', async function(req, res) {
    characterMemory = req.body;
    console.log(characterMemory);
    console.log("/PostCharacterId");
    res.status(200)
})

// Get used by AnimePage.html
app.get('/GetAnimeList',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT aid, title FROM anime;"
    ));
    console.log("/GetAnimeList");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
  })

// Gets used by AnimeDetail.html
app.get('/GetDetailTitle',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT aid, title FROM anime WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailTitle");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailCharacterList',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, name FROM character WHERE aid @> '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailCharacterList");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailGenre',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT g.name FROM anime a INNER JOIN genre g ON (a.gid @> g.gid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailGenre");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailTarget',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT t.name FROM anime a INNER JOIN target t ON (a.tid @> t.tid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailTarget");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailForm',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT f.name FROM anime a INNER JOIN form f ON (a.fid @> f.fid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailForm");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailPlace',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT p.name FROM anime a INNER JOIN place p ON (a.pid @> p.pid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailPlace");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailOtherTags',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT ot.name FROM anime a INNER JOIN other_tags ot ON (a.otid @> ot.otid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailOtherTags");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailOrigin',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT o.name FROM anime a INNER JOIN origin o ON (a.oid @> o.oid) WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailOrigin");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailEpNum',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT ep_num FROM anime WHERE aid = '" + animeMemory.aid + "' ;"
    ));
    console.log("/GetDetailEpNum");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

// Gets used by CharacterDetail.html
app.get('/GetCharacterName',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, name FROM character WHERE cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterName");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterTitleList',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT aid, title FROM anime WHERE cid @> '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterTitleList");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})