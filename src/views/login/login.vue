<template>
  <div class="wrapper">
    <div class="box1"></div>
    <img src="./images/login_banner_ele.png" alt class="login-banner" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  }
}
</style>