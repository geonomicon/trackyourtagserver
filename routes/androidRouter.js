
var express = require('express');
var nodemailer = require('nodemailer');

var routes= function(Asset) {

    var androidRouter=express.Router();

    androidRouter.route('/assets')
        .get(function (req, res) {
        Asset.find(function (err, assets) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(assets);
            }
        });
    });

    androidRouter.route('/getll/:qrId')
        .get(function (req, res) {
            Asset.findOne({ "qrId" : req.params.qrId}, function(err,asset) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    var ll = {
                        "lat": asset.lat,
                        "long": asset.long
                    };
                    res.json(ll);
                }
            });
        });

    androidRouter.route('/getall/:qrId')
        .get(function (req, res) {
            Asset.findOne({ "qrId" : req.params.qrId}, function(err,asset) {
                if (err) {
                    res.status(500).send(err);
                }
                else {

                    res.json(asset);
                }
            });
        });


    androidRouter.route('/:qrId/:pname/:startloc/:endloc/:qty/:receiveremail')
        .post(function(req,res){
            var asset= new Asset(
                { "qrId" : req.params.qrId,
                    "pname": req.params.pname,
                    "startloc": req.params.startloc,
                    "endloc": req.params.endloc,
                    "qty": req.params.qty,
                    "receiveremail" : req.params.receiveremail

                });
            asset.save();
            res.status(201).send(asset);
        });



    androidRouter.route('/:qrId')
        .put(function(req,res){
            Asset.findOne({"qrId":req.params.qrId}, function(err,asset){       //ANDROIDPUT
                if(err)
                {
                    res.status(500).send(err);
                }
                else
                {
                    asset.holderemail=req.body.holderemail;
                    asset.lat=req.body.lat;
                    asset.long=req.body.long;
                    asset.save();
                    res.json(asset);

                }
            });
        })

    .delete(function(req,res){
            Asset.findOne({ "qrId" : req.params.qrId}, function(err,asset){
                if(err)
                {
                    res.status(500).send(err);
                }
                else {
                    asset.remove(function (err) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else {
                            res.status(204).send("removed");
                        }
                    });
                }
            });

        });

    androidRouter.route('/send')
        .post(function(req,res){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'malikshukla007@gmail.com',
                    pass: 'daenerys'
                }
            }, {
                // default values for sendMail method
                from: 'sender@address',
                headers: {
                    'My-Awesome-Header': '123'
                }
            });
            transporter.sendMail({
                to: 'bhuvanmalik007@gmail.com',
                subject: 'Asset info',
                text: 'Your Asset is shipped with the tracking Id : '
            });
            });





    return androidRouter;
};


module.exports = routes;