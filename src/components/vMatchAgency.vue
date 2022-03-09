<template>
  <div class="vMatchAgency">
    <div class="main">
      <img
        class="close"
        @click="closeFn"
        src="../assets/img/stay/close.png"
        alt=""
      />
      <span class="money">{{ money }}元</span>
      <img class="passimg" src="../assets/img/combo1/pass.png" alt="" />
      <div class="title-container">
        <div class="img-wrapper">
          <img class="nextimg" src="../assets/img/combo1/next.png" alt="" />
        </div>
        <span class="title-txt">为您匹配以下机构协助您办理审核</span>
      </div>
      <div class="agency-container">
        <template v-if="!showMore">
          <div class="item">
            <img class="img" :src="list[0].apiLogo" alt="" />
            <p class="txt">{{ list[0].apiName }}</p>
            <p class="company">{{list[0].apiCompanyName}}</p>
            <!-- <img class="img" src="../assets/img/combo1/ads.png" alt="" />
            <p class="txt">融360</p> -->
            <span class="btn" @click="showMoreFn"
              >更多
              <img
                class="arrow"
                src="../assets/img/check/arrowTop.jpg"
                alt=""
              />
            </span>
          </div>
        </template>
        <template v-else>
          <div class="item" v-for="(item, index) in list" :key="item.id">
            <img class="img" :src="item.apiLogo" alt="" />
            <p class="txt">{{ item.apiName }}</p>
            <p class="company">{{item.apiCompanyName}}</p>
            <!-- <img class="img" src="../assets/img/combo1/ads.png" alt="" />
            <p class="txt">融360</p> -->
            <span class="btn" v-if="index == 0" @click="hideMoreFn"
              >更多
              <img
                class="arrow"
                src="../assets/img/check/arrowDown.jpg"
                alt=""
              />
            </span>
          </div>
        </template>
      </div>
      <div class="protocol">
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
          >同意并授权推送信息给申请机构<a
            class="link"
            href="https://wap.kakahui666.cn/%E7%94%A8%E6%88%B7%E6%8E%88%E6%9D%83%E4%B9%A6.html"
            >《个人信息授权书》</a
          >
        </span>
      </div>
      <img class="btn" @click="okFn" src="../assets/img/check/btn.png" alt="" />
    </div>
    <div class="bg"></div>
    <vUserInfoAuthorize
      v-if="showUserInfoAuthorize"
      @emitUserInfoAuthorize="eventUserInfoAuthorize"
    ></vUserInfoAuthorize>
  </div>
</template>
<script>
import vUserInfoAuthorize from "@/components/vUserInfoAuthorize.vue";
export default {
  components: {
    vUserInfoAuthorize
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    userId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      money: 0,
      isAgree: false,
      showUserInfoAuthorize: false,
      showMore: false
    };
  },
  async created() {
    console.log("list", this.list);
    let amountFD = new FormData();
    amountFD.append("userId", this.userId);
    let amountRes = await this.$ajax.post(
      "/api/userCreditReport/getUserCreditReport",
      amountFD
    );
    if (amountRes?.data.status === 0) {
      this.money = amountRes.data.data.recommendLoan;
    }
  },
  methods: {
    onAgree() {
      this.isAgree = !this.isAgree;
    },
    closeFn() {
      this.$emit("emitMatchAgency", "close");
    },
    okFn() {
      if (this.isAgree) {
        this.$emit("emitMatchAgency", "ok");
      } else {
        this.showUserInfoAuthorize = true;
      }
    },
    eventUserInfoAuthorize(type) {
      this.showUserInfoAuthorize = false;
      if (type === "ok") {
        this.$emit("emitMatchAgency", "ok");
      }
    },
    showMoreFn() {
      this.showMore = true;
    },
    hideMoreFn() {
      this.showMore = false;
    }
  }
};
</script>
<style lang="less" scoped>
.vMatchAgency {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);

    width: 307px;
    min-height: 340px;
    background: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    .close {
      opacity: 0.8;
      position: absolute;
      top: -56px;
      right: 0px;
      width: 36px;
    }
    .passimg {
      height: 70px;
    }
    .money {
      position: absolute;
      top: 56px;
      left: 50%;
      transform: translateX(-26px);
      z-index: 1;
      font-size: 18px;
      color: #0089ff;
      font-family: PingFang SC;
      font-weight: 500;
    }
    .title-container {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .img-wrapper {
        width: 10px;
        text-align: center;
        .nextimg {
          width: 8px;
          height: 8px;
        }
      }

      .title-txt {
        margin-left: 10px;
        text-indent: 8px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #686868;
      }
    }
    .agency-container {
      width: 280px;
      min-height: 80px;
      background: #f7fbff;
      border-radius: 10px;
      margin: 25px auto 25px auto;

      // display: flex;
      // align-items: center;
      // justify-content: center;
      .item {
       // height: 80px;
       padding: 10px 0;
        min-width: 30%;
        border-bottom: 1px dashed #d8d9da;
        .img {
          //margin-top: 12px;
          width: 40px;
        }
        .txt {
          margin-top: 4px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1f1a20;
        }
        .company{
          transform: scale(0.8);
          margin-top: 4px;
          font-size: 10px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #CDCBCB;
        }
        .btn {
          font-size: 9px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #0089ff;
          position: relative;
          left: 110px;
          top: -13px;
          .arrow {
            width: 8px;
          }
        }
      }
      .item:last-of-type {
        border: none;
      }
    }
    .protocol {
      display: flex;
      align-items: center;
      justify-content: center;
      .agree-contianer {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 3px;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 1px solid #9d9d9d;
          border-radius: 100px;
          box-sizing: border-box;
        }
        .iconimg {
          width: 12px;
          height: 12px;
        }
      }
      .txt {
        margin-top: 3px;
        font-size: 12px;
        .link {
          color: #0089ff;
        }
      }
    }
    .btn {
      margin-top: 28px;
      height: 38px;
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
