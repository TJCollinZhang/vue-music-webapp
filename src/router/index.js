import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'recommend',
		redirect: '/recommend'
	},
	{
		path: '/search',
		name: 'search',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
		children: [
			{
				path: 'singer/:id',
				component: () => import(/* webpackChunkName: "about" */ '../views/SingerDetail.vue'),

			},
			{
				path: 'list/:id',
				component: () => import(/* webpackChunkName: "about" */ '../views/MusicList.vue'),
			}
		]
	},
	{
		path: '/user',
		name: 'user',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
	},
	{
		path: '/recommend',
		name: 'recommend',
		component: () => import(/* webpackChunkName: "about" */ '../views/Recommend.vue'),
		children: [
			{
				path: ':id',
				component: () => import(/* webpackChunkName: "about" */ '../views/MusicList.vue'),
			}
		]

	},
	{
		path: '/rank',
		name: 'rank',
		component: () => import(/* webpackChunkName: "about" */ '../views/Rank.vue'),
		children: [
			{
				path: ':id',
				component: () => import(/* webpackChunkName: "about" */ '../views/RankDetail.vue'),
			}
		]

	},
	{
		path: '/singer',
		name: 'singer',
		component: () => import(/* webpackChunkName: "about" */ '../views/Singer.vue'),
		children: [
			{
				path: ':id',
				component: () => import(/* webpackChunkName: "about" */ '../views/SingerDetail.vue'),
			}
		]

	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
