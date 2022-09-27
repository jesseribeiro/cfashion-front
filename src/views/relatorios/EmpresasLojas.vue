<template>
  <v-container
    fluid
    grid-list-md>
    <span class="title">Relação de Empresas</span>
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
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.redeId"
                    :items="redes"
                    :error-messages="errors.collect('Redes')"
                    data-vv-name="Redes"
                    label="Redes"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.nomeEmpresa"
                    :error-messages="errors.collect('Nome Empresa')"
                    data-vv-name="Nome Empresa"
                    label="Nome Empresa"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model.trim="filtros.cnpj"
                    v-mask="'##.###.###/####-##'"
                    :error-messages="errors.collect('CNPJ')"
                    :return-masked-value="false"
                    label="CNPJ"
                    type="text"
                    data-vv-name="CNPJ"
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
        nomeEmpresa: null,
        cnpj: null,
        redeId: TODAS_ID,
        tipoRel: 'PDF',
      },
      filePDF: null,
      tiposRel: [],
      redes: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    console.log('Chamando beforeMount')
    this.redes.push({ id: TODAS_ID, descricao: "Todas Redes" });
    TiposBusiness.getAllRedes()
      .then(response => {
        this.redes = this.redes.concat(response.data)
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
          this.loading = true
          this.loadingBtn = true
          RelatorioBusiness.geraEmpresasLojas(this.filtros)
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
    }
  }
}
</script>
