// 引入menlist请求
import {menulist} from '../../utils/request'

// 存放数据
const state={
    list:[]
}

// 修改数据
const mutations = {
    //state 基本数据对象================第二个参数 新的数据
    changeList(state,arr){
        state.list=arr
    }
}

// 派发动作
const actions = {
    // 参数context=========指向的是vue实例上的仓库store 
    reqChangeList(context){
        menulist().then(res=>{
            context.commit('changeList', res.data.list)
            //此处类似于 this.$store.commit('mutations中的方法', data) ======data指向mutations中的方法第二个参数 新的数据
        })
    }
}

// 导出数据
// 相当于state的计算属性,具有返回值的方法
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