<template>
  <div class="silder">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/index">
            <span slot="title">首页</span>
          </el-menu-item>
          
          <el-menu-item index="/loan/req/index">
            <span slot="title">贷款申请</span>
          </el-menu-item>

          <el-menu-item index="/loan/manager/index">
            <span slot="title">申请管理</span>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <span>贷款审批</span>
            </template>
            <el-menu-item index="/approve/first">初审</el-menu-item>
            <el-menu-item index="/approve/end">终审</el-menu-item>
          </el-submenu>

          <el-menu-item index="/contract/manager">
            <span slot="title">标的管理</span>
          </el-menu-item>

          <el-submenu index="6">
            <template slot="title">
              <span>权限管理</span>
            </template>
            <el-menu-item index="/jurisdiction/create">创建管理员</el-menu-item>
            <el-menu-item index="/jurisdiction/list">列表展示</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>