const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// middleware configuration
app.use(cors());
app.use(express.json());

// mongodb connected here

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.oxnofiz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const toysCollection = await client.db("ToysDB").collection("Toys");

    // step:1 - post route create
    app.post("/all_toys", async (req, res) => {
      const newToys = req.body;
      console.log(newToys);
      const result = await toysCollection.insertOne(newToys);
      console.log(result);
      res.send(result);
    });

    // step:2
    app.get("/alltoys", async (req, res) => {
      const toys = toysCollection.find();
      const result = await toys.toArray();
      res.send(result);
    });

    // step :3
    app.get("/toy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.findOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    console.log("finally connected to MongoDB");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("toy shop server is running......");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
