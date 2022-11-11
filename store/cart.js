export default {
  namespaced:true,
  actions:{
    
  },
  mutations:{
    //购物车添加商品
    addtoCart(state,goods){
      const findResult = state.cart.find((item)=>item.goods_id === goods.goods_id)
      if(!findResult){
        state.cart.push(goods)
        uni.showToast({
          title:'加入成功'
        })
        this.commit('m_cart/saveToStroage')
      }else{
        findResult.goods_count++
        uni.showToast({
          title:`已加入成功,目前购物车已有${findResult.goods_count}件此商品`
        })
        this.commit('m_cart/saveToStroage')
      }
    },
    //商品持久化
    saveToStroage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    }
  },
  
  state:()=>({
    
    
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  getters:{
    total(state){
      let c = 0
      state.cart.forEach((goods)=>c+=goods.goods_count)
      return c
    }
  }
}