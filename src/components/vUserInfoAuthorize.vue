<template>
  <div class="vUserInfoAuthorize">
    <div class="main">
      <span class="close" @click="closeFn">x</span>
      <div class="title">请确认，我已阅读并同意</div>
      <div class="content">《个人信息共享授权协议》</div>
      <div class="btn-list">
        <span class="btn" @click="okFn">我已阅读并同意</span>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeFn() {
      this.$emit("emitUserInfoAuthorize", "close");
    },
    okFn() {
      this.$emit("emitUserInfoAuthorize", "ok");
    }
  }
};
</script>
<style lang="less" scoped>
.vUserInfoAuthorize {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  font-size: 18px;
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
    width: 307px;

    background: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    padding-top: 40px;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .title {
      color: #000;
    }
    .content {
      color: #45464b;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .btn-list {
      padding-bottom: 20px;
      .btn {
        display: inline-block;
        color: #fff;
        background-color: #3262f4;
        padding: 10px 20px;
        border-radius: 50px;
      }
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.7;
  }
}
</style>
