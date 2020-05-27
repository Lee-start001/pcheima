<template>
  <el-container class="my_container">
    <el-header class="my_Header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        <img src="./images/logo.png" alt />
        <span>在线答疑</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{username}},你好</span>
        <el-button class="but" type="primary" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside class="my_Aside" width="auto">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <!-- index的数组代表路由地址 -->
          <el-menu-item index="/index/chart">
            <i class="el-icon-menu"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-menu"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/business">
            <i class="el-icon-menu"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-menu"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 嵌套路由 -->
      <el-main class="my_Main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, outInfo } from "../../api/index";
import { removeToken } from "../../utilis/token";
export default {
  data() {
    return {
      // 用户名
      username: "",
      // 用户头像
      avatar: "",
      //是否折叠
      isCollapse: true
    };
  },
  methods: {
    //点击数据显示数据页面
    goshuju() {
      this.$push("");
    },
    logout() {
      this.$confirm("是否确定退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发请求
          outInfo().then(res => {
            console.log(res);
            //删除本地的token 并跳转至登录页面
            removeToken();
            this.$router.push("/");
          });
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  created() {
    getInfo().then(res => {
      console.log(res);

      this.username = res.data.data.username;
      // 记得在前面还要拼接基地址，因为返回的头像路径不完整，要拼接
      //   // 还要拼接/，不然就连在一起了
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang='less'>
html,
body {
  height: 100%;
}
.my_container {
  height: 100%;
}
.my_Header {
  height: 60px;
  //  左侧
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    float: left;

    i {
      margin-right: 18px;
      font-size: 24px;
    }

    img {
      margin-right: 11px;
    }
  }

  //右侧
  .right {
    height: 100%;
    float: right;
    display: flex;
    align-items: center;

    img {
      width: 43px;
      height: 43px;
      margin-right: 10px;
    }

    .name {
      font-size: 15px;
      margin-right: 23px;
    }
  }
}
.my_Aside {
  // background-color: turquoise;
}
.my_Main {
  background-color: thistle;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>