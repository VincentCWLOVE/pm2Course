/**
 * Created by vincent on 2018/4/24.
 */



    /*
    * 用户注册接口描述：
    *
    * 注册方式：
    *       01.手机号
    *       02.邮箱
    *       03. 第三方开放平台
    * */

var UserModel = require("../../models").User

module.exports = function(req,res){

    if (req.method.toUpperCase() == "POST") {

        switch (req.body.type){
            case "01":

                if(!req.body.phoneno){
                    res.json({
                        errCode:0,
                        msg:"缺少参数:phoneno"
                    })
                }
                if(!req.body.password){
                    res.json({
                        errCode:0,
                        msg:"缺少参数:password"
                    })
                }

                UserModel.findByPhone(req.body.phoneno,function(err,result){
                    if(err){
                        res.json({
                            errCode:0,
                            msg:"发生了错误",
                            err:err
                        })
                    }else{
                        if(result){
                            res.json({
                                errCode:1,
                                msg:"手机号已经被注册"
                            })
                        }else {
                            var obj = {
                                phoneno:req.body.phoneno,
                                password:req.body.password,
                                name:req.body.name|| "用户"+new Date().getTime(),
                                sex:req.body.sex || "男",
                                register_source:req.body.register_source || "" ,
                                avatar:req.body.avatar || "default"
                            }
                            var newUser = new UserModel(obj)
                            newUser.save(obj,function(err,result){
                                if(err){
                                    res.json({
                                        errCode:0,
                                        msg:"发生了错误",
                                        err:err
                                    })
                                }else{
                                    res.json({
                                        errCode:1,
                                        msg:"请求成功",
                                        result:result
                                    })
                                }
                            })
                        }
                    }
                })


                break;
            case "02":

                if(!req.body.email){
                    res.json({
                        errCode:0,
                        msg:"缺少参数:email"
                    })
                }
                if(!req.body.password){
                    res.json({
                        errCode:0,
                        msg:"缺少参数:password"
                    })
                }





                UserModel.findByEmail(req.body.email,function(err,result){
                    if(err){
                        res.json({
                            errCode:0,
                            msg:"发生了错误",
                            err:err
                        })
                    }else{
                        if(result){
                            res.json({
                                errCode:0,
                                msg:"邮箱已经被注册"
                            })
                        }else{
                            var obj = {
                                email:req.body.email,
                                password:req.body.password,
                                name:req.body.name|| "用户"+new Date().getTime(),
                                sex:req.body.sex || "男",
                                register_source:req.body.register_source || "" ,
                                avatar:req.body.avatar || "default"
                            }
                            var newUser = new UserModel(obj)

                            newUser.save(obj,function(err,result){
                                if(err){
                                    res.json({
                                        errCode:0,
                                        msg:"发生了错误",
                                        err:err
                                    })
                                }else{
                                    res.json({
                                        errCode:1,
                                        msg:"请求成功",
                                        result:result
                                    })
                                }
                            })
                        }
                    }
                })


                break;
            case "03":
                res.json({
                    errCode:1,
                    msg:"线上授权平台，请参照官方文档"
                })
                break;
            default:
                res.json({
                    errCode:0,
                    msg:"您未选择注册类型",
                    postBody:req.body
                })

                break;
        }





    }else {

        res.json({
            errCode:0,
            msg:"非法请求"
        })

    }


}