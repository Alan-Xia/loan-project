<template>
  <div class="login">
    <div class="content">
      <div class="main">
        <h2>信贷管理系统</h2>
        <el-form ref="form" :rules="rules" :model="form" class="table">
          <el-form-item prop="username">
            <el-input v-model.trim="form.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model.trim="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="onSubmit('form')" style="width:100%">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        account: 'admin',
        password: 'admin@123'
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 13, message: '长度在 5 到 13 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Login',this.form).then(res => {
            this.$router.push({
              path: '/index'
            })
          }).catch(error=>{
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.login{
  background: #333;
  width: 100%;
  height: 100%;
  position: relative;
  .content{
    width: 500px;
    height: 300px;
    position: absolute;
    left: calc(50% - 250px);
    top: calc(50% - 150px);
    background: #fff;
    h2{
      margin-top: 20px;
      text-align: center;
    }
    .table{
      width: 300px;
      margin: 0 auto;
      margin-top: 20px;
      .submit{
        text-align: center;
      }
    }
  }
}
</style>