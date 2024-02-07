const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db('your_database_name');
  const collection = db.collection('your_collection_name');

  // Endpoint to handle scanning QR codes
  app.post('/scan', async (req, res) => {
    const content = req.body.content;

    try {
      const result = await collection.findOneAndUpdate(
        { "_id": content },
        { $set: { "scanned": true } },
        { returnOriginal: false }
      );

      res.json(result.value);
    } catch (err) {
      console.error('Error scanning QR code:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
