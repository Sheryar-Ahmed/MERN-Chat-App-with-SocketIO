const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./routes/authRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require('./routes/messageRoute.js');

const cookieSession = require('cookie-session');
dotenv.config();

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

// Enable CORS for a specific origin
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // Add this line to enable JSON parsing
app.use(
  cookieSession({
    signed: false,
    secure: !isDevelopment, // set to true in production if using HTTPS
  }));
// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

// Home page
app.get('/', (req, res) => {
  res.send("I am Live Bohoooooo");
});

// User auth router
app.use(authRoute);
// chat router
app.use(chatRoute);
// message chat router
app.use(messageRoute);



app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`);
});

connectToDatabase();
