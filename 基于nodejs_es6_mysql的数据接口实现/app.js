
const express=require("express");
const path=require("path");
const session=require("express-session");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"xuSession",
    resave:true,
    saveUninitialized:true
}));

app.use("/",require("./router/mainRouter"));
app.use("/user",require("./router/userRouter"));
app.use("/type",require("./router/typeRouter"));
app.use("/car",require("./router/carRouter"));

app.listen(1234);
