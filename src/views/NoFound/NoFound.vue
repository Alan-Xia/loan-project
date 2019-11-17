<template>
  <div>
    <div class="noFound">
    <div class="iconfont icon-msnui-404 error"></div>
    <div class="hint">你输入的页面不存在~~~~~~~</div>
    <Button title="返回首页" :action="getRoutePath" @getFunAction="getFunAction" padding="8px 15px" color="#fff" border="6px"/>
  </div>
  </div>
</template>

<script>
import Button from '@/components/Button/Button.vue'
  export default {
    data() {
      return {
        
      }
    },
    components: {
      Button
    },
    methods: {
      getRoutePath () {
        this.$router.push('/')
      },
      getFunAction (statesRun) {
        statesRun()
      }
    }
  }
</script>

<style lang="scss" scoped>
.noFound{
  width: 100%;
  height: 100%;
  margin-top: 80px;
  text-align: center;
  .error{
    height: 80px;
    font-size: 60px;
    color: rgb(236, 145, 70);
  }
  .hint{
    color: red;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
</style>