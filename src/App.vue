<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    if (process.env.VUE_APP_HAS_JS === "true") {
      document.title = "h5";
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.text = `
  window._agl = window._agl || [];
  (function () {
    _agl.push(
      ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
    );
    (function () {
      var agl = document.createElement('script');
      agl.type = 'text/javascript';
      agl.async = true;
      agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(agl, s);
    })();
  })();
`;
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      document.title = "ekahua";
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
