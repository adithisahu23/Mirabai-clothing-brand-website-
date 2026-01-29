const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// POST new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
//mainserveer file

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("Mirabai Backend is Running 🌸");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//connect frontendd to backend 

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => console.log(data));


