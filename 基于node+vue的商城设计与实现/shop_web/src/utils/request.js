import axios from "axios"
import qs from "qs"
import Vue from "vue"


// 开发环境
let baseUrl = "/api"
Vue.prototype.$imgUrl = "http://localhost:3000"

// 请求拦截
axios.interceptors.request.use(req => {

  return req
})

// 响应拦截
axios.interceptors.response.use(res => {
  console.group("=========本次请求的路径是：" + res.config.url)
  console.log(res)
  console.groupEnd("请求结束")

  return res
})

// 轮播图
export const banner = () => {
  return axios({
    url: baseUrl + "/api/getbanner",
    method: "get"
  })
}
// 首页商品
export const indexGoods = () => {
  return axios({
    url: baseUrl + "/api/getindexgoods",
    method: "get"
  })
}
// 商品分类
export const goodsSort = () => {
  return axios({
    url: baseUrl + "/api/getcatetree",
    method: "get"
  })
}
// 分类的详情
export const sortDetail = (fid) => {
  return axios({
    url: baseUrl + "/api/getgoods",
    method: "get",
    params: {
      fid: fid
    }
  })
}
// 获取商品详情
export const goodDetail = (id) => {
  return axios({
    url: baseUrl + "/api/getgoodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 注册
export const register = (form) => {
  return axios({
    url: baseUrl + "/api/register",
    method: "post",
    data: qs.stringify(form)
  })
}
// 登录
export const login = (form) => {
  return axios({
    url: baseUrl + "/api/login",
    method: "post",
    data: qs.stringify(form)
  })
}

// 加入购物车
export const cartAdd = (form)=>{
  return axios({
    url:baseUrl+"/api/cartadd",
    method:"post",
    data:qs.stringify(form)
  })
}

// 购物车列表
export const cartList = (uid)=>{
  return axios({
    url:baseUrl+"/api/cartlist",
    method:"get",
    params:{
      uid:uid
    }
  })
}

// 购物车删除
export const cartDel = (form)=>{
  return axios({
    url:baseUrl+"/api/cartdelete",
    method:"post",
    data:qs.stringify(form)
  })
}

// 购物车修改
export const cartEdit = (form)=>{
  return axios({
    url:baseUrl+"/api/cartedit",
    method:"post",
    data:qs.stringify(form)
  })
}