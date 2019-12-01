<template>
  <div class="search-box">
    <input :placeholder="placeholder" v-model="query" type="text" class="box">
    <i v-show="query" class="icon-delete" @click="clear"></i>
  </div>
</template>

<script>
	import {debounce} from '../../common/js/util'

	export default {
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data () {
			return {
				query: '',
				clickInfo: '搜索'
			}
		},
		created () {
			this.$watch('query', debounce((newQuery) => {
				this.$emit('query', newQuery)
			}, 300))
		},
		methods: {
			clear () {
				this.query = ''
			},
			setQuery (query) {
				this.query = query
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variable";
  @import "../../assets/scss/function";

  .search-box {
    // position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: px2rem(25px);
    border-bottom: 1px solid rgb(235, 235, 235);
    .icon-search {
      font-size: px2rem(24px);
      color: $color-text-g;
    }
    .box {
      flex: 1;
      line-height: px2rem(25px);
      background: $color-theme;
      color: #fff;
      font-size: $font-size-medium;
      border: none;
      outline: medium;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .icon-delete {
      position: absolute;
      right: px2rem(12px);
      font-size: px2rem(14px);
      color: rgba(255, 255, 255, 0.8);
      border: none;
    }
    .search {
      padding: 0 px2rem(5px);
      font-size: px2rem(14px);
      color: $color-text;
    }
  }
</style>