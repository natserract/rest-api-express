
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/user.route');
const questionRoute = require('./routes/question.route');

require('dotenv').config();

//Create express server
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json()); //allow parser to json

//Routes
app.use('/users', usersRouter);
app.use('/question', questionRoute);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => console.log("Error: " + err))

//connect to db
const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB database connection established sucessfully"))
connection.on('error', (err) => console.log("Error connect db" + err))

app.listen(port, () => console.log(`Server is running on port: ${port}`));

