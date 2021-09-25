import { api } from './axios_settings'
export default {
  install (Vue) {
    Vue.prototype.$api = {
      execute (method, url, model) {
        return api[method](url, model)
      }
    }
  }
}
