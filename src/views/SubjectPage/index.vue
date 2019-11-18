<template>
  <div class="subject">
    <div class="serach">
      <el-input v-model="query.name" placeholder="请输入用户名" clearable class="tab"  size="small" @input="getSubjectData"></el-input>
      <el-button type="primary" size="small" @click="getSubjectData">查询</el-button>
    </div>
    <div class="content">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loan_name" label="姓名"></el-table-column>
        <el-table-column prop="loan_card" label="身份证号码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="createFile(row.id)">生成合同</el-button>
            <el-button type="danger" size="small" @click="download(row.id)">下载合同</el-button>
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
  </div>
</template>

<script>
import {contractQuery,contractFile,contractDownload} from '@/plugins/api'
import store from '@/store'
  export default {
    data() {
      return {
        query:{
          pageNo: 1,
          pageSize: 10,
          name: ''
        },
        rows: 1,
        pages:1,
        list: []
      }
    },
    created() {
      this.getSubjectData()
    },
    methods: {
      getSubjectData () {
        contractQuery(this.query).then(res =>{
          console.log(res)
          if (res.code == '20000') {
            this.list = res.data.data.data
            this.rows = res.data.data.rows
            this.pages = res.data.data.pages
          }
        })
      },
      handleSizeChange(val) {
        this.query.pageSize = val || this.query.pageSize
        this.getSubjectData()
      },
      handleCurrentChange(val) {
        this.query.pageNo = val
        this.getSubjectData()
      },
      createFile (id) {
        console.log(id)
        contractFile({id}).then(res => {
          console.log(res);
          if (res.code == '20000') {
            this.$notify({
              title: 'success',
              message: '生成合同成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      download (id) {
        contractDownload(id).then(res => {
          if (res.code == '20000') {
            let url = res.data.url
            console.log(url)
            this.downUrlList(url)
            this.$notify({
              title: 'success',
              message: '下载合同成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      downUrlList(url) {
        let address = store.state.address + url
        var eleLink = document.createElement('a')
        eleLink.style.display = 'none'
        eleLink.download = url
        var blob = new Blob([address]);
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click();
        URL.revokeObjectURL(eleLink.href)
        document.body.removeChild(eleLink)
      }
    }
  }
</script>

<style lang="scss" scoped>
.subject{
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
  .demonstration{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>