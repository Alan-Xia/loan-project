<template>
  <div class="header clear">
    <el-breadcrumb separator="/" class="fl options">
      <i class="iconfont icon-caidan fl menu"></i>
      <el-breadcrumb-item v-for="(it, index) in list" :key="index" class="info">{{it.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="fr">
      <el-dropdown>
        <span class="el-dropdown-link">
          退出<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {logout} from '@/plugins/api'
import {removeToken} from '@/util/cookie'
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getRouteInfo()
    },
    methods: {
      getRouteInfo () {
        this.list = this.$route.matched
        // this.list = this.$route.matched.filter(v=> v.meta && v.meta.title)
      },
      logout () {
        logout().then(res =>{
          removeToken()
          this.$router.push('/login')
        }).catch(err => {
          console.log(err)
        })
      }
    },
    watch: {
      $route () {
        this.getRouteInfo()
      }
    }
  }
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-right: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #CBCCD6;
  .options{
    padding-top: 2px;
    .menu{
      padding-left: 20px;
      padding-right: 10px;
      font-size: 18px;
    }
    .info{
      padding-top: 2px;
      color: #CBCCD6;
      font-size: 14px;
    }
  }
}
</style>