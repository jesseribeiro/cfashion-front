<template>
  <div>
    <v-icon
      v-if="visualizado"
      color="blue">mdi-checkbox-multiple-marked-outline</v-icon>
    <v-icon
      v-if="!visualizado"
      color="grey">mdi-checkbox-marked-outline</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    visualizado: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
