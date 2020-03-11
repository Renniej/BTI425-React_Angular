const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var definitionScehma = new Schema({
    authorName: {type : String, required : true},
    dataCreated: {type : Date, default : Date.now},
    definition : {type : String, required : true},
    quality : {type : Number, default : -1},
    likes :{type: Number, default : 0}
});
    

module.exports = definitionScehma;