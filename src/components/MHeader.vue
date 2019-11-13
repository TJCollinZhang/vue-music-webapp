<template>
  <div class="m-header">
    <router-link to="/user" class="mine" tag="div">
      <i class="iconfont icon-menu"></i>
    </router-link>
    <h1 class="text">Collin Music</h1>

    <router-link to="/search" class="search" tag="div">
      <i class="iconfont icon-search"></i>
    </router-link>

  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variable';
  @import "../assets/scss/function";
  @import "../assets/scss/mixin";
  .m-header {
    box-sizing: border-box;
    height: px2rem(44px);
    width: 100%;
    text-align: center;
    background: $color-theme;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .text {
      line-height: px2rem(44px);
      font-weight: bold;
      font-size: px2rem(22px);
      color: $color-text-l;
      letter-spacing: px2rem(3px);
    }
    .mine {
      .iconfont {
        display: block;
        font-size: px2rem(22px);
        color: $color-theme-l;
      }
    }
    .search {
      .iconfont {
        display: block;
        font-size: px2rem(22px);
        color: $color-theme-l;
      }
    }
  }




</style>