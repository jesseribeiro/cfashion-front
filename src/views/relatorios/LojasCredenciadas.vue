<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Lojas Credenciadas</span>
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
                    v-validate="'required'"
                    v-model="filtros"
                    :show-todas="true"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.ramoAtividadeId"
                    :items="ramosAtividade"
                    label="Ramo Atividade"
                    name="ramoAtividade"
                    item-text="descricao"
                    item-value="id"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicio"
                    label="Data Inicial de Cadastro"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Data Final de Cadastro"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.estado"
                    :items="estados"
                    label="Estado"
                    data-vv-name="Estado"
                    item-text="uf"
                    item-value="uf"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.status"
                    :items="status"
                    label="Status"
                    data-vv-name="Status"
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
import { TiposBusiness, RelatorioBusiness, EstadoBusiness } from '../../business'
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
        dataInicio: null,
        dataFim: null,
        estado: null,
        ramoAtividadeId: null,
        status: 0
      },
      filePDF: null,
      tiposRel: [],
      estados: [],
      status: [
        { id: 0, descricao: 'Todos' },
        { id: 1, descricao: 'Ativos' },
        { id: 2, descricao: 'Bloqueados' }
      ],
      ramosAtividade: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
      })
    TiposBusiness.listRamoAtividade()
      .then(response => {
        this.ramosAtividade = response.data
      })
    EstadoBusiness.findAll()
      .then(response => {
        this.estados = response.data
      })
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result && !!this.filtros.lojaId) {
          this.loading = true
          this.loadingBtn = true
          RelatorioBusiness.geraLojasCredenciadas(this.filtros)
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
