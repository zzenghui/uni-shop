<template>
  <view>
    <view class="userInfotop">
      <view class="picture">
          <image src="../../static/images/photo.png" mode=""></image>
      </view>
      <p>岁月,轻饶我、</p>
    </view>
    <!-- 面版区域 -->
    <view class="panner">
      <view class="panner-item">
        <p>8</p>
        <p>收藏的店铺</p>
      </view>
      <view class="panner-item">
        <p>18</p>
        <p>收藏的商品</p>
      </view>
      <view class="panner-item">
        <p>19</p>
        <p>关注的商品</p>
      </view>
      <view class="panner-item">
        <p>168</p>
        <p>足迹</p>
      </view>
    </view>
    <!-- 订单区域 -->
    <view class="ding">
      <h3>我的订单</h3>
      <view class="ding-connect">
        <view class="dingItem">
          <image src="../../static/images/pay.png" mode=""></image>
          <p>待付款</p>
        </view>
        <view class="dingItem">
          <image src="../../static/images/back.png" mode=""></image>
          <p>收快递</p>
        </view>
        <view class="dingItem">
          <image src="../../static/images/removepay.png" mode=""></image>
          <p>退款/退货</p>
        </view>
        <view class="dingItem">
          <image src="../../static/images/allding.png" mode=""></image>
          <p>全部订单</p>
        </view>
      </view>
    </view>
    
    <!-- setting -->
    <view class="setting">
      <view class="settingItem">
        <p>收货地址  <image src="../../static/images/arrow.png" mode=""></image> </p>
      </view>
      <view class="settingItem">
        <p>联系客服 <image src="../../static/images/arrow.png" mode=""></image></p>
      </view>
      <view class="settingItem" @click="loginOut">
        <p>退出登录 <image src="../../static/images/arrow.png" mode=""></image></p>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
   methods: {
       ...mapMutations('m_user',['updateUserInfo','updateUserToken']),
     loginOut() {
       uni.showModal({
         content:'确定退出此账号',
         success: (res) => {
           if(res.confirm){
             //去vuex中删除token
             this.updateUserInfo({})
             this.updateUserToken('')
           }
         }
       })
     }
   },
    
  }
</script>

<style lang="scss">
  page{
    background-color: #eee;
  }
.userInfotop{
  width: 100%;
  height: 250px;
  background-color: red;
  border: 1px solid transparent;
  text-align: center;
  p{
    margin-top: 20px;
    font-size: 24px;
  }
  .picture{
    width: 120px;
    height: 120px;
    background-color: blue;
    border: 5px solid #ccc;
    box-shadow: 3px 3px 3px #555;
    border-radius: 50%;
    margin: auto;
    margin-top: 40px;
    overflow: hidden;
    image{
      width: 100%;
      height: 100%;
    }
  }
}
.panner{
  display: flex;
  width: 90%;
  height: 70px;
  background-color: white;
  margin: 0 auto;
  margin-top: -20px;
  border-radius: 20px;
  .panner-item{
    width: 25%;
    height: 100%;
    text-align: center;
    line-height: 30px;
    padding-top: 5px;
    padding: 0 1px;
    font-size: 14px;
  }
}
.ding{
  width: 90%;
  height: 100px;
  margin: 0 auto;
  background-color: white;
  margin-top: 10px;
  h3{
    height: 20px;
  }
  .ding-connect{
    display: flex;
    width: 100%;
    height: 40px;
    padding-top: 10px;
    .dingItem{
      width: 25%;
      height: 100%;
      text-align: center;
      image{
        width: 40%;
        height: 100%;
      }
    }
  }
}
.setting{
  width: 90%;
  height: 150px;
  background-color: white;
  margin: 0 auto;
  margin-top: 10px;
  .settingItem{
    height: 30%;
    width: 100%;
    line-height: 50px;
    padding-left: 20px;
    p{
      font-size: 18px;
      image{
        width: 30px;
        height: 20px;
        vertical-align: middle;
        margin-left: 200px;
      }
    }
  }
}
</style>