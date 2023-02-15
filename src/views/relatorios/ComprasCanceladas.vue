<template>
  <v-container
    fluid
    grid-list-md
  >
    <span class="title">Compras Canceladas</span>
    <v-form
      ref="form2"
      @submit.prevent="validateBeforeSubmit"
    >
      <v-layout
        row
        wrap
      >
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout
                row
                wrap
              >
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
                    label="Data Inicial Estorno"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Data Final Estorno"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.userPratico"
                    :error-messages="errors.collect('Usuário Pratico')"
                    :items="listaUsersPratico"
                    label="Usuário Pratico"
                    item-value="id"
                    item-text="nome"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.tpLanc"
                    v-validate="'required'"
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
                    v-model.lazy="filtros.valor"
                    v-formata-moeda="filtros.valor"
                    v-money="money"
                    v-validate="'required'"
                    :error-messages="errors.collect('Valor')"
                    label="Valor a partir"
                    type="tel"
                    min="0"
                    prefix="R$ "
                    required
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
              color="primary"
            >
              Gerar
            </v-btn>
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
          type="application/pdf"
        >
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { TiposBusiness, RelatorioBusiness, UsuarioBusiness } from '../../business'
import { TODAS_ID, MONEY } from '../../constants'
import reportUtils from '../../utils/reportUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Relatório'
  },
  data () {
    return {
      money: MONEY,
      filtros: {
        redeId: null,
        empresaId: null,
        lojaId: null,
        dataInicio: null,
        dataFim: null,
        tipoRel: 'PDF',
        tpLanc: '0',
        userPratico: TODAS_ID,
        valor: 0
      },
      filePDF: null,
      tiposRel: [],
      tiposLanc: [
        { id: '1', descricao: 'Apenas compras' },
        { id: '2', descricao: 'Apenas renegociações' },
        { id: '0', descricao: 'Todos' }
      ],
      listaUsersPratico: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
      })
    
    this.listaUsersPratico.push({id: TODAS_ID, nome: "Todos"})
    UsuarioBusiness.listAllNegociador()
      .then(response => {
        this.listaUsersPratico = this.listaUsersPratico.concat(response.data)
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
          RelatorioBusiness.geraComprasCanceladas(this.filtros)
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
