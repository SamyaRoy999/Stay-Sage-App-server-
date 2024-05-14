
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(express.json())
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
    const collectionBook = client.db("hotel-booking").collection("book")

    app.get('/rooms', async (req, res) => {
      const result = await collection.find().toArray()
      res.send(result)

    })

    app.get('/roomsr', async (req, res) => {
      const minPrice = parseInt(req.query.minPrice);
      const maxPrice = parseInt(req.query.maxPrice);
      const result = await collection.find({ price: { $gte: minPrice, $lte: maxPrice } }).toArray();
      res.send(result)
    });

    app.get('/rooms/singel/:id', async (req, res) => {
      const result = await collection.findOne({ _id: new ObjectId(req.params.id) })
      res.send(result)
    })

    app.post('/mybook', async (req, res) => {
      const singelRoom = req.body
      console.log(singelRoom)
      const result = await collectionBook.insertOne(singelRoom)
      res.send(result)
    })

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
