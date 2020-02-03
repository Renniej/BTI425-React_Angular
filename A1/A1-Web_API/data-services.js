//Data-services js is used for interacting with mongodb atlas database
const mongoose = require("mongoose");

var exports = (module.exports = {});
var Schema = mongoose.Schema;

var Car = mongoose.model(
  "Car",
  new Schema({
    Car_Brand: String,
    Car_Model: String,
    Car_Year: Number,
    Car_VIN: String,
    CAR_MSRP: Number,
    Car_Photo: String,

    Car_Purchaser_Name: { type: String, default: null },
    Car_Purchase_Date: { type: Date, default: null },
    Car_Purachaser_Email: { type: String, default: null },
    Car_Purchaser_Price: { type: Number, default: null },
    Car_Purchaser_Photo: { type: String, default: null }
  }),
  "MOCK_DATA"
); // collection name

exports.initializeDBConnection = function() {
  return new Promise(function(resolve, reject) {
    mongoose
      .connect(
        "mongodb+srv://Rennie:tHmxIPK3KeX5FnYy@senecaweb-dojoo.mongodb.net/BTI425?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )

      .then(function(data) {
        resolve("Mongodb connection successful :)");
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.Find = function(id) {
  console.log("FIND CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      Car.findById(id, function(err, data) {
        if (err) reject(err);
        if (data == null) reject("Car not found")
        else resolve(data);
      });
    } else {
      //else grab all documents
      console.log("LOOKING");
      Car.find({}, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }
  });
};

exports.Add_New_Car = function(newCar) {
  return new Promise(function(resolve, reject) {
    Car.create(newCar, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

exports.Update_Car = function(newCar) {
  console.log(newCar);
  return new Promise(function(resolve, reject) {
    Car.findByIdAndUpdate(newCar._id, newCar, { new: true }, function(
      err,
      data
    ) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

exports.Remove_Car = function(id) {
  return new Promise(function(resolve, reject) {
    Car.findByIdAndDelete(id, function(err) {
      if (err) reject(err);

    
      else resolve();
    });
  });
};
