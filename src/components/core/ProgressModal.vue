<template>
  <v-dialog
    v-model="show"
    fullscreen
    full-width>
    <v-container
      fluid
      fill-height
      style="background-color: rgba(255, 255, 255, 0.5);">
      <v-layout
        justify-center
        align-center>
        <v-progress-circular
          :size="100"
          :width="7"
          indeterminate
          color="primary"
        >
          <slot>
            <span class="display-1">$</span>
          </slot>
        </v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<style scoped>
  .v-progress-circular {
    margin: 1rem
  }
</style>
<script>
export default {
  // https://zaengle.com/blog/using-v-model-on-nested-vue-components
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
