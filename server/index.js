const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json()); // aplikacija moka apdoroti JSON formatu ateinancius requestus
app.use(cors());

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('questions').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { type, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Users')
      .insertOne({ type, name, userId: new ObjectId(req.body.userId) }); // new ObjectId(id)
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions', async (req, res) => {
  try {
    const { type, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .insertOne({
        type,
        name,
        questionIdId: new ObjectId(req.body.questionId),
      }); // new ObjectId(id)
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersWithQuestions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Users')
      .aggregate([
        {
          $lookup: {
            from: 'questions',
            localField: '_id',
            foreignField: 'userId',
            as: 'questions',
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// /owners?sort=asc
// /owners?sort=dsc
app.get('/Users', async (req, res) => {
  try {
    const { sort } = req.query;
    const sortType = sort === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Users')
      .find()
      .sort({ income: sortType }) // 1 didejimo -1 mazejimo
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});

/*client
  .connect()
  .then(() => {
    console.log('Prisijungta prie MongoDB');
    app.listen(port, () => {
      console.log(`Serveris paleistas adresu http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Klaida prisijungiant prie MongoDB:', error);
  });*/

/*app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('fakeUsers').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { type, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('fakeUsers')
      .insertOne({ type, name, ownerId: new ObjectId(req.body.ownerId) }); // new ObjectId(id)
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/ownersWithPets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .aggregate([
        {
          $lookup: {
            from: 'pets',
            localField: '_id',
            foreignField: 'ownerId',
            as: 'pets',
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// /owners?sort=asc
// /owners?sort=dsc
app.get('/owners', async (req, res) => {
  try {
    const { sort } = req.query;
    const sortType = sort === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .find()
      .sort({ income: sortType }) // 1 didejimo -1 mazejimo
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});*/
