import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./assets/scss/index.scss"
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
	loading: require('./assets/images/default.png')
})

let htmlDom = document.getElementsByTagName('html')[0];
window.addEventListener('load', () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';

});
window.addEventListener('resize', () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
