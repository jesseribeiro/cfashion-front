<template>
  <div>
    <core-progress-modal :show="loading" />
    <v-tabs
      v-if="!loading"
      color="primary"
      dark
      icons-and-text
    >
      <v-tabs-slider color="white" />

      <v-tab href="#pagamentos">
        Consultar Pagamentos
        <v-icon>mdi-currency-usd</v-icon>
      </v-tab>
      <v-tab href="#emloja">
        Em Loja
        <v-icon>mdi-store</v-icon>
      </v-tab>
      <v-tab href="#embanco">
        Em Banco (Arquivo)
        <v-icon>mdi-bank</v-icon>
      </v-tab>

      <v-tab-item
        value="pagamentos"
        lazy
      >
        <consultar-pagamentos
        />
      </v-tab-item>
      <v-tab-item
        value="emloja"
        lazy
      >
        <pagar-em-loja />
      </v-tab-item>
      <v-tab-item
        value="embanco"
        lazy
      >
        <pagar-em-banco-arquivo />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>

const ConsultarPagamentos = () => import('./ConsultarPagamentos.vue')
const PagarEmLoja = () => import('./PagarEmLoja.vue')
const PagarEmBancoArquivo = () => import('./PagarEmBancoArquivo.vue')

export default {
  metaInfo: {
    titleTemplate: '%s - Pagamentos'
  },
  components: {
    ConsultarPagamentos,
    PagarEmLoja,
    PagarEmBancoArquivo
  },
  data () {
    return {
      loading: false
    }
  },
  beforeMount () {
  }
}
</script>
