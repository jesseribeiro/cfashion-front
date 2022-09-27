<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Compras por Lojas</span>
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
                <v-flex
                  v-if="!customizarTempo"
                  md8>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpPeriodo"
                    :items="periodos"
                    :error-messages="errors.collect('Período')"
                    label="Período"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempo"
                  md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataInicio"
                    label="Data Inicial"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex
                  v-if="customizarTempo"
                  md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataFim"
                    label="Data Final"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="customizarTempo"
                    label="Customizar Período"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpGrupos"
                    :items="grupos"
                    :error-messages="errors.collect('Grupos')"
                    label="Grupos"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpPor"
                    :items="tiposPor"
                    :error-messages="errors.collect('Tipo')"
                    label="Tipo"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.totalizacao"
                    :items="totalizar"
                    label="Totalização"
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
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.listarEstornos"
                    label="Listar estornos de compras"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.totalizarCliente"
                    label="Totalizar por empresa"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.comprasSemJuros"
                    label="Compras sem juros"
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
        tpPor: 'CAIXA',
        totalizacao: 'DIARIA',
        tpPeriodo: 'SETE_DIAS',
        tpGrupos: 'null',
        dataInicio: null,
        dataFim: null,
        tipoRel: 'PDF',
        listarEstornos: false,
        totalizarCliente: false,
        comprasSemJuros: false
      },
      filePDF: null,
      customizarTempo: false,
      tiposRel: [],
      tiposPor: [],
      periodos: [],
      totalizar: [],
      grupos: [
        { id: 'null', descricao: 'Todos Grupos' },
        { id: 'A', descricao: 'A' },
        { id: 'B', descricao: 'B' },
        { id: 'C', descricao: 'C' },
        { id: 'D', descricao: 'D' },
        { id: 'E', descricao: 'E' },
        { id: 'F', descricao: 'F' },
        { id: 'H', descricao: 'Restrição' },
        { id: 'G', descricao: 'Histórico' },
        { id: 'Z', descricao: 'Não Informado' },
        { id: 'I', descricao: 'Baixíssimo' },
        { id: 'J', descricao: 'Baixo' },
        { id: 'K', descricao: 'Médio' },
        { id: 'L', descricao: 'Alto' },
        { id: 'M', descricao: 'Altíssimo' },
        { id: 'N', descricao: 'Execução' },
        { id: 'O', descricao: 'Protesto' },
        { id: 'P', descricao: 'Bloqueio SPC' },
        { id: 'Q', descricao: 'Aval Loja' }
      ],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    console.log('Chamando beforeMount')
    TiposBusiness.getAllTotalizarPorDataRelatorio()
      .then(response => {
        this.totalizar = response.data
      })
    TiposBusiness.getAllPorRelatorio()
      .then(response => {
        this.tiposPor = response.data
      })
    TiposBusiness.getAllPeriodoRelatorio()
      .then(response => {
        this.periodos = response.data
      })
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
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
          RelatorioBusiness.geraComprasLojas(this.filtros)
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
    }
  }
}
</script>
