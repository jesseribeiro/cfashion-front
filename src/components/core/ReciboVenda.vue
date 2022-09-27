<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="show"
      persistent
      max-width="350">
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
    vendaId: {
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
      venda: {},
      loading: false
    }
  },
  beforeMount () {
    this.loading = true
    VendaBusiness.getReciboVenda(this.vendaId)
      .then(response => {
        this.venda = response.data
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
      if (this.venda.flgCancelado) {
        texto += '<tr><td style="text-align:center" colspan="3">CANCELAMENTO DE VENDA</td></tr>'
      } else {
        texto += '<tr><td style="text-align:center" colspan="3">COMPROVANTE DE VENDA</td></tr>'
      }
      texto += '<tr><td style="text-align:left; word-wrap: break-word" colspan="3">' + this.venda.dadosLoja + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">DATA</td><td style="text-align:left">' + this.$moment(this.venda.dataVenda).format('DD/MM/YYYY H:mm') + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">AUTORIZAÇÃO</td><td style="text-align:left">' + this.venda.codigoAutorizacao + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">TIPO AUTORIZAÇÃO</td><td style="text-align:left">' + this.venda.tipoAutorizacao + '</td></tr>'
      texto += '<tr><td colspan="2" style="text-align:left">PARCELAS</td><td style="text-align:left">' + this.venda.qtdParcela + '</td></tr>'
      if (this.venda.valorEntrada) {
        texto += '<tr><td colspan="2" style="text-align:left">VALOR ENTRADA</td><td style="text-align:left">R$ ' + this.venda.valorEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '</td></tr>'
      }
      texto += '<tr><td colspan="2" style="text-align:left">VALOR VENDA</td><td style="text-align:left">R$ ' + this.venda.valorVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '</td></tr>'
      if (!this.venda.flgCancelado) {
        texto += '<tr><td style="text-align:center" colspan="3">------ PARCELAS CARNE -------</td></tr>'
        texto += '<tr><td style="text-align:center">PARC</td><td style="text-align:center">VENCIMENTO</td><td style="text-align:center">VALOR</td></tr>'
        for (let i = 0; i < this.venda.parcelas.length; i++) {
          let parcela = this.venda.parcelas[i]
          texto += '<tr><td style="text-align:center">' + parcela.numero + '</td><td style="text-align:center">' + this.$moment(parcela.dataVencimento).format('DD/MM/YYYY') + '</td><td style="text-align:center">' + parcela.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '</td></tr>'
        }
      }
      texto += '<tr><td style="text-align:center" colspan="3">' + this.venda.dadosCliente + '</td></tr>'
      texto += '<tr><td style="text-align:center" colspan="3">*** COMPROVANTE NAO FISCAL ***</td></tr>'
      if (via === 0) {
        texto += '<tr><td style="text-align:center" colspan="3">1 VIA ESTABELECIMENTO</td></tr>'
        document.getElementById('viaEstabelecimento').innerHTML = texto
      } else {
        texto += '<tr><td style="text-align:center" colspan="3">2 VIA CLIENTE</td></tr>'
        document.getElementById('viaCliente').innerHTML = texto
      }
      texto += '</table>'
    }
  }
}
</script>

<style lang="css" scoped>
  .break-word {
    word-wrap: break-word;
  }
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0);
  }
</style>
