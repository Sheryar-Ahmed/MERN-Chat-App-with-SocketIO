import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins
app.use(cors({ origin: true }));

//home page
app.get('/', (req, res) => {
    res.send("I am Live Bohoooooo");
});









const PORT = process.env.PORT || 3000;








app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}.`);
});
