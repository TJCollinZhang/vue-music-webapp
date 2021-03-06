<template>
  <transition name="search">
    <div class="search" ref="searchWrapper">
      <div class="search-box-wrapper">
        <i class="iconfont icon-left" @click="back"></i>
        <search-box @query="onQueryChange" ref="searchBox"></search-box>
      </div>
      <scroll class="search-scroll-wrapper" ref="scroll" :pullup="pullup" @scrollToEnd="searchMore">
        <div ref="search">
          <div class="search-hots" v-show="!query">
            <p class="title">热门搜索</p>
            <span class="search-hots-item" v-for="item in hots" :key="item.id"
                  @click="addQuery(item.first)">
                          {{item.first}}
                        </span>
          </div>
          <div class="shortcut-wrapper" v-show="!query">
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                                  <i class="icon-clear"></i>
                                </span>
              </h1>
              <search-list @select=addQuery @delete="deleteSearchHistory"
                           :searches="searchHistory"></search-list>
            </div>
          </div>
          <div class="search-result">
            <suggest @select="saveSearch" @refresh="refresh" :query="query" ref="suggest"></suggest>
          </div>
        </div>
      </scroll>
      <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空历史记录？" confirmBtnText="清空"></confirm>
      <router-view></router-view>
    </div>
  </transition>
</template>


<script type="text/ecmascript-6">
	import Scroll from "../components/base/Scroll";
	import SearchBox from "../components/base/SearchBox";
	import Suggest from "../components/Suggest";
	import Confirm from "../components/base/Confirm";
	import SearchList from "../components/base/SearchList";
	import {searchMixin, playlistMixin} from "../common/js/mixin";
	import {getSearchHot} from "../common/api/search";


	export default {
		name: "Search",
		mixins: [searchMixin, playlistMixin],
		data() {
			return {
				pullup: true,
				hots: []
			}
		},
		created() {
			this._getSearchHot()
		},
		methods: {
			back() {
				this.$router.back()
				this.$refs.searchBox.clear()
			},
			showConfirm() {
				this.$refs.confirm.show()
			},
			_getSearchHot() {
				getSearchHot().then((res) => {
					this.hots = res.data.result.hots
					// console.log(this.hots)
				})
			},
			onQueryChange(query) {
				this.query = query
			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query)
			},
			saveSearch() {
				this.saveSearchHistory(this.query)
			},
			searchMore() {
				this.$refs.suggest.searchMore()
			},
			refresh() {
				setTimeout(() => {
					this.$refs.scroll.refresh()
				}, 20)
			},
			handlePlaylist(playlist) {
				const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
				const bottom = playlist.length > 0 ? 600/htmlWidth + 'rem' : ''
				this.$refs.searchWrapper.style.bottom = bottom
				this.refresh()
			}
		},
		components: {
			Scroll,
			SearchBox,
			Suggest,
			SearchList,
			Confirm
		}


	}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variable";
  @import "../assets/scss/mixin";

  .search-enter-active, .search-leave-active {
    transition: all 0.3s;
  }

  .search-enter, .search-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
  }

  .search {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: $color-background;

    .search-box-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: px2rem(44px);
      background: $color-theme;



      .iconfont {
        position: absolute;
        left: px2rem(8px);
        font-size: $font-size-medium-x;
        color: #fff;
      }
      .search-box {
        width: 75%;
      }
    }

    .search-scroll-wrapper {
      height: 100%;
      overflow: hidden;

      .search-hots {
        margin: 0 px2rem(20px);

        .title {
          padding: px2rem(15px) px2rem(5px) 0 px2rem(5px);
          height: px2rem(30px);
          line-height: px2rem(30px);
          font-size: $font-size-small-x;
          color: $color-text-g;
        }

        span {
          display: inline-block;
          padding: px2rem(3px) px2rem(5px);
          margin: px2rem(4px) px2rem(4px);
          border: px2rem(0.8px) solid $color-text-ggg;
          border-radius: px2rem(5px);
          line-height: px2rem(20px);
          color: $color-text;
          font-size: $font-size-medium;
        }
      }

      .shortcut-wrapper {
        position: relative;
        margin: 0 auto;

        .shortcut {
          height: 100%;
          overflow: hidden;

          .hot-key {
            margin: 0 px2rem(20px) px2rem(20px) px2rem(20px);

            .title {
              margin-bottom: px2rem(20px);
              font-size: $font-size-medium;
              color: $color-text;
            }

            .item {
              display: inline-block;
              padding: px2rem(5px) px2rem(10px);
              margin: 0 px2rem(20px) px2rem(10px) 0;
              border-radius: px2rem(6px);
              background: $color-highlight-background;
              font-size: $font-size-medium;
              color: $color-text;
            }
          }
        }

        .search-history {
          position: relative;
          margin: px2rem(10px) px2rem(25px);

          .title {
            display: flex;
            align-items: center;
            height: px2rem(30px);
            font-size: $font-size-small-x;
            color: $color-text-g;

            .text {
              flex: 1;
            }

            .clear {
              @include extend-click();

              .icon-clear {
                font-size: $font-size-medium;
                color: $color-text;
              }
            }
          }
        }
      }

      .search-result {
        position: relative;
        width: 100%;
        top: px2rem(10px);
        bottom: 0;
      }
    }
  }

  .router-view {
    z-index: 1000;
  }

</style>