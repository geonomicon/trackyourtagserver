/**
 * Created by bhuvanmalik on 15/12/15.
 */



var holderController = function(Holder){

    var get = function (req, res) {
        Holder.find(function (err, holders) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(holders);
            }
        });
    }

    var post = function(req,res){
        var holder= new Holder(
            { "name" : req.params.name,               //ANGULARPUT
                "email": req.params.email,
                "pass": req.params.pass,
                "cno": req.params.cno

            });
        holder.save();
        res.json(holder);
    }


    var check= function(req,res){
        Holder.findOne({"pass":req.params.pass,"email":req.params.email},function(err,holder){
            if(err){
                res.send("invalid");
            }
            else if(holder){
                res.send("valid");

            }
            else
            {

                res.send("invalid");
            }


        });
    }


    var del = function(req,res){
        Holder.findOne({ "email" : req.params.email}, function(err,holder){
            if(err)
            {
                res.status(500).send(err);
            }
            else {
                holder.remove(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(204).send("removed");
                        res.redirect('/holders');
                    }
                });
            }
        });

    }

return {
    get: get,
    post: post,
    check: check,
    del: del
    }
}

module.exports = holderController;



