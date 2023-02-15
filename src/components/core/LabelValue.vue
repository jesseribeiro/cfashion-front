<template>
  <div>
    <span
      :class="classLabel"
    >{{ label }}</span>
    <br>
    <span
      v-negative="value"
      :class="classValue"
    >{{ value }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    classLabel: {
      type: String,
      required: false,
      default: 'body-2'
    },
    classValue: {
      type: String,
      required: false,
      default: 'body-1'
    }
  }
}
</script>
