/**
 * Created by bhuvanmalik on 24/11/15.
 */

var express = require('express');

var hroutes= function(Holder) {

    var holderRouter=express.Router();


    var holderController = require('../controllers/holderController')(Holder);

    holderRouter.route('/holders')
        .get(holderController.get);

    holderRouter.route('/add/:name/:email/:pass/:cno')
        .post(holderController.post);

    holderRouter.route('/check/:email/:pass')
        .get(holderController.check);

    holderRouter.route('/:email')
    .delete(holderController.del);

    return holderRouter;


};


module.exports = hroutes;
