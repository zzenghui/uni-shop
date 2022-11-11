<template>
  <view>
    <view class="empty" v-show="!cart.length">
      <image src="../../static/images/empty.jpg" mode=""></image>
      <p>空空如也</p>
    </view>
    <my-goods v-for="(item, index) in cart" :defaultPic="defaultPic" :item="item" @click.native="gocart(item)"></my-goods>
  
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import setBadge from '../../mixins/tabbar-badge.js';
export default {
  data() {
    return {
      defaultPic: '../../static/images/empty.jpg'
    };
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    
  },
  // 将 badgeMix 混入到当前的页面中进行使用
  mixins: [setBadge],

  methods: {
    gocart(item) {
      uni.navigateTo({
        url: `/subpgk/goods_detail/goods_detail?goods_id=${item.goods_id}`
      });
    }
  }
};
</script>

<style lang="scss">
  .empty{
    width: 100%;
    height: 500px;
    text-align: center;
    font-size: 20px;
    color: red;
  }
  .empty image{
    width: 100%;
    height: 90%;
    
  }
</style>
