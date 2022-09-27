<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Ultimas Cobranças por Cliente</span>
    <v-form
      ref="form2"
      @submit.prevent="validateBeforeSubmit">
      <v-layout
        row
        wrap>
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout
                row
                wrap>
                <v-flex md12>
                  <core-filtro-rede-empresa-loja
                    v-model="filtros"
                    :show-todas="true"
                    :obrigatorio="true"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicio"
                    label="Data Inicial"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Data Final"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-autocomplete
                    v-model="filtros.saldoDevedor"
                    :items="tiposSaldos"
                    :error-messages="errors.collect('Saldo Devedor')"
                    label="Saldo Devedor"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex 
                  v-if="!customizarTempo" 
                  md8 
                  class="pa-1">
                  <v-autocomplete
                    :items="tiposTempos"
                    label="Atraso"
                    item-value="id"
                    item-text="descricao"
                    return-object
                    @change="changeDataAtraso"
                  />
                </v-flex>
                <v-flex 
                  v-if="customizarTempo" 
                  md4 
                  class="pa-1">
                  <v-text-field
                    v-model="filtros.inicioAtraso"
                    label="Atraso Inicial"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex 
                  v-if="customizarTempo" 
                  md4 
                  class="pa-1">
                  <v-text-field
                    v-model="filtros.fimAtraso"
                    label="Atraso Final"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-checkbox
                    v-model="customizarTempo"
                    label="Customizar tempo de atraso"
                  />
                </v-flex>        
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.tipoRel"
                    :items="tiposRel"
                    label="Relatório em"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-layout class="justify-end">
            <v-btn
              :loading="loadingBtn"
              type="submit"
              color="primary">Gerar</v-btn>
          </v-layout>
        </v-flex>
        <core-progress-modal :show="loading" />

        <embed
          v-if="filePDF"
          id="plugin"
          :src="filePDF"
          width="100%"
          height="1000px"
          name="plugin"
          type="application/pdf">
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { TiposBusiness, RelatorioBusiness } from '../../business'
import { TODAS_ID } from '../../constants'
import reportUtils from '../../utils/reportUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Relatório'
  },
  data () {
    return {
      filtros: {
        redeId: null,
        empresaId: null,
        lojaId: null,
        tipoRel: 'PDF',
        inicioAtraso: null,
        fimAtraso: null,
        saldoDevedor: 'TODAS',
        dataInicio: null,
        dataFim: null,
      },
      filePDF: null,
      customizarTempo: false,
      tiposRel: [],
      loadingBtn: false,
      tiposSaldos: [],
      tiposTempos: [
        { id: '-1', descricao: 'Todos', valor_inicio: null, valor_fim: null },
        { id: '1', descricao: 'Até 5 dias', valor_inicio: 0, valor_fim: 5 },
        { id: '2', descricao: '6 a 10 dias', valor_inicio: 6, valor_fim: 10 },
        { id: '3', descricao: '11 a 20 dias', valor_inicio: 11, valor_fim: 20 },
        { id: '4', descricao: '21 a 30 dias', valor_inicio: 21, valor_fim: 30 },
        { id: '5', descricao: '31 a 60 dias', valor_inicio: 31, valor_fim: 60 },
        { id: '6', descricao: '61 a 90 dias', valor_inicio: 61, valor_fim: 90 },
        { id: '7', descricao: '91 a 120 dias', valor_inicio: 91, valor_fim: 120 },
        { id: '8', descricao: '121 a 150 dias', valor_inicio: 121, valor_fim: 150 },
        { id: '9', descricao: '151 a 180 dias', valor_inicio: 151, valor_fim: 180 },
        { id: '10', descricao: 'Acima de 180 dias', valor_inicio: 181, valor_fim: 99999 }
      ],
      loading: false
    }
  },
  beforeMount () {
    console.log('Chamando beforeMount')
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
      })
    TiposBusiness.getAllSaldoDevedor()
      .then(response => {
        this.tiposSaldos = response.data
      })
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          if (!this.filtros.redeId && this.filtros.redeId === TODAS_ID) {
            this.$root.showAlerta('Selecione uma rede!')
            return
          }
          if (!this.filtros.empresaId && this.filtros.empresaId === TODAS_ID) {
            this.$root.showAlerta('Selecione uma empresa!')
            return
          }
          if (!this.filtros.lojaId) {
            this.$root.showAlerta('Selecione uma loja!')
            return
          }
          this.loading = true
          this.loadingBtn = true
          RelatorioBusiness.geraUltimasCobrancas(this.filtros)
            .then(response => {
              if (this.filtros.tipoRel === 'PDF') {
                this.filePDF = window.URL.createObjectURL(response.data)
              } else {
                reportUtils.downloadExcel(response, this.$root)
              }
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
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
      })
    },
    changeDataAtraso (item) {
      console.log(' Item selecionado ', item)
      this.filtros.inicioAtraso = item.valor_inicio
      this.filtros.fimAtraso = item.valor_fim
    }
  }
}
</script>
