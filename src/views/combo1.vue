<template>
  <div class="combo1-page">
    <img
      class="leftImg"
      @click="downloadFun"
      src="../assets/img/combo1/left-more.png"
      alt=""
    />
    <div class="A" v-if="showA">
      <img class="tips-top" src="../assets/img/combo1/tips-top.png" alt="" />
      <img class="pass" src="../assets/img/combo1/pass.png" alt="" />
      <img class="next" src="../assets/img/combo1/next.png" alt="" />
      <span class="amount">{{ amount }}元</span>
      <div class="btn-list">
        <div class="left">
          <img
            class="btn-ok"
            @click="downloadFun"
            src="../assets/img/combo1/btn-ok.png"
            alt=""
          />
        </div>
        <div class="right">
          <img
            class="tips-app"
            src="../assets/img/combo1/tips-app.png"
            alt=""
          />
          <img
            class="btn-more"
            @click="moreFun"
            src="../assets/img/combo1/btn-more.png"
            alt=""
          />
        </div>
      </div>
      <div class="before-container">
        <img
          class="before-txt"
          src="../assets/img/combo1/before-txt.png"
          alt=""
        />
      </div>
    </div>
    <div class="B" v-else>
      <img
        class="before-txt2"
        src="../assets/img/combo1/before-txt2.png"
        alt=""
      />
      <div class="split"></div>
      <vProduct :list="list" :userId="$route.query.userId"></vProduct>
      <div class="btn-list">
        <img class="tips" src="../assets/img/combo1/tips-app.png" />
        <img
          class="btn"
          @click="downloadFun"
          src="../assets/img/combo1/product-btn.png"
        />
      </div>
    </div>
    <div class="split"></div>
    <div class="footer">
      <img class="icon" src="../assets/img/combo1/icon.jpg" alt="" />
      <img class="bottom" src="../assets/img/combo1/bottom.png" alt="" />
    </div>
  </div>
</template>
<script>
import vProduct from "../components/vProduct";
export default {
  components: {
    vProduct
  },
  data() {
    return {
      showA: true,
      list: [],
      amount: 0
    };
  },
  async created() {
    //-------------
    let fd = new FormData();
    fd.append("userId", this.$route.query.userId);
    fd.append("requestForm", "H5");
    let res = await this.$ajax.post("/api/product/getExternalProduct", fd);
    if (res.data.status === 0) {
      console.log("combo1:", res);
      if (res.data?.data.length > 0) {
        //this.list = res.data.data;
        this.list = res.data.data.map((ele) => {
          return {
            img: ele.logo,
            name: ele.title,
            maxAmount: ele.loanCtlDesc,
            feature: ele.desc,
            time: ele.loanTermDesc,
            url: ele.url,
            id: ele.productId
          };
        });
      }
    } else {
      this.$toast(res.data.msg);
    }
    //-----------------------
    let amountFD = new FormData();
    amountFD.append("userId", this.$route.query.userId);
    let amountRes = await this.$ajax.post(
      "/api/userCreditReport/getUserCreditReport",
      amountFD
    );
    if (amountRes.data.status === 0) {
      this.amount = amountRes.data.data.recommendLoan;
    }
  },
  methods: {
    moreFun() {
      if (this.list.length === 0) {
        this.downloadFun();
      } else {
        this.showA = false;
      }
    },
    downloadFun() {
      if (this.$utls.isAndroid()) {
        window.location.href =
          "https://zhaowojie.oss-cn-shanghai.aliyuncs.com/app/ekahua.apk";
      } else {
        window.location.href =
          "itms-services://?action=download-manifest&url=https://zhaowojie.oss-cn-shanghai.aliyuncs.com/app/manifest_ekahua.plist";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.combo1-page {
  text-align: center;
  font-size: 0;
  .leftImg {
    position: fixed;
    top: 100px;
    left: -4px;
    z-index: 9;
    width: 100px;
  }
  .A {
    padding-top: 18px;
    .tips-top {
      height: 31px;
      margin-bottom: 10px;
    }
    .pass {
      height: 75px;
      margin-bottom: 6px;
    }
    .next {
      height: 8px;
      display: block;
      margin: 0 auto;
    }
    .amount {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-26px);
      z-index: 1;
      display: inline-block;
      font-size: 18px;
      color: #0089ff;
    }
    .btn-list {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-top: 30px;
      .left {
        margin-right: 15px;
        .btn-ok {
          height: 38px;
        }
      }
      .right {
        position: relative;
        .tips-app {
          height: 33px;
          position: absolute;
          top: -27px;
          z-index: 9;
        }
        .btn-more {
          height: 38px;
        }
      }
    }
    .before-container {
      width: 332px;
      height: 185px;
      margin: 15px auto;
      box-sizing: border-box;
      padding-top: 28px;

      background-image: url("../assets/img/combo1/before-bg.png");
      background-repeat: no-repeat;
      background-size: cover;

      .before-txt {
        height: 100px;
      }
    }
  }
  .B {
    padding-top: 13px;
    .before-txt2 {
      height: 153px;
      padding-bottom: 13px;
    }
  }
  .split {
    width: 100%;
    height: 8px;
    background-color: #f7f2f8;
  }
  .btn-list {
    margin-top: 27px;
    margin-bottom: 18px;
    position: relative;
    .tips {
      height: 33px;
      position: absolute;
      top: -27px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
    .btn {
      height: 43px;
    }
  }
  .footer {
    padding-top: 25px;
    padding-bottom: 133px;
    .icon {
      height: 45px;
    }
    .bottom {
      display: block;
      margin: 34px auto;
      height: 120px;
    }
  }
}
</style>
