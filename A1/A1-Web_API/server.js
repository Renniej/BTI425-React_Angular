const express = require('express');
var app = express();
var HTTP_PORT = process.env.PORT || 8080; // http://localhost:8080/
const data_services =  require("./data-services.js")

function onHttpStart() {

    data_services.initializeDBConnection()
    
    .then(function(DB_msg){

        console.log(DB_msg)
        console.log("Express http server listening on: " + HTTP_PORT);
    })
    .catch(function(err){
        console.log("MongoDb Error : " + err);
    });

}

app.get('/api/cars', function(req,res){ //get all car documents

    data_services.getAll().then(function(data){
        var status;

        if (data.length){
            status = 200; //Data didn't return as an empty query
        }
        else{
            status = 404; //Data returned is empty a.k.a data matching query was not found
        }

        res.status(status) //Sucessful response
        res.json(data)
    }
    ).catch(function(err){
        res.status(500) //Api error ):
        res.send("API ERROR : " + err);
    })

app.get('/api/cars/:id', function(req,res){ //get single car document

});

})

app.listen(HTTP_PORT, onHttpStart);

