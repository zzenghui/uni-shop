<template>
  <view class="content">
    <swiper :indicator-dots="true" :autoplay="true" circular="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(L, index) in swiperList" :key="L.goods_id">
        <image :src="L.image_src"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据
      swiperList: []
    };
  },
  onLoad() {
    this.getswiperList();
  },
  methods: {
    //获取轮播图数据
    async getswiperList() {
      let { data } = await uni.$http.get(`/api/public/v1/home/swiperdata`);
      if (data.meta.status === 200) {
        this.swiperList = data.message;
        console.log(this.swiperList);
      } else {
        return uni.showToast({
          title: '数据获取失败',
          duration: 1500,
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style lang="scss">
swiper {
  width: 750rpx;
  height: 300rpx;
  
  swiper-item {
    width: 100%;
    height: 100%;
   
    image{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
