const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'Default end-point'
    });
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));