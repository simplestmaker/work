// 去element-ui官网中找到消息提示的模块，复制代码到我们的我们的文件中进行二次封装
import Vue from "vue"
let vm = new Vue()
//成功的弹窗
export const successAlert = (msg)=>{
  vm.$message({
    message: msg,
    type: 'success'
  })
}
// 失败的弹窗
export const warningAlert = (msg)=>{
  vm.$message({
    message: msg,
    type: 'warning'
  })
}