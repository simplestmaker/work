
const mysql=require("mysql");
const db_config=require("./db_config");
class DBConnect{
    //建立数据库连接
    getConnect(){
        this.conn=mysql.createConnection(db_config);
        this.conn.connect(err=>{if(err)console.log("数据库连接错误，请联系数据库管理员");});
    }
    //执行sql语句
    getsqlData(sql,sqldata){
        return new Promise((resolve,reject)=>{
            this.conn.query(sql,sqldata,(err,data)=>{
                if(err)reject(err);
                else resolve(data);
            });
        });
    }
    //关闭数据库连接
    closeConnect(){
        this.conn.end(err=>{
            if(err)console.log("数据库关闭失败，请联系数据库管理员！");
        })
    }
}
