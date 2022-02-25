<template>
  <div class="combo2-page">
    <img
      class="leftImg"
      @click="downloadFun"
      src="../assets/img/combo1/left-more.png"
      alt=""
    />
    <img class="tips-top" src="../assets/img/combo1/tips-top.png" alt="" />
    <img class="pass" src="../assets/img/combo1/pass.png" alt="" />
    <span class="amount">{{ amount }}元</span>
    <div class="before-container">
      <img
        class="before-txt"
        src="../assets/img/combo1/before-txt.png"
        alt=""
      />
    </div>
    <div class="split"></div>
    <vProduct
      :list="list"
      :showWarn="true"
      :userId="$route.query.userId"
    ></vProduct>
    <div class="btn-list">
      <img class="tips" src="../assets/img/combo1/tips-app.png" />
      <img
        class="btn"
        @click="downloadFun"
        src="../assets/img/combo1/product-btn.png"
      />
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
.combo2-page {
  padding-top: 18px;
  .leftImg {
    position: fixed;
    top: 100px;
    left: -4px;
    z-index: 9;
    width: 100px;
  }
  .tips-top {
    height: 31px;
    margin-bottom: 10px;
  }
  .pass {
    height: 75px;
    margin-bottom: 6px;
  }
  .amount {
    position: absolute;
    top: 104px;
    left: 50%;
    transform: translateX(-26px);
    z-index: 1;
    display: inline-block;
    font-size: 18px;
    color: #0089ff;
  }
  .before-txt {
    height: 100px;
    padding-bottom: 13px;
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
  .split {
    width: 100%;
    height: 8px;
    background-color: #f7f2f8;
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
