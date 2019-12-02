
export const HOST = process.env.NODE_ENV === 'production' ? 'https://music.api.collinjs.site':'http://localhost:3000'
export const ERR_OK = 200

export const playMode = {
	sequence: 0,
	loop: 1,
	random: 2
}
