
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
