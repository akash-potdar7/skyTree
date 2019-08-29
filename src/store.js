import Vue from 'vue'
import Vuex from 'vuex'

import root from './hierarchies.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    _root: root,
    currentContextNode: null
  },

  mutations: {

    SET_CURRENT_CONTEXT_NODE (state, node) {
      state.currentContextNode = node;
    },

  },

  actions: {

    setCurrentContextNode({ commit }, node) {
      commit('SET_CURRENT_CONTEXT_NODE', node);
    }
 
  },

})
