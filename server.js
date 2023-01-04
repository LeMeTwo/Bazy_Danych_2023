const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 8081


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

app.get('/GetAnimeTitles',  async function (req, res) {

    var result = (await clientA.query("SELECT title FROM anime;"));
    console.log("/GetAnimeTitles");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
  })

app.post('/GetAnimeName', async function(req, res) {

    const body = req.body;
    console.log(body);
    var result = (await clientA.query("SELECT * FROM anime WHERE title = " + body.title + ";"))
    console.log("/GetAnimeName");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))

})

app.get('/GetDetailTitle',  async function (req, res) {
    var result = (await clientA.query("SELECT title FROM anime WHERE title = 'Toradora!' ;"));
    console.log("/GetDetailTitle");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailGenre',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT g.name FROM anime a INNER JOIN genre g ON (a.gid @> g.gid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailGenre");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailTarget',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT t.name FROM anime a INNER JOIN target t ON (a.tid @> t.tid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailTarget");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailForm',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT f.name FROM anime a INNER JOIN form f ON (a.fid @> f.fid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailForm");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailPlace',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT p.name FROM anime a INNER JOIN place p ON (a.pid @> p.pid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailPlace");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailOtherTags',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT ot.name FROM anime a INNER JOIN other_tags ot ON (a.otid @> ot.otid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailOtherTags");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailOrigin',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT o.name FROM anime a INNER JOIN origin o ON (a.oid @> o.oid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailOrigin");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailEpNum',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT ep_num FROM anime WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailEpNum");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})

app.get('/GetDetailCharacter',  async function (req, res) {
    var result = (await clientA.query(
        "SELECT c.name FROM anime a INNER JOIN character c ON (a.cid @> c.cid) WHERE title = 'Toradora!' ;"
    ));
    console.log("/GetDetailCharacter");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
})
