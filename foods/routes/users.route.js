const express = require('express');

const userRouter = express.Router();

//loading bcryptjs
const bcryptjs = require('bcryptjs');

const multer = require('multer');
const base_url = require('../base_url');
//basic configuration for multer
const multerStorage = multer.diskStorage({
    destination:'public/uploads/',
    filename: (file,data,cb)=>{
           cb(null,Date.now()+'.jpg');
    }
});

const uploadObj = multer({storage:multerStorage});
console.log('Multer is configured & Ready to Use..');

//Consuming the User Model.
const userModel = require("../models/user.model");
/*User Related all API Endppints will be mentioned here */
userRouter.post('/signup',uploadObj.single('avatar'),(req,res)=>{

    let salt = bcryptjs.genSaltSync(10);
    let hashPass = bcryptjs.hashSync(req.body.pass1,salt);

    let newUser = new userModel({
           'name'   :req.body.name,
           'phone'  :req.body.phone,
           'email'  :req.body.email,
           'pass1'  :hashPass,
           'profile_pic': base_url+req.file.filename
    });

    newUser.save()
           .then((userData)=>{
              res.status(200).json({'message':'SignUp Successfull !!','userData':userData})
           })
           .catch((errorData)=>{
         // res.status(200).json(errorData);
               if(errorData.keyPattern.phone)
                  res.status(200).json({'message':'Phone already Registered'});
               else if(errorData.keyPattern.email)
                  res.status(200).json({'message':'Email already Registered !'});   

              
                  // if (errorData.code === 11000) {
                  //   // Duplicate key error
                  //   res.status(200).json({ message: 'Email or phone number already in use' });
                  // } else {
                  //   // Other error
                  //   res.status(500).json({ message: 'Internal server error' });
                  // }
                


          
                 })
                
});

module.exports = userRouter;

console.log('UserRouter is Ready to Use');