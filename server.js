const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8081


const users = {}
const {Client} = require('pg');
const { connectionString } = require('pg/lib/defaults');
const DATABASE_HOST='localhost';
const DATABASE_USER='postgres';
const DATABASE_PASSWORD='test';
const DATABASE_NAME='shinden';

const clientA = new Client({
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: 5433
  }); 


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const main = async () => {
  await clientA.connect();
  try {
      //Test połączenia z bazą
      console.log('Łączność nawiązana');
  } finally {
      //Módl się, żeby ta linijka się nie załączyła
      //await clientA.end();
      console.log("Głośno i wyraźnie")
  }
}

main().catch(console.error);

app.get('/GetAllAnime',  async function (req, res) {
  console.log(req) 
  console.log("/AddToDB?")
    //await clientA.connect();

    const body = req.body;
    var result = (await clientA.query("SELECT * FROM anime;"));
    console.log("/GetAllAnime");
    console.log(JSON.parse(JSON.stringify(result.rows)));
    jresponse = result.rows;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify(jresponse)))
  })