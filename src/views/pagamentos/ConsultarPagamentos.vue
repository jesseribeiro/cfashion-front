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
          title="Consultar Pagamentos">
          <v-form
            novalidate
            @submit.prevent="pesquisar">
            <v-card class="elevation-0">
              <v-card-text>
                <v-layout
                  row
                  wrap>
                  <v-flex md3>
                    <v-autocomplete
                      v-model="filtros.redeId"
                      :items="redes"
                      item-value="id"
                      item-text="descricao"
                      label="Rede"
                    />
                  </v-flex>
                  <!--
                  <v-flex md3>
                    <v-autocomplete
                      v-model="filtros.localPagamentoId"
                      :items="locaisPagamento"
                      item-value="id"
                      item-text="descricao"
                      label="Local Pagamento"
                    />
                  </v-flex>
                  -->
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
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :loading="loadingBtn"
                  color="primary"
                  type="submit">Pesquisar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white">
            <v-toolbar-title class="mt-5">
              Pagamentos
              <p class="body-1 mt-2">
                Foram encontrados <span class="title">{{ qtdItems }} </span> pagamento(s) no valor total de <span class="title">R$ {{ formatValorMonetario(valorTotal) }}</span>
              </p>
            </v-toolbar-title>
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
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <td class="text-xs-center">{{ item.dataPagto }}</td>
              <td>
                <a :href="`/cad-cliente/${item.clienteId}/${item.lojaId}`">
                  {{ item.clienteCpf }}
                </a>
              </td>
              <td class="text-xs-right">{{ formatValorMonetario(item.valorPago) }}</td>
              <td>{{ item.tipoPagto }}</td>
              <td>
                {{ item.formaPagamentoDetalhe ? item.formaPagamentoDetalhe : item.formaPagamento }}
              </td>
              <td class="text-xs-center">
                <v-icon
                  title="Comprovante de pagamento"
                  @click="openRecibo(item)">mdi-receipt</v-icon>
              </td>
              <td class="text-xs-center">
                <v-icon
                  v-if="!item.flgCancelado"
                  color="error"
                  title="Cancelar Pagamento"
                  @click="openDialogCancelar(item)">
                  mdi-delete-outline
                </v-icon>
                <core-status-pagamento
                  v-else
                  :status="'Cancelado'"
                  :motivo-cancelamento="item.motivoCancelamento"
                />
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
              <v-card-title class="headline">Cancelar Pagamento</v-card-title>
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
      <cliente-recibo-pagamento
        v-if="dialogRecibo"
        :pagamento-id="pagamentoId"
        :show="dialogRecibo"
        :close="closeRecibo"
      />
    </v-layout>
  </v-container>
</template>
<script>
import { VendaBusiness, TiposBusiness, PagamentoBusiness } from '../../business'
import { MONEY, ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS, TODAS_ID } from '../../constants'
import dateUtils from '../../utils/dateUtils'
import numberUtils from '../../utils/numberUtils'

const ClienteReciboPagamento = () => import('../clientes/ClienteReciboPagamento.vue')

export default {
  components: {
    ClienteReciboPagamento
  },
  data () {
    return {
      money: MONEY,
      dialogCancelar: false,
      dialogRecibo: false,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        rowsPerPageItems: ROWS_PER_PAGE_ITEMS
      },
      filtros: {
        redeId: TODAS_ID,
        dataInicial: dateUtils.ontem(),
        dataFinal: dateUtils.currentDate(),
        localPagamentoId: TODAS_ID
      },
      headers: [
        {
          sortable: false,
          text: 'Data do pagamento',
          align: 'center',
          value: 'dataPagto'
        },
        {
          sortable: false,
          text: 'CPF',
          value: 'clienteCpf'
        },
        {
          sortable: false,
          text: 'Valor Pago',
          value: 'valorPago',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipo'
        },
        {
          sortable: false,
          text: 'Local Pagto',
          value: 'nomeLoja'
        },
        /*
        {
          sortable: false,
          text: 'Origem',
          align: 'center',
          value: 'origem'
        },
        */
        {
          sortable: false,
          text: 'Recibo',
          align: 'center'
        },
        {
          sortable: false,
          text: 'Ações',
          align: 'center'
        }
      ],
      items: [],
      totalItems: 0,
      valorTotal: 0,
      qtdItems: 0,
      loading: false,
      loadingBtn: false,
      pagamentoId: null,
      itemSelecionado: null,
      redes: [],
      locaisPagamento: [
        { id: TODAS_ID, descricao: 'Todos' }
      ]
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
    this.redes.push({ id: TODAS_ID, descricao: 'Todas Redes' })
    TiposBusiness.getAllRedes().then(response => {
      this.redes = this.redes.concat(response.data)
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    closeDialogCancelar () {
      this.dialogCancelar = false
      this.itemSelecionado = null
    },
    closeRecibo () {
      this.dialogRecibo = false
      this.pagamentoId = null
    },
    confirmarCancelar () {
      if (!this.itemSelecionado.motivo) {
        this.$root.showAlerta('Informe o motivo do cancelamento')
        return
      }
      this.loading = true
      this.loadingBtn = true
      VendaBusiness.cancelarPagamento({
        id: this.itemSelecionado.id,
        motivo: this.itemSelecionado.motivo,
        lojaId: this.itemSelecionado.lojaId,
        usuarioId: this.$root.usuarioId()
      })
        .then(response => {
          this.$root.showSucesso(response.data)
          this.paginar()
          this.closeDialogCancelar()
        }).catch(erro => {
          this.$root.showErro(erro.data)
          this.loading = false
          this.loadingBtn = false
        })
    },
    openDialogCancelar (item) {
      this.dialogCancelar = true
      this.itemSelecionado = { ...item }
    },
    openRecibo (item) {
      this.pagamentoId = item.id
      this.dialogRecibo = true
    },
    pesquisar () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loadingBtn = true
          this.paginar()
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
      })
    },
    paginar () {
      this.loading = true
      PagamentoBusiness.pagination(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'dataPagto', this.filtros)
        .then(response => {
          this.items = response.data.content[0]['pagamentos']
          this.valorTotal = response.data.content[0]['valorTotal']
          this.qtdItems = response.data.content[0]['qtdItems']
          this.totalItems = response.data.totalElements
        }).catch(error => {
          this.$root.showErro(error.data.message)
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
