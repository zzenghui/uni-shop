<template>
  <view class="cart">
    <!-- 收货地址 -->
    <my-address :address="address" @updateaddress="updateAddress"></my-address>
    <view class="empty" v-if="!cart.length">
      <image src="../../static/images/empty.jpg" mode=""></image>
      <p>空空如也</p>
    </view>
    <view v-else>
      <view class="cart_title">
        <image src="../../static/images/shop.png" mode=""></image>
        <text>购物车</text>
      </view>

      <uni-swipe-action>
        <block v-for="(item, index) in cart" :key="item.goods_id">
          <uni-swipe-action-item :right-options="options" @click="deletecartItem(item.goods_id)">
            <my-goods :showRadio="true" :defaultPic="defaultPic" :item="item" @click.native="gocart(item)" @radio-click="handleRadio" @updateGoodscount="changeGoodsNum"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
    </view>
    <my-settle :address="address"></my-settle>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import setBadge from '../../mixins/tabbar-badge.js';
export default {
  data() {
    return {
      defaultPic: '../../static/images/empty.jpg',
      address:{},
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }
      ]
    };
  },
  onLoad(e) {
    if(e.address){
      this.address = JSON.parse(e.address)
    }else{
      this.address = JSON.parse(uni.getStorageSync('address'))
    }
  },
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  // 将 badgeMix 混入到当前的页面中进行使用
  mixins: [setBadge],

  methods: {
    ...mapMutations('m_cart', ['changeGoods_state', 'changegoodsNum','deleteCartItem']),
    ...mapMutations('m_address', ['updateAddress']),
    gocart(item) {
      // uni.navigateTo({
      //   url: `/subpgk/goods_detail/goods_detail?goods_id=${item.goods_id}`
      // });
    },
    //是否标选
    handleRadio(goods) {
      this.changeGoods_state(goods);
    },
    //更改商品数目
    changeGoodsNum(goods) {
      this.changegoodsNum(goods);
    },
    //删除商品
    deletecartItem(id){
      this.deleteCartItem(id)
    },
    //更换收货地址
    updateAddress(){
      uni.showModal({
        content:"确定更换收货地址?",
        success: (res) => {
          if(res.confirm){
            uni.navigateTo({
              url:"/subpgk/addressInfo/addressInfo"
            })
          }
        }
      })
    }
  }
};
</script>

<style lang="scss">
  .cart{
    padding-bottom: 50px;
  }
.empty {
  width: 100%;
  height: 500px;
  text-align: center;
  font-size: 20px;
  color: red;
}
.empty image {
  width: 100%;
  height: 90%;
}
.cart_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  image {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
