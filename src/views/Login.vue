<template>
  <div class="login">
    <div class="loginWrapper">
      <div class="left"></div>
      <div class="right">
        <h3 class="loginTitle">后台管理系统</h3>
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input placeholder="用户名" v-model="loginForm.username" prefix-icon="el-icon-user"
              autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="密码" show-password prefix-icon="el-icon-lock" v-model="loginForm.password"
              autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item style="text-align: right">
            <el-button type="text" @click="dialogLogupVisible = true">注册账号</el-button>
            <el-button type="text" @click="submitForm('ruleForm')">忘记密码?</el-button>
          </el-form-item>

          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitLogin('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="注册" :visible.sync="dialogLogupVisible" :close-on-click-modal="false"
      @close="closeLogup('logupRuleForm')">
      <el-form :model="logupForm" :rules="logupRules" ref="logupRuleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="logupForm.username" prefix-icon="el-icon-user" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="logupForm.password" prefix-icon="el-icon-lock" show-password autocomplete="off" />
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePassword">
          <el-input v-model="logupForm.rePassword" prefix-icon="el-icon-lock" show-password autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeLogup('logupRuleForm')">取消</el-button>
        <el-button type="primary" @click="submitLogup('logupRuleForm')">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      formLabelWidth: "80px",
      dialogLogupVisible: false,
      logupForm: {
        username: "",
        password: "",
        rePassword: "",
      },
      logupRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        rePassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("http://localhost:3000/users/login", this.loginForm)
            .then((res) => {
              if (res.data.success) {
                this.$message.success("登录成功！");
                sessionStorage.setItem('token', res.data.token)
                console.log(this.$route.query.redirect);
                if(this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect);
                } else {
                  this.$router.push("/home");
                }
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 注册
    submitLogup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("http://localhost:3000/users/logup", this.logupForm)
            .then((res) => {
              if (res.data.success) {
                this.$message.success("注册成功！");
                // this.$router.push("/home");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 关闭注册
    closeLogup(formName) {
      this.$refs[formName].resetFields();
      this.dialogLogupVisible = false;
    },
  },
  created() { },
  mounted() { },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  .loginWrapper {
    display: flex;
    width: 800px;
    height: 400px;
    background-color: #ffffff;
    opacity: 0.9;

    .left {
      flex: 3;
      background-image: url("../assets/images/login.jpg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    .right {
      flex: 7;
      padding: 40px;

      .loginTitle {
        height: 50px;
        width: 200px;
        text-align: center;
        color: #409eff;
        font-size: 22px;
        margin-bottom: 30px;
        border-bottom: 2px solid #409eff;
      }

      .loginBtn {
        width: 100%;
      }
    }
  }
}
</style>