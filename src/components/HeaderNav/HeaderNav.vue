<template>
  <div class="header clear">
    <el-breadcrumb separator="/" class="fl options">
      <i class="iconfont icon-caidan fl menu"></i>
      <el-breadcrumb-item v-for="(it, index) in list" :key="index" class="info">{{it.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="fr main">
      <el-tag :type="username | typeInfo" class="info">{{username? username : ''}}</el-tag>
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
import {removeToken,getToken} from '@/util/cookie'
import {getUinfo,clearAll} from '@/util/auth'
  export default {
    data() {
      return {
        list: [],
        username: ''
      }
    },
    created() {
      this.getRouteInfo()
      this.getUserName()
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
        logout().then(res =>{
          removeToken()
          clearAll()
          this.$router.push('/login')
        }).catch(err => {
          console.log(err)
        })
      },
      getUserName () {
        if (getToken() && getUinfo()) {
          this.username = getUinfo().data.roles[0].name
        }
        console.log(this.username)
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
  .main{
    .info {
      margin-right: 20px;
    }
  }
}
</style>