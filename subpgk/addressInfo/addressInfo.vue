<template>
  <view>
    <view class="address">
     <view class="addAddress">
        <button type="primary" size="mini">新增收货地点</button>
     </view>
      <view class="addressInfo" v-for="(addr,index) in address" :key="index" @click="gotocart(addr)">
        <view class="row1">
          <!-- 收货人 -->
          <view class="person">收货人:{{addr.userName}}</view>
          <view class="phone">电话:{{addr.telNumber}}</view>
        </view>
        <view class="row2">收货地址:{{addr.provinceName}}-{{addr.cityName}}-{{addr.countyName}}-{{addr.detailInfo}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        address:[
          {
            userName:'赵增辉',
            postalCode:"454450",
            provinceName:"河南省",	
            cityName:"焦作市",
            countyName:"博爱县",
            detailInfo:"许良镇",
            nationalCode:"0378",
            telNumber:"18739190736",
            errMsg:"未知错误"
          },
          {
            userName:'赵增辉2号',
            postalCode:"4541321",
            provinceName:"河南省",	
            cityName:"焦作市",
            countyName:"博爱县",
            detailInfo:"西中道",
            nationalCode:"0378",
            telNumber:"18739190736",
            errMsg:"未知错误"
          }
        ]
      };
    },
    onLoad() {
      uni.setStorageSync('address',JSON.stringify(this.address[0]))
    },
    methods: {
      gotocart(addr) {
        uni.showModal({
          content:"确定使用此地址作为收货地址?",
          success: (res) => {
            if(res.confirm){
              uni.reLaunch({
                url:`/pages/cart/cart?address=${JSON.stringify(addr)}`
              })
            }
          }
        })
      }
    },
  }
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
</style>
