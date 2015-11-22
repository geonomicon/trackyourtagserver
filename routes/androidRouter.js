
var express = require('express');

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

      androidRouter.route('/:holderemail/:qrId/:lat/:long')
        .put(function(req,res) {
           Asset.findOne({ "qrId" : req.params.qrId}, function(err,asset){
            if(err)
            {
                res.status(500).send(err);
            }
                else
            {
                asset.holderemail=req.params.holderemail;
                asset.lat=req.params.lat;
                asset.long=req.params.long;
                asset.save();
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
        })

        .put(function(req,res){
            Asset.findOne({"qrId":req.params.qrId}, function(err,asset){
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
    return androidRouter;
};


module.exports = routes;