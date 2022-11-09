<template>
  <view><my-goods @click.native="gotogoodsDetail(item)" v-for="(item, index) in goodsList" :defaultPic="defaultPic" :item="item"></my-goods></view>
</template>

<script>
export default {
  data() {
    return {
      //设置上拉触底节流
      isLoading: false,
      goodsList: [],
      //分页效果
      total: 0,
      //默认图片
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      queryObj: {
        //查询的关键字
        query: '',
        //商品分类id
        cid: '',
        //页码值
        pagenum: 1,
        //每页显示条数
        pagesize: 10
      }
    };
  },
  //上拉触底效果
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
      if (this.isLoading === false) {
        this.queryObj.pagenum += 1;
        this.getGoodslist();
      }
    } else {
      uni.$showMsg('数据加载完毕');
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    this.queryObj.pagenum = 1
      this.total = 0
      this.goodsList = []
      this.getGoodslist(() => uni.stopPullDownRefresh())
  },
  
  onLoad(e) {
    // console.log(e);
    this.queryObj.query = e.query || '';
    this.queryObj.cid = e.cid || '';
    // console.log(this.queryObj);
    this.getGoodslist();
  },
  methods: {
    //天跳转到详情页面
    gotogoodsDetail(item){
      uni.navigateTo({
        url:`/subpgk/goods_detail/goods_detail?goods_id=${item.goods_id}`
      })
    },
    //获取商品列表数据
    async getGoodslist(cd) {
      this.isLoading = true;
      let { data } = await uni.$http.get(`/api/public/v1/goods/search`, this.queryObj);
       this.isLoading = false;
       cd && cd()
       
      if (data.meta.status == 200) {
        this.goodsList = [...this.goodsList, ...data.message.goods];
        this.total = data.message.total;
        console.log(this.goodsList);
        // console.log(this.total);
      } else {
        return uni.$showMsg();
      }
    }
   }
};
</script>

<style lang="scss"></style>
