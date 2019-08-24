import Vue from 'vue'
import Vuex from 'vuex'

import root from './dummy.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rawData: root
  },
  mutations: {

  },
  actions: {

  }
})
