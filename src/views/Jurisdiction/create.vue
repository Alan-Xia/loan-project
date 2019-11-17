<template>
  <div class="create">
    <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限分配">
        <el-radio-group v-model="form.role_id">
          <el-radio label="2">销售人员</el-radio>
          <el-radio label="1">初审人员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">创建管理员</el-button>
        <el-button  size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
</el-form>
  </div>
</template>

<script>
import {createUser} from '@/plugins/api'
  export default {
    data() {
      return {
        form: {
          account: '',
          password: '',
          pwd: '',
          role_id: '2'
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入确认密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.password == this.form.pwd) {
              let account = this.form.account
              let password = this.form.password
              let role_id = this.form.role_id
              createUser({account,password,role_id}).then(res => {
                if (res.code == '20000') {
                  this.$notify({
                    title: 'success',
                    message: '新增用户成功',
                    type: 'success',
                    duration: 2000
                  })
                }
                this.$router.push('/jurisdiction/list')
                this.form = {}
              })
            } else {
              this.$notify({
                title: 'success',
                message: '两次密码不一致',
                type: 'success',
                duration: 2000
              })
            }
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
.create{
  margin-top: 30px;
  width: 500px;
}
</style>