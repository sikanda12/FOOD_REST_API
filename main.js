//loading express module
const express = require('express');
const cors = require('cors');
//specifying the port number
const port = 4000;
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dbURL='mongodb+srv://sikandar0503:sikandar0503@cluster0.pglkzgq.mongodb.net/fooddb?retryWrites=true&w=majority/';
mongoose.connect(dbURL)
        .then(()=>{ console.log('Connected to MongoDB');})//Resolve
        .catch((error)=>{ console.log('Error '+error)});//Reject
//let express to accept incoming form data + Json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));//SSR

//consuming food Router
const foodRouter = require('./foods/routes/foods.route');
const userRouter=require('./foods/routes/users.route');

//here we are using multiple router / module service


app.use(cors());
app.use('/api',foodRouter);
app.use('/api',foodRouter);
app.use('/api',userRouter);
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to FOOD-REST-API-2023</h1>");
});


app.listen(port, () => {
    console.log(`Server has started at ${port}`);
});




