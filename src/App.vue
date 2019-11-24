<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import Player from "./views/Player";
  import MHeader from '@/components/MHeader';
  import Tab from "./components/Tab";
  export default {
    components: {
      'm-header': MHeader,
      'tab': Tab,
      'player':Player
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
