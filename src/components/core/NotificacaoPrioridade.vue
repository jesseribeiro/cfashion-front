<template>
  <div>
    <v-chip
      v-if="prioridade === 'CRITICA'"
      color="red"
      class="ml-0 body-2"
      text-color="white"
      small
    >
      {{ prioridade }}
    </v-chip>
    <v-chip
      v-if="prioridade === 'ALTA'"
      color="orange"
      class="ml-0 body-2"
      text-color="white"
      small
    >
      {{ prioridade }}
    </v-chip>
    <v-chip
      v-if="prioridade === 'MEDIA'"
      color="green"
      class="ml-0 body-2"
      text-color="white"
      small
    >
      {{ prioridade }}
    </v-chip>
    <v-chip
      v-if="prioridade === 'BAIXA'"
      color="blue"
      class="ml-0 body-2"
      text-color="white"
      small
    >
      {{ prioridade }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    prioridade: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
