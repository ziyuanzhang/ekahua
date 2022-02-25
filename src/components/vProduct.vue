<template>
  <div class="vProduct" v-if="list.length > 0">
    <p class="title">
      <span class="txt">根据您的资质,以下机构给出预审额度</span>
      <span class="tips" v-if="showWarn">| 快点击申请！</span>
    </p>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="left">
          <div class="up">
            <img class="img" :src="item.img" alt="" />
            <span class="txt">{{ item.name }}</span>
          </div>
          <div class="middle">
            <span class="txt">最高额度（元）</span>
          </div>
          <div class="down">{{ item.maxAmount }}</div>
        </div>
        <div class="center">
          <div class="up">
            <span class="txt">
              {{ item.feature }}
            </span>
          </div>
          <div class="middle">
            <span class="txt">期限（月）</span>
          </div>
          <div class="down">
            <span class="txt">{{ item.time }}</span>
          </div>
        </div>
        <div class="right">
          <img
            class="get"
            @click="getMoneyFun(item)"
            src="../assets/img/combo1/product-get.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showWarn: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // list: [
      //   {
      //     img: require("../assets/img/combo1/ads.png"),
      //     name: "融360",
      //     maxAmount: "80000",
      //     feature: "大额低息 分期灵活",
      //     time: "1-12",
      //     utl: ""
      //   }
      // ]
    };
  },
  methods: {
    async getMoneyFun(item) {
      let fd = new FormData();
      fd.append("userId", this.userId);
      fd.append("requestForm", "H5");
      fd.append("productId", item.id);
      let res = await this.$ajax.post("/api/product/countSum", fd);
      if (res.data.status === 0) {
        window.location.href = item.url;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.vProduct {
  font-size: 12px;
  .title {
    padding-top: 12px;
    padding-left: 19px;
    text-align: left;
    .txt {
      font-family: PingFang SC;
      font-weight: 500;
      color: #2d2d2d;
    }
    .tips {
      font-family: PingFang SC;
      font-weight: 500;
      color: #fa5616;
    }
  }
  .list {
    padding: 0 20px;
    .item {
      padding: 7px 0;
      border-bottom: 1px solid #eeeeee;

      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .up {
          display: flex;
          align-items: center;
          .img {
            width: 28px;
            max-height: 28px;
            margin-right: 10px;
          }
          .txt {
            text-align: left;
            font-family: PingFang SC;
            font-weight: 500;
            color: #1f1a20;
          }
        }
        .middle {
          text-align: left;
          .txt {
            display: inline-block;
            transform: scale(0.75);
            font-family: PingFang SC;
            font-weight: 500;
            color: #a5a5a5;
            margin-left: -10px;
          }
        }
        .down {
          font-family: PingFang SC;
          font-weight: bold;
          color: #ff300e;
          text-align: left;
        }
      }
      .center {
        .up {
          .txt {
            display: inline-block;
            padding: 4px 6px;
            border: 1px solid #d3d2d3;
            border-radius: 2px;
            box-sizing: border-box;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #7d888f;
            transform: scale(0.67);
          }
        }
        .middle {
          .txt {
            display: inline-block;
            font-family: PingFang SC;
            font-weight: 500;
            color: #a5a5a5;
            transform: scale(0.75);
          }
        }
        .down {
          .txt {
            display: inline-block;
            font-family: PingFang SC;
            font-weight: bold;
            color: #242424;
            transform: scale(0.834);
          }
        }
      }
      .right {
        .get {
          height: 26px;
        }
      }
    }
    .item:last-of-type {
      border: none;
    }
  }
}
</style>
