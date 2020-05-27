<template>
  <div class="wrapper">
    <div class="box1">
      <div class="title">
        <img src="./images/login-icon9.png" alt />
        <span class="hei">黑马面面</span>
        <span class="line"></span>
        <span class="yonghu">用户登录</span>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="getcode" :src="piccode" alt class="piccode" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked"></el-checkbox>
          <span class="agreement">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>

        <el-form-item>
          <el-button class="logo_btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="logo_btn" @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册组件 -->
    <register ref="reg" />
    <!--  右侧主题图片 -->
    <img src="./images/login_banner_ele.png" alt class="login-banner" />
  </div>
</template>

<script>
// 导入注册组件
import register from "./components/register";
import { login } from "../../api/login";
 import { setToken } from "@/utilis/token";

export default {
  components: {
    register
  },
  data() {
    return {
      //  图形验证码
      piccode: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        // 账号
        phone: "18511111111",
        //密码
        password: "12345678",
        //图形验证码
        code: null,
        checked: true
      },
      rules: {
        phone: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "输入四位验证码", trigger: "blur" }
        ],
        // 多选框没有失去焦点，只有值改变事件
        // 因为checkbox其实他不可能值为空，除非你强行赋值为空
        // 所以我们不能拿值是否为空来做验证了
        // { required:true, message:'必须勾选同意用户协议',trigger:"change"},

        // 只有值为true才满足条件，否则代表不匹配
        checked: [{ pattern: /true/, message: "请勾选", trigger: "change" }]
      }
    };
  },
  methods: {
    //点击获取新的验证码
    getcode() {
      //  在请求的网址上多一个参数，参数的值用随机数，或者用时间戳（推荐的方式）
      this.piccode =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //发请求登录
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            console.log(res);
            if (res.data.code == 200) {              
              //存储token
               setToken(res.data.data.token);
              // window.localStorage.setItem('mytoken',res.data.data.token)
              this.$message.success('登陆成功')
              this.$router.push('/index')
            }else{
              this.$message.error(res.data.message)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //  点击注册  显示注册对话框
      this.$refs.reg.dialogFormVisible = true;
      this.$refs[formName].resetFields();
    }
  },
  created() {
    console.log(process.env.VUE_APP_URL);
  }
};
</script>

<style lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;

  .box1 {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    margin-left: 73px;
    margin-right: 143px;
    padding-left: 43px;
    padding-right: 41px;
    vertical-align: top;

    .title {
      display: flex;
      vertical-align: middle;
      margin-bottom: 29px;
      align-items: center;
      margin-top: 44px;
    }

    //  图片设置
    img {
      width: 22px;
      height: 17px;
      margin-right: 16px;
    }

    .hei,
    .yonghu {
      font-size: 22px;
    }

    .line {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
      margin-left: 14px;
      margin-right: 12px;
    }
    //  验证码图片
    .piccode {
      width: 100%;
      height: 42px;
    }

    //  用户协议 复选框
    .agreement a {
      text-decoration: none;
      color: #3296fa;
    }

    //  按钮
    .logo_btn {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0px;
        margin-top: 26px;
      }
    }
  }
}
</style>