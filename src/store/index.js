import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heatMapDataList: [],
    heatMapDefinitions: []
  },
  getters: {
    dataLists (state) {
      return state.heatMapDataList
    },
    definitionsLists (state) {
      return state.heatMapDefinitions
    }
  },
  mutations: {
    loadDatalist (state, payload) {
      state.heatMapDataList = payload.flatMap(val => val)
    },
    loadDefinitionslist (state, payload) {
      state.heatMapDefinitions = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
