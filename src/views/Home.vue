<template>
  <div class="home">
    <div
      class="top-container"
      :style="{ backgroundImage: 'url(' + topbg + ')' }"
    >
      <img class="gif" src="../assets/img/home/top.gif" alt="" />
    </div>
    <img class="step" src="../assets/img/home/step.png" alt="" />
    <div class="form">
      <div class="input-container">
        <img class="mobile" src="../assets/img/home/mobile.png" alt="" />
        <span class="split"></span>
        <input
          class="input"
          type="number"
          v-model="mobileNum"
          placeholder="请输入您真实有效的手机号码"
        />
      </div>
    </div>
    <div class="protocol">
      <img
        v-if="showAgreeTips"
        class="tipsImg"
        src="../assets/img/home/tips.jpg"
        alt=""
      />
      <span class="agree-contianer" @click="onAgree">
        <img
          class="iconimg"
          v-if="isAgree"
          src="../assets/img/home/agree.png"
          alt=""
        />
        <i class="icon" v-else></i>
      </span>
      <span class="txt"
        >我已阅读并同意<a
          class="link"
          href="http://commonapply.swiftfintech.com/suishouhua/2/channel/xieyi103.html"
          >《用户协议》</a
        >
        <a class="link" href="https://api.ssflower.cn/211_privacy.html"
          >《隐私协议》</a
        ></span
      >
    </div>
    <img
      class="btn"
      src="../assets/img/home/btn.png"
      alt=""
      @click="onGetApp"
    />

    <div class="footer">
      <img
        v-if="VUE_APP_HAS_JS === 'true'"
        class="img"
        src="../assets/img/home/footer.png"
        alt=""
      />
      <template v-else>
        <img class="img" src="../assets/img/home/footer-no.jpg" alt="" />
        <p class="record">
          <a href="https://beian.miit.gov.cn">{{ recordNum }}</a>
        </p>
      </template>
    </div>
    <img
      class="shield"
      v-if="showShield"
      src="../assets/img/home/shield.png"
      alt=""
    />
    <VSMSCode v-if="showSMSCode" :tel="mobileNum" @emitSMSCode="eventSMSCode" />
  </div>
</template>
<script>
import VSMSCode from "@/components/VSMSCode";
export default {
  components: {
    VSMSCode
  },
  data() {
    return {
      isAgree: false,
      mobileNum: "",
      recordNum: "粤ICP备2021153686号",
      showShield: false,
      showSMSCode: false,
      showAgreeTips: false,
      topbg: "",
      VUE_APP_HAS_JS: process.env.VUE_APP_HAS_JS
    };
  },
  async created() {
    //-------检测受否微信打开-----------
    if (this.is_weixn()) {
      this.showShield = true;
    }
    //--------检测是否下架------------
    this.checkTakeDown();
    //--------埋点--------
    this.browserCount();

    if (process.env.VUE_APP_HAS_JS === "true") {
      this.topbg = require("../assets/img/home/top-bg.png");
    } else {
      this.topbg = require("../assets/img/home/top-bg-haslogo.png");
      //-------获取ICP--------
      this.getTCP();
    }
  },
  methods: {
    onAgree() {
      this.isAgree = !this.isAgree;
      if (this.isAgree) {
        this.showAgreeTips = false;
        this.onGetApp();
      }
    },
    async onGetApp() {
      if (this.$utls.isMobileNum(this.mobileNum)) {
        if (this.isAgree) {
          console.log(1);
          this.showSMSCode = true;
        } else {
          this.showAgreeTips = true;
          // this.$toast("请先同意协议！");
        }
      } else {
        this.$toast("请输入正确手机号！");
      }
    },
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    //--------埋点----------
    async browserCount() {
      let data = {
        channelNo: this.$channelNo,
        clientType: this.$clientType
      };
      let res = await this.$ajax.get("/ad/browserCount", { params: data });
      if (res && res.data && res.data.msg == "success") {
        console.log("埋点：", res);
      }
    },
    //-----检测是否下架------
    async checkTakeDown() {
      let takeDownData = { channelNo: this.$channelNo };
      let takeDownRes = await this.$ajax.get("/api/common/checkChannel", {
        params: takeDownData
      });
      if (takeDownRes && takeDownRes.data.status === 1) {
        this.$router.push({
          name: "page404"
        });
      }
    },
    //-------获取ICP--------
    async getTCP() {
      let recordData = {
        configType: "ICP",
        majia: this.$majia
      };
      let recordRes = await this.$ajax.get("/api/common/getConfig", {
        params: recordData
      });

      if (recordRes && recordRes.data.status == 0) {
        console.log("recordRes:", recordRes);
        this.recordNum = recordRes.data.data.split(",")[0];
        this.company = recordRes.data.data.split(",")[1];
      }
    },
    //-------------------------
    eventSMSCode() {
      this.showSMSCode = false;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  font-size: 0;
  .top-container {
    width: 100%;
    height: 316px;
    // background-image: url("../assets/img/home/top-bg-no.png");
    //background-image: url("../assets/img/home/top-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .gif {
      width: 375px;
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
    }
  }
  .step {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 321px;
  }
  .form {
    margin: 0 auto;
    width: 321px;
    .input-container {
      background: #ffffff;
      border: 1px solid #7f7e7f;
      border-radius: 50px;
      width: 100%;
      height: 46px;
      padding-left: 25px;
      padding-right: 15px;
      box-sizing: border-box;

      display: flex;
      align-items: center;
      .mobile {
        width: 14px;
      }
      .split {
        width: 1px;
        height: 10px;
        background-color: #7f7e7f;
        margin-left: 10px;
        margin-right: 20px;
      }
      .input {
        height: 90%;
        flex: 1;
        font-size: 12px;
        color: #666666;
        outline: none;
        border: none;
      }
    }
  }
  .btn {
    width: 330px;
    margin-top: 15px;
  }
  .protocol {
    margin: 15px auto 0;
    width: 321px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .tipsImg {
      position: absolute;
      top: -46px;
      left: 30px;
      z-index: 1;
      width: 120px;
    }
    .agree-contianer {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 3px;
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #9d9d9d;
        border-radius: 100px;
        box-sizing: border-box;
      }
      .iconimg {
        width: 20px;
        height: 20px;
      }
    }
    .txt {
      font-size: 12px;
      .link {
        color: #ff8629;
      }
    }
  }
  .footer {
    margin-top: 60px;
    .img {
      width: 100%;
    }
    .record {
      margin-top: -30px;
      a {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #9d9d9d;
        display: inline-block;
        transform: scale(0.75);
      }
    }
  }
  .shield {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
}
</style>
