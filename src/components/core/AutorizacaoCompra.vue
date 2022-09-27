<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      value="true"
      max-width="400"
      scrollable
      @input="closeDialog">
      <v-card v-if="flgTelaFormaAutorizacao">
        <v-card-title>
          <span class="headline">Forma de autorização</span>
          <v-spacer />
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-layout
            row
            wrap>
            <v-flex
              md12
              class="title text-md-center">
              <span>Como deseja receber o código de autorização?</span>
            </v-flex>
            <v-flex
              md12
              class="title">
              <span>Cliente</span>
            </v-flex>
            <v-flex
              md12>
              <v-btn
                :loading="loadingBtn"
                block
                color="success"
                @click="enviarAutorizacao('WHATSAPP', clienteTelefone)">
                <v-icon class="mr-2 ml-2">mdi-whatsapp</v-icon><strong>whatsapp</strong>
              </v-btn>
            </v-flex>
            <v-flex
              md12>
              <v-btn
                :loading="loadingBtn"
                block
                color="blue-grey"
                @click="enviarAutorizacao('EMAIL', clienteEmail)">
                <v-icon class="mr-2 ml-2">mdi-email</v-icon><strong>Email</strong>
              </v-btn>
            </v-flex>
            <v-flex
              md12>
              <v-btn
                :loading="loadingBtn"
                block
                color="primary"
                @click="enviarAutorizacao('SMS', clienteTelefone)">
                <v-icon class="mr-2 ml-2">mdi-cellphone-message</v-icon><strong>SMS</strong>
              </v-btn>
            </v-flex>

            <v-flex
              md12
              class="title">
              <span>Lojista</span>
            </v-flex>
            <v-flex
              md12>
              <v-btn
                :loading="loadingBtn"
                block
                color="blue-grey"
                @click="enviarAutorizacao('EMAIL', lojistaEmail)">
                <v-icon class="mr-2 ml-2">mdi-email</v-icon><strong>Email</strong>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <template v-if="loading">
          <core-progress-modal :show="loading" />
        </template>
        <template v-else>
          <v-card-title class="headline">Informe o código de autorização</v-card-title>

          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex
                md12
                class="text-md-center">
                <span>Um código de autorização de compra foi enviado para o <strong class="title">{{ tipo + ': ' + destino }}.</strong> Digite o código no campo abaixo.  </span>
              </v-flex>
              <v-flex
                md12>
                <v-text-field
                  v-validate="'required'"
                  v-model="codigo"
                  :error-messages="errors.collect('Código')"
                  data-vv-name="Código"
                  required
                  label="Código" />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              dark
              @click="reenviar()">Reenviar</v-btn>
            <v-spacer />
            <v-btn
              :loading="loadingBtn"
              color="primary"
              @click="confirmarCodigo()">Confirmar</v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { AutorizacaoBusiness } from '../../business'
export default {
  props: {
    clienteNome: {
      type: String,
      required: true
    },
    clienteTelefone: {
      type: String,
      required: true
    },
    clienteLojaId: {
      type: String,
      required: true
    },
    nomeProduto: {
      type: String,
      required: true
    },
    valorProduto: {
      type: String,
      required: true
    },
    valorParcela: {
      type: String,
      required: true
    },
    qtdParcela: {
      type: String,
      required: true
    },
    clienteEmail: {
      type: String,
      required: true
    },
    lojistaEmail: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      flgTelaFormaAutorizacao: true,
      id: null,
      tipo: null,
      destino: null,
      codigo: null,
      loading: false,
      loadingBtn: false
    }
  },
  methods: {
    enviarAutorizacao (_tipo, _destino) {
      this.id = null
      this.tipo = _tipo
      this.destino = _destino
      this.loading = true
      this.loadingBtn = true
      this.flgTelaFormaAutorizacao = false
      AutorizacaoBusiness.enviarAutorizacao({ 
          tipo: _tipo, 
          destino: _destino, 
          nomeCliente: this.clienteNome, 
          lojaId: this.clienteLojaId, 
          nomeProduto: this.nomeProduto, 
          valorProduto: this.valorProduto, 
          valorParcela: this.valorParcela,
          qtdParcela: this.qtdParcela 
        })
        .then(response => {
          this.id = response.data.id
          this.$root.showSucesso('Código de autorização enviado com sucesso')
        })
        .catch(() => this.$root.showErro('Erro ao enviar o código de autorização, favor tentar novamente'))
        .finally(() => {
          this.loading = false
          this.loadingBtn = false
        })
    },
    confirmarCodigo () {
      this.loadingBtn = true
      AutorizacaoBusiness.confirmarCodigo({ id: this.id, codigo: this.codigo })
        .then(() => {
          this.callback(this.id)
          this.flgTelaFormaAutorizacao = true
          this.$root.showSucesso('Venda realizada com sucesso. Imprima o carnê/boleto')
        })
        .catch(erro => this.$root.showErro(erro.data.message))
        .finally(() => {
          this.loadingBtn = false
        })
    },
    reenviar () {
      this.flgTelaFormaAutorizacao = true
    },
    closeDialog () {
      this.close()
    }
  }
}
</script>
