import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://thakurayushi696:lctBAu40eViE8iEC@cluster0.qmkd5do.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

app.post('/api/post-data', async (req, res) => {
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

app.get('*', (req, res) => {
   const indexPath = path.join(new URL(import.meta.url).pathname, '../index.html');
   res.sendFile(indexPath);
 });

 
app.listen(3000, () => {
console.log('API listening on port 3000!');
});

// vf97EGdl5X3BykeHyREgchHeUxekwVV5YnNjPQsVC3Av9u7YS3GdTsf48tjczIqV

var data = JSON.stringify({
  "collection": "analysis-collection",
  "database": "analysis",
  "dataSource": "Cluster0",
  "projection": {
      "_id": 1
  }
});