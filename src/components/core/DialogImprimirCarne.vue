<template>
  <v-layout
    v-if="value"
    row
    justify-center
  >
    <v-dialog
      value="true"
      max-width="800"
      @input="onCloseDialog"
    >
      <v-layout
        v-if="!filePDF"
        class="justify-center">
        <core-progress-modal :show="!filePDF" />
      </v-layout>
      <embed
        v-else
        id="plugin"
        :src="filePDF"
        width="100%"
        height="1000px"
        name="plugin"
        type="application/pdf">
    </v-dialog>
  </v-layout>
</template>
<script>
import { CarneBusiness } from '../../business'
export default {
  props: {
    carneId: {
      type: Number,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      filePDF: null
    }
  },
  beforeMount () {
    this.gerarCarne()
  },
  methods: {
    gerarCarne () {
      this.filePDF = null
      this.show = true
      CarneBusiness.geraCarnePDF(parseInt(this.carneId))
        .then(response => {
          // For IE using atob convert base64 encoded data to byte array
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            this.show = false
            var byteCharacters = atob(response.data)
            var byteNumbers = new Array(byteCharacters.length)
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            var byteArray = new Uint8Array(byteNumbers)
            var blob = new Blob([byteArray], {
              type: 'application/pdf'
            })
            window.navigator.msSaveOrOpenBlob(blob, 'carne_compra.pdf')
          } else {
            this.filePDF = window.URL.createObjectURL(response.data)
          }
        })
        .catch(erro => {
          this.$root.showErro('Erro ao gerar o carne de compra')
          this.filePDF = null
          this.show = false
        })
        .finally(() => {
        })
    },
    onCloseDialog () {
      this.close()
    }
  }
}
</script>
