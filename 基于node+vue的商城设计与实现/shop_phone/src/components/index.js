// 引入vue框架
import Vue from 'vue'

//定义obj对象储存各种组件
let obj = {
}

// 利用循环注册所有组件
for(let key in obj){
    Vue.component(key,obj[key])
}