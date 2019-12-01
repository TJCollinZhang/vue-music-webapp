<template>
  <div class="no-result">
    <div class="no-result-icon">
      <i class="fa fa-music"></i>
    </div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>


<script>
	export default {
		name: "NoResult",
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variable";
  @import "../../assets/scss/function";

  .no-result {
    text-align: center;
    .no-result-icon {
      color: $color-text-gg;
      font-size: px2rem(50px);
    }
    .no-result-text {
      margin-top: px2rem(30px);
      font-size: $font-size-medium;
      color: $color-text;
    }
  }

</style>