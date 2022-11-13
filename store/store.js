import Vue from 'vue'
import Vuex from 'vuex'
import address from './address.js'
import cart from './cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    m_cart:cart,
    m_address:address
  }
})

