<template>
  <v-container
    fluid
    grid-list-md>
    <template v-if="loading">
      <core-progress-modal :show="loading" />
    </template>
    <template v-else>
      <embed
        id="plugin"
        :src="filePDF"
        width="100%"
        height="1000px"
        name="plugin"
        type="application/pdf">
    </template>
    <v-flex
      md12>
      <v-layout
        v-if="!editando"
        class="justify-end">
        <v-btn
          dark
          @click="goBack">Voltar</v-btn>
        <v-btn
          :loading="loadingBtn"
          color="primary"
          @click="nextStep">Continuar</v-btn>
      </v-layout>
    </v-flex>
  </v-container>
</template>
<script>
import { RelatorioBusiness } from '../../business'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false,
    // eslint-disable-next-line vue/require-default-prop
    editando: false
  },
  data () {
    return {
      filtros: {
        clienteId: null,
        lojaId: null,
        operacao: 'cadastro'
      },
      currentPage: 0,
      pageCount: 0,
      form: {},
      redes: [],
      empresas: [],
      lojas: [],
      filePDF: null,
      loading: false,
      loadingBtn: false
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.loading = true
    this.loadingBtn = true
    this.filtros.clienteId = this.value.id
    this.filtros.lojaId = this.value.lojaId
    RelatorioBusiness.geraPropostaAdesao(this.filtros)
      .then(response => {
        this.filePDF = window.URL.createObjectURL(response.data)
      })
      .catch(erro => {
        if (erro && erro.response.data) {
          this.$root.showAlerta(erro.response.data.message)
        } else {
          this.$root.showErro(this.$vuetify.t('$vuetify.Erro.carregarRelatorio'))
        }
      })
      .finally(() => {
        this.loading = false
        this.loadingBtn = false
      })
  },
  methods: {
  }
}
</script>
