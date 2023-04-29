const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    'name'         :{type:String,required:true},
    'phone'        :{type:String,required:true,unique:true},
    'email'        :{type:String,required:true,unique:true},
    'pass1'        :{type:String,required:true},
    'profile_pic'  :{type:String,required:true}
},{versionKey:false});

module.exports = mongoose.model('userModel',userSchema,'users');
//userModel --> Just a Virtual Name of the Object.
//userSchema holds the structure of the Model which relies on collections of 
//database.
//users is the name of the collection of the Database.
console.log('User Model is Ready to Use');

