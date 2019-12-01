<template>
  <div class="loading">
    <img src="../../assets/images/loading.gif" width="24" height="24">
  </div>
</template>

<script>
	export default {
		name: "Loading",
		props: {
			title: {
				type: String,
				default: '正在载入'
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/function";
  .loading {
    width: 100%;
    height: px2rem(40px);
    text-align: center;
    img {
      margin-top: px2rem(10px);
    }
  }
</style>