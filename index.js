const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const groqRouter = require('./routes/groqRouter');
const chatRouter = require('./routes/chatRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter)
app.use("/chat", chatRouter);
app.use("/groq", groqRouter);

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB Successfully...");
    })
    .catch((err) => {
        console.error(err);
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);