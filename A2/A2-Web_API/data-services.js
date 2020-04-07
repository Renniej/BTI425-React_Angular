//Data-services js is used for interacting with mongodb atlas database
const mongoose = require("mongoose");



var definitionSchema = require("./msc-definiton")
var termEnglishSchema = require("./msc-termEnglish")
var termOtherSchema = require("./msc-termOther")

var exports = (module.exports = {});
var Schema = mongoose.Schema;









definitionSchema.post('deleteOne', function(next) {
  
  var defin = this.getFilter()["_id"];
  console.log("ID : " + defin._id);
  termEnglish.updateMany(
    {definitions: {$in: [defin._id]} }, 
    {$pull: {definitions: defin._id}}, (function(err,numberAffected){

      
      console.log("Number Affected : " + JSON.stringify(numberAffected));
        if (err){
          console.log(err)
        }
       
    }) 
 )


 termOther.updateMany(
  {definitions: {$in: [defin._id]} }, 
  {$pull: {definitions: defin._id}}, (function(err,numberAffected){

    
    console.log("Number Affected : " + JSON.stringify(numberAffected));
      if (err){
        console.log(err)
      }
     
  }) 
)

});

var termEnglish = mongoose.model(
  "TermEnglish",
  termEnglishSchema,
  "TermEnglish"
); // collection name

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



definitionSchema.pre('remove', function(next){
  console.log("CALLED PRE REMOVE")
  this.model('TermEnglish').update(
      {_id: {$in: this._id}}, 
      {$pull: {groups: this._id}}, 
      {multi: true},
      next
  );
});


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

exports.findDefinitionById = function(id) {
  console.log("findDefinitionByID CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      definiton.findById(id, function(err, data) {
        if (err) reject(err);
        if (data == null) reject("defintion not found")
        else resolve(data);
      });
    } else {
      //else grab all documents
      console.log("LOOKING");
      definiton.find({}, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }
  });
};

exports.addEngDefinition = function(newDefinition, termID) {
  return new Promise(function(resolve, reject) {


    exports.findEnglishTermsById(termID).then(function(term){

        if (term === null){
          reject("English term with that ID does not exist, thus defintiion creation was canceled");
        }
        else{
          definiton.create(newDefinition, function(err, defin) {
            if (err) reject(err);
            else {

              //console.log(" UPDATING TERM IN DEFINITION CREATION : " + term);
              term.definitions.push(defin._id);

              exports.updateEnglishTerm(term).then(function(data){
                resolve(data);
              }).catch(function(err){
                reject(err);
              })


            }
          });
        }

      }).catch(function(err){
        reject(err);
      })
  });
};

exports.addNonEngDefinition = function(newDefinition, termID) {
  return new Promise(function(resolve, reject) {


    exports.findNonEnglishTermsById(termID).then(function(term){

        if (term === null){
          reject("English term with that ID does not exist, thus defintiion creation was canceled");
        }
        else{
          definiton.create(newDefinition, function(err, defin) {
            if (err) reject(err);
            else {

              //console.log(" UPDATING TERM IN DEFINITION CREATION : " + term);
              term.definitions.push(defin._id);

              exports.updateNonEnglishTerm(term).then(function(data){
                resolve(data);
              }).catch(function(err){
                reject(err);
              })


            }
          });
        }

      }).catch(function(err){
        reject(err);
      })
  });
};





