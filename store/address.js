export default {
  namespaced: true,
  actions: {},
  mutations: {
    updateAddress(state,address){
      state.address = address
    }
  },
  state: {
    address: {}
  },
  getter: {}
}
