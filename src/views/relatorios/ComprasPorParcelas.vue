<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Compras por Parcelas(Carnês)</span>
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
                  <v-text-field
                    v-model="filtros.dataInicio"
                    label="Data Inicial de Vencimento"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Data Final de Vencimento"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpLanc"
                    :items="tiposLanc"
                    :error-messages="errors.collect('Tipos de carnês')"
                    data-vv-name="Tipos de carnês"
                    label="Tipos de carnês"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicioCompra"
                    label="Data Inicial de Compra"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFimCompra"
                    label="Data Final de Compra"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpPagamento"
                    :items="tiposPagamento"
                    :error-messages="errors.collect('Pago/Aberto')"
                    label="Pago/Aberto"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicioPagamento"
                    label="Data Inicial de Pagamento"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFimPagamento"
                    label="Data Final de Pagamento"
                    type="date"
                    clearable
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
                    v-model="filtros.totalizarCliente"
                    label="Totalizar por cliente"
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
        dataInicio: null,
        dataFim: null,
        dataInicioCompra: null,
        dataFimCompra: null,
        dataInicioPagamento: null,
        dataFimPagamento: null,
        tpLanc: '0',
        tpGrupos: 'null',
        tipoRel: 'PDF',
        tpPagamento: '0',
        totalizarCliente: false
      },
      filePDF: null,
      tiposRel: [],
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
      tiposLanc: [
        { id: '1', descricao: 'Apenas carnês de compras' },
        { id: '2', descricao: 'Apenas carnês de acordos' },
        { id: '0', descricao: 'Todos' }
      ],
      tiposPagamento: [
        { id: '0', descricao: 'Todos' },
        { id: '1', descricao: 'Apenas pagos' },
        { id: '2', descricao: 'Apenas em aberto' }
      ],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    console.log('Chamando beforeMount')
    TiposBusiness.getAllPorRelatorio()
      .then(response => {
        this.tiposPor = response.data
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
          RelatorioBusiness.geraComprasParcelas(this.filtros)
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
