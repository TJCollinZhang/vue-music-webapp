<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="hide">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
	export default {
		name: "Confirm",
		props: {
			text: {
				type: String,
				default: ''
			},
			confirmBtnText: {
				type: String,
				default: '确定'
			},
			cancelBtnText: {
				type: String,
				default: '取消'
			}
		},
		data () {
			return {
				showFlag: false
			}
		},
		methods: {
			show () {
				this.showFlag = true
			},
			hide () {
				this.showFlag = false
			},
			cancel () {
				this.hide()
				this.$emit('cancel')
			},
			confirm () {
				this.hide()
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variable";
  @import "../../assets/scss/function";
  .confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.3);
    &.confirm-fade-enter-active {
      animation: confirm-fadein 0.3s;
      .confirm-content {
        animation: confirm-zoom 0.3s;
      }
    }
    .confirm-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .confirm-content {
        width: px2rem(270px);
        border-radius: px2rem(5px);
        background: $color-background;
        .text {
          padding: px2rem(12px) px2rem(15px);
          line-height: px2rem(22px);
          text-align: center;
          font-size: $font-size-medium-x;
          color: $color-text;
        }
        .operate {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: $font-size-medium-x;
          .operate-btn {
            flex: 1;
            line-height: px2rem(22px);
            padding: px2rem(12px) 0;
            border-top: 1px solid $color-background;
            color: $color-theme;
            &.left {
              border-right: 1px solid $color-background;
            }
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
