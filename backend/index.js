const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const uploadController = require('./controllers/uploadController');
const RestaurantController = require("./controllers/RestaurantController");
const userController = require("./controllers/userController");
const commentController = require("./controllers/commentController");

// db connecting
mongoose.set('strictQuery', false);

// MongoDB connection with success/error console messages
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

app.use("/auth", authController);
app.use("/property", propertyController);
app.use("/Restaurant", RestaurantController);
app.use('/upload', uploadController);
app.use('/user', userController);
app.use('/comment', commentController);

// starting server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
