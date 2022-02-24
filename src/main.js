import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utls from "./utils/utils";
import Toast from "./components/global/toastJS";
Vue.prototype.$toast = Toast;
Vue.prototype.$utls = utls;
import Axios from "axios";
//Axios.defaults.baseURL = "http://pf3jaa.natappfree.cc/loan";
Axios.defaults.baseURL = "https://wap.kakahui666.cn:7985/loan";
Vue.prototype.$ajax = Axios;
Vue.prototype.$majia = "ekahua";
Vue.prototype.$clientType = utls.isAndroid() ? 1 : 2;

Vue.prototype.$channelNo = utls.GetUrlParam("channelNo");

Vue.config.productionTip = false;
console.log(
  "ddddd:",
  process.env.VUE_APP_HAS_JS,
  typeof process.env.VUE_APP_HAS_JS
);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
