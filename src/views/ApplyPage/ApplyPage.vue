<template>
  <div class="apply">
    <div class="serach">
      <el-input v-model="query.name" placeholder="请输入用户名" clearable class="tab"  size="small" @input="getLoanList"></el-input>
      <el-button type="primary" size="small" @click="getLoanList">查询</el-button>
    </div>
    <div class="content">
      <el-table
      :data="list"
      style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="160">
          <template slot-scope="scope">
            <span>{{scope.row.birthday | filterDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          width="100"
          label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex | gender}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="education"
          width="120"
          label="教育程度">
          <template slot-scope="scope">
            <span>{{scope.row.education | edu}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address1"
          label="居住地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile_phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusCSS">{{scope.row.status | statusType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          >
          <template slot-scope='{row}'>
            <el-button type="primary" size="small" @click="dialogShow(row)" :disabled="row.status !=0 && row.status !=3 && row.status !=6">编辑</el-button>
            <el-button type="danger" size="small"  @click="delData(row.id)" :disabled="row.status !=0 && row.status !=3 && row.status !=6">删除</el-button>
            <el-button type="success" size="small" @click="submitToApprove(row.id)" :disabled="row.status !=0 && row.status !=3 && row.status !=6">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="demonstration">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows">
    </el-pagination>
    </div>
    <div class="dialog">
      <el-dialog title="申请管理-编辑" :visible.sync="dialogEditVisible" width="500px">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="教育程度" :label-width="formLabelWidth">
            <el-select v-model="form.education" placeholder="请选择教育程度">
              <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="居住地址" :label-width="formLabelWidth">
            <el-input v-model="form.address1" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="update()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {loanList,loanUpdate,loanDelete,loanSubmit} from '@/plugins/api'
const sexOptions = [
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
]
const educationOptions = [
    { key: 'college', display_name: '大学' },
    { key: 'highschool', display_name: '高中' }
  ]
  export default {
    data() {
      return {
        query:{
          pageNo: 1,
          pageSize: 10,
          name: ''
        },
        list: [],
        dialogEditVisible : false,
        form:　{},
        sexOptions,
        formLabelWidth: '100px',
        educationOptions,
        rows: 1,
        pages:1
      }
    },
    filters: {
      filterDate (date) {
        let time = new Date(date)
        let birthday = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDay()
        return birthday
      },
      gender (type) {
        return type == 'woman' ? '女' :'男'
      },
      edu (type) {
        return type == 'college' ? '大学' :'高中'
      },
      statusType (type) {
        switch (type) {
          case 0:
            return '进件'
          case 1:
            return '提交初审'
          case 2:
            return '初审通过'
          case 3:
            return '初审拒绝'
          case 4:
            return '提交终审'
          case 5:
            return '终审通过'
          case 6:
            return '终审拒绝'
          case 7:
            return '生成合同'
          default:
            return type
        }
      },
      statusCSS (type) {
        switch (type) {
          case 0:
            return 'info'
          case 1:
            return 'warning'
          case 2:
            return 'success'
          case 3:
            return 'danger'
          case 4:
            return 'warning'
          case 5:
            return 'success'
          case 6:
            return 'danger'
          case 7:
            return 'success'
          default:
            return 'warning'
        }
      }
    },
    created () {
      this.getLoanList()
    },
    methods: {
      getLoanList () {
        loanList(this.query).then(res =>{
          if (res.code == '20000') {
            this.list = res.data.data.data
            this.rows = res.data.data.rows
            this.pages = res.data.data.pages
          }
        })
      },
      dialogShow (data) {
        this.form = data
        this.dialogEditVisible = true
        console.log(this.form)
      },
      update () {
        loanUpdate(this.form).then(res => {
          if (res.code == '20000') {
            this.getLoanList()
            this.dialogEditVisible = false
            this.$notify({
                title: '编辑成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              }) 
          }
        })
      },
      delData (id) {
        loanDelete(id).then(res => {
          if (res.code == '20000') {
            this.getLoanList()
            this.$notify({
                title: '删除成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              }) 
          }
        })
      },
      submitToApprove (id) {
        loanSubmit ({id}).then(res => {
          if(res.code =='20000'){
            this.getLoanList()//重新调用查询接口
            this.$notify({
              title: '提交成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            }) 
          }
        })
      },
      handleSizeChange(val) {
        this.query.pageSize = val || this.query.pageSize
        this.getLoanList()
      },
      handleCurrentChange(val) {
        this.query.pageNo = val
        this.getLoanList()
      }
    }
  }
</script>

<style lang="scss" scoped>
.apply{
  width: 100%;
  padding: 30px 18px;
  .serach{
    .tab{
      width: 200px;
    }
  }
  .content{
    margin: 30px 0;
  }
  .dialog-footer{
    text-align: center;
  }
  .demonstration{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>