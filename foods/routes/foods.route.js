//loading the express 
const express = require('express');
const multer = require('multer');
const foodRouter = express.Router();

//consuming BASE_URL
const baseURL = require('../base_url');

//basic configuration for multer
const multerStorage = multer.diskStorage({
    destination:'public/uploads/',
    filename: (file,data,cb)=>{
           cb(null,Date.now()+'.jpg');
    }
});

const uploadObj = multer({storage:multerStorage});
console.log('Multer is configured & Ready to Use..');

//Consuming food MOdel 
const foodModel = require('../models/food.model');

/*food related all API endpoint will be defined here.... */
foodRouter.get('/foods',(req,res)=>{
    foodModel.find({})
    .exec()
    .then((foodData)=>{
        res.status(200).json(foodData);
    })
    .catch((error)=>{
        res.status(200).json(error);
    });
    //res.status(200).json({'message':'all foods details'});
});

//Getting a Specific food Information depends on id
foodRouter.get('/foods/:id',(req,res)=>{
       foodModel.findOne({'id':req.params._id})
                .exec()
                .then((foodInfo)=>{
                    if(!foodInfo)
                       res.status(200).json({'message':'No Such Food Record Found !!'});
                       else
                       res.status(200).json(foodInfo);
                })
                .catch((error)=>{
                    res.status(200).json({'message':error});
                });
});
//Adding a POST Request
foodRouter.post('/foods/add',uploadObj.single('pic'),(req,res)=>{
      let newFoodModel = new foodModel({
             'food_name' : req.body.food_name,
             'food_category':req.body.food_category,
             'food_desc' : req.body.food_desc,
             'food_price': req.body.food_price,
             'food_image': baseURL+req.file.filename
      });

      newFoodModel.save()
                  .then((result)=>{
                      res.status(200).json({
                       'message':'One food Item has been added Successfully !',
                      'insertedData':result
                      })
                  })
                  .catch((error)=>{
                      res.status(200).json({'message':error});
                  });
});


foodRouter.delete('/food/:id',(req,res)=>{
    foodModel.deleteOne({'_id':req.params.id})
             .then((deletedData)=>{
              if(deletedData.deletedCount)
                res.status(200).json(
                  {'message':'One Food Record has been removed successully !!',
                   'deletedInfo':deletedData
                  });
               else
                 res.status(200).json({'message':'No Such Food Record found OR Record has been deleted before !!'});

             })
             .catch((error)=>{
                 res.status(200).json({'error':error});
             });
});


foodRouter.all('/food/:id',uploadObj.single('pic'),(req,res)=>{
    if(req.method =='PUT' || req.method =='PATCH'){
        //Mongoose ORM will comes into the action.
        let foodId = req.params.id;
        foodModel.updateOne({'_id':foodId},{$set:{
               'food_name': req.body.food_name,
               'food_desc':req.body.food_desc,
               'food_price':req.body.food_price,
               'food_image':baseURL+req.file.filename
        }})
        .then((updateData)=>{
            if(updateData.matchedCount && updateData.modifiedCount){
            res.status(200).json(
                {'message':'One Food Record has been updated',
                'updateData':updateData
                });
            }else{
                res.status(200).json({'message':'No Such Record exists !'});
            }
        })
        .catch((error)=>{
            res.status(200).json({'message':error});
        });
    }else{
        res.status(200).json({'message':req.method+' Method doesnot supported'});

    }
});

foodRouter.get('/food/:lim1/:lim2',(req,res)=>{
    // console.log(req.params.lim1);
    // console.log(req.params.lim2);
    foodModel.find(
       {$and:
           [
               {'food_price':{$gte:req.params.lim1}},
               {'food_price':{$lte:req.params.lim2}}
           ]
       }
       )
        .exec()
        .then((foodData)=>{
            if(!foodData.length)
               res.status(200).json({'message':'No Such Food Found in Price Range !'});
               else{
               res.status(200).json(foodData);
               }
          
       })
       .catch((error)=>{
        res.status(200).json({'error':error});
       });
});
//Deleting food info depends on _id
// foodRouter.delete('/food/del/:id',(req,res)=>{
//     foodModel.deleteOne({'_id':req.params.id})
//              .then((deletedData)=>{
//               if(deletedData.deletedCount)
//                 res.status(200).json(
//                   {'message':'One Food Record has been removed successully !!',
//                    'deletedInfo':deletedData
//                   });
//                else
//                  res.status(200).json({'message':'No Such Food Record found OR Record has been deleted before !!'});

//              })
//              .catch((error)=>{
//                  res.status(200).json({'error':error});
//              });
// });

module.exports = foodRouter;//making foodRouter available to entire application.

console.log('FoodRouter is Ready to Use');