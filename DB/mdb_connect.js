// const express = require('express');
// const app = express();

const mongoose = require('mongoose');
 mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://sikandar0503:sikandar0503@cluster0.pglkzgq.mongodb.net/?retryWrites=true&w=majority/fooddb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }
).then(() => {
    console.log("Mongo db is conneted");
})
