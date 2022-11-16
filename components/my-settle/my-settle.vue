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
      default: {}
    }
  },
  data() {
    return {
      seconds: 3,

    };
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['checkedCount', 'getGoodsPrice', 'total']),

    isCheckAll() {
      return this.total === this.checkedCount;
    }
  },
  methods: {
    ...mapState('m_user', ['token']),
    ...mapMutations('m_cart', ['updateChecked']),
    ...mapMutations('m_user', ['updateRedirectInfo']),
    // 更改选中状态
    checkAll() {
      this.updateChecked(!this.isCheckAll);
    },
    //结算
    settlement() {
      console.log(this.token);
      if (!this.checkedCount) {
        return uni.$showMsg('请选择要结算的商品');
      }
      if (!this.address.userName) {
        return uni.$showMsg('请选择地址');
      }
      // if (!this.token()) {
      //   return uni.$showMsg('请先登录!');
      // }
      if (!this.token()) {
        this.delayNavigate();
      }
      // 4. 实现微信支付功能
        this.payOrder()
    },
    //展示倒计时消息
    showTips(n) {
      uni.showToast({
        title: `请先登录 ${n} 秒后跳转到登陆页面`,
        mask: true,
        duration: 1500
      });
    },

    // 延迟导航到 my 页面
    delayNavigate() {
      // 1. 展示提示消息，此时 seconds 的值等于 3
      this.showTips(this.seconds);
      // 2. 创建定时器，每隔 1 秒执行一次
      let timer = setInterval(() => {
        // 2.1 先让秒数自减 1
        this.seconds--;
        // 2.2 再根据最新的秒数，进行消息提示
        this.showTips(this.seconds);
        if (this.seconds <= 0) {
          uni.switchTab({
            url: '/pages/user/user',
            success: () => {
              // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
              this.updateRedirectInfo({
                // 跳转的方式
                openType: 'switchTab',
                // 从哪个页面跳转过去的
                from: '/pages/cart/cart'
              });
            }
          });
          clearInterval(timer);
          uni.hideToast();
        }
      }, 1000);
    
    },
    // 微信支付
    async payOrder() {
      // 1. 创建订单
      // 1.1 组织订单的信息对象
      const orderInfo = {
        // 开发期间，注释掉真实的订单价格，
        // order_price: this.checkedGoodsAmount,
        // 写死订单总价为 1 分钱
        order_price: 0.01,
        consignee_addr: this.address.detailInfo,
        goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
      };
      console.log(orderInfo);
      // 1.2 发起请求创建订单
      const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
      console.log(res);
      if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！');
      // 1.3 得到服务器响应的“订单编号”
      const orderNumber = res.message.order_number;
      console.log('订单请求成功');
      console.log(orderNumber);

      // 2. 订单预支付
      const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
      console.log(res2);
        // 2.2 预付订单生成失败
        if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        console.log("预支付请求成功");
      
      // 3. 发起微信支付
     
        // 3. 发起微信支付
        // 3.1 调用 uni.requestPayment() 发起微信支付
        const [err, succ] = await uni.requestPayment(payInfo)
        // 3.2 未完成支付
        if (err) return uni.$showMsg('订单未支付！')
        // 3.3 完成了支付，进一步查询支付的结果
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
        // 3.4 检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 3.5 检测到订单支付完成
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
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
