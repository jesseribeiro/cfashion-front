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
                      v-model="filtros.marcaId"
                      :error-messages="errors.collect('Marca')"
                      :items="marcas"
                      label="Marca"
                      data-vv-name="Marca"
                      name="Marca"
                      item-text="nomeFantasia"
                      item-value="id"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.dataInicial"
                      label="Data Inicial"
                      type="date"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.dataFinal"
                      label="Data Final"
                      type="date"
                      clearable
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
            <v-toolbar-title>Vendas realizadas</v-toolbar-title>
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
              <td>{{ item.dataVenda | moment("DD/MM/YYYY H:mm") }}</td>
              <td>{{ item.cpf }}</td>
              <td>{{ item.nomeProduto }}</td>
              <td>{{ item.marca }}</td>
              <td>{{ formatValorMonetario(item.vlProduto) }}</td>
              <td>{{ item.qtdParcela }}</td>
              <td>{{ item.tipo }}</td>
              <td class="text-xs-center">
                <core-status-pagamento
                  :status="item.status"
                />
              </td>
              <td class="text-xs-center">
                <v-btn
                  v-if="item.status != 'Pago'"
                  color="primary"
                  @click="openDialogPagar(item)"
                >
                  Pagar
                </v-btn>
                <v-icon
                  v-if="item.status == 'Pago'"
                  title="Cancelar"
                  color="error"
                  @click="openDialogCancelar(item)">
                  mdi-delete-outline
                </v-icon>
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

      <template
        v-if="dialogPagar">
        <v-layout
          row
          justify-center>
          <v-dialog
            v-model="dialogPagar"
            persistent
            max-width="390">
            <v-card>
              <v-card-title class="headline">Realizar pagamento de todas as parcelas</v-card-title>

              <v-card-actions>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogPagar">Cancelar</v-btn>
                <v-spacer/>

                <v-btn
                  :loading="loadingBtn"
                  color="red"
                  @click="confirmarPagar">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
    </v-layout>
  </v-container>
</template>
<script>
import { VendaBusiness, TiposBusiness, LojaBusiness } from '../../business'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'
import moment from "moment";
import DateUtils from '../../utils/dateUtils'
import numberUtils from '../../utils/numberUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Vendas'
  },
  data () {
    return {
      selected: [],
      dialogCancelar: false,
      dialogPagar: false,
      vendaId: null,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
        sortBy: "dataVenda",
      },
      filtros: {
        dataInicial: DateUtils.addDia(new Date(), -1),
        dataFinal: DateUtils.currentDate(),
        status: null,
        cpf: null,
        marcaId: null,
      },
      headers: [
        {
          sortable: false,
          text: 'Data Venda',
          value: 'dataVenda'
        },
        {
          sortable: false,
          text: 'CPF',
          value: 'cpf'
        },
        {
          sortable: false,
          text: 'Produto',
          value: 'nomeProduto'
        },
        {
          sortable: false,
          text: 'Marca',
          value: 'marca'
        },
        {
          sortable: false,
          text: 'Valor',
          value: 'vlProduto'
        },
        {
          sortable: false,
          text: 'Parc.',
          value: 'qtdParcela'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipo'
        },
        {
          sortable: false,
          text: 'Status',
          value: 'status'
        },
        {
          sortable: false,
          text: 'Ações',
          align: 'center',
        },
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
    openDialogCancelar (item) {
      this.dialogCancelar = true
      this.vendaId = item.id
      this.itemSelecionado = { ...item }
    },
    closeDialogCancelar () {
      this.dialogCancelar = false
      this.vendaId = null
      this.itemSelecionado = null
    },
    confirmarCancelar () {
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
    openDialogPagar (item) {
      this.dialogPagar = true
      this.vendaId = item.id
      this.itemSelecionado = { ...item }
    },
    closeDialogPagar () {
      this.dialogPagar = false
      this.vendaId = null
      this.itemSelecionado = null
    },
    confirmarPagar () {
      this.loading = true
      console.log(this.vendaId)
      console.log(this.itemSelecionado)
      VendaBusiness.pagarVenda(this.vendaId)
        .then(response => {
          this.$root.showSucesso('Operação realizada com sucesso')
          this.paginar()
        }).catch(erro => {
          this.$root.showErro(erro.data)
        }).finally(() => {
          this.loading = false
          this.closeDialogPagar()
        })
    },
    pesquisar () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loadingBtn = true
          this.paginar()
        }
      })
    },
    paginar () {
      this.loading = true
      VendaBusiness.pagination(
        this.pagination.rowsPerPage, 
        this.pagination.page - 1, 
        this.pagination.sortBy || 'dataVenda', 
        this.filtros
      )
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
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    }
  }
}
</script>
