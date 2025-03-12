const express = require("express");
const app = express();
const cors = require("cors")
const port = 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.monogdbUserName}:${process.env.monogdbUserPassword}@cluster0.iagloem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// foodecommerce
// C0nQEW1QVzyT9BRX


//--------------------- Mongodb conection code start -------------------//

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {

  const FoodData = client.db("ECommerce_Food").collection("food-data")

  try {
    app.get("/fooddata", async (req, res) => {
      const data = await FoodData.find().toArray();
      console.log(data)
      res.send(data)
    })


    app.get("/product/:id", async (req,res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await FoodData.findOne(query);
        if (!result) {
          return res.status(404).send({ message: "Product not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    console.log("finaly")
  }
}

run().catch(console.dir);

//--------------------- Mongodb conection code end -------------------//

app.get("/", (req, res) => {
  res.send("Hello world")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})