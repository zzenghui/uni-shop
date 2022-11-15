<template>
  <view>
    <view class="login-container">
      <!-- 图标 -->
      <uni-icons type="contact" size="200" color="#555"></uni-icons>
      <!-- 登录按钮 -->
      <button type="primary" hover-class="red" @click="getUserInfo">一键登录</button>
      <!-- 提示文字 -->
      <text>登陆后尽享更多权益</text>
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
export default {
  name: 'my-login',
  data() {
    return {};
  },
  methods: {
    ...mapMutations('m_user',['updateUserInfo','updateUserToken']),
    getUserInfo(){
      let token = "adawdhwahdawjhdjkawhkjd"
      this.updateUserToken(token)
    }
    //获取用户基本信息
    // getUserInfo() {
    //  uni.getUserProfile({
    //    desc:"login",
    //    success:(info)=> {
    //      if(info.errMsg === "getUserProfile:ok"){
    //          this.updateUserInfo(info.userInfo)
    //          this.getToken(info)
    //      }else{
    //        uni.$showMsg("你取消了授权")
    //      }
    //    }
    //  })
    // },
   // async getToken(info){
   //   const [err,res] = await uni.login().catch(err => err)
   //   console.log(res);
   //  if(err || res.errMsg !== 'login:ok'){
   //    return uni.$showMsg('登陆失败')
   //  }
   //   const query = {
   //      code: res.code,
   //      encryptedData: info.encryptedData,
   //      iv: info.iv,
   //      rawData: info.rawData,
   //      signature: info.signature
   //    }
   //    let token = query.code+query.iv
   //    console.log(token);
   //    this.updateUserToken(token)
      //换取token
      // const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
      // console.log(loginResult);
      // if(loginResult.meta.status == 200){
      //   return uni.$showMsg('登陆成功')
      // }
      // uni.$showMsg('登陆失败')
   // } 
  },
};
</script>

<style lang="scss">
.login-container {
  text-align: center;
  padding-top: 70px;
}
image {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
button {
  width: 80%;
  border-radius: 50px;
  margin-top: 20px;
  background-color: red;
  margin-bottom: 10px;
}
text {
  font-size: 14px;
  color: #777;
}
.red {
  background-color: red;
}
</style>
