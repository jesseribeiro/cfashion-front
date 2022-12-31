<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Lista de Produtos</span>
    <v-form
      ref="form2"
      @submit.prevent="validateBeforeSubmit">
      <v-layout
        row
        wrap>
        <v-flex md12>
          <v-card class="elevation-0">''
            <v-card-text>
              <v-layout
                row
                wrap>
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
                    v-model="filtros.temEstoque"
                    label="Apenas clientes com vendas"
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
import { TiposBusiness, RelatorioBusiness, LojaBusiness } from '../../business'
import { TODAS_ID } from '../../constants'
import reportUtils from '../../utils/reportUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Relatório'
  },
  data () {
    return {
      filtros: {
        tipoRel: 'PDF',
        dataInicio: null,
        dataFim: null,
        temEstoque: false
      },
      filePDF: null,
      tiposRel: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
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
          console.log("ta aqui");
          RelatorioBusiness.geraListaClientes(this.filtros)
            .then(response => {           
              if (this.filtros.tipoRel === 'PDF') {            
                this.filePDF = window.URL.createObjectURL(response.data)
              } else {
                reportUtils.downloadExcel(response)
              }
            })
            .catch(erro => {
              console.log(erro);
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
