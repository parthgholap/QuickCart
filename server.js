const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quickcart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const productSchema = new mongoose.Schema({
  title: String,
  image: String,
}, { collection: 'product' });

const Product = mongoose.model('Product', productSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API to get products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}, 'title image');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
