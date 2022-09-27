<template>
  <div>
    <v-chip
      v-if="status === 'Processado com Sucesso'"
      color="green"
      class="ml-0"
      text-color="white"
      small
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-if="status === 'Processado com Erro'"
      :title="mensagem"
      color="red"
      class="ml-0"
      text-color="white"
      small
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-if="status === 'Não Processado'"
      color="orange"
      class="ml-0"
      text-color="white"
      small
    >
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
    mensagem: {
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
