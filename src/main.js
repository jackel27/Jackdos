// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import routes from './routes'
import store from 'store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
// import VueMarkdown from 'vue-markdown'

Vue.prototype.$store = store

Vue.use(Router)
Vue.use(VueResource)
Vue.use(ElementUI, { locale })
// Vue.use(VueMarkdown)

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
