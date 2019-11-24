<template>
  <div class="aside">
    <el-aside width="200px" class="el-menu-vertical-demo"> 
      <el-menu router>
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-aside> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data () {
    return {
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
    ])
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>