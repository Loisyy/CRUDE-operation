Create an API using expressjs mongodb that has a collection  named “shopitems” and “users". The shopitems collection should have the following properties: name(string), description(string) price(number) and isInStock(Boolean).

 

Users collection should have the following properties: fullName(string), username(string), password(string), role(string). The role property can have it's value as either “user” or “admin”.

 

Users should be able to view a list of items in the shop, view a single item via the item's ID. Admins should be able to do all the user can do. The admins can also add, edit and delete a shop item. If a user tries to add, edit or delete a product, he should receive a response with the status code of 403 and a response of “action-not-allowed”.

 

Users and admin should be able to register and login.

🤖 SheCodes Athena says:
Answered in 11.48 seconds
👍 Helpful👎 Not helpful
To create an API using Express.js and MongoDB with collections named "shopitems" and "users", you will need to follow these steps:

Set up your Express.js server by installing the necessary dependencies:
bash
Copy code
npm install express mongoose
Create a connection to your MongoDB database using Mongoose:
javascript
Copy code
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
Please make sure to replace 'mongodb://localhost/mydatabase' with the appropriate URL for your MongoDB database.

Define the schemas for the "shopitems" and "users" collections using Mongoose:
javascript
Copy code
const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isInStock: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
});

const ShopItem = mongoose.model('ShopItem', shopItemSchema);
const User = mongoose.model('User', userSchema);

1. Implement the routes and controllers for your API endpoints:

const express = require('express');
const app = express();
const port = 3000;

// Retrieve a list of items in the shop
app.get('/shopitems', (req, res) => {
  ShopItem.find({}, (err, shopItems) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.send(shopItems);
  });
});

// Retrieve a single item by ID
app.get('/shopitems/:id', (req, res) => {
  const itemId = req.params.id;
  ShopItem.findById(itemId, (err, shopItem) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (!shopItem) {
      return res.status(404).send('Shop item not found');
    }
    res.send(shopItem);
  });
});

// Add a new shop item (only accessible to admins)
app.post('/shopitems', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('action-not-allowed');
  }
  const newItem = req.body;
  ShopItem.create(newItem, (err, createdItem) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.send(createdItem);
  });
});

// Update a shop item (only accessible to admins)
app.put('/shopitems/:id', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('action-not-allowed');
  }
  const itemId = req.params.id;
  const updatedItem = req.body;
  ShopItem.findByIdAndUpdate(itemId, updatedItem, { new: true }, (err, updatedShopItem) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (!updatedShopItem) {
      return res.status(404).send('Shop item not found');
    }
    res.send(updatedShopItem);
  });
});

// Delete a shop item (only accessible to admins)
app.delete('/shopitems/:id', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('action-not-allowed');
  }
  const itemId = req.params.id;
  ShopItem.findByIdAndDelete(itemId, (err, deletedShopItem) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (!deletedShopItem) {
      return res.status(404).send('Shop item not found');
    }
    res.send(deletedShopItem);
  });
});

// Register a new user
app.post('/users/register', (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, createdUser) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.send(createdUser);
  });
});

// Login as a user
app.post('/users/login', (req, res) => {
  const { username, password } =n




  https://www.postman.com/loisy/workspace/kode-task/collection/28225597-042a8c6e-c0bb-4813-bd43-d8ad1bcf08d9?action=share&creator=28225597