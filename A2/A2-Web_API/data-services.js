//Data-services js is used for interacting with mongodb atlas database
const mongoose = require("mongoose");

var definitionSchema = require("./msc-definiton")
var termEnglishSchema = require("./msc-termEnglish")
var termOtherSchema = require("./msc-termOther")

var exports = (module.exports = {});
var Schema = mongoose.Schema;


var definiton = mongoose.model(
  "Definition",
 
  definitionSchema

  ,
  "Definition"
); 


var termEnglish = mongoose.model(
  "TermEnglish",
  termEnglishSchema,
  "TermEnglish"
); // collection name



var termOther = mongoose.model(
  "TermNonEnglish",
  termOtherSchema,
  "TermNonEnglish"
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



exports.findEnglishTermsById = function(id) {
  console.log("findAllEnglishTerms CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      termEnglish.findById(id, function(err, data) {
        if (err) reject(err);
        if (data == null) reject("Car not found")
        else resolve(data);
      });
    } else {
      //else grab all documents
      console.log("LOOKING");
      termEnglish.find({}, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }
  });
};

exports.findEnglishTermsByWord = function(word) {

  console.log()
    return new Promise(function(resolve, reject){

      if (word){
        termEnglish.findOne({wordEnglish : word}, function(err, data){

          if (err) reject(err)
          else resolve(data)

        })
      }

    })

}

exports.addEnglishTerm = function(newTerm) {
  return new Promise(function(resolve, reject) {
    termEnglish.create(newTerm, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

exports.updateEnglishTerm = function(newTerm) {
  console.log(newTerm);
  return new Promise(function(resolve, reject) {
    termEnglish.findByIdAndUpdate(newTerm._id, newTerm, { new: true }, function(
      err,
      data
    ) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};




exports.removeEnglishTerm = function(id) {
  return new Promise(function(resolve, reject) {
    termEnglish.findByIdAndDelete(id, function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
};


exports.modifyHelpEnglish = function(id, crement, type){


  return new Promise(function(resolve, reject){

    if (crement === true){

        this.incrementHelpEnglish(id,type).then(function(data){
          resolve();
        }).catch(function(err){
          reject(err);
        })

    }else if (crement === false){
      this.decrementHelpEnglish(id, type).then(function(data){
        resolve();
      }).catch(function(err){
        reject(err);
      })
    }


  })


}



exports.incrementHelpEnglish = function(id, type){


  return new Promise(function(resolve,Reject){

    this.findEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes++;
      }
      else{
        term.helpNo++;
      }

      this.updateEnglishTerm(term).then(function(data){

        resolve(data);

      }).catch(function(err){
        reject(err);
      })


    }).catch(function(err){
      reject(err);
    })


  })
   

}



exports.decrementHelpEnglish = function(id, type){


  return new Promise(function(resolve,Reject){

    this.findEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes--;
      }
      else{
        term.helpNo--;
      }

      this.updateEnglishTerm(term).then(function(data){

        resolve(data);

      }).catch(function(err){
        reject(err);
      })


    }).catch(function(err){
      reject(err);
    })


  })
   

}


/*





*/