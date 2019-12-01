import {playMode} from '../common/js/config'
import {loadSearch, loadPlay, loadFavorite} from '../common/js/cache'

const state = {
	// 歌单
  musicList: {},

  singer: {},
  // 播放
  playing: false,
  // 播放器全屏
  fullScreen: false,
  // 当播放模式不是顺序模式的时候，playlist != sequenceList
	playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
