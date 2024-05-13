
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "https://cardoctor-bd.web.app",
            "https://cardoctor-bd.firebaseapp.com",
        ],
        credentials: true,
    }
))


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vmk1mwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // await client.connect();
    
    const collection = client.db("hotel-booking").collection("rooms")
     

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("WOLCOME TO OUR HOTEL");
})

app.use(express.json())
app.listen(port, () => console.log(`server ranning on ${port}`))
