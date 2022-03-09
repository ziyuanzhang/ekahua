<template>
  <div class="info-page">
    <div class="white">
      <img class="info-img" src="../assets/img/info/top.gif" alt="" />
      <img class="tip1" src="../assets/img/info/tip1.png" alt="" />
    </div>
    <img class="tip2" src="../assets/img/info/tip2.png" alt="" />
    <div class="city-select" v-if="step === 0">
      <p class="title">
        <img class="img" :src="list[step].iconImg" alt="" />
        <span class="txt">{{ list[step].txt }}</span>
      </p>
      <p class="btn" @click="showPicker(0)">请选择</p>
    </div>
    <div class="info-list">
      <div v-for="item in list" :key="item.id">
        <div class="item" v-if="item.id < step">
          <div class="left">
            <span class="num-wrapper">
              <span class="num">{{ item.id + 1 }} </span>
            </span>
            <!-- <span class="txtImg">{{ item.txtImg }}</span
            >: -->
            <img class="txtImg" :src="item.txtImg" alt="" />
            <span class="val">{{ item.val }}</span>
          </div>
          <span class="btn" @click="modifyFun(item)">我要修改</span>
        </div>
        <div class="rate80" v-if="step > 11 && item.id === 11">
          恭喜您已完成了<span class="num">80%</span>的认证步骤
        </div>
      </div>
    </div>
    <div class="select-container" v-if="step > 0 && step < 19">
      <p class="title-contianer">
        <img class="img" :src="list[step].iconImg" alt="" />
        <span class="title">{{ list[step].txt }}</span>
      </p>
      <div class="bottom-list">
        <div
          class="item"
          v-for="(item, index) in list[step].arr"
          :key="index"
          @click="selectFun(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="rate90" v-if="step > 18">
      恭喜您已完成了<span class="num">90%</span>的认证步骤
    </div>
    <div class="form" v-if="step > 18">
      <img class="form-title" src="../assets/img/info/form-title.png" alt="" />
      <div class="item">
        <input
          class="input"
          type="text"
          v-model="name"
          maxlength="8"
          placeholder="请输入您的姓名"
          @input="nameInputFn"
        />
        <img
          v-if="name.length > 0"
          class="clear"
          @click="clearInput('name')"
          src="../assets/img/info/clear-icon.png"
          alt=""
        />
      </div>
      <div class="item">
        <input
          class="input"
          type="number"
          v-model="age"
          placeholder="请输入您的年龄"
        />
        <img
          v-if="age.length > 0"
          class="clear"
          @click="clearInput('age')"
          src="../assets/img/info/clear-icon.png"
          alt=""
        />
      </div>
      <div class="item item-sex">
        <div class="left">请选择性别</div>
        <div class="right">
          <div class="opt" @click="sexFun(1)">
            <span class="radio">
              <img
                class="img"
                v-if="sex == 1"
                src="../assets/img/home/agree.png"
                alt=""
              />
              <i v-else class="circle"></i>
            </span>
            男
          </div>
          <div class="opt" @click="sexFun(0)">
            <span class="radio">
              <img
                class="img"
                v-if="sex == 0"
                src="../assets/img/home/agree.png"
                alt=""
              />
              <i v-else class="circle"></i>
            </span>
            女
          </div>
        </div>
      </div>

      <!-- <div class="item">
        <div class="birthday" @click="birthdayFun">{{ birthday }}</div>
        <img
          v-if="birthday.length > 0"
          class="clear"
          @click="clearInput('birthday')"
          src="../assets/img/info/clear-icon.png"
          alt=""
        />
      </div> -->
      <img
        class="encryptionTips"
        src="../assets/img/info/encryption-tips.png"
        alt=""
      />
      <div class="btn" @click="applyFun">立即申请</div>
    </div>

    <div>
      <VuePicker
        :layer="pickLayer"
        :data="pickData"
        :showToolbar="true"
        @cancel="cancelPicker"
        @confirm="confirmPicker"
        :visible.sync="pickerVisible"
      />
    </div>
    <vStay v-if="showConfirm" @emitStay="eventStay"></vStay>

    <vIosPickers
      name="dddd"
      date="date"
      :maxDate="2022"
      :cols="3"
      :show="showDatePicker"
      :on-confirm="okDateFun"
      :on-cancel="cancelDateFun"
    ></vIosPickers>

    <vLicenseAgree
      v-if="showLicenseAgree"
      @emitLicenseAgree="eventLicenseAgree"
    ></vLicenseAgree>
  </div>
