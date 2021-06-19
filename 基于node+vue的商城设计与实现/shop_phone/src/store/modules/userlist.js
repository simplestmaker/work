// 引入userlist请求
import {userlist,usercount} from '../../utils/request'

// 存放数据
const state={
  // 列表
  list: [],
  // 总条数
  total:0,
  // 每页显示的条数
  size:4,
  // 当前页码
  page:1
}

// 修改数据
const mutations = {
  //动态修改列表数据
    changeList(state, arr) {
        state.list = arr
      },
      // 修改总条数
      changeTotal(state,num){
        state.total = num
      },
      // 修改当前页码
  changePage(state, num) {
        state.page = num
      }
}

// 派发动作
const actions = {
    //conntext指向仓库
 reqChangeList(context) {
    // size：请求的条数。   page：页码数
    userlist({ size: context.state.size, page: context.state.page }).then(res => {
      // 判断res.data.list是否有值，没有就传一个空数组
      let list = res.data.list?res.data.list:[]
      if (list.length == 0&&context.state.page>1) {
        //bug:当前页面如果数据删除完，本应跳转到前一页，但是没有跳转，因此需要手动添加跳转代码，当前页码-1
        context.commit('changePage', context.state.page - 1)
        //然后再调用一次reqChangeList
        context.dispatch("reqChangeList")
      }
      //此处响应的是44行的context.dispatch("reqChangeList")
      context.commit('changeList',res.data.list)
    })
  },

  // 请求总条数
  reqChangeTotal(context){
    usercount().then(res=>{
      context.commit('changeTotal',res.data.list[0].total)
    })
  },

  // 修改当前页码
  reqChangePage(context,num){
    context.commit('changePage',num)
  }
}

// 导出数据

const getters={
  // 列表数据
  list(state){
    return state.list
  },
  // 总条数total
  total(state){
    return state.total
  },
  // 每页显示的条数size
  size(state){
    return state.size
  }
}


export default {
    state,
   mutations,
   actions,
   getters,
   namespaced: true
}