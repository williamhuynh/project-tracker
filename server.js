const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const updatesRouter = require('./routes/updates');


app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/updates', updatesRouter);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});