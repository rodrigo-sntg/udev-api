const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb+srv://x:x@cluster0-shkyo.mongodb.net/omni?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);