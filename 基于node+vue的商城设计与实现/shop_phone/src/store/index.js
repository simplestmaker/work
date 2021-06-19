import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { state, getters, mutations } from "./mutations"
import actions from "./actions"
import menulist from './modules/menulist'
import rolelist from './modules/rolelist'
import userlist from './modules/userlist'
import catelist from './modules/catelist'
import specslist from './modules/specslist'
import goodslist from './modules/goodslist'
import viplist from './modules/viplist'
import bannerlist from './modules/bannerlist'
import secklist from './modules/secklist'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menulist,
        rolelist,
        userlist,
        catelist,
        specslist,
        goodslist,
        viplist,
        bannerlist,
        secklist
    }
})