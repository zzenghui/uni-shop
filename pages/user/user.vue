<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import setBadge from '../../mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['token'])
    },
    mixins: [setBadge],
  }
</script>

<style lang="scss">

</style>
