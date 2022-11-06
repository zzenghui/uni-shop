<template>
  <view>
    <view class="content">
      <scroll-view scroll-y="true" class="scroll-left" :style="{ height: wh + 'px' }">
        <view class="scroll-left-item" :class="index === cateitem ? 'active' : ''" @click="getdata(index)" v-for="(item, index) in cateList" :key="item.cat_id">
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top='scrollTop'>
        <view class="cate-lv2" v-for="(l, index) in cateList2" :key="l.cat_id">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">/{{ l.cat_name }}/</view>
          <!-- 三级分类 -->
          <view class="cate-lv3"><view class="cate-lv3-item" @click="goGoodslist(l3)" v-for="(l3, index) in l.children" :key="l3.cat_id">
          <!-- 三级分类的item -->
          <image :src="l3.cat_icon.replace('dev','web')"></image> 
          <text> {{l3.cat_name}} </text>
          </view></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //可视窗口的高度
      wh: 0,
      //获取一级分类数据
      cateList: [],
      //一级分类选中状态
      cateitem: 0,
      //获取二级分类数据
      cateList2: [],
      //设置返回时滚动条的位置
      scrollTop:0
    };
  },
  onLoad() {
    // 获取当前系统的信息
    const sysInfo = uni.getSystemInfoSync();
    // 为 wh 窗口可用高度动态赋值
    this.wh = sysInfo.windowHeight;
    //获取分类数据
    this.getcateList();
  },
  methods: {
    //获取一级分类
    async getcateList() {
      let { data } = await uni.$http.get('/api/public/v1/categories');
      if (data.meta.status === 200) {
        this.cateList = data.message;
        this.cateList2 = data.message[0].children;
        // console.log(this.cateList2);
      } else {
        uni.$showMsg();
      }
    },
    //点击一级分类
    getdata(index) {
      this.cateitem = index;
      //将scrollTop重置成0(注意:scrollTop的值前后不能设置一样)
      this.scrollTop = this.scrollTop === 0? 1 : 0
      // 重新未二级分类赋值
      this.cateList2 = this.cateList[index].children;
      // console.log(this.cateList2);
    },
    //点击三级分类之后跳转
    goGoodslist(item3){
      uni.navigateTo({
        url:`/subpgk/goods_list/goods_list?cid=${item3.cat_id}`
      })
    }
  }
};
</script>

<style lang="scss">
.content {
  display: flex;
  .scroll-left {
    width: 170px;
    .scroll-left-item {
      position: relative;
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      &.active {
        background-color: #ffffff;
        &:before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: red;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2 {
  width: 100%;
  margin-top: 30rpx;
  .cate-lv2-title {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-weight: 600;
  }
  .cate-lv3 {
    width: 100%;
    display: flex; 
    flex-wrap: wrap;
    .cate-lv3-item {
      width: 32%;
      height: 220rpx;
      margin-top: 20rpx;
      text-align: center;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      font-size: 12px;
      image{
        width: 100%;
        height: 70%;
      }
    }
  }
}
</style>
