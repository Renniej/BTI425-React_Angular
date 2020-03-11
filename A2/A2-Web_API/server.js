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
      data_services.modifyHelpEnglish(id, true,true);
    }
    else if (req.params.option.toLowerCase() === "decrement"){
      data_services.modifyHelpEnglish(id, false,true);
    }

})


app.get("/api/termEnglish/helpNo/:id/:option", (req,res)=>{

  if (req.params.option.toLowerCase() === "increment"){
    data_services.modifyHelpEnglish(id, true,false);
  }
  else if (req.params.option.toLowerCase() === "decrement"){
    data_services.modifyHelpEnglish(id, false,false);
  }

})





app.use((req, res) => {
  res.status(404);
  res.send("Resource not found");
});

app.listen(HTTP_PORT, onHttpStart);
