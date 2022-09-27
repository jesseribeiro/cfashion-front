<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Recuperação de Atrasados (Carnê - V2)</span>
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
                    v-model="filtros.tpLanc"
                    :items="tiposLanc"
                    :error-messages="errors.collect('Cliente acordos')"
                    data-vv-name="Cliente acordos"
                    label="Tipo"
                    item-value="id"
                    item-text="descricao"
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
                    label="Totalizar por mês"
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.inadimplencia"
                    label="Inadimplência por safra"
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
        status: 2,
        redeId: null,
        empresaId: null,
        lojaId: null,
        tpLanc: '0',
        tipoRel: 'PDF',
        dataInicio: null,
        dataFim: null,
        inadimplencia: false,
        totalizarCliente: false
      },
      filePDF: null,
      tiposRel: [],
      tiposLanc: [
        { id: '1', descricao: 'Apenas em acordo' },
        { id: '2', descricao: 'Exceto em acordo' },
        { id: '0', descricao: 'Todos' }
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
          RelatorioBusiness.geraRecuperaAtrasados(this.filtros)
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
