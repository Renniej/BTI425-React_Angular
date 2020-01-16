//Data-services js is used for interacting with mongodb atlas database
const mongoose = require('mongoose')


var exports = module.exports = {};
var Schema = mongoose.Schema;

var Car = mongoose.model('Car', 
new Schema({ 
    
    Car_Brand: String, 
    Car_Model: String, 
    Car_Year: Number,
    Car_VIN : String,
    CAR_MSRP : Number,
    Car_Photo : String,

    Car_Purchaser_Name : String,
    Car_Purchase_Date : Date,
    Car_Purachaser_Email : String,
    Car_Purchaser_Price : Number,
    Car_Purchaser_Photo : String


}), 
'MOCK_DATA');     // collection name


exports.initializeDBConnection = function(){


    return new Promise(function(resolve, reject){
        mongoose.connect('mongodb+srv://Rennie:tHmxIPK3KeX5FnYy@senecaweb-dojoo.mongodb.net/BTI425?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true})
        
        .then(function(data){
            
            resolve("Mongodb connection successful :)")
            
        }).catch(function(err){
            
                reject(err);
         });
    });
} ;


exports.getAll = function(){
    return new Promise(function(resolve, reject){

        Car.find({}, function(err, data){

            if (err) reject(err)
            else resolve(data);


        })


    })
}