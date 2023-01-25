const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 8081

var animeMemory;
var characterMemory;
var voiceActorMemory;

const users = {}
const {Client, Connection} = require('pg');
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

app.post('/Login', async function(req, res){
    const {userQuery} = req.params;
    const query = "SELECT * FROM users WHERE login = '${userQuery[0]}' and password = '${userQuery[1]}'";
    const [rows] = await clientA.query(query);
    res.json(rows);
})

// Posts used to tests
app.post('/PostAnimeTest', async function(req, res) {
    console.log(req.body);
    console.log("/PostAnimeTest");
    res.status(200)
})

// Posts used to alter the database
app.post('/PostAddAnime', async function(req, res) {
    try{
        console.log(req.body);
        const anime = req.body;
    }

    catch(error){
        return res.status(400).json({err: "error"});
    }

    const safetyRegex = /[^;+]+$/
    for(var key in req.body){
            if(!safetyRegex.test(key)){
                console.log("Wrong " + key)
                return res.status(400).json({err : "Forbidden character in attribute"});
            }
            if(!safetyRegex.test(req.body[key])){
                console.log("Wrong " + req.body[key]);
                return res.status(400).json({err : "Forbidden character in body"});
            }
    };

    try{
    console.log("SELECT * from anime where title = '" + anime.title + "';")
    console.log('trying');
    selectedTitle = await clientA.query("SELECT * from anime where title = '" + anime.title + "';")
    if(selectedTitle.rows.length){
        return res.status(400).json({err : "Title exist"});
    }
    
    else{
        console.log("Adding anime");
        await clientA.query(
        "INSERT INTO anime VALUES (" +
        "'" + anime.aid + "', '" + anime.title + "', '" + anime.gid + "', " +
        "'" + anime.tid + "', '" + anime.fid + "', '" + anime.pid + "', " +
        "'" + anime.otid + "', '" + anime.oid + "', " + anime.ep_num + ", NULL);"
        )    
        console.log("/PostAddAnime");
        return res.status(200).json({message: "Anime added"})};
    }

    catch(error){
    console.log("/PostAddAnime Error");
    return res.status(501)}
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

app.post('/PostAnimeAndCharacterId', async function(req, res) {
    animeMemory = {"aid": req.body.aid}
    characterMemory = {"cid": req.body.cid}
    console.log(req.body);
    console.log(animeMemory);
    console.log(characterMemory);
    console.log("/PostAnimeAndCharacterID");
    res.status(200)
})

app.post('/PostVoiceActorId', async function(req, res) {
    voiceActorMemory = req.body;
    console.log(characterMemory);
    console.log("/PostVoiceActorId");
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
        "SELECT cid, name, surname FROM character WHERE aid @> '" + animeMemory.aid + "' ;"
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
app.get('/GetCharacterTitleList',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT aid, title FROM anime WHERE cid @> '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterTitleList");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterName',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, name FROM character WHERE cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterName");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterSurname',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, surname FROM character WHERE cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterSurname");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterAge',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, age FROM character WHERE cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterAge");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterSex',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT cid, sex FROM character WHERE cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterSex");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetCharacterVoiceActor',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT v.vid, v.name, v.surname FROM voice_actor v inner join character c ON (c.vid @> v.vid) WHERE c.cid = '" + characterMemory.cid + "' ;"
    ));
    console.log("/GetCharacterVoiceActor");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

// Gets used by VoiceActorDetail.html
app.get('/GetVoiceActorCharacterList',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT c.cid, c.name, c.surname, a.aid, a.title FROM character c inner join anime a ON (a.cid @> c.cid) WHERE vid @> '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorCharacterList");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetVoiceActorName',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT vid, name FROM voice_actor WHERE vid = '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorName");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetVoiceActorSurname',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT vid, surname FROM voice_actor WHERE vid = '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorSurname");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetVoiceActorBirthday',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT vid, birth FROM voice_actor WHERE vid = '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorBirthday");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetVoiceActorSex',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT vid, sex FROM voice_actor WHERE vid = '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorSex");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetVoiceActorHome',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT vid, home FROM voice_actor WHERE vid = '" + voiceActorMemory.vid + "' ;"
    ));
    console.log("/GetVoiceActorHome");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

// Gets used by VoiceActorDetail.html
app.get('/GetMaxAid',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT max(aid) FROM anime;"
    ));
    console.log("/GetAddGenre");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddGenre',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM genre;"
    ));
    console.log("/GetAddGenre");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddTarget',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM target;"
    ));
    console.log("/GetAddTarget");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddForm',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM form;"
    ));
    console.log("/GetAddForm");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddPlace',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM place;"
    ));
    console.log("/GetAddPlace");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddOtherTags',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM other_tags;"
    ));
    console.log("/GetAddOtherTags");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetAddOrigin',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT * FROM origin;"
    ));
    console.log("/GetAddOrigin");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})