const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
// Replace the placeholder with your Atlas connection string
const uri = process.env.URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

let db;

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    db = client.db("analysis");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post('/', async (req, res) => {
  res.send("posting data")
  const data = req.body;
  if (!data._id) {
    data._id = new ObjectId(); 
  }

  const result = await db.collection('analysis-collection').insertOne(data);

  if (result.acknowledged) {
    res.status(200).json({ message: 'Data posted successfully!' });
  } else {
    res.status(500).json({ message: 'Error posting data' });
  }
});

//  app.get('/', (req, res) => {
//    res.send("api running")
//   });


module.exports = app;


