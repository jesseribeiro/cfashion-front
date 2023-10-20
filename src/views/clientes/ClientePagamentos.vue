<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex md12>
        <material-card
          color="pink"
          title="Pesquisar Pagamentos"
        >
          <v-card class="elevation-0">
            <v-card-text>
              <v-form>
                <v-layout
                  row
                  wrap
                >
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
                color="pink"
                @click="pesquisar"
              >
                Pesquisar
              </v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white"
          >
            <v-toolbar-title>Pagamentos</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            />
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="red"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="pagamentos"
            :total-items="totalPagamentos"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5
            >
              <tr>
                <td>{{ item.dataPagamento | moment("DD/MM/YYYY") }}</td>
                <td>{{ item.valorParcela }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.marca }}</td>
                <td class="text-xs-center">
                  <core-status-pagamento
                    :status="item.status"
                  />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { ClienteBusiness } from '../../business'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogRecibo: false,
      currentPage: 0,
      pageCount: 0,
      form: {},
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        rowsPerPageItems: ROWS_PER_PAGE_ITEMS
      },
      filtros: {
        dataInicial: null,
        dataFinal: null,
        tipo: null
      },
      headers: [
        {
          sortable: false,
          text: 'Data Pagamento',
          value: 'dataPagto'
        },
        {
          sortable: false,
          text: 'Valor Pago',
          value: 'valorParcela'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipo'
        },
        {
          sortable: false,
          text: 'Marca',
          value: 'marca'
        },
        {
          sortable: false,
          text: 'Status',
          align: 'center',
          value: 'status'
        }
      ],
      pagamentos: [],
      totalPagamentos: null,
      loading: false,
      loadingBtn: false,
      pagamentoId: null
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
    this.loading = true
    this.loadingBtn = true
  },
  methods: {
    reload () {
    },
    pesquisar () {
      this.loadingBtn = true
      this.paginar()
    },
    paginar () {
      this.loading = true
      ClienteBusiness.pagamentosCliente(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'dataPagto', this.value.id, this.filtros).then(response => {
        this.pagamentos = response.data.content
        this.totalPagamentos = response.data.totalElements
      }).finally(() => {
        this.loadingBtn = false
        this.loading = false
      })
    },
  }
}
</script>
