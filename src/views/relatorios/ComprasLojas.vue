<template>
  <v-container
    fluid
    grid-list-md
  >
    <span class="title">Compras por Lojas</span>
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
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicio"
                    label="Data Inicial da Venda"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Data Final da Venda"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.categoria"
                    :items="categorias"
                    label="Categoria"
                    name="categoria"
                    data-vv-name="Categoria"
                    item-value="id"
                    item-text="descricao"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.tipo"
                    :items="tipos"
                    item-value="id"
                    item-text="descricao"
                    label="Tipo de Pagamento"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.status"
                    :items="situacoes"
                    item-value="id"
                    item-text="descricao"
                    label="Status"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.lojaId"
                    :items="marcas"
                    label="Marca"
                    item-text="nomeFantasia"
                    item-value="id"
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
import { TiposBusiness, RelatorioBusiness, LojaBusiness } from '../../business'
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
        categoria: "TODAS",
        tipo: "TODAS",
        status: "TODAS",
        lojaId: -1
      },
      filePDF: null,
      tiposRel: [],
      tipos: [],
      categorias: [],
      situacoes: [],
      marcas: [],
      loadingBtn: false,
      loading: false
    }
  },
  beforeMount () {
    TiposBusiness.getAllTiposRelatorio()
      .then(response => {
        this.tiposRel = response.data
    })
    TiposBusiness.getAllTipoPagamento()
      .then((response) => {
        this.tipos = response.data;
        this.tipos.push({ id: "TODAS", descricao: 'Todas' })
    });
    TiposBusiness.getAllCategoria()
      .then((response) => {
        this.categorias = response.data;
        this.categorias.push({ id: "TODAS", descricao: 'Todas' })
    });
    TiposBusiness.getAllStatus()
      .then((response) => {
        this.situacoes = response.data;
        this.situacoes.push({ id: "TODAS", descricao: 'Todas' })
    });
    LojaBusiness.findAll()
      .then((response) => {
        this.marcas = response.data;
        this.marcas.push({ id: -1, nomeFantasia: 'Todas' })
    });    
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
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
