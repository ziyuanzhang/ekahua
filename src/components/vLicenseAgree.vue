<template>
  <div class="vLicenseAgree">
    <div class="main">
      <p class="title">注册用户个人信息授权书&知情告知书概要</p>
      <div class="wrapp">
        <div class="subtitle">特别提示：</div>
        <div class="item">
          为了保障您的合法权益，请您务必审慎阅读并充分理解本授权书的全部内容，特别是以加粗形式提示您注意的条款。您在展示给您的页面上点击/勾选
          “确认”、“同意”或类似表明签约意愿文字的按钮，即表示您确认接受并签署本授权书，同意受到本授权书所有条款的约束。如您不接受本授权书部分或全部内容，请您立即停止使用本服务。
        </div>
        <div class="item">您对本平台授权如下：</div>
        <div class="item bold">
          为了向您提供本服务，您明确授权本平台向本平台的合作机构（包括但不限于深圳市研灏科技有限公司，以下简称“合作机构”）提供您的姓名
          、年龄、⼿机号、信⽤情况、⼯作年限、收⼊情况、房产信息、⻋产信息、社保及公积⾦、商业保险情况等您的个⼈信息。同时您同意并授权该合作机构接收您的上述个⼈信息并可将该信息提供给其为您提供贷款服务的合作⽅。您同意并授权该合作机构
          及其合作⽅可将您的个⼈信息进⾏留存、整理、加⼯，⽤于为您提供贷款推荐或贷款服务。您同意该合作机构及其合作⽅或其员⼯可通过电话
          ⼿机短信等⽅式与您取得联系，向您告知或发送服务相关信息及其他商业电⼦信息，
          并为保证服务质量对上述电话进⾏录⾳。您在此授权并⾃愿成为该合作机构的注册⽤户，并接受该合作机构平台上展示的注册协议及隐私政策的约束，
          并可通过直接登录该合作机构平台接受其提供的服务 。
        </div>
        <div class="subtitle">尊敬的客户：</div>
        <div class="item">
          1.
          <span class="bold">
            E卡花平台作为移动金融智选平台，本身不从事放贷业务，其向您展示的贷款产品系由第三方机构/代理或信贷经理提供，您在选择贷款产品前应仔细阅读贷款产品相关信息，若您在实际办理贷款过程中发现贷款产品信息与您在E卡花平台选择的产品信息不符，您可通过E卡花平台在线客服进行核实。</span
          >
        </div>
        <div class="item">
          2.您在E卡花平台上选择第三方贷款产品进行申请需跳转第三方页面网址平台，跳转后后续服务均由外部机构提供，请您在后续的流程中独立作出判断并承担相应风险；您在跳转三方平台之后的申请过程中，若您未通过E卡花在线客服与E卡花平台进行核实或在E卡花平台明确告知您有风险的情况下仍然继续贷款或向他人支付费用的，由此给您造成的损失由您自行解决，E卡花不承担任何责任。
        </div>
        <div class="item">
          3.因您通过E卡花平台向第三方机构申请贷款，基于业务需要，您授权E卡花平台将您提供的申请信息
          <span class="bold"
            >（包括但不限于姓名手机号、年龄、社保信息、收入信息、信用信息、房产信息等，以下简称“个人信息”）</span
          >提供给为您提供贷款办理服务的信贷经理或第三方机构。
        </div>
        <div class="item">
          4.为更好的为您提供服务，您同意E卡花平台对您提供的个人信息、您申请服务时的相关信息享有留存、整理、加工、使用的权利，且您明确授权E卡花平台可将获取的个人信息用于为您提供的其他服务中。
        </div>
        <div class="item">
          5.E卡花平台坚决抵制信贷经理或第三方机构飞单（未经您许可，将您的个人信息提供给其他贷款服务方）、或以您的名义私自为您申请贷款产品等行为，为避免您的个人信息非法泄露给您造成损失，在信贷经理或第三方机构与您联系后，您可在E卡花平台联系在线客服，核实信贷经理或第三方机构各项信息。
        </div>
        <div class="item">
          6.
          <span class="bold"
            >若信贷经理或第三方机构向您收取费用，请您谨慎付款，并通过E卡花平台在线客服核实情况，避免您的财产遭受损失。</span
          >
        </div>
        <div class="item">
          7．若出现以下一种或多种情形，您E卡花平台在线客服与E卡花平台进行核实或在E卡花平台明确告知您有风险的情况下仍然继续贷款或向他人支付费用的，由此给您造成的损失由您自行解决，E卡花不承担任何责任。
        </div>
        <div class="item">
          （1）
          您在实际办理贷款过程中，发现贷款产品信息与您在E卡花平台选择的不一致 ；
        </div>
        <div class="item">
          （2）您在实际办理贷款过程中或贷款办理成功后，信贷经理或第三方机构向您收取费用的；
        </div>
        <div class="item">
          （3）其他在您办理贷款业务过程中有损您合法权益事项。
        </div>
        <div class="item">
          8.<span class="bold">E卡花平台在线客服（9:30—18:00）</span>
        </div>
      </div>
      <div class="btn-list">
        <div class="btn ok-btn" @click="okFun">我已阅读并同意</div>
        <div class="btn cancel-btn" @click="cancelFun">再想想</div>
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
    okFun() {
      this.$emit("emitLicenseAgree", "ok");
    },
    cancelFun() {
      this.$emit("emitLicenseAgree", "cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.vLicenseAgree {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 40%;
    background-color: #fff;
    border-radius: 10px;

    padding: 20px;

    .title {
      margin-bottom: 20px;
      // color: #aeaeae;
      font-weight: bold;
    }
    .wrapp {
      height: 56%;
      overflow-y: scroll;
      .subtitle {
        text-align: left;
        margin-bottom: 10px;
      }
      .item {
        text-align: left;
        line-height: 1.2;
        margin-bottom: 10px;
      }
      .bold {
        font-weight: bold;
      }
    }
    .btn-list {
      .btn {
        margin-top: 10px;
        width: 100%;
        height: 30px;

        line-height: 28px;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;

        letter-spacing: 1px;
      }
      .ok-btn {
        background: linear-gradient(90deg, #2c8cfe, #54adff);
        border-radius: 5px;
        color: #ffffff;
      }
      .cancel-btn {
        font-size: 12px;
        color: #aeaeae;
      }
    }
  }
  .bg {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
  }
}
</style>
