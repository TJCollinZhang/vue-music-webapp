<template>
  <div class="rank" ref="rank">
    <scroll class="top-list" ref="scroll">
      <ul>
        <li class="item" v-for="item in yunTopList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" width="100" height="100">
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song, index) in item.top" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.name}} - {{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <div class="loading-container" v-show="!yunTopList.length">
        <loading></loading>
      </div> -->
      <div v-show="showLoading" class="loading-content">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>


<script>
	import {getTop} from "../common/api/rank";
	import Scroll from "../components/base/Scroll";
	import {playlistMixin} from "../common/js/mixin";
	import {mapMutations} from 'vuex';
	import Loading from "../components/base/Loading";

	const MUSIC_TOP = [0, 1, 2, 3, 4, 22, 23]

	export default {
		name: "Rank",
		mixins: [playlistMixin],
		data() {
			return {
				yunTopList: [],
				showLoading: true
			}
		},
		created() {
			this._getTopList()
		},
		methods: {
			selectItem(item) {
				this.$router.push({
					path: `/rank/${item.id}`
				})
				this.setTopList(item)
			},
			handlePlaylist(playlist) {
				const bottom = playlist.length > 0 ? '60px' : ''
				this.$refs.rank.style.bottom = bottom
				this.$refs.scroll.refresh()
			},
			_getTopList() {
				for (let i = 0; i < MUSIC_TOP.length; i++) {
					getTop(MUSIC_TOP[i]).then((res) => {
						let list = res.data.playlist
						list.top = res.data.playlist.tracks.slice(0, 3)
						this.yunTopList.push(list)
						// console.log(list)
					})
					if (i === MUSIC_TOP.length - 1) {
						this.showLoading = false
					}
				}
			},
			...mapMutations({
				setTopList: 'SET_TOP_LIST'
			})
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variable";
  @import "../assets/scss/mixin";
  @import "../assets/scss/function";

  .rank {
    position: fixed;
    width: 100%;
    top: px2rem(88px);
    bottom: 0;

    .top-list {
      height: 100%;
      overflow: hidden;
      padding-top: px2rem(5px);

      .item {
        display: flex;
        margin: 0 px2rem(10px);
        padding: 3px 0;
        height: px2rem(100px);
        border-bottom: 1px solid rgb(228, 228, 228);

        &:last-child {
          padding-bottom: px2rem(20px);
        }

        .icon {
          flex: 0 0 px2rem(100px);
          width: px2rem(100px);
          height: px2rem(100px);

          img {
            border-radius: 3px;
          }
        }

        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 px2rem(20px);
          height: px2rem(100px);
          overflow: hidden;
          color: $color-text;
          font-size: $font-size-small-x;

          .song {
            @include no-wrap();
            line-height: px2rem(30px);
          }
        }
      }

      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .loading-content {
      position: fixed;
      width: 100%;
      top: 70%;
      transform: translateY(-50%);
    }
  }
</style>