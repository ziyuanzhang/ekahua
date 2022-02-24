<template>
  <div class="vStay">
    <div class="main">
      <img class="img" src="../assets/img/stay/alert.png" alt="" />
      <div class="btn-list">
        <div class="btn btn-cancel" @click="backFun()"></div>
        <div class="btn btn-ok" @click="comeOnFun()"></div>
      </div>
      <img
        class="close"
        @click="closeFun()"
        src="../assets/img/stay/close.png"
        alt=""
      />
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
    closeFun() {
      this.$emit("emitStay", { type: "close" });
    },
    comeOnFun() {
      this.$emit("emitStay", { type: "come" });
    },
    backFun() {
      this.$emit("emitStay", { type: "back" });
    }
  }
};
</script>
<style lang="less" scoped>
.vStay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bg {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    .close {
      width: 35px;
      margin-top: 80px;
    }
    .img {
      width: 266px;
    }
    .btn-list {
      margin-top: -89px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        width: 98px;
        height: 42px;
        // opacity: 0.5;
        // background-color: green;
      }
      .btn-cancel {
        margin-right: 13px;
      }
      .btn-ok {
      }
    }
  }
}
</style>