exports.updateDefinition = function(newDefinition) {
  console.log("updateDefinition called")
  console.log(newDefinition);
  return new Promise(function(resolve, reject) {
    definiton.findByIdAndUpdate(newDefinition._id, newDefinition, { new: true }, function(
      err,
      data
    ) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


exports.removeDefinition = function(id) {
  return new Promise(function(resolve, reject) {

    definiton.deleteOne({_id: id}, (err)=> {







      if (err) reject(err);
      else {

          
        resolve();

      }
    });
  });
};

//------- non english term functions

exports.findNonEnglishTermsById = function(id) {
  console.log("findAllEnglishTerms CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      termOther.findById(id, function(err, data) {
        if (err) reject(err);
        if (data == null) reject("Car not found")
        else resolve(data);
      });
    } else {
      //else grab all documents
      console.log("LOOKING");
      termOther.find({}, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }
  });
};

exports.findPopulatedNonEnglishTermsById = function(id) {
  console.log("findAllEnglishTerms CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      termOther.findById(id).populate('definitions').exec(function(err, data) {
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


exports.findNonEnglishTermsByWord = function(word) {

  console.log()
    return new Promise(function(resolve, reject){

      if (word){
        termOther.findOne({wordEnglish : word}, function(err, data){

          if (err) reject(err)
          else resolve(data)

        })
      }

    })

}


exports.addNonEnglishTerm = function(newTerm) {

  newTerm.dateRevised = Date.now();
  return new Promise(function(resolve, reject) {
    termOther.create(newTerm, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


exports.addDefinitionToNonEnglishTerm = function(definitonID,termID){

  return new Promise(function(resolve,reject){


    if (definitonID != null && termID != null){

    exports.findNonEnglishTermsById(termID).then(function(term){

        if (term === null){
          reject("English term does not exist")
        }
        else{

            exports.findDefinitionById(definitonID).then(function(defin){


              if (defin === null){
                reject("Term with ID " +  definitonID + "does not exist")
              }
              else{

                term.definitions.push(defin._id);
                exports.updateNonEnglishTerm(term).then(function(data){

                  resolve(data);


                }).catch(function(err){
                  reject(err);
                })

              }

            }).catch(function(err){
              reject(err);
            })

        }

   }).catch(function(err){
     reject(err);
   })


  }
  else reject("A null parameter was sent for term or definition ID");

  });

}


exports.updateNonEnglishTerm = function(newTerm) {
  console.log("update English Term called")
  console.log(newTerm);
  return new Promise(function(resolve, reject) {
    termOther.findByIdAndUpdate(newTerm._id, newTerm, { new: true }, function(
      err,
      data
    ) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


exports.removeNonEnglishTerm = function(id) {
  return new Promise(function(resolve, reject) {
    termOther.findByIdAndDelete(id, function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
};


exports.modifyHelpEnglish = function(id, crement, type){


  return new Promise(function(resolve, reject){

    if (crement === true){

        exports.incrementHelpEnglish(id,type).then(function(data){
          console.log( id + ": has been incremented");
          resolve();
        }).catch(function(err){
          reject(err);
        })

    }else if (crement === false){
      exports.decrementHelpEnglish(id, type).then(function(data){
        console.log( id + ": has been decremented");
        resolve();
      }).catch(function(err){
        reject(err);
      })
    }


  })  


}

exports.incrementHelpEnglish = function(id, type){


  return new Promise(function(resolve,Reject){

    exports.findEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes++;
      }
      else{
        term.helpNo++;
      }

      exports.updateEnglishTerm(term).then(function(data){

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

    exports.findEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes--;
      }
      else{
        term.helpNo--;
      }


      exports.updateEnglishTerm(term).then(function(data){

        resolve(data);

      }).catch(function(err){
        reject(err);
      })


    }).catch(function(err){
      reject(err);
    })


  })
}

//------------------------------------------------------

exports.findPopulatedEnglishTermsById = function(id) {
  console.log("findAllEnglishTerms CALLED");

  return new Promise(function(resolve, reject) {
    if (id) {
      //if a condition is sent then find all documents with that condition

      console.log(id);
      termEnglish.findById(id).populate('definitions').exec(function(err, data) {
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

exports.addDefinitionToEnglishTerm = function(definitonID,termID){

    return new Promise(function(resolve,reject){


      if (definitonID != null && termID != null){

      findEnglishTermsById(termID).then(function(term){

          if (term === null){
            reject("English term does not exist")
          }
          else{

              findDefinitionById(definitonID).then(function(defin){


                if (defin === null){
                  reject("Term with ID " +  definitonID + "does not exist")
                }
                else{

                  term.definitions.push(defin._id);
                  updateEnglishTerm(term).then(function(data){

                    resolve(data);


                  }).catch(function(err){
                    reject(err);
                  })

                }

              }).catch(function(err){
                reject(err);
              })

          }

     }).catch(function(err){
       reject(err);
     })


    }
    else reject("A null parameter was sent for term or definition ID");

    });
  
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
  console.log("update English Term called")
  console.log(newTerm);

  if (newTerm.dateRevised){
    newTerm.dateRevised = Date.now();
  }

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





exports.incrementHelpNonEnglish = function(id, type){


  return new Promise(function(resolve,Reject){

    exports.findNonEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes++;
      }
      else{
        term.helpNo++;
      }

      exports.updateNonEnglishTerm(term).then(function(data){

        resolve(data);

      }).catch(function(err){
        reject(err);
      })


    }).catch(function(err){
      reject(err);
    })


  })
   

}



exports.decrementHelpNonEnglish = function(id, type){


  return new Promise(function(resolve,Reject){

    exports.findNonEnglishTermsById(id).then(function(term){

      if (type === true){
          term.helpYes--;
      }
      else{
        term.helpNo--;
      }


      exports.updateNonEnglishTerm(term).then(function(data){

        resolve(data);

      }).catch(function(err){
        reject(err);
      })


    }).catch(function(err){
      reject(err);
    })


  })
   

}

exports.modifyHelpNonEnglish = function(id, crement, type){


  return new Promise(function(resolve, reject){

    if (crement === true){

        exports.incrementHelpNonEnglish(id,type).then(function(data){
          resolve();
        }).catch(function(err){
          reject(err);
        })

    }else if (crement === false){
      exports.decrementHelpNonEnglish(id, type).then(function(data){
        resolve();
      }).catch(function(err){
        reject(err);
      })
    }


  })  


}





/*





*/