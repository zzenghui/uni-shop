<template>
  <view>
    <view class="goods_list">
      <view class="goods_item">
        <view class="img"> <image :src="item.goods_small_logo || defaultPic" mode=""></image> </view>
        <div class="des">
          <p>{{item.goods_name}}</p>
          <div class="pric">${{item.goods_price | tofixed}}</div>
        </div>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:['item','defaultPic'],
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.goods_item{
    position: relative;
    margin-bottom: 20px;
    width: 100%;
    height: 150px;
  
    p{
      font-size: 15px;
    }
    .img{
      float: left;
      margin-right: 10px;
      width: 35%;
      height: 100%;
      
      image{
        width: 100%;
        height: 100%;
      }
    }
    .pric{
      position: absolute;
      bottom: 0;
      left: 140px;
      width: 50px;
      height: 30px;
      color: red;
      font-size: 18px;
    }
  }
</style>