import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import VImageInput from 'vuetify-image-input'
import camelCase from 'lodash/camelCase'

Vue.component('VImageInput', VImageInput)

const requireComponent = require.context(
  '@/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  
  Vue.component(componentName, componentConfig.default || componentConfig)
})
