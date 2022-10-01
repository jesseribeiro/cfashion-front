<template>
  <div>
    <v-chip
      v-if="status === 'Pago'"
      color="green"
      class="ml-0"
      text-color="white"
      small
    >
      <v-avatar class="green darken-4">
        <v-icon color="white">mdi-check</v-icon>
      </v-avatar>
      {{ status }}
    </v-chip>
    <v-chip
      v-if="status === 'Em Aberto'"
      class="ml-0"
      color="black"
      text-color="white"
      small
    >
      <v-avatar
        class="grey lighten-1"
      >A</v-avatar>
      {{ status }}
    </v-chip>
    <v-chip
      v-if="status === 'Cancelado' || status === 'Cancelada'"
      :title="motivoCancelamento"
      color="red"
      class="ml-0"
      text-color="white"
      small
    >
      <v-avatar class="red darken-4">
        <v-icon color="white">mdi-cancel</v-icon>
      </v-avatar>
      {{ status }}
    </v-chip>
    <v-chip
      v-if="status === 'Renegociado' || status === 'Renegociada'"
      color="orange"
      class="ml-0"
      text-color="white"
      small
    >
      <v-avatar class="orange darken-4">
        <v-icon color="white">mdi-handshake</v-icon>
      </v-avatar>
      {{ status }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    },
    motivoCancelamento: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>
