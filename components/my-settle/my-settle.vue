<template>
  <view class="my-settle">
    <!-- 全选 -->
    <label class="radio">
      <radio :checked="isCheckAll && total !== 0" color="red" @click="checkAll" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计: <text class="amount">${{getGoodsPrice}}</text>
    </view>
    <!-- 结算 -->
    <view class="all">
      <button>结算({{checkedCount}})</button>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
export default {
  name: 'my-settle',
  data() {
    return {};
  },
  computed:{
    ...mapGetters('m_cart',['checkedCount',"getGoodsPrice",'total']),
    isCheckAll(){
      return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('m_cart',['updateChecked']),
    // 更改选中状态
   checkAll(){
     this.updateChecked(!this.isCheckAll)
   }
  },
};
</script>

<style>
.my-settle {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: white;
  line-height: 50px;
}
.radio{
  float: left;
}
.amount-box{
  float: left;
  margin-left: 50px;
}
.all{
  width: 130px;
  height: 100%;
  float: right;
}
.amount-box text{
  color: red;
}
button{
  background-color: red;
  width: 100%;
  height: 100%;
  color: aliceblue;
}
</style>
