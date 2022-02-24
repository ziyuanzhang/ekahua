<template>
  <div class="explain">
    <div class="main">
      <div class="content">
        <p>收不到短信验证码，可能是以下原因导致:</p>
        <p>
          1、由于手机安全软件拦截，验证码短信被拦截进了垃圾箱，请打开垃圾箱查看;
        </p>
        <p>
          2、由于运营商通道故障造成短信发送时间延迟，请耐心等待或重新获取验证码;
        </p>
        <p>
          3、核实你的手机是否能正常接收到短信，停机、欠费或短信箱存储已满状态都不能接收到短信;
        </p>
        <p>
          4、所输入的手机号不是当前您在使用的手机号，请确认当前在使用的正确手机号
        </p>
      </div>

      <div class="btn" @click="closeFun()">知道啦~</div>
    </div>
    <div class="bg" @click="closeFun()"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeFun() {
      this.$emit("emitExplain");
    }
  }
};
</script>
<style lang="less" scoped>
.explain {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    width: 85%;

    box-sizing: border-box;
    font-size: 15px;

    color: #777;
    background-color: #fff;
    border-radius: 5px;
    text-align: left;
    .content {
      padding: 20px 30px 30px;
      border-bottom: 1px solid #dedede;
      p {
        font-size: 15px;
        line-height: 20px;
        color: #6c6c6c;
      }
    }
    .btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #26bd9e;
    }
  }
  .bg {
    width: 100vw;
    height: 100vh;
    background-color: #000;
  }
}
</style>
