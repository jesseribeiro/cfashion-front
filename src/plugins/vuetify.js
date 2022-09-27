import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import en from '../locale/en'
import br from '../locale/pt-br'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme,
  lang: {
    locales: { br, en },
    current: 'br'
  }
})
