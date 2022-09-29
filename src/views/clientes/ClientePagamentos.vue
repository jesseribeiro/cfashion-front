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
          title="Pesquisar Pagamentos">
          <v-card class="elevation-0">
            <v-card-text>
              <v-form>
                <v-layout
                  row
                  wrap>
                  <v-flex md2>
                    <v-text-field
                      v-model="filtros.dataInicial"
                      label="Data Inicial"
                      type="date"
                    />
                  </v-flex>
                  <v-flex md1>
                    <span class="layout fill-height align-center justify-center">a</span>
                  </v-flex>
                  <v-flex md2>
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
            <v-toolbar-title>Pagamentos</v-toolbar-title>
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
            :items="pagamentos"
            :total-items="totalPagamentos"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <tr>
                <td class="text-xs-center">{{ item.dataPagto }}</td>
                <td>{{ item.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td>{{ item.tipoPagto }}</td>
                <td>
                  {{ item.formaPagamentoDetalhe ? item.formaPagamentoDetalhe : item.formaPagamento }}
                </td>
                <td class="text-xs-center">
                  <core-status-pagamento
                    :status="item.flgCancelado ? 'Cancelado' : 'Pago'"
                    :motivo-cancelamento="item.motivoCancelamento"
                  />
                </td>
                <td class="text-xs-center">
                  <v-icon
                    @click="openRecibo(item)">mdi-receipt</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <cliente-recibo-pagamento
      v-if="dialogRecibo"
      :pagamento-id="pagamentoId"
      :show="dialogRecibo"
      :close="closeRecibo"
    />
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
        lojaId: null
      },
      headers: [
        {
          sortable: false,
          text: 'Data do Pagto',
          align: 'center',
          value: 'dataPagto'
        },
        {
          sortable: false,
          text: 'Valor Pago',
          value: 'valorPago'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipoPagto'
        },
        {
          sortable: false,
          text: 'Local Pagto',
          value: 'nomeLoja'
        },
        {
          sortable: false,
          text: 'Status',
          align: 'center',
          value: 'status'
        },
        {
          sortable: false,
          text: ''
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
    // if (this.$root.isCrediarista() || this.$root.isProprietario()) {
    this.filtros.lojaId = Number(this.value.lojaId)
    // }
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
    closeRecibo () {
      this.dialogRecibo = false
      this.pagamentoId = null
    },
    openRecibo (item) {
      this.pagamentoId = item.id
      this.dialogRecibo = true
    }

  }
}
</script>
