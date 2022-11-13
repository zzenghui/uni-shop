<template>
  <view>
    <view class="goods_list">
      <view class="goods_item">
        <view class="state" v-show="showRadio"><radio @click="radio_change(item)" :checked="item.goods_state" color="red"></radio></view>
        <view class="img"><image :src="item.goods_small_logo || defaultPic" mode=""></image></view>
        <view class="des">
          <p>{{ item.goods_name }}</p>
          <view class="pric">${{ item.goods_price | tofixed }}</view>
          <view class="total" v-show="showRadio">
            <button @click="updateGoods_count(-1)">-</button>
            <input  type="text" :value="item.goods_count" disabled="disabled" />
            <button @click="updateGoods_count(1)">+</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-goods',
  props: ['item', 'defaultPic', 'showRadio'],

  props: {
    item: {
      type: Object,
      default: {}
    },
    defaultPic: {
      type: String
    },
    showRadio: {
      type: Boolean,
      // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
      default: false
    }
  },
  filters: {
    tofixed(num) {
      return Number(num).toFixed(2);
    }
  },

  data() {
    return {};
  },
  methods: {
    radio_change(item) {
      this.$emit('radio-click', {
        goods_id: item.goods_id,
        goods_state: !item.goods_state
      });
    },
    updateGoods_count(a){
      this.$emit('updateGoodscount',{
        goods_id:this.item.goods_id,
        changegoodsNum:a
      })
    },
  
  }
};
</script>

<style lang="scss">
.goods_item {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  height: 150px;
  padding-left: 1px;
  .state {
    width: 30px;
    height: 100%;
    float: left;

    padding: 60px 0px;
    box-sizing: border-box;
    radio {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  p {
    font-size: 15px;
  }
  .img {
    float: left;
    margin-right: 10px;
    width: 35%;
    height: 100%;

    image {
      width: 100%;
      height: 100%;
    }
  }
  .pric {
    position: absolute;
    bottom: 0;
    left: 160px;
    width: 70px;
    height: 30px;
    color: red;
    font-size: 18px;
  }
  .total {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
    height: 50px;
    button {
      flex: 0.7;
    }

    input {
      flex: 1.6;
      height: 100%;
      text-align: center;
    }
  }
}
</style>
