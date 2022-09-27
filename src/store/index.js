/* eslint-disable */
// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'



Vue.use(Vuex)

const options = {
  state,
  getters,
  actions,
  mutations,
  modules
}

const store = new Vuex.Store(options)

export default store
