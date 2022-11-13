<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="addAddress" v-if="JSON.stringify(address) === '{}'"><button @click="chooseAddress" type="primary" size="mini">请选择收货地址+</button></view>
    <!-- 收货信息 -->
    <view class="addressInfo" v-else>
      <view class="row1">
        <!-- 收货人 -->
        <view class="person">收货人:{{address.userName}}</view>
        <view class="phone">电话:{{address.telNumber}}</view>
      </view>
      <view class="row2">收货地址:{{address.provinceName}}-{{address.cityName}}-{{address.countyName}}-{{address.detailInfo}}</view>
    </view>
    <view class="updadd">
      <button  @click="updateaddress" type="primary" size="mini" v-if="JSON.stringify(address) !== '{}'">更换地址</button>
    </view>
    <!-- 底部分割线 -->
    <image src="/static/images/fenge.png"></image>
  </view>
</template>

<script>
export default {
  name: 'my-address',
  props:{
    address:{
      type:Object,
    }
  },
  data() {
    return {
    };
  },
  onLoad(options) {
    this.address = options.address
    console.log(options);
  },
  methods: {
       chooseAddress() {
      uni.navigateTo({
        url:"/subpgk/addressInfo/addressInfo"
      })
    },
    updateaddress(){
      this.$emit('updateaddress')
    }
  },
  
};
</script>

<style lang="scss">
.addAddress {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
image {
  width: 100%;
  height: 30px;
}
.addressInfo {
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 15px 5px;
 
  .row1 {
    height: 30px;
    line-height: 30px;
    .person {
      float: left;
    }
    .phone {
      float: right;
      margin-right: 10px;
    }
  }
  .row2 {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.updadd{
   width: 100px;
   float: right;
 }
</style>
