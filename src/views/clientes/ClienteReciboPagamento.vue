<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="show"
      persistent
      max-width="340">
      <template
        v-if="!loading">
        <v-card>
          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex
                md6>
                <v-icon
                  @click="imprimir()">mdi-printer</v-icon>
              </v-flex>
              <v-flex
                md6
                class="text-md-right">
                <v-icon
                  color="red"
                  @click="close()">mdi-close</v-icon>
              </v-flex>
            </v-layout>
            <div
              id="printMe"
              style="text-transform: uppercase; width: 300px; border: 0px;">
              <pre
                id="viaEstabelecimento"
                align="center"
                style="width: 300px; border: 0px;"
                class="break-word caption"
              />
              <pre
                id="viaCliente"
                align="center"
                style="width: 300px; border: 0px;"
                class="break-word caption"
              />
            </div>
          </v-card-text>
        </v-card>
      </template>
      <v-card v-else>
        <core-progress-modal :show="loading" />
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { VendaBusiness } from '../../business'
export default {
  props: {
    pagamentoId: {
      type: Number,
      required: true
    },
    show: {
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
      pagamento: {},
      loading: false
    }
  },
  beforeMount () {
    this.loading = true
    VendaBusiness.getReciboPagamento(this.pagamentoId)
      .then(response => {
        this.pagamento = response.data
      }).catch(erro => {
        this.$root.showErro(erro.data.message)
      }).finally(() => {
        this.loading = false
      })
  },
  updated () {
    this.geraRecibo(0)
    this.geraRecibo(1)
  },
  methods: {
    imprimir () {
      this.$htmlToPaper('printMe')
    },
    geraRecibo (via) {
      var texto = '<table style="width:100%; table-layout: fixed;">'
      texto += '<tr><td style="text-align:center; font-weight: 800;" colspan="3">PRATICO</td></tr>'
      if (this.pagamento.flgCancelado) {
        texto += '<tr><td style="text-align:center" colspan="3">CANCELAMENTO DE PAGAMENTO</td></tr>'
      } else {
        texto += '<tr><td style="text-align:center" colspan="3">COMPROVANTE DE PAGAMENTO</td></tr>'
      }
      texto += '<tr><td style="text-align:left; word-wrap: break-word" colspan="3">' + this.pagamento.dadosLoja + '</td></tr>'
      texto += '<tr><td style="text-align:center; word-wrap: break-word" colspan="3">' + this.pagamento.dadosCliente + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">PARCELA</td><td style="text-align:left">' + this.pagamento.numeroParcela + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">VENCIMENTO</td><td style="text-align:left">' + this.$moment(this.pagamento.vencimento).format('DD/MM/YYYY') + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">COMPROVANTE</td><td style="text-align:left">' + this.pagamento.pagamentoId + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">DATA</td><td style="text-align:left">' + this.pagamento.dataPagto + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">VALOR PAGO</td><td style="text-align:left">R$ ' + this.pagamento.valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '</td></tr>'
      texto += '<tr><td style="text-align:center" colspan="3">*** COMPROVANTE NAO FISCAL ***</td></tr>'
      if (via === 0) {
        texto += '<tr><td style="text-align:center" colspan="3">1 VIA ESTABELECIMENTO</td></tr>'
        document.getElementById('viaEstabelecimento').innerHTML = texto
      } else {
        texto += '<tr><td style="text-align:center" colspan="3">2 VIA CLIENTE</td></tr>'
        document.getElementById('viaCliente').innerHTML = texto
      }
    }
  }
}
</script>

<style>
  .break-word {
    word-wrap: break-word;
  }
</style>
