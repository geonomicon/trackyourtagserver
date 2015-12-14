
var express = require('express');
var nodemailer = require('nodemailer');

var routes= function(Asset) {

    var androidRouter=express.Router();
    var androidController = require('../controllers/androidController')(Asset);

    androidRouter.route('/assets')
        .get(androidController.get);

    androidRouter.route('/getll/:qrId')
        .get(androidController.getll);

    androidRouter.route('/getall/:qrId')
        .get(androidController.getall);


    androidRouter.route('/:qrId/:pname/:startloc/:endloc/:qty/:receiveremail')
        .post(androidController.angularpost);



    androidRouter.route('/:qrId')
        .put(androidController.put)

    .delete(androidController.del);

    androidRouter.route('/send/:receiveremail/:qrId')
        .post(androidController.testsend);


    return androidRouter;
};


module.exports = routes;