const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var termEnglishSchema = new Schema({
  wordEnglish : {type : String, required : true, unique : true}, 
  wordNonEnglish : String,
  wordExpanded : {type : String, default : ''},
  languageCode : {type : String, required : true},
  image : {type : String, default : ''},
  imageType : {type : String, default : ''},
  audio : {type : String, default : ''},
  linkAuthoritative : {type : String, default : ''},
  linkWikipedia : {type : String, default : ''},
  linkYoutube : {type : String, default : ''},
  authorName : {type : String, required : true},
  dateCreated : {type : Date, default : Date.now},
  dateRevised : {type : Date, default : Date.now},
  fieldOfStudy : {type : String, default : ''},
  helpYes : {type : Number, default : 0},
  helpNo : {type : Number, default : 0},
  definitions: [{type: mongoose.Schema.Types.ObjectId, ref : "Definition"}]
});

module.exports = termEnglishSchema;