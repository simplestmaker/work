// 引入catelist请求
import {catelist} from '../../utils/request'

// 存放数据
const state={
    list:[]
}

// 修改数据
const mutations={
    changeList(state,arr){
        state.list=arr
    }
}

// 派发动作
const actions={
    reqChangeList(context){
        catelist().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}

// 导出数据
const getters={
    list(state){
        return state.list
    }
}

export default {
    state,
   mutations,
   actions,
   getters,
   namespaced: true
}