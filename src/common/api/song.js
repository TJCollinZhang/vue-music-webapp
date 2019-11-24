import axios from 'axios'
import {HOST} from '../js/config'

// 获取歌曲详情
export function getSong (id) {
  const url = HOST + `/song/url?id=${id}`

  return axios.get(url)
}

export function getLyric (id) {
  const url = HOST + `/lyric?id=${id}`

  return axios.get(url)
}
