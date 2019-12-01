<template>
  <ul class="switches">
    <li class="switch-item"
        v-for="(item, index) in switches"
        :key="item.id"
        :class="{'active': currentIndex === index}"
        @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>


<script>
	export default {
		name: "Switches",
		props: {
			switches: {
				type: Array
			},
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			switchItem(index) {
				this.$emit('switch', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variable";
  @import "../../assets/scss/function";

  .switches {
    display: flex;
    align-items: center;
    width: px2rem(240px);
    margin: 0 auto;
    .switch-item {
      flex: 1;
      padding: px2rem(8px);
      margin: 0 px2rem(20px);
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-l;
      border-bottom: px2rem(2px) solid $color-theme;

      &.active {
        border-bottom: px2rem(2px) solid $color-text-l;
        // background: $color-highlight-background;
        color: #fff;
      }
    }
  }
</style>