
var UserModel = require("../../models").User

var jwt = require('jsonwebtoken');


var config = {
    secretToken : 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx',
    TOKEN_EXPIRATION : 60*60
}

/*
 * 用户登录接口描述：
 *
 * 登录方式：
 *       01.手机号
 *       02.邮箱
 *       03. 第三方开放平台
 *       ------------------------
 *       04. 短信验证码登录
 * */

module.exports = function(req,res){

    if (req.method.toUpperCase() == "POST") {

        switch (req.body.type){
            case "01":

                if(!req.body.phoneno){
                    res.json({
                        errCode:0,
                        msg:"缺少参数：phoneno"
                    })
                }
                if(!req.body.password){
                    res.json({
                        errCode:0,
                        msg:"缺少参数：password"
                    })
                }
                UserModel.findByPhone(req.body.phoneno,function(err,user_result){
                    if(err){

                        res.json({
                            errCode:0,
                            msg:"发生了错误",
                            err:err
                        })

                    }else{

                        if(user_result){

                            user_result.comparePassword(req.body.password,function(isMatch){
                                if(!isMatch){
                                    res.json({
                                        errCode:0,
                                        msg:"帐号和密码不匹配"
                                    })
                                }


                                res.json({
                                    errCode:1,
                                    result:user_result,
                                    msg:"请求成功"
                                })
                            })

                        }else{
                            res.json({
                                errCode:0,
                                msg:"用户不存在"
                            })
                        }
                    }
                })

                break;
            case "02":

                if(!req.body.email){
                    res.json({
                        errCode:0,
                        msg:"缺少参数：email"
                    })
                }
                if(!req.body.password){
                    res.json({
                        errCode:0,
                        msg:"缺少参数：password"
                    })
                }
                UserModel.findByEmail(req.body.email,function(err,user_result){
                    if(err){

                        res.json({
                            errCode:0,
                            msg:"发生了错误",
                            err:err
                        })

                    }else{

                        if(user_result){

                            user_result.comparePassword(req.body.password,function(isMatch){
                                if(!isMatch){
                                    res.json({
                                        errCode:0,
                                        msg:"帐号和密码不匹配"
                                    })
                                }


                                res.json({
                                    errCode:1,
                                    result:user_result,
                                    msg:"请求成功"
                                })
                            })

                        }else{
                            res.json({
                                errCode:0,
                                msg:"用户不存在"
                            })
                        }
                    }
                })

                break;
            case "03":

                break;
            default :

                res.json({
                    errCode:0,
                    msg:"无效的请求方式"
                })

                break
        }

    }else{
        res.json({
            errCode:0,
            msg:"非法请求"
        })

    }



}
