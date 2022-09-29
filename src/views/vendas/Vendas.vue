<template>
  <v-container
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex md12>
        <material-card
          color="primary"
          title="Vendas">
          <v-card class="elevation-0">
            <v-card-text>
              <v-form
                @submit.prevent="pesquisar">
                <v-layout
                  row
                  wrap>
                  <v-flex md4>
                    <v-text-field
                      v-mask="'###.###.###-##'"
                      v-model="filtros.cpf"
                      label="CPF"
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.situacao"
                      :items="situacoes"
                      item-value="id"
                      item-text="descricao"
                      label="Situação"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.marcaId"
                      :error-messages="errors.collect('Marca')"
                      :items="marcas"
                      label="Marca"
                      data-vv-name="Marca"
                      name="Marca"
                      item-text="nomeFantasia"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.dataInicial"
                      label="Data Inicial"
                      type="date"
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.dataFinal"
                      label="Data Final"
                      type="date"
                    />
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="primary"
                @click="pesquisar">Pesquisar</v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white">
            <v-toolbar-title>Autorizações</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical />
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="light-blue"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="items"
            :total-items="totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :rows-per-page-text="pagination.rowsPerPageText"
            item-key="id"
            class="elevation-1"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <td class="text-xs-center">{{ item.dataAutorizacao | moment("DD/MM/YYYY H:mm") }}</td>
              <td class="text-xs-center">
                <a :href="`/cad-cliente/${item.clienteId}/${item.lojaId}`">
                  {{ item.cpf }}
                </a>
              </td>
              <td>
                <span v-if="item.valorVenda">
                  {{ item.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}
                </span>
              </td>
              <td class="text-xs-center">{{ item.qtdParcela }}</td>
              <td class="text-xs-center">{{ item.nomeLoja }}</td>
              <td class="text-xs-center">{{ item.codigoAutorizacao }}</td>
              <td class="text-xs-center">{{ item.tipoAutorizacao }}</td>
              <td class="text-xs-center">{{ item.nomeUsuario }}</td>
              <td class="text-xs-center">{{ item.recusado }}</td>
              <td class="text-xs-center">{{ item.situacao }}</td>
              <td class="text-xs-center">
                <v-icon
                  v-if="item.vendaId && item.situacao != 'Cancelada' && $root.isAdminSupCredProp()"
                  color="error"
                  title="Cancelar"
                  @click="openDialogCancelar(item)">
                  mdi-delete-outline
                </v-icon>
              </td>
              <td class="text-xs-center">
                <v-icon
                  v-if="item.carneId && item.situacao != 'Cancelada'"
                  @click="openImprimirCarne(item)">mdi-printer</v-icon>
              </td>
              <td class="text-xs-center">
                <v-icon
                  v-if="item.vendaId"
                  @click="openReciboVenda(item)">mdi-receipt</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <template
        v-if="dialogCancelar">
        <v-layout
          row
          justify-center>
          <v-dialog
            v-model="dialogCancelar"
            persistent
            max-width="390">
            <v-card>
              <v-card-title class="headline">Cancelar Venda</v-card-title>

              <v-card-text>
                <v-layout
                  row
                  wrap>
                  <v-flex md12>
                    <v-alert
                      :value="true"
                      type="warning"
                    >
                      <span>Essa operação não poderá ser desfeita.</span>
                    </v-alert>
                  </v-flex>
                  <v-flex md12>
                    <v-textarea
                      v-model="itemSelecionado.motivo"
                      label="Informe o motivo do cancelamento"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions>

                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogCancelar">Cancelar</v-btn>
                <v-spacer/>

                <v-btn
                  :loading="loadingBtn"
                  color="red"
                  @click="confirmarCancelar">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <core-recibo-venda
        v-if="dialogReciboVenda"
        :venda-id="vendaId"
        :show="dialogReciboVenda"
        :close="closeReciboVenda"
      />
      <core-dialog-imprimir-carne
        v-if="dialogImprimirCarne"
        :value="dialogImprimirCarne"
        :carne-id="carneId"
        :close="closeImprimirCarne"
      />
    </v-layout>
  </v-container>
</template>
<script>
import { VendaBusiness, TiposBusiness, LojaBusiness } from '../../business'
import { MONEY, ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'
import DateUtils from '../../utils/dateUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Autorização'
  },
  data () {
    return {
      vendaId: null,
      carneId: null,
      selected: [],
      money: MONEY,
      statusParcelas: [],
      dialogCancelar: false,
      dialogRecibo: false,
      dialogImprimirCarne: false,
      dialogReciboVenda: false,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
        sortBy: "dataVenda",
      },
      filtros: {
        dataInicial: DateUtils.addDia(new Date(), -1),
        dataFinal: DateUtils.currentDate(),
        situacao: null,
        cpf: null,
        marcaId: null,
      },
      headers: [
        {
          sortable: false,
          text: 'Data Autorização',
          align: 'center',
          value: 'dataAutorizacao'
        },
        {
          sortable: false,
          text: 'CPF cliente',
          align: 'center',
          value: 'cpf'
        },
        {
          sortable: false,
          text: 'Valor',
          value: 'valorVenda'
        },
        {
          sortable: false,
          text: 'Parc.',
          value: 'qtdParcela'
        },
        {
          sortable: false,
          text: 'Loja',
          value: 'nomeLoja'
        },
        {
          sortable: false,
          text: 'Autorização',
          value: 'codigoAutorizacao'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipoAutorizacao'
        },
        {
          sortable: false,
          text: 'Usuário',
          align: 'center',
          value: 'nomeUsuario'
        },
        {
          sortable: false,
          text: 'Recusa por',
          value: 'reusado'
        },
        {
          sortable: false,
          text: 'Situação',
          align: 'center',
          value: 'situacao'
        },
        {
          sortable: false,
          text: 'Ações',
          align: 'center'
        },
        {
          sortable: false,
          text: 'Carnê',
          align: 'center'
        },
        {
          sortable: false,
          text: 'Recibo',
          align: 'center'
        }
      ],
      items: [],
      totalItems: null,
      loading: false,
      loadingBtn: false,
      itemSelecionado: null,
      marcas: [],
      situacoes: []
    }
  },
  watch: {
    pagination: {
      handler () {
        this.paginar()
      }
    }
  },
  beforeMount () {
    TiposBusiness.getAllStatus()
      .then(response => {
        this.situacoes = response.data
    })
    LojaBusiness.findAll().then((response) => {
        this.marcas = response.data;
    })
  },
  methods: {
    closeDialogCancelar () {
      this.dialogCancelar = false
      this.vendaId = null
      this.itemSelecionado = null
    },
    closeReciboVenda () {
      this.dialogReciboVenda = false
      this.vendaId = null
    },
    confirmarCancelar () {
      if (!this.itemSelecionado.motivo) {
        this.$root.showAlerta('Informe o motivo do cancelamento')
        return
      }
      this.loading = true
      VendaBusiness.cancelarVenda(this.vendaId)
        .then(response => {
          this.$root.showSucesso('Operação realizada com sucesso')
          this.paginar()
        }).catch(erro => {
          this.$root.showErro(erro.data)
        }).finally(() => {
          this.loading = false
          this.closeDialogCancelar()
        })
    },

    openDialogCancelar (item) {
      this.dialogCancelar = true
      this.vendaId = item.vendaId
      this.itemSelecionado = { ...item }
    },

    openReciboVenda (item) {
      this.vendaId = item.vendaId
      this.dialogReciboVenda = true
    },

    openImprimirCarne (item) {
      this.carneId = item.carneId
      this.vendaId = item.vendaId
      this.dialogImprimirCarne = true
    },

    closeImprimirCarne () {
      this.dialogImprimirCarne = false
      this.vendaId = null
      this.carneId = null
    },

    pesquisar () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loadingBtn = true
          this.paginar()
        } else {
          this.$root.showAlerta(
            'Informe o CPF!'
          )
        }
      })
    },
    paginar () {
      this.loading = true
      VendaBusiness.pagination(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'dataVenda', this.filtros)
        .then(response => {
          this.items = response.data.content
          this.totalItems = response.data.totalElements
        }).catch(error => {
          this.$root.showErro(error.data)
        })
        .finally(() => {
          this.loadingBtn = false
          this.loading = false
        })
    }
  }
}
</script>
