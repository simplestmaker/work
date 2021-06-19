const actions = {
    reqUserinfo(context,info) {
        context.commit('changeUserinfo',info)
   }
}
export default actions