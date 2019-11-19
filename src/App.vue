<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/components/MHeader';
  import Tab from "./components/Tab";
  export default {
    components: {
      'm-header': MHeader,
      'tab': Tab
    }
  }
</script>

<style lang="scss">
  #app {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

</style>
