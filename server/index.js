const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());
//Port
const PORT = process.env.PORT || 5500;

//Cors
app.use(cors());


//Import Routes
const TodoItemRoute = require('./routes/todoitems');


//MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err))

app.use('/', TodoItemRoute);

//Server connect
app.listen(PORT, () => console.log("Server Connected"));