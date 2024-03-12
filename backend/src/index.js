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



const server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`);
});

connectToDatabase();


//socket implementation

const io = require('socket.io')(server, {
  pingTimeOut: 60000, //if didn't send any message for 60 sec, close the connection
  cors: { origin: 'http://localhost:5173', credentials: true }
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  // Send a message to the connected client
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(userData);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  //check for start typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
    //check for stop typing
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach(user => {
      if (user.id == newMessageReceived.sender.id) return; //if the sender is same
      socket.in(user.id).emit("message Received", newMessageReceived);
    });
  })
});
