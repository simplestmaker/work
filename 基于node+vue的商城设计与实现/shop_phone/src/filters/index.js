// 引入vue框架
import Vue from 'vue'
import {filterPrice} from './filterPrice';
//定义obj对象储存各种过滤器
let obj = {
    filterPrice
}

// 利用循环注册所有过滤器
for(let key in obj){
    Vue.filter(key,obj[key])
}