<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <view class="my-search-box" :style="{'border-radius':redius+'px'}" @click="gotoSearch">
      <image src="../../static/images/search.png" mode="" ></image>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      bgcolor:{
        type:String,
        default:'#cc0000'
      },
      redius:{
        type:Number,
        default:20  //'px'像素
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      gotoSearch(){
        console.log('~~~');
        this.$emit("click")
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container{
    width: 100%;
    height: 50px;
    padding-top: 8px;
    .my-search-box{
      width: 90%;
      height: 80%;
      margin: auto auto;
      background-color: white;
      line-height: 40px;
      text-align: center;
    }
  }
  image{
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
  text{
    font-size: 17px
  }
</style>