/*
 * @Author: RYPY
 * @Date: 2020-12-03 10:02:00
 * @LastEditors: RYPY
 * @LastEditTime: 2020-12-06 09:21:58
 */
const svg=require("svg-captcha");

class UserModel{
    //生成校验码业务
    getCapcha(){
        return svg.create({
            size:4,
            noise:2,
            color:true
        });
    }
}
module.exports=UserModel;