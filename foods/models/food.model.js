const mongoose = require('mongoose');
const { stringify } = require('querystring');


const foodSchema = mongoose.Schema({
      'food_name':{type:String,required:true},
      'food_category':{type:String,required:true},
      'food_desc':{type:String,required:true},
      'food_price':{type:Number,required:true},
      'food_image':{type:String,required:true}
},{versionKey:false}); 

module.exports = mongoose.model('XYZ',foodSchema,'foods');
//XYZ --> Just a Virtual name for the Mongoose Model.
//foodSchema --> Schema Object of the MOdel 
//foods --> name of the database collection.

console.log('Food Model is Ready to Use');
