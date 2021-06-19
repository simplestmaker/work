/*
 * @Author: RYPY
 * @Date: 2020-12-03 10:03:12
 * @LastEditors: RYPY
 * @LastEditTime: 2020-12-06 09:25:29
 */
const express=require("express");
const userModel=require("../model/UserModel");

const router=express.Router();
const umodel=new userModel();

//获取校验码图片路由
router.get("/getCaptchaCode",(req,res)=>{
    let captchaData=umodel.getCapcha();
    req.session.captcha=captchaData.text;
    res.type("svg");
    res.send(captchaData.data);
});

module.exports=router;