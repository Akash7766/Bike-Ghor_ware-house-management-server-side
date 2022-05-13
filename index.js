// import important things
const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");
const app = express();
const port = process.env.PORT || 5000;

// use midleware
app.use(cors());
app.use(express.json());

// bikehouse
// 1YilZKETlxkI97JK

// mongoDB connecttion

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://bikehouse:1YilZKETlxkI97JK@cluster0.pea3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productsCollection = client.db("bike-house").collection("product");
    // get all the products by this api
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get a single product by id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    // get a single product by email
    app.get("/product", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(req.query);
    });

    // add product api
    app.post("/addproduct", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send({ result });
    });
  } finally {
    // do not need at this time
  }
}
run().catch(console.dir);

// this is root server get method
app.get("/", (req, res) => {
  res.send("Welcome to Bike house server");
});
// app listen and console to the cmd
app.listen(port, () => {
  console.log("Server is running at ", port);
});
