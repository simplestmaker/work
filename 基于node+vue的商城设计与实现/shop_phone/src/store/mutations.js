export const state = {
    //登录账号信息
    //bug：状态层刷新就重置 所以此处需要获取sessionStorage的信息保存用户信息
    userInfo:sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{}
}
export const mutations = {
    changeUserinfo(state, info) {
        //修改状态层的userInfo
        state.userInfo = info
        //页面刷新就没了
        sessionStorage.setItem('userInfo',JSON.stringify(info) )
    }
}
export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}