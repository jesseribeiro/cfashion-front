<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Repasse Pagto Efetuado</span>
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
                    :obrigatorio="false"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataInicio"
                    :error-messages="errors.collect('Pagamento de')"
                    data-vv-name="Pagamento de"
                    label="Pagamento de"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataFim"
                    :error-messages="errors.collect('Pagamento até')"
                    data-vv-name="Pagamento até"
                    label="Pagamento até"
                    type="date"
                    clearable
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
                    v-model="filtros.tipoLancamentoId"
                    :items="tiposLancamento"
                    label="Tipo Lançamento Extra"
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
                    v-model="filtros.listarContas"
                    label="Listar contas bancárias"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.listarVencimentos"
                    label="Listar vencimentos"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.listarLancamentos"
                    label="Listar lançamentos"
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
        tipo: null,
        tipoRel: 'PDF',
        vencimentoAte: null,
        tpRepasse: null,
        tpAnalise: 'A',
        tipoLancamentoId: null,
        listarContas: false,
        listarVencimentos: false,
        listarLancamentos: false,
        dataInicio: null,
        dataFim: null
      },
      tiposRepasse: [],
      tiposLancamento: [],
      tiposAnalise: [
        { id: 'S', descricao: 'Sintético' },
        { id: 'A', descricao: 'Analítico' }
      ],
      ordenacao: [
        { id: 'razaoSocial', descricao: 'Razão Social' },
        { id: 'nomeFantasia', descricao: 'Nome Fantasia' },
        { id: 'banco', descricao: 'Banco' }
      ],
      filePDF: null,
      tiposRel: [],
      tipos: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    this.tiposLancamento.push({ id: null, descricao: 'Todos Lançamentos' })
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
      })
    TiposBusiness.listRepasse()
      .then(response => {
        this.tiposRepasse = response.data
      })
    TiposBusiness.tiposLancamentoRepasse()
      .then(response => {
        this.tiposLancamento = this.tiposLancamento.concat(response.data)
      })
    if (this.$root.isProprietario()) {
      this.filtros.empresaId = this.$root.empresaId()
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loading = true
          this.loadingBtn = true
          RelatorioBusiness.geraRelatorioPagamentoEfetuado(this.filtros)
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
