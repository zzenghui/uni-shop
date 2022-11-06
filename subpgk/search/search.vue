<template>
  <view>
    <!-- 搜索区域 -->
    <div class="search">
      <view class="search-box">
        <input type="search" auto-focus="true" @input="input" name="" id="" v-model="keyword" placeholder="请输入搜索内容" />
        <image v-show="keyword !== ''" src="../../static/images/clear.png" mode="" @click="clearKeyword"></image>
      </view>
    </div>
    <!-- 商品列表 -->
    <view class="goods-list">
      <ul>
        <li v-for="(item, index) in goodsList" :key="item.goods_id" @click="gotoGoodsDetail(item)">{{ item.goods_name }}</li>
      </ul>
    </view>
    <!-- 搜索历史 -->
    <view class="his" v-show="goodsList.length === 0">
      <view class="his-title">
        <text>搜索历史</text>
        <image src="../../static/images/delete.png" mode="" @click="clearHis"></image>
      </view>
      <view class="his-item" @click="gotoGoodslist(item2)" v-for="(item2, index) in historyList" :key="item2.id">{{ item2.title }}</view>
    </view>
  </view>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
  data() {
    return {
      keyword: '',
      timer: null,
      //搜索出来的数据
      goodsList: [],
      //搜索历史记录
      historyList: []
    };
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('his') || '[]')
  },
  methods: {
    clearKeyword() {
      this.keyword = '';
      this.getsearchlist();
    },
    //获取搜索建议列表数据
    async getsearchlist() {
      if (this.keyword.trim().length === 0) {
        this.goodsList = [];
        return;
      } else {
        let { data } = await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.keyword.trim()}`);
        if (data.meta.status === 200) {
          // console.log(data.message);
          this.goodsList = data.message;
          this.saveSearchHistory();
        } else {
          uni.$showMsg();
        }
      }
    },
    input() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getsearchlist();
      }, 500);
    },
    gotoGoodsDetail(item) {
      uni.navigateTo({
        url: `/subpgk/goods_detail/goods_detail?goods_id=${item.goods_id}`
      });
    },
    //添加历史记录
    saveSearchHistory() {
      // 搜索历史去重
      // this.historyList = this.historyList.filter((item)=>{
      //   if(item.title === this.keyword){
      //     return this.historyList
      //   }else{
      //     const historyItem = { id: nanoid(), title:this.keyword };
      //     return this.historyList.unshift(historyItem);
      //   }
      // })
      const historyItem = {id: nanoid(), title:this.keyword};
      this.historyList.unshift(historyItem);
      uni.setStorageSync('his',JSON.stringify(this.historyList))
    },
    //清空历史纪律
    clearHis() {
      this.historyList = []
      uni.setStorageSync('his',[])
    },
    //跳转到商品列表页
    gotoGoodslist(item){
      uni.navigateTo({
        url:`/subpgk/goods_list/goods_list?query=${item.title}`
      })
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.search {
  position: sticky;
  top: 0;
  z-index: 999;
}
.search-box {
  width: 100%;
  height: 50px;
  background-color: red;
  padding-top: 5px;
  position: relative;
  input {
    box-sizing: border-box;
    width: 90%;
    height: 90%;
    background-color: white;
    margin: 0 auto;
    border-radius: 25px;
    padding: 0 40px;
    font-size: 18px;
    background-image: url('../../static/images/search.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 8%;
  }
  image {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-60%);
  }
}
.goods-list {
  width: 100%;
}
ul li {
  list-style: none;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
ul li:hover {
  background-color: #aaa;
}
.his-title {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  line-height: 40px;
  image {
    position: absolute;
    top: 50%;
    right: 30px;
    width: 25px;
    height: 25px;
    transform: translateY(-50%);
  }
}
.his-item {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #aaa;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
