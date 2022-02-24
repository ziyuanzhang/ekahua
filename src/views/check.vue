<template>
  <div class="check">
    <img class="top" src="../assets/img/check/check.gif" alt="" />
    <p class="await-txt">您的申请正在审核中，请耐心等待...</p>
    <p class="match-txt">正在为您匹配放款机构</p>
    <div class="list">
      <div class="item">
        <img class="itemImg id1" src="../assets/img/check/id1.png" alt="" />
        <img
          class="itemImg img2 id2"
          :class="{ active: activeID }"
          src="../assets/img/check/id2.png"
          alt=""
        />
      </div>
      <div class="item">
        <img class="itemImg base1" src="../assets/img/check/base1.png" alt="" />
        <img
          class="itemImg img2 base2"
          :class="{ active: activeBase }"
          src="../assets/img/check/base2.png"
          alt=""
        />
      </div>
      <div class="item">
        <img class="itemImg add1" src="../assets/img/check/add1.png" alt="" />
        <img
          class="itemImg img2 add2"
          :class="{ active: activeAdd }"
          src="../assets/img/check/add2.png"
          alt=""
        />
      </div>
    </div>
    <vMatchAgency
      v-if="showAgency"
      :list="list"
      :userId="$route.query.userId"
      @emitMatchAgency="eventMatchAgency"
    ></vMatchAgency>
  </div>
</template>
<script>
import vMatchAgency from "@/components/vMatchAgency";
export default {
  components: {
    vMatchAgency
  },
  data() {
    return {
      activeID: false,
      activeBase: false,
      activeAdd: false,
      whoFirstFinish: "",
      list: [],
      showAgency: false
    };
  },
  async mounted() {
    let time = 1000;
    let st1 = setTimeout(() => {
      this.activeID = true;
      clearTimeout(st1);
      st1 = null;
    }, time);
    let st2 = setTimeout(() => {
      this.activeBase = true;
      clearTimeout(st2);
      st2 = null;
    }, time + 1000);
    let st3 = setTimeout(() => {
      this.activeAdd = true;
      clearTimeout(st3);
      st3 = null;
    }, time + 2000);
    //--------------------------
    let stJump = setTimeout(() => {
      if (this.whoFirstFinish) {
        if (this.list.length > 0) {
          this.showAgency = true;
        } else {
          this.$router.push({
            path: this.$route.query.goWhichPage,
            query: {
              userId: this.$route.query.userId
            }
          });
        }
      } else {
        this.whoFirstFinish = "st";
      }
      clearTimeout(stJump);
      stJump = null;
    }, time + 3000);
    //------------------------
    // let fd = new  FormData();
    //  fd.append("userId", this.$route.query.userId);
    let data = {
      userId: this.$route.query.userId
    };
    let res = await this.$ajax.get("/api/common/getMatchProduct", {
      params: data
    });
    if (res?.data.status === 0) {
      this.list = res.data.data;
      if (this.whoFirstFinish) {
        if (this.list.length > 0) {
          this.showAgency = true;
        } else {
          this.$router.push({
            path: this.$route.query.goWhichPage,
            query: {
              userId: this.$route.query.userId
            }
          });
        }
      } else {
        this.whoFirstFinish = "ajax";
      }
    } else {
      this.$toast(res.data.msg);
    }
  },
  methods: {
    async eventMatchAgency(type) {
      this.showAgency = false;

      let data = {
        userId: this.$route.query.userId,
        push: type === "ok" ? "1" : "0"
      };
      await this.$ajax.get("/api/common/userSubmit", { params: data });
      this.$router.push({
        path: this.$route.query.goWhichPage,
        query: {
          userId: this.$route.query.userId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  text-align: center;
  font-size: 0px;
  padding-top: 42px;
  .top {
    width: 180px;
    height: 180px;
    // border: 1px solid #000;
    margin-bottom: 60px;
  }
  .await-txt {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #3c384a;
    margin-bottom: 7px;
  }
  .match-txt {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #9e9ea0;
  }
  .list {
    margin-top: 46px;
    .item {
      width: 210px;
      height: 37px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      position: relative;
      .itemImg {
        width: 100%;
        height: 100%;
      }
      .img2 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0;
        transition: opacity 1s;
      }
      .img2.active {
        opacity: 1;
      }
    }
  }
}
</style>
