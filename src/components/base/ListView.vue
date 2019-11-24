<template>
  <scroll
    class="list-view"
    ref="listView"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutStart"
         @touchmove.stop.prevent="onShortcutMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            class="item"
            :data-index="index"
            :key="item.id"
            :class="{'current': currentIndex === index}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>


<script>
	import Scroll from "./Scroll";
	import {getData} from "../../common/js/dom";

	const ANCHOR_HEIGHT = 20

	export default {
		name: "ListView",
		props: {
			data: {
				type: Array
			}
		},
		data() {
			return {
				scrollY: -1,
				currentIndex: 0,
        probeType: 0,
				listenScroll: true,

				// diff: -1
			}
		},
		created() {
			this.touch = {}
			this.listenScroll = true
			this.listHeight = []
			this.probeType = 3
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			},
			refresh() {
				this.$refs.listView.refresh()
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			onShortcutStart(e) {
				let anchorIndex = getData(e.target, 'index')
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex)
			},
			onShortcutMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
        // | 0 保留整数
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				this._scrollTo(anchorIndex)
			},
			_scrollTo(index) {
				if (!index && index !== 0) {
					return
				}
				if (index < 0) {
					index = 0
				} else if (index > this.listHeight.length - 2) {
					index = this.listHeight.length - 2
				}
				this.scrollY = -this.listHeight[index]
				this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
			},
			_calculateHeight() {
				this.listHeight = []
				const list = this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
        // 第一个元素和顶线的距离为0，第二个元素和顶弦的距离为第一个元素的高度，类推,
        // listHeight的元素比实际的元素多一个，因此listHeiget中最后一个元素listHeight.length -1
        // 对应的左边滚动元素的索引是 (listHeight.length - 1) -1
        // （-1的原因是索引从0开始，比如第24个元素索引应该是23）
				for (let i = 0; i < list.length; i++) {
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this._calculateHeight()
				}, 20)
			},
			scrollY(newY) {
				// console.log(newY)
				const listHeight = this.listHeight
        // y值一直为负值， newY > 0 说明滑倒顶部了
				if (newY > 0) {
					this.currentIndex = 0
					return
				}
				// 划到中间部分
				for (let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if (-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						return
					}
				}
				// 不在中间部分只能在底部
				this.currentIndex = listHeight.length - 2
			}
		},
		computed: {
			shortcutList() {
				return this.data.map((group) => {
					return group.title.substr(0, 1)
				})
			},
			fixedTitle() {
				if (this.scrollY > 0) {
					return ''
				}
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
			}
		},
		components: {
			Scroll
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variable";

  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
      // padding: 10px 0;
      .list-group-title {
        height: 20px;
        line-height: 20px;
        padding-left: 12px;
        margin-bottom: 10px;
        font-size: $font-size-small;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
      }

      .list-group-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid rgb(228, 228, 228);

        &:last-child {
          border: none;
          margin-bottom: 10px;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 3px;
        }

        .name {
          margin-left: 20px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }
    }

    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 200px 0;
      border-radius: 3px;
      text-align: center;
      font-family: Helvetica;

      .item {
        padding: 5px 5px;
        line-height: 1;
        color: $color-text-g;
        font-size: $font-size-small;
        font-weight: bold;

        &.current {
          color: $color-theme;
        }
      }
    }

    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .fixed-title {
        height: 20px;
        line-height: 20px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

</style>