/**
 * Created by bhuvanmalik on 24/11/15.
 */


var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var holderModel= new Schema({


    name: { type: String },
    email:{type: String},
    pass:{type: String},
    cno:{type: String}
});

module.exports=mongoose.model('Holder', holderModel,'Holders');