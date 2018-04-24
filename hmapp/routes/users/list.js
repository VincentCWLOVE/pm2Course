/**
 * Created by vincent on 2018/4/24.
 */

/*
 * 用户列表接口描述：
 *
 *  呈现方式：
 *      01. 呈现所有用户
 *      02. 呈现男性用户
 *      ...
 * */
var UserModel = require("../../models").User
module.exports = function(req,res){

    if (req.method.toUpperCase() == "POST") {


        var rows = req.body.rows || 10,
            page = req.body.page || 0

        switch (req.body.type){
            case "01":

                UserModel.list(rows,page,function(err,result){
                    if(err){
                        res.json({
                            errCode:0,
                            msg:"发生了错误",
                            err:err
                        })
                    }

                    res.json({
                        errCode:1,
                        msg:"请求成功",
                        result:result
                    })
                })

                break;
            default :

                res.json({
                    errCode:0,
                    msg:"没有此用户列表"
                })

                break;
        }

    }else{
        res.json({
            errCode:0,
            msg:"非法请求"
        })
    }
}