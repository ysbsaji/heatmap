import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apiServices from './plugins/apiservices'
import axios from 'axios'

Vue.config.productionTip = false
let plugins = { apiServices }
Object.keys(plugins).forEach(key => {
  Vue.use(plugins[key])
})

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
