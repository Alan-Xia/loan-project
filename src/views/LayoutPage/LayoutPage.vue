<template>
  <div class="home clear">
    <SilderNav class="slider fl"/>
    <div class="main fl">
      <HeaderNav class="header"/>
      <router-view />
    </div>
  </div>
</template>

<script>
import SilderNav from '@/components/SilderNav/SilderNav'
import HeaderNav from '@/components/HeaderNav/HeaderNav'
  export default {
    data() {
      return {
        
      }
    },
    components: {
      SilderNav,
      HeaderNav
    }
  }
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
}
.slider{
 height: 100%;
 width: 200px;
 background: #fff;
 overflow-x: hidden;
}
.main {
  height: 100%;
  width: calc(100% - 200px);
  overflow-x: hidden;
  .header{
    margin-top: 10px;
  }
}
</style>