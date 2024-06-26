const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // PUT/DELETE requests
const routes = require('./controllers/flow'); // Import router
require('dotenv').config();
const port = process.env.PORT || 3000;

const Journal = require("./models/journal");


const mongoURI = process.env.MONGOURI;

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log("Connection with MongoDB established");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
}

connectToMongo();

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Mount the router
app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Yeeeerp onn 3000`);
});
