export default {
  namespaced: true,
  actions: {

  },
  mutations: {
    //购物车添加商品
    addtoCart(state, goods) {
      const findResult = state.cart.find((item) => item.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
        uni.showToast({
          title: '加入成功'
        })
        this.commit('m_cart/saveToStroage')
      } else {
        findResult.goods_count++
        uni.showToast({
          title: `已加入成功,目前购物车已有${findResult.goods_count}件此商品`
        })
        this.commit('m_cart/saveToStroage')
      }
    },
    //商品持久化
    saveToStroage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    //修改商品选中状态
    changeGoods_state(state, goods) {
      let findResult = state.cart.find((item) => {
        return item.goods_id === goods.goods_id
      })
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStroage')
      }
    },
    //修改商品数量
    changegoodsNum(state, goods) {
      let findResult = state.cart.find((item) => {
        return item.goods_id === goods.goods_id
      })
      if (findResult) {
        findResult.goods_count += goods.changegoodsNum
        //删除数量小于0的商品
        if (findResult.goods_count < 1) {
          uni.showModal({
            title: '',
            content: '是否删除此商品',
            success: (res) => {
              if (res.confirm) {
                state.cart = state.cart.filter((item) => {
                  return item.goods_id !== goods.goods_id
                })
              } else {
                findResult.goods_count = 1
              }
            }
          })
        }
        this.commit('m_cart/saveToStroage')
      }
    },
    //删除购物车的一项
    deleteCartItem(state, id) {
      state.cart = state.cart.filter((item) => {
        return item.goods_id !== id
      })
      this.commit('m_cart/saveToStroage')
    },
    // 更改商品选中状态
    updateChecked(state, goodsState) {
      state.cart.forEach(x => x.goods_state = goodsState)
      this.commit('m_cart/saveToStroage')
    }
  },
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach((goods) => c += goods.goods_count)
      return c
    },

    //获取商品的总数量
    checkedCount(state) {
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法，将已勾选的商品总数量进行累加
      // reduce() 的返回值就是已勾选的商品的总数量
      let findResult = state.cart.filter(x => x.goods_state)
      let goodsAllCount = 0
      findResult.forEach((item) => goodsAllCount += item.goods_count)
      return goodsAllCount
    },
    //获取商品的总价格
    getGoodsPrice(state) {
      let findResult = state.cart.filter(x => x.goods_state)
      let goodsAllPrice = 0
      findResult.forEach((item) => goodsAllPrice += (item.goods_count * item.goods_price))
      return goodsAllPrice.toFixed(2)
    }
  }
}
