var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var androidModel= new Schema({
    holderemail: {
        type: String
    },

    qrId: { type: String },
    lat: {type: String},
    long: {type: String}
    });

module.exports=mongoose.model('Asset', androidModel,'Assets');