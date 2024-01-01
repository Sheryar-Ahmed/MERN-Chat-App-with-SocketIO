import express from 'express';
import cors from 'cors';
import {authRoute} from "./routes/authRoute.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors({ origin: true }));
app.use(express.json()); // Add this line to enable JSON parsing

//home page
app.get('/', (req, res) => {
    res.send("I am Live Bohoooooo");
});

//user auth router
app.use(authRoute);




app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}.`);
});
