<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Defasagem Cobrança</span>
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
                  />
                </v-flex>
                <v-flex
                  v-if="!customizarTempo"
                  md8>
                  <v-autocomplete
                    :items="tiposTempos"
                    label="Tempo de Atraso"
                    item-value="id"
                    item-text="descricao"
                    return-object
                    @change="changeDataAtraso"
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempo"
                  md4>
                  <v-text-field
                    v-model="filtros.inicioAtraso"
                    label="Atraso Inicial"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempo"
                  md4>
                  <v-text-field
                    v-model="filtros.fimAtraso"
                    label="Atraso Final"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="customizarTempo"
                    label="Customizar tempo de atraso"
                  />
                </v-flex>
                <v-flex
                  v-if="!customizarTempoDefas"
                  md8>
                  <v-autocomplete
                    :items="tiposTempos"
                    label="Tempo de Defasagem"
                    item-value="id"
                    item-text="descricao"
                    return-object
                    @change="changeDataDefas"
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempoDefas"
                  md4>
                  <v-text-field
                    v-model="filtros.inicioDefas"
                    label="Atraso Inicial"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempoDefas"
                  md4>
                  <v-text-field
                    v-model="filtros.fimDefas"
                    label="Atraso Final"
                    type="number"
                    min="0"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="customizarTempoDefas"
                    label="Customizar tempo de defasagem"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.tpAnalise"
                    :items="tiposAnalise"
                    label="Tipo"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpCobranca"
                    :items="tiposCobranca"
                    :error-messages="errors.collect('Tipo de Cobranca')"
                    data-vv-name="Tipo de Cobranca"
                    label="Tipo de Cobrança"
                    item-value="id"
                    item-text="descricao"
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
        tpCobranca: '-1',
        tpAnalise: 'A',
        inicioAtraso: 'null',
        fimAtraso: 'null',
        inicioDefas: 'null',
        fimDefas: 'null'
      },
      filePDF: null,
      tiposRel: [],
      customizarTempo: false,
      customizarTempoDefas: false,
      tiposCobranca: [
        { id: '-1', descricao: 'Todas' },
        { id: '1', descricao: 'Apenas clientes com cobrança' },
        { id: '2', descricao: 'Apenas clientes sem cobrança' }
      ],
      tiposAnalise: [
        { id: 'S', descricao: 'Sintético' },
        { id: 'A', descricao: 'Analítico' }
      ],
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
        { id: '10', descricao: '181 a 240 dias', valor_inicio: 181, valor_fim: 240 },
        { id: '11', descricao: '241 a 300 dias', valor_inicio: 241, valor_fim: 300 },
        { id: '12', descricao: '301 a 360 dias', valor_inicio: 301, valor_fim: 360 },
        { id: '13', descricao: 'Acima de 360 dias', valor_inicio: 361, valor_fim: 99999 }
      ],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    console.log('Chamando beforeMount')
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
      })
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loading = true
          this.loadingBtn = true
          RelatorioBusiness.geraDefasagemCobranca(this.filtros)
            .then(response => {
              if (this.filtros.tipoRel === 'PDF') {
                this.filePDF = window.URL.createObjectURL(response.data)
              } else {
                reportUtils.downloadExcel(response)
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
    },
    changeDataDefas (item) {
      console.log(' Item selecionado ', item)
      this.filtros.inicioDefas = item.valor_inicio
      this.filtros.fimDefas = item.valor_fim
    }
  }

}
</script>