</template>
<script>
import VuePicker from "vue-pickers";
import pcCode from "../assets/pc-code.json";
import vStay from "@/components/vStay";
import vLicenseAgree from "@/components/vLicenseAgree";
import vIosPickers from "@/components/vIosPickers";

export default {
  components: {
    VuePicker,
    vStay,
    vLicenseAgree,
    vIosPickers,
  },
  data() {
    return {
      step: 0,
      list: [
        {
          id: 0,
          txt: "所在城市",
          val: "",
          txtImg: require("../assets/img/info/txt1.png"),
          iconImg: require("../assets/img/info/1.png"),
          arr: [],
        },
        {
          id: 1,
          txt: "申请额度",
          val: "",
          txtImg: require("../assets/img/info/txt2.png"),
          iconImg: require("../assets/img/info/2.png"),
          arr: ["3万-5万", "5万-10万", "10万-20万", "20万以上"],
        },
        {
          id: 2,
          txt: "贷款目的",
          val: "",
          txtImg: require("../assets/img/info/txt3.png"),
          iconImg: require("../assets/img/info/3.png"),
          arr: [
            "购房贷款",
            "装修贷款",
            "购车贷款",
            "教育培训贷款",
            "旅游贷款",
            "医疗贷款",
            "消费贷款",
            "其它贷款",
          ],
        },
        {
          id: 3,
          txt: "贷款时间",
          val: "",
          txtImg: require("../assets/img/info/txt4.png"),
          iconImg: require("../assets/img/info/4.png"),
          arr: ["大于24个月", "12-24个月", "6-12个月 ", "3-6个月 ", "1-3个月"],
        },
        {
          id: 4,
          txt: "学历",
          val: "",
          txtImg: require("../assets/img/info/txt5.png"),
          iconImg: require("../assets/img/info/5.png"),
          arr: ["高中及以下", "大专", "本科", "研究生", "博士及以上"],
        },
        {
          id: 5,
          txt: "职业身份",
          val: "",
          txtImg: require("../assets/img/info/txt6.png"),
          iconImg: require("../assets/img/info/6.png"),
          arr: ["上班族", "企业主", "个体户", "公务员", "自由职业", "其他"],
        },
        {
          id: 6,
          txt: "工作时间",
          val: "",
          txtImg: require("../assets/img/info/txt7.png"),
          iconImg: require("../assets/img/info/7.png"),
          arr: ["十二个月以上", "六到十二个月", "六个月以下"],
        },
        {
          id: 7,
          txt: "工资发放",
          val: "",
          txtImg: require("../assets/img/info/txt8.png"),
          iconImg: require("../assets/img/info/8.png"),
          arr: ["现金发放", "转账工资", "银行代发", "部分打卡", "部分现金"],
        },
        {
          id: 8,
          txt: "信用情况",
          val: "",
          txtImg: require("../assets/img/info/txt9.png"),
          iconImg: require("../assets/img/info/9.png"),
          arr: [
            "信用良好",
            "无逾期",
            "一年内逾期超过3次且小于90天",
            "一年内逾期超过3次且超过90天",
          ],
        },
        {
          id: 9,
          txt: "信用卡额度",
          val: "",
          txtImg: require("../assets/img/info/txt10.png"),
          iconImg: require("../assets/img/info/10.png"),
          arr: ["3万以上", "1万到3万", "3千到1万", "3000以下", "无信用卡"],
        },
        {
          id: 10,
          txt: "社保缴纳",
          val: "",
          txtImg: require("../assets/img/info/txt11.png"),
          iconImg: require("../assets/img/info/11.png"),
          arr: ["无社保", "未满6个月", "6个月以上", "12个月以上"],
        },
        {
          id: 11,
          txt: "社保是否断缴",
          val: "",
          txtImg: require("../assets/img/info/txt12.png"),
          iconImg: require("../assets/img/info/12.png"),
          arr: ["没有断缴", "缴纳中", "当前已断缴纳"],
        },
        {
          id: 12,
          txt: "公积金缴纳",
          val: "",
          txtImg: require("../assets/img/info/txt13.png"),
          iconImg: require("../assets/img/info/13.png"),
          arr: ["无公积金", "未满6个月", "6个月以上", "12个月以上"],
        },
        {
          id: 13,
          txt: "公积金是否断缴",
          val: "",
          txtImg: require("../assets/img/info/txt14.png"),
          iconImg: require("../assets/img/info/14.png"),
          arr: ["没有断缴", "缴纳中", "当前已断缴纳"],
        },
        {
          id: 14,
          txt: "房产情况",
          val: "",
          txtImg: require("../assets/img/info/txt15.png"),
          iconImg: require("../assets/img/info/15.png"),
          arr: ["无房产", "有房不抵押", "有房可抵押"],
        },
        {
          id: 15,
          txt: "车产情况",
          val: "",
          txtImg: require("../assets/img/info/txt16.png"),
          iconImg: require("../assets/img/info/16.png"),
          arr: ["无车产", "有车不抵押", "有车可抵押"],
        },
        {
          id: 16,
          txt: "保险保单",
          val: "",
          txtImg: require("../assets/img/info/txt17.png"),
          iconImg: require("../assets/img/info/17.png"),
          arr: ["无保险保单", "缴纳未满1年", "缴纳1年以上"],
        },
        {
          id: 17,
          txt: "芝麻分",
          val: "",
          txtImg: require("../assets/img/info/txt18.png"),
          iconImg: require("../assets/img/info/18.png"),
          arr: ["无芝麻分", "600分以下", "600-650分", "650-700分", "700分以上"],
        },
        {
          id: 18,
          txt: "月收入情况",
          val: "",
          txtImg: require("../assets/img/info/txt19.png"),
          iconImg: require("../assets/img/info/19.png"),
          arr: ["5千元以下", "5千-1万", "1万-1.5万", "1.5万-2万", "2万以上"],
        },
      ],
      modifyId: 0,
      pickLayer: 2,
      pickerVisible: false,
      pickData: [],
      name: "",
      age: "",
      birthday: "请输入您的出生日期",
      showConfirm: false,
      isLeave: false,
      showDatePicker: false,
      showLicenseAgree: false,
      sex: -1,
    };
  },
  created() {
    this.getLocation();
  },
  mounted() {
    if (process.env.VUE_APP_HAS_JS === "true") {
      window._agl && window._agl.push(["track", ["success", { t: 3 }]]);
    }
    // this.showDatePicker = true;
  },
  methods: {
    getLocation() {
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });
        geolocation.getCityInfo((status, result) => {
          // console.log("getCityInfo:", status, result);
          if (status === "complete") {
            this.step = 1;
            this.list[0].val = result.city;
          }
        });
      });
    },
    selectFun(item) {
      console.log("selectFun:", item);
      this.list[this.step].val = item;
      if (this.step < 19) {
        this.step++;
      }
      this.$nextTick(() => {
        this.scrollBottom();
      });
    },
    modifyFun(item) {
      this.modifyId = item.id;
      if (item.id == 0) {
        this.pickLayer = 2;
        this.pickData = pcCode;
      } else {
        console.log("modifyFun:", this.list[item.id]);
        let arr = this.list[item.id].arr.map((opt) => {
          return {
            label: opt,
            value: opt,
          };
        });
        this.pickLayer = 1;
        this.pickData = [arr];
      }
      this.pickerVisible = true;
    },
    sexFun(type) {
      this.sex = Number(type);
    },
    showPicker(type) {
      console.log("showPicker:", type);
      this.modifyId = type;
      if (type == 0) {
        this.pickLayer = 2;
        this.pickData = pcCode;
      }
      this.pickerVisible = true;
    },
    cancelPicker() {
      console.log("cancel");
    },
    confirmPicker(res) {
      console.log("confirm:", res);
      if (this.modifyId === 0) {
        if (this.step == 0) {
          this.step = 1;
        }
        this.list[this.modifyId].val = res[1].label;
      } else {
        this.list[this.modifyId].val = res[0].label;
      }
      // this.result = JSON.stringify(res);
      // console.log(res);
    },
    //----------------------
    eventStay(obj) {
      if (obj.type == "close") {
        this.showConfirm = false;
      } else if (obj.type == "come") {
        this.showConfirm = false;
      } else if (obj.type == "back") {
        this.isLeave = true;
        this.showConfirm = false;
      }
    },
    //--------------------
    nameInputFn() {
      this.name = this.name.replace(/[^\u4E00-\u9FA5]/g, "");
    },
    clearInput(type) {
      if (type === "name") {
        this.name = "";
      } else if (type === "age") {
        this.age = "";
      } else if (type === "birthday") {
        this.birthday = "请输入您的出生日期";
      }
    },
    birthdayFun() {
      this.showDatePicker = true;
    },
    okDateFun(date) {
      console.log("okssFun:", date);
      this.showDatePicker = false;
      this.birthday = date.strIds;
    },
    cancelDateFun() {
      this.showDatePicker = false;
    },
    //------------
    applyFun() {
      if (!this.$route.query.userId) {
        this.$toast("userId未找到");
        return;
      }
      if (!this.name.trim()) {
        this.$toast("姓名必填");
        return;
      }
      if (!this.age.trim()) {
        this.$toast("年龄必填");
        return;
      }
      // if (this.birthday == "请输入您的出生日期") {
      //   this.$toast("出生日期必填");
      //   return;
      // }
      if (this.sex < 0) {
        this.$toast("请选择性别");
        return;
      }
      this.showLicenseAgree = true;
    },
    eventLicenseAgree(type) {
      this.showLicenseAgree = false;
      console.log(type);
      this.sumbit(type);
    },
    scrollBottom() {
      window.scrollTo(0, document.documentElement.clientHeight);
    },
    async sumbit(type) {
      let fd = new FormData();
      fd.append("userId", this.$route.query.userId);
      fd.append("city", this.list[0].val);
      fd.append("loanQuota", this.list[1].val);
      fd.append("loanPurpose", this.list[2].val);
      fd.append("loanTime", this.list[3].val);
      fd.append("education", this.list[4].val);
      fd.append("occupation", this.list[5].val);
      fd.append("workTime", this.list[6].val);
      fd.append("paymentSalary", this.list[7].val);
      fd.append("creditSituation", this.list[8].val);
      fd.append("creditCardLimit", this.list[9].val);
      fd.append("socialSecurity", this.list[10].val);
      fd.append("socialSecurityStatus", this.list[11].val);
      fd.append("accumulationFund", this.list[12].val);
      fd.append("accumulationFundStatus", this.list[13].val);
      fd.append("house", this.list[14].val);
      fd.append("car", this.list[15].val);
      fd.append("insurancePolicy", this.list[16].val);
      fd.append("zmScore", this.list[17].val);
      fd.append("monthlyIncome", this.list[18].val);
      fd.append("realName", this.name);
      fd.append("age", this.age);
      fd.append("sex", this.sex);
      // fd.append("birthday", this.birthday);
      if (type === "ok") {
        fd.append("push", 1);
      } else {
        fd.append("push", 0);
      }
      let res = await this.$ajax.post("/api/user/completeUserInfo", fd);
      //  console.log("submitFun-res:", res);
      if (res.data.status === 0) {
        if (type === "ok") {
          window._agl && window._agl.push(["track", ["success", { t: 3 }]]);
          this.$router.push({
            path: "/check",
            query: {
              userId: this.$route.query.userId,
              goWhichPage: this.$route.query.goWhichPage,
              showDownloadBtn: this.$route.query.showDownloadBtn,
            },
          });
        }
      } else {
        if (type === "ok") {
          this.$toast(res.data.msg);
        }
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "Home") {
      if (this.isLeave) {
        next();
      } else {
        this.showConfirm = true;
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>
<style lang="less" scoped>
.info-page {
  background-color: #fbfbfb;
  padding-bottom: 50px;
  padding-top: 150px;
  .white {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    .info-img {
      width: 100%;
      margin-bottom: 10px;
    }
    .tip1 {
      height: 40px;
    }
  }
  .tip2 {
    height: 30px;
  }

  // .warn {
  //   height: 30px;
  //   line-height: 30px;
  //   background-color: #fff7e4;
  //   font-size: 12px;
  //   font-family: PingFang SC;
  //   font-weight: 500;
  //   color: #f77c03;
  // }
  .city-select {
    background-color: #fff;
    padding-top: 50px;
    .title {
      margin-bottom: 15px;
      .img {
        width: 15px;
        margin-right: 7px;
      }
      .txt {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2b9dff;
      }
    }
    .btn {
      margin: 0 auto;
      width: 330px;
      height: 27px;
      line-height: 27px;
      background: #2b9dff;
      border: 1px solid #d3d2d3;
      border-radius: 6px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .info-list {
    background-color: #fff;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 24px;
      margin-bottom: 4px;
      .left {
        .num-wrapper {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: linear-gradient(0deg, #2c8cfe, #54adff);
          border-radius: 50%;
          text-align: center;
          margin-right: 9px;
          .num {
            display: inline-block;
            font-weight: 200;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            transform: scale(0.7);
          }
        }
        .txtImg {
          height: 12px;
          margin-right: 5px;
        }
        .val {
        }
      }
      .btn {
        width: 60px;
        height: 24px;
        background: #ffae00;
        border-radius: 24px;
        text-align: center;
        line-height: 22px;

        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .select-container {
    margin-top: 24px;
    .title-contianer {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        width: 15px;
        margin-right: 7px;
      }
      .title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #0089ff;
      }
    }
    .bottom-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 0 24px;
      .item {
        min-width: 30%;
        padding: 8px 15px;
        border: 1px solid #00aeff;
        border-radius: 3px;
        box-sizing: border-box;
        margin-bottom: 10px;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #00aeff;
      }
    }
  }
  .rate80 {
    margin-top: 3px;
    margin-bottom: 6px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f77c03;

    height: 30px;
    line-height: 30px;
    background: #fff7e4;
    .num {
      font-size: 15px;
      color: #ef4d16;
      font-weight: bold;
    }
  }
  .rate90 {
    text-align: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3050bb;
    .num {
      color: #f1683c;
      font-size: 15px;
      font-weight: bold;
    }
  }
  .form {
    padding: 18px 22px 100px 22px;
    .form-title {
      width: 133px;
      display: inline-block;
      margin: 0 auto 20px auto;
    }
    .item {
      width: 100%;
      height: 43px;
      border-radius: 5px;
      margin-bottom: 13px;
      position: relative;
      .birthday,
      .input {
        width: 100%;
        height: 100%;
        background-color: #e0ecfa;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        border: none;
        outline: none;
      }
      /* WebKit browsers */
      ::-webkit-input-placeholder {
        color: #3d3d3d;
      }

      .birthday {
        color: #3d3d3d;
        text-align: left;
        line-height: 43px;
      }
      .clear {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
      }
    }
    .item-sex {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #7f7f7f;
      .left {
        margin: 0 40px 0 45px;
      }
      .right {
        display: flex;
        align-items: center;
        .opt {
          display: flex;
          align-items: center;
          margin-right: 60px;
          .radio {
            margin-right: 5px;
            display: inline-block;
            width: 16px;
            height: 16px;
            .img {
              width: 16px;
            }
            .circle {
              display: inline-block;
              width: 16px;
              height: 16px;
              border: 2px solid #bfbfbf;
              border-radius: 100px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
    .encryptionTips {
      margin-top: 20px;
      height: 15px;
    }
    .btn {
      margin-top: 10px;
      width: 100%;
      height: 43px;
      background: linear-gradient(90deg, #2c8cfe, #54adff);
      border-radius: 5px;

      line-height: 43px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: 1px;
    }
  }
}
</style>
