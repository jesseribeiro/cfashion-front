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
      <v-layout class="justify-end">
        <v-btn
          :loading="loadingBtn"
          color="success"
          @click="cancelar">Finalizar</v-btn>
      </v-layout>
    </v-flex>
  </v-container>
</template>
<script>
import { CarneBusiness } from '../../business'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    cancelar: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false
  },
  data () {
    return {
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
    CarneBusiness.geraCarnePDF(this.value.carneId)
      .then(response => {
        // For IE using atob convert base64 encoded data to byte array
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var byteCharacters = atob(response.data)
          var byteNumbers = new Array(byteCharacters.length)
          for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }
          var byteArray = new Uint8Array(byteNumbers)
          var blob = new Blob([byteArray], {
            type: 'application/pdf'
          })
          window.navigator.msSaveOrOpenBlob(blob, 'carne.pdf')
        } else {
          // this.filePDF = 'data:application/pdf;base64,' + response.data
          this.filePDF = window.URL.createObjectURL(response.data)
        }
      })
      .catch(erro => this.$root.showErro('Erro ao gerar o carne de compra'))
      .finally(() => {
        this.loading = false
        this.loadingBtn = false
      })
  },
  methods: {
  }
}
</script>
