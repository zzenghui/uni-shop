<template>
  <view class="content">
    <view class="search-box">
      <my-search @click='gotosearch'></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" circular="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(L, index) in swiperList" :key="L.goods_id" @click="gomessage(L)"> 
          <image :src="L.image_src"></image>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navHandle(item)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    <view class="floor" v-for="(item,index) in floorList" :key="index">
      <view class="title">  <image :src="item.floor_title.image_src" mode=""></image> </view>
      <view class="floor-left" @click="goGoodsListleft(item)" >
        <image :src="item.product_list[0].image_src" mode=""></image>
      </view>
      <view class="floor-right">
      <view class="floor-right-item" @click="goGoodsListright(item2,index)" v-for="(item2,index) in item.product_list" :key="index" v-if="index !== 0">
        <image :src="item2.image_src" mode=""></image>
      </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import setBadge from '../../mixins/tabbar-badge.js'
export default {
  data() {
    return {
      //轮播图数据
      swiperList: [],
      //分类导航数据
      navList:[],
      //楼层信息
      floorList:[]
    };
  },
  mixins: [setBadge],
  onLoad() {
    this.getswiperList();
    this.getNavlist();
    this.getfloorlist()
  },
  methods: {
    //获取轮播图数据
    async getswiperList() {
      let { data } = await uni.$http.get(`/api/public/v1/home/swiperdata`);
      if (data.meta.status === 200) {
        this.swiperList = data.message;
      } else {
        return uni.$showMsg()
      }
    },
    //获取导航列表项
    async getNavlist(){
      let { data } = await uni.$http.get('/api/public/v1/home/catitems')
      if(data.meta.status === 200){
        this.navList = data.message;
        // console.log(this.navList);
      }else{
        return uni.$showMsg()
      }
    },
    //获取楼层信息
    async getfloorlist(){
      let { data } = await uni.$http.get('/api/public/v1/home/floordata')
      if (data.meta.status === 200) {
        data.message.forEach((floor)=>{
          floor.product_list.forEach((prod)=>{
            prod.url =  '/subpgk/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = data.message
        // console.log(this.floorList);
      } else{
        return uni.$showMsg()
      }
    },
      //跳转详情页
    gomessage(L){
      uni.navigateTo({
        url:`/subpgk/goods_detail/goods_detail?goods_id=${L.goods_id}`
      })
    },
    //跳转到分类页面
    navHandle(item){
      if (item.name === '分类') {
        uni.switchTab({
          url:"/pages/list/list"
        })
      } else{
        return 
      }
    },
    //跳转到左侧商品列表页
    goGoodsListleft(item){
      uni.navigateTo({
        url:item.product_list[0].url
      })
    },
    //跳转到右侧商品列表页
    goGoodsListright(item2,index){
    if(index !== 0){
      uni.navigateTo({
        url:item2.url
      })
    }else{
      return
    }
    },
    //跳转到搜索页面
    gotosearch(){
      uni.navigateTo({
        url:'/subpgk/search/search'
      })
    }
  },

 
};
</script>

<style lang="scss">
  // 吸顶效果
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
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
.nav{
  width: 750rpx;
  height: 150rpx;
  display: flex;
  justify-content: space-around;
  padding: 10rpx 0;
  .nav-item{
    width: 150rpx;
    height: 150rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
}
.floor{
  width: 98%;
  height: 450rpx;
  margin: 50rpx 15rpx;
  .title{
    width: 100%;
    height: 100rpx;
   
    image{
      width: 100%;
      height: 100%;
    }
  }
  .floor-left{
    float: left;
    width: 230rpx;
    height: 350rpx;
  
    image{
      width: 100%;
      height: 100%;
    }
  }
  .floor-right{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    float: left;
    margin-left: 10rpx;
    width: 480rpx;
    height: 350rpx;

    .floor-right-item{
      width: 49%;
      height: 49%;
    
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
