<template>
  <v-container
    fluid
    grid-list-md>
    <core-progress-modal :show="loading" />
    <template v-if="!loading">
      <v-form
        novalidate
        enctype="multipart/form-data"
        @submit.prevent="validateBeforeSubmit">
        <v-card class="elevation-0">
          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex md12>
                Informe abaixo o cedente que deseja enviar o arquivo de movimento.
              </v-flex>
              <v-flex md12>
                <v-select
                  v-model="filtros.beneficiarioId"
                  :items="listaCedente"
                  label="Cedente"
                  item-value="id"
                  item-text="descricao"
                  @change="onChangeBeneficiario"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <material-card
          v-if="filtros.beneficiarioId"
          color="primary"
          title="Arquivo de Movimento">
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout
                row
                wrap>
                <v-flex
                  v-if="ultimoRetorno"
                  md12
                >
                  Último retorno de PAGAMENTOS número <span class="title">{{ ultimoRetorno.codigo }}</span> gerado em <span class="title">{{ ultimoRetorno.dataCadastro | moment("DD/MM/YYYY") }}</span> - benefeciário <span class="title">{{ ultimoRetorno.beneficiario }}</span>
                </v-flex>
                <v-flex
                  v-else
                  md12
                >
                  Ainda não foi enviado nenhum arquivo de PAGAMENTOS para o beneficiário <span class="title">Prático Administradora de Crediário Ltda </span>
                </v-flex>
                <v-flex
                  md12
                >
                  <input
                    id="anexar"
                    type="file"
                    class="caption"
                    @change="anexar($event)"
                  >
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="primary"
                type="submit"
              >Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-form>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white">
            <v-toolbar-title>
              Útimos Arquivos Enviados
            </v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical />
          </v-toolbar>
          <div class="ml-4 mr-5">
            <span class="body-1">Escolha abaixo um arquivo já gerado anteriormente, para fazer o DOWNLOAD.</span><br>
          </div>
          <v-progress-linear
            :active="loading"
            color="light-blue"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="true"
            :total-items="totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <td class="text-xs-center">
                <a
                  :href="item.anexoPath"
                  download
                  target="_blank"
                >
                  {{ item.anexo }}
                </a>
              </td>
              <td class="text-xs-center">{{ item.dataCadastro | moment("DD/MM/YYYY H:mm") }}</td>
              <td class="text-xs-center">{{ item.sequencial }}</td>
              <td class="justify-end layout mr-2">
                <a
                  :href="item.anexoPath"
                  download
                  target="_blank"
                >
                  <v-icon
                    color="primary"
                    class="mr-2"
                    title="Baixar Arquivo"                  
                  >mdi-cloud-download-outline</v-icon>
                </a>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </template>
  </v-container>
</template>
<script>
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'

export default {
  data () {
    return {
      filtros: {
        emissor: '0',
        cedenteId: null,
        sequencial: '0',
        beneficiarioId: null
      },
      file: {},
      formData: null,
      loading: false,
      loadingBtn: false,
      listaCedente: [],
      ultimoRetorno: null,
      items: [],
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
	      rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
      },
      totalItems: null,
      headers: [
        {
          sortable: false,
          align: 'center',
          text: 'Arquivo',
          value: 'anexo'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Data de Geração',
          value: 'dataCadastro'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Sequencial',
          value: 'sequencial'
        },
        {
          sortable: false,
          align: 'center'
        }
      ],
    }
  },  
  watch: {
    pagination: {
      handler () {
        //this.paginar()
      }
    }
  },
  beforeMount () {
    this.loading = true
  },
  methods: {
    validateBeforeSubmit () {
        if (this.formData) {
          this.loadingBtn = true
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
    },
    anexar (event) {
      if (event && event.target && event.target.files.length > 0) {
        this.file = event.target.files[0]
        this.formData = new FormData()
        this.formData.append('file', this.file)
        this.formData.append('name', this.file.name)
      }
    },
    onChangeBeneficiario (beneficiarioId) {
      if (beneficiarioId) {
        this.loading = true
        this.paginar()
      }
    },
    paginar () {
      this.loading = true
    }
  }
}
</script>
