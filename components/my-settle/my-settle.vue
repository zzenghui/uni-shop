<template>
  <view class="my-settle">
    <!-- 全选 -->
    <label class="radio">
      <radio :checked="isCheckAll && total !== 0" color="red" @click="checkAll" />
      <text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计:
      <text class="amount">${{ getGoodsPrice }}</text>
    </view>
    <!-- 结算 -->
    <view class="all">
      <button @click="settlement">结算({{ checkedCount }})</button>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: 'my-settle',
  props: {
    address: {
      type: Object,
      default:{}
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'getGoodsPrice', 'total']),
    isCheckAll() {
      return this.total === this.checkedCount;
    }
  },
  methods: {
    ...mapState('m_user', ['token']),
    ...mapMutations('m_cart', ['updateChecked']),
    // 更改选中状态
    checkAll() {
      this.updateChecked(!this.isCheckAll);
    },
    //结算
    async settlement() {
      console.log(this.token);
      if (!this.checkedCount) {
        return uni.$showMsg('请选择要结算的商品');
      }
      if (!this.address.userName) {
        return uni.$showMsg('请选择地址');
      }
      if (!this.token()) return uni.$showMsg('请先登录!');
    }
  }
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
.radio {
  float: left;
}
.amount-box {
  float: left;
  margin-left: 50px;
}
.all {
  width: 130px;
  height: 100%;
  float: right;
}
.amount-box text {
  color: red;
}
button {
  background-color: red;
  width: 100%;
  height: 100%;
  color: aliceblue;
}
</style>
