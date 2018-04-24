var express = require('express');
var router = express.Router();

var UserModel = require("../models").User


router.all("/",require("./welcome"))


/*
*
*
* Rest Api 路由
* */

router.all('/api/*', function(req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.all("/api/users/login",require("./users/login"))
router.all("/api/users/register",require("./users/register"))


// 授权访问
function ensureAuthorized(req, res, next) {


    if(req.body.token){
        UserModel.findByToken(req.body.token,function(err,cur_user){
            if(err){
                res.json({
                    errCode:0,
                    msg:"发生了错误",
                    err:err
                })
            }

            if(cur_user){

                switch (cur_user.role){
                    case "hm00":
                        next();
                        break;
                    default :
                        res.send(403);
                        break
                }

            }else{

                res.send(403)
            }



        })
    }else{
        res.send(403);
    }

    /*
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;

        UserModel.findByToken(req.token,function(err,cur_user){
            if(err){
                res.json({
                    errCode:0,
                    msg:"发生了错误",
                    err:err
                })
            }

            var role = cur_user.role
            switch (role){
                case "hm00":
                    next();
                    break;
                default :
                    res.send(403);
                    break
            }

        })



    } else {
        res.send(403);
    }
     */
}

router.all("/api/users/list",ensureAuthorized,require("./users/list"))



module.exports = router;
