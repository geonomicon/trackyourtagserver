/**
 * Created by Apoorva on 11/21/2015.
 */
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
            Asset.findOne({ "qrId" : req.params.qrId}, function(err,asset){
                if(err)
                {
                    res.status(500).send(err);
                }
                else
                {
                    var ll= { "lat" : asset.lat,
                        "long" : asset.long };
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

    androidRouter.route('/:qrId')
        .post(function(req,res){
            var asset= new Asset({ "qrId" : req.params.qrId});
            asset.save();
            res.status(201).send(asset);
        });

    return androidRouter;
};


module.exports = routes;