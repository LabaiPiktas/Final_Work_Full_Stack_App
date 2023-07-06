const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const console = require('console');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
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

app.post('/questions', async (req, res) => {
  const { type, createdAt, title, content, answers } = req.body;
  try {
    const con = await client.connect();
    const result = await con
      .db(dbName)
      .collection('questions')
      .insertOne({ type, createdAt, title, content, answers });
    await con.close();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const con = await client.connect();
    const result = await con
      .db(dbName)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(id) });
    // Use new ObjectId(id) instead of ObjectId(id)

    await con.close();

    if (result.deletedCount === 1) {
      res.send({ message: 'Question deleted successfully' });
    } else {
      res.status(404).send({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, createdAt, title, content, answers } = req.body;

    const con = await client.connect();

    const result = await con
      .db(dbName)
      .collection('questions')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { type, createdAt, title, content, answers, edited: true } },
      );

    await con.close();

    if (result.matchedCount === 1) {
      res.send({ message: 'Question updated successfully' });
    } else {
      res.status(404).send({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const con = await client.connect();

    const result = await con
      .db(dbName)
      .collection('questions')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updates, $currentDate: { updatedAt: true } },
      );

    await con.close();

    if (result.matchedCount === 1) {
      res.send({ message: 'Question updated successfully' });
    } else {
      res.status(404).send({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const con = await client.connect();

    // Use bcrypt to hash the password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const result = await con
          .db(dbName)
          .collection('users')
          .insertOne({ username, password: hash, email });

        res.send(result);
      }
    });

    await con.close();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const con = await client.connect();
    const result = await con
      .db(dbName)
      .collection('users')
      .findOne({ username });
    await con.close();

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/*app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Received login request:', email, password);

    // Bypass authentication logic for testing
    const user = { email: 'test@example.com', password: 'test123' };

    if (email === user.email && password === user.password) {
      // Password matches, user is authenticated
      res.send({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});*/

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Received login request:', email, password);
    const con = await client.connect();
    const user = await con.db(dbName).collection('users').findOne({ email });

    if (user) {
      const passwordMatch = password === user.password;
      if (passwordMatch) {
        // Password matches, user is authenticated
        res.send({ message: 'Login successful' });
      } else {
        // Password doesn't match
        res.status(401).send({ error: 'Invalid credentials' });
      }
    } else {
      // User not found
      res.status(404).send({ error: 'User not found' });
    }

    await con.close();
  } catch (error) {
    res.status(500).send(error);
  }
});

/*app.get('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const con = await client.connect();
    const user = await con.db(dbName).collection('users').findOne({ email });

    await con.close();

    if (user) {
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        // Password matches, user is authenticated
        res.send({ message: 'Login successful' });
      } else {
        // Password doesn't match
        res.status(401).send({ error: 'Invalid credentials' });
      }
    } else {
      // User not found
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});*/

app.post('/users', async (req, res) => {
  try {
    const { type, name, surname, email, data } = req.body;
    const con = await client.connect();
    const result = await con
      .db(dbName)
      .collection('users')
      .insertOne({ type, name, surname, email, data });
    await con.close();
    res.send(result);
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

app.get('/owners', async (req, res) => {
  try {
    const { sort } = req.query;
    const sortType = sort === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .find()
      .sort({ income: sortType })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
