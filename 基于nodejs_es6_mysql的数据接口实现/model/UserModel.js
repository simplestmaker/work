
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
