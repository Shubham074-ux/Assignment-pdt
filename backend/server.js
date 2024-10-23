const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const uri = 'mongodb://localhost:27017'; // Consider moving to an env variable
const dbName = 'Dream11';
let db;

async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName); // Store the database reference
}

connectToDatabase().catch(console.error); // Call this once on startup

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/create-team', async (req, res) => {
    try {
        const PlayersCollection = db.collection('create-team');
        const player = {
            PlayerName: req.body.PlayerName,
            points: req.body.points,
            description: req.body.description,
        };
        const result = await PlayersCollection.insertOne(player);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error inserting player:', err);
        res.status(500).json({ error: 'Failed to upload members' });
    }
});

// server.js (backend)

app.post('/api/teams', async (req, res) => {
    try {
    //   const db = await connectToDatabase();
      const TeamsCollection = db.collection('teams');
      
      const newTeam = {
        team: req.body.team, // This contains the team array sent from the frontend
      };
  
      const result = await TeamsCollection.insertOne(newTeam);
      res.status(201).json({ message: 'Team created successfully', result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create team' });
    }
  });
  
app.get('/api/teams', async (req, res) => {
    try {
    //   const db = await connectToDatabase();
      const TeamsCollection = db.collection('teams');
      
      const teams = await TeamsCollection.find({}).toArray();
      
      // Return the teams in the response
      res.status(200).json(teams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  });
  

  app.get('/api/create-team', async (req, res) => {
    try {
        const PlayersCollection = db.collection('create-team');
        const products = await PlayersCollection.find({}).toArray();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
