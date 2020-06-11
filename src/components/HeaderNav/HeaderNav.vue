<template>
  <div class="header clear">
    <el-breadcrumb separator="/" class="fl options">
      <i class="iconfont icon-caidan fl menu"></i>
      <el-breadcrumb-item v-for="(it, index) in list" :key="index" class="info">{{it.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="fr main">
      <el-tag :type="username | typeInfo" class="info">{{username? username : '没登陆'}}</el-tag>
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
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getRouteInfo()
    },
    filters:{
      typeInfo (type) {
        type != null || type != '' ? 'success' : 'danger'
      }
    },
    methods: {
      getRouteInfo () {
        this.list = this.$route.matched
        // this.list = this.$route.matched.filter(v=> v.meta && v.meta.title)
      },
      logout () {
        this.$store.dispatch('Logout').then(res => {
          this.$router.push('/')
        })
      }
    },
    watch: {
      $route () {
        this.getRouteInfo()
      }
    },
    computed: {
      ...mapGetters(['username'])
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
  .main{
    .info {
      margin-right: 20px;
    }
  }
}
</style>