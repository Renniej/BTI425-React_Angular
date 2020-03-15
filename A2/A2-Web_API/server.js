const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); //WHAT IS CORS??????/
const data_services = require("./data-services.js");

var app = express();

app.use(bodyParser.json());
app.use(cors());

var HTTP_PORT = process.env.PORT || 8080; // http://localhost:8080/

function onHttpStart() {
  data_services
    .initializeDBConnection()

    .then(function(DB_msg) {
      console.log(DB_msg);
      console.log("Express http server listening on: " + HTTP_PORT);
    })
    .catch(function(err) {
      console.log("MongoDb Error : " + err);
    });
}


app.get("/api", function(req, res) {
  //get all car documents
res.send("API HOMEPAGE :)")
 
});
app.get("/api/definition", function(req, res) {
  //get all car documents

  data_services
    .findDefinitionById()
    .then(function(data) {
      var status;

      if (data.length) {
        status = 200; //Data didn't return as an empty query
      } else {
        status = 404; //Data returned is empty a.k.a data matching query was not found
      }

      res.status(status); //Sucessful response
      res.json(data);
    })
    .catch(function(err) {
      res.status(500); //Api error ):
      res.send("API ERROR : " + err);
    });
});

app.get("/api/definition/:id", function(req, res) {
  //get single car documents
  data_services
    .findDefinitionById(req.params.id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send("ERROR : " + err);
    });
});


app.post("/api/eng_definition/:id", function(req, res) {


  console.log(req.body)
  data_services
    .addEngDefinition(req.body,req.params.id)
    .then(function(data) {
      res.status(200);
      res.json(data);
    })
    .catch(function(err) {
      res.status(500);
      res.send("Error: " + err);
    });
});

app.put("/api/definition/:id", (req, res) => {
  data_services
    .updateDefinition(req.body)
    .then(function(data) {
      res.json(data);
    })
    .catch(function() {
      res.status(404);
      res.json({ message: "Resource not found" });
    });
});

app.delete("/api/definition/:id", (req, res) => {
  data_services
    .removeDefinition(req.params.id)
    .then(function() {
      res.send("req.params.id Deleted");
    })
    .catch(function() {
      res.status(404);
      res.json({ message: "Resource not found" });
    });
});


app.get("/api/termEnglish", function(req, res) {
  //get all car documents

  data_services
    .findEnglishTermsById()
    .then(function(data) {
      var status;

      if (data.length) {
        status = 200; //Data didn't return as an empty query
      } else {
        status = 404; //Data returned is empty a.k.a data matching query was not found
      }

      res.status(status); //Sucessful response
      res.json(data);
    })
    .catch(function(err) {
      res.status(500); //Api error ):
      res.send("API ERROR : " + err);
    });
});



app.post("/api/termEnglish", function(req, res) {


  console.log(req.body)
  data_services
    .addEnglishTerm(req.body)
    .then(function(data) {
      res.status(200);
      res.json(data);
    })
    .catch(function(err) {
      res.status(500);
      res.send("Error: " + err);
    });
});

app.get("/api/termEnglish/:id", function(req, res) {
  //get single car documents

  data_services
    .findEnglishTermsById(req.params.id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send("ERROR : " + err);
    });
});

app.get("/api/populated_termEnglish/:id", function(req, res) {
  //get single car documents

  data_services
    .findPopulatedEnglishTermsById(req.params.id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send("ERROR : " + err);
    });
});


app.get("/api/termEnglish/findWord/:word", function(req, res) {
  //get single car documents

  data_services
    .findEnglishTermsByWord(req.params.word)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send("ERROR : " + err);
    });
});

app.put("/api/termEnglish/:id", (req, res) => {
  data_services
    .updateEnglishTerm(req.body)
    .then(function(data) {
      res.json(data);
    })
    .catch(function() {
      res.status(404);
      res.json({ message: "Resource not found" });
    });
});




app.delete("/api/termEnglish/:id", (req, res) => {
  data_services
    .removeEnglishTerm(req.params.id)
    .then(function() {
      res.send("req.params.id Deleted");
    })
    .catch(function() {
      res.status(404);
      res.json({ message: "Resource not found" });
    });
});


app.get("/api/termEnglish/helpYes/:id/:option", (req,res)=>{

    if (req.params.option.toLowerCase() === "increment"){
      data_services.modifyHelpEnglish(req.params.id, true,true).then(function(data){
        res.send("Incremented :)")
      }).catch(function(err){
          res.send("Error : " + err);
      });
    }
    else if (req.params.option.toLowerCase() === "decrement"){
      data_services.modifyHelpEnglish(req.params.id, false,true).then(function(data){
        res.send("decremented :)");
      }).catch(function(err){
        res.send("Error : " + err);
      });
    }
    else {
      res.send("Wrong option")
    }

})


app.get("/api/termEnglish/helpNo/:id/:option", (req,res)=>{

  if (req.params.option.toLowerCase() === "increment"){
    data_services.modifyHelpEnglish(req.params.id, true,false).then(function(data){
        res.send("helpNo Incremented :)")
    }).catch(function(err){
        res.send("Error : " + err);
    });
  }
  else if (req.params.option.toLowerCase() === "decrement"){
    data_services.modifyHelpEnglish(req.params.id, false,false).then(function(data){
      res.send("helpNo decremented")
    }).catch(function(err){
      res.send("Error : " + err)
    });
  }
  else{
    res.send("Wrong option")
  }

})





app.use((req, res) => {
  res.status(404);
  res.send("Resource not found");
});

app.listen(HTTP_PORT, onHttpStart);
