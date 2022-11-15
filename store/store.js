import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    m_cart:cart,
    m_user:user
  }
})

