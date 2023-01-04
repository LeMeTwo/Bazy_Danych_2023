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

app.get('/GetAllAnime',  async function (req, res) {

    var result = (await clientA.query("SELECT * FROM anime;"));
    console.log("/GetAllAnime");
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))

  })

