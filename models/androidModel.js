var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var androidModel= new Schema({


    qrId: { type: String },
    pname:{type: String},
    startloc:{type: String},
    endloc:{type: String},
    qty:{type: String},
    holderemail: {type: String},
    receiveremail: {type: String},
    lat: {type: String},
    long: {type: String}
    });

module.exports=mongoose.model('Asset', androidModel,'Assets');