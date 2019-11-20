<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="reg_time"
        label="创建时间"
        width="180">
        <template slot-scope="{row}">
          <span>{{row.reg_time | filterDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="权限分配"
        width="180">
        <template slot-scope="{row}">
          <span>{{row.role_name | jurisdiction}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {userList} from '@/plugins/api'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getUserList()
  },
  filters: {
    filterDate (date) {
      let time = new Date(date)
      let birthday = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDay()
      return birthday
    },
    jurisdiction (type) {
      // return type == 'input' ? '销售人员' : '初审人员'
      switch (type) {
        case 'input':
          return '销售人员'
        case 'approve':
          return '初审人员'
        case 'administrator':
          return '管理员'
        default:
          '申请填写错误';
      }
    }
  },
  methods: {
    getUserList () {
      userList().then(res => {
        console.log(res);
        if (res.code == '20000') {
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>