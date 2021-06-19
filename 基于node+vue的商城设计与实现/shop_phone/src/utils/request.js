// 引入axios和qs插件
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
//引入仓库
import store from '../store/index'

//设置开发环境地址
Vue.prototype.$imgUrl='http://localhost:3000'
// let imgUrl='http://localhost:3000'
let baseUrl =''
// 设置上线环境地址
// let baseUrl=''
// Vue.prototype.$imgUrl=''

//设置请求拦截
axios.interceptors.request.use((req) => {
  // req.headers.authorization = store.state.userInfo.token
  //判断是不是登录页 不是就添加authorization这个属性  如果是登录就不用添加 因为登陆之前 没有token
  if (req.url != baseUrl + '/api/userlogin') {
    req.headers.authorization = store.state.userInfo.token
  }
  return req
})
//设置响应拦截
axios.interceptors.response.use((res) => {
  console.group("=====本次请求的路径是：" + res.config.url)
  console.log(res);
  return res
})

//========menu菜单管理============

//菜单添加
export const menuadd = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}

//菜单列表请求
export const menulist = (form) => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "GET",
    params: {
      istree: true
    }
  })
}

// 菜单删除 
export const menudel = (form) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify(form)
  })
}

//获取一条菜单信息
export const getmenuinfo = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

//修改当前菜单

export const menuEdit = (form) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(form)
  })
}

//========role角色管理============

//角色添加
export const roleadd = (form) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(form)
  })
}

//角色列表
export const rolelist = (id) => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "GET",
    params: {
      id:id
    }
  })
}

//角色删除
export const roledel = (id) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: {
      id:id
    }
  })
}

//获取一条角色信息
export const getroleinfo = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

//修改当前角色信息

export const roleedit = (form) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(form)
  })
}


//========user管理员管理============

//管理员添加
export const useradd=(form) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data:qs.stringify(form)
  })
}

//获取管理员总数
export const usercount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "GET",
  })
}

//管理员列表
export const userlist = (form) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "GET",
    params:form
  })
}

//管理员删除
export const userdelete = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: {
      uid:uid
    }
  })
}

//获取一条管理员信息
export const getuserinfo = (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'GET',
    params: {
      uid: uid
    }
  })
}

//修改当前管理员信息

export const useredit = (form) => {
  return axios({
    url: baseUrl + '/api/useredit',
    method: 'post',
    data: qs.stringify(form)
  })
}

//========cate分类============

//商品添加
export const cateadd = (form) => {
  let data = new FormData();
  for (let i in form) {
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}

//商品列表
export const catelist = () => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "GET",
    params: {
      istree:true,
    }
  })
}

// 商品删除
export const catedelete = (id) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data:id
  })
}

// 获取一条商品信息
export const getcateinfo = (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

// 修改当前角色信息

export const cateedit = (form) => {
  let data = new FormData();
  for (let i in form) {
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + '/api/cateedit',
    method: 'post',
    data:data
  })
}

//========specs商品规格管理============

//商品规格添加
export const specsadd=(form) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data:qs.stringify(form)
  })
}

//商品规格总数
export const specscount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "GET",
  })
}

//商品规格列表
export const specslist = (form) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "GET",
    params:form
  })
}

//商品规格删除
export const specsdelete = (id) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: {
      id:id
    }
  })
}

//获取一条商品规格信息
export const specsinfo = (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

//修改当前商品规格信息

export const specsedit = (form) => {
  return axios({
    url: baseUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(form)
  })
}


//========goods商品管理============

// 添加
export const goodsadd = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 列表
export const goodsList = (form) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: form
  })
}
// 删除
export const goodsDel = (form) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const goodsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const goodsedit = (form) => {
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}
// 总条数
export const goodsTotal = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  })
}


//========管理员登录============

export const login = (form) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'post',
    data:qs.stringify(form)
  })
}



//========VIP会员管理============

//会员列表管理
export const viplist = () => {
  return axios({
    url: baseUrl + '/api/memberlist',
    method: 'get',
  })
}

// 注册
export const register = (form) => {
  return axios({
    url: baseUrl + "/api/register",
    method: "post",
    data: form
  })
}
// 获取一条信息
export const memberinfo = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

// 修改
export const memberedit = (form) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(form)
  })
}

//========轮播图管理============

//轮播图添加
export const banneradd = (form) => {
    // 因为涉及到了图片，所以使用模拟form表单
    let data = new FormData()
    for(let i in form){
      data.append(i,form[i])
    }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data:data
  })
}

//轮播图列表
export const bannerlist = (form) => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "GET",
    params:form
  })
}

//轮播图删除
export const bannerdelete = (id) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: {
      id:id
    }
  })
}

//获取一条轮播图信息
export const bannerinfo = (id) => {
  return axios({
    url: baseUrl + '/api/bannerinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

//修改当前轮播图信息

export const banneredit = (form) => {
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + '/api/banneredit',
    method: 'post',
    data: data
  })
}

//========秒杀管理============

//秒杀添加
export const seckadd = (form) => {
return axios({
  url: baseUrl + "/api/seckadd",
  method: "post",
  data:qs.stringify(form)
})
}

//秒杀列表
export const secklist = (form) => {
return axios({
  url: baseUrl + "/api/secklist",
  method: "GET",
  params:form
})
}

//秒杀删除
export const seckdelete = (id) => {
return axios({
  url: baseUrl + "/api/seckdelete",
  method: "post",
  data: {
    id:id
  }
})
}

//获取一条秒杀信息
export const seckinfo = (id) => {
return axios({
  url: baseUrl + '/api/seckinfo',
  method: 'GET',
  params: {
    id: id
  }
})
}

//修改当前秒杀信息

export const seckedit = (form) => {
return axios({
  url: baseUrl + '/api/seckedit',
  method: 'post',
  data: qs.stringify(form)
})
}