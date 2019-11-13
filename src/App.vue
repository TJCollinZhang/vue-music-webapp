<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/components/MHeader'
  export default {
    components: {
      'm-header': MHeader
    }
  }
</script>

<style lang="scss">

</style>
