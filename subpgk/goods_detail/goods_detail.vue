<template>
  <view class="content" v-show="goods_info.goods_name">
    <!-- 轮播区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item, index) in goods_info.pics"><image :src="item.pics_big" mode="" @click="lookPhoto(index)"></image></swiper-item>
    </swiper>
    <view class="goods_info_box">
      <!-- 商品价格 -->
      <view class="price">${{ goods_info.goods_price }}</view>
      <!-- 商品主体 -->
      <view class="goods_info_body">
        <!-- 商品详情 -->
        <view class="detail">{{ goods_info.goods_name }}</view>
        <!-- 收藏 -->
        <view class="love">
          <image src="../../static/images/shoucang.png" mode=""></image>
          <p>收藏</p>
        </view>
      </view>
      <!-- 默认快递区域 -->
      <view class="quick">快递:免运费</view>
      <!-- 富文本区域 -->
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="gocart" @buttonClick="buttonClick" class="good_nav" />
  </view>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  data() {
    return {
      goods_id: '255',
      goods_info: {},
      //页面下栏组件
      options: [
        {
          icon: 'shop',
          text: '店铺',
          info: 5,
          infoBackgroundColor: '#007aff',
          infoColor: 'red'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    };
  },
  watch:{
    total:{
      immediate:true,
      handler(newValue){
        const findResult = this.options.find(x=>x.text==='购物车')
        if(findResult){
          findResult.info = newValue
      }
    }
    }
  },
  onLoad(e) {
    this.goods_id = e.goods_id;
    console.log(this.goods_id);
    this.getgoodsDetail();
  },
  methods: {
    //获取vuex中的mutations方法
    ...mapMutations('m_cart',['addtoCart']),
    //获取商品详情数据
    async getgoodsDetail() {
      let { data } = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.goods_id}`);
      if (data.meta.status == 200) {
        data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ');
        //解决ios上不识别wepb图片
        data.message.goods_introduce = data.message.goods_introduce.replace(/.wepb/g, '.jpg');
        this.goods_info = data.message;
      } else {
        uni.$showMsg();
      }
    },
    //浏览轮播图
    lookPhoto(index) {
      uni.previewImage({
        current: index,
        //是一个函数
        urls: this.goods_info.pics.map(x => x.pics_big)
      });
    },
    gocart(e) {
     if(e.content.text === "购物车"){
       uni.switchTab({
         url:"/pages/cart/cart"
       })
     }
    },
    buttonClick(e) {
      if(e.content.text === "加入购物车"){
        const goods ={
          goods_id:this.goods_info.goods_id,
          goods_name:this.goods_info.goods_name,
          goods_price:this.goods_info.goods_price,
          goods_count:1,
          goods_small_logo:this.goods_info.goods_small_logo,
          goods_state:true
        }
        this.addtoCart(goods)
        
      }
    }
  }
};
</script>

<style>
.content {
  padding-bottom: 50px;
}
.good_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
swiper {
  width: 100%;
  height: 350px;
}
swiper-item {
  width: 100%;
  height: 100%;
}
swiper-item image {
  width: 100%;
  height: 100%;
}
.goods_info_box .price {
  width: 50px;
  height: 30px;
  color: red;
  text-align: center;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  margin-bottom: 10px;
}
.goods_info_body {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  font-size: 15px;
}

.goods_info_body .detail {
  width: 70%;
  float: left;
}

.goods_info_body .love {
  float: right;
  width: 20%;
  height: 100%;
  text-align: center;
  padding-right: 30px;
  font-size: 14px;
  color: #555;
}
.goods_info_body .love image {
  width: 15px;
  height: 15px;
}
.quick {
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  font-size: 14px;
  color: #555;
}
</style>
