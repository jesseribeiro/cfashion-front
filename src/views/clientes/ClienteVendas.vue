<!-- eslint-disable vue/no-template-shadow -->
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
          title="Pesquisar Vendas"
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
            <v-toolbar-title>Vendas</v-toolbar-title>
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
            :headers="headersVenda"
            :items="vendas"
            :expand="false"
            hide-actions
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5
            >
              <tr :active="item.expanded">
                <td class="justify-center layout">
                  <v-icon @click="item.expanded = !item.expanded">
                    {{ item.expanded ? 'mdi-minus' : 'mdi-plus' }}
                  </v-icon>
                </td>
                <td>{{ item.dataVenda | moment("DD/MM/YYYY") }}</td>
                <td class="font-weight-black">
                  {{ formatValorMonetario(item.vlTotal) }}
                </td>
                <td>{{ item.nomeProduto }}</td>
                <td>{{ item.qtdParcela }}</td>
                <td>{{ item.marca }}</td>
                <td>{{ item.tipo }}</td>
                <td class="text-xs-center">
                  <core-status-pagamento
                    :status="item.status"
                  />
                </td>
                <td class="text-xs-center">
                  <v-icon
                    v-if="(item.status != 'Cancelado')"
                    color="brown"
                    title="Cancelar Venda"
                    @click="openDialogCancelar(item)"
                  >
                    mdi-delete-outline
                  </v-icon>
                </td>
              </tr>
              <tr v-if="item.expanded">
                <td colspan="13">
                  <v-data-table
                    :headers="headersParcela"
                    :items="item.parcelas"
                    hide-actions
                    class="elevation-1 arrow-pagintion"
                  >
                    <template
                      slot="items"
                      slot-scope="{ item }"
                      ma-5
                    >
                      <tr>
                        <td>{{ item.numero }}</td>
                        <td>{{ item.dataVencimento | moment("DD/MM/YYYY") }}</td>
                        <td>{{ formatValorMonetario(item.valorParcela) }}</td>    
                        <td v-if="!!item.dataPagamento">
                          {{ item.dataPagamento | moment("DD/MM/YYYY") }}
                        </td>
                        <td v-else>
                          -
                        </td>
                        <td class="text-xs-center">
                          <core-status-pagamento
                            :status="item.status"
                          />
                        </td>
                        <td class="text-xs-center">
                          <v-btn
                            v-if="item.status === 'Em Aberto'"
                            color="pink"
                            @click="openDialogPagar(item)"
                          >
                            <span class="white--text">Pagar</span>
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <template
      v-if="dialogCancelar"
    >
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogCancelar"
          persistent
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Cancelar Venda
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md12>
                  <v-alert
                    :value="true"
                    type="warning"
                  >
                    <span>Essa operação não poderá ser desfeita.</span>
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogCancelar"
              >
                Cancelar
              </v-btn>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="red"
                @click="confirmarCancelar"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template
      v-if="dialogPagar"
    >
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogPagar"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">
              Pagar Parcela
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.valorParcela"
                    v-money="money"
                    v-model.lazy="itemSelecionado.valorParcela"
                    box
                    readonly
                    type="tel"
                    prefix="R$"
                    label="Valor Parcela"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogPagar"
              >
                Cancelar
              </v-btn>

              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="green"
                @click="confirmarPagar"
              >
                Confirmar Pagamento
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { ClienteBusiness, VendaBusiness, TiposBusiness, ParcelaBusiness } from '../../business'
import { MONEY } from '../../constants'
import numberUtils from '../../utils/numberUtils'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      money: MONEY,
      vendaId: null,
      parcelaId: null,
      expanded: false,
      currentPage: 0,
      pageCount: 0,
      dialogCancelar: false,
      dialogPagar: false,
      form: {},
      selected: [],
      filtros: {
        dataInicial: null,
        dataFinal: null,
        lojaId: null,
        status: null
      },
      headersVenda: [
        {
          sortable: false,
          text: ''
        },
        {
          sortable: false,
          text: 'Data',
          value: 'dataVenda'
        },
        {
          sortable: false,
          text: 'Valor',
          value: 'vlTotal'
        },
        {
          sortable: false,
          text: 'Produto',
          value: 'nomeProduto'
        },
        {
          sortable: false,
          text: 'Parcelas',
          value: 'qtdParcela'
        },
        {
          sortable: false,
          text: 'Marca',
          value: 'marca'
        },
        {
          sortable: false,
          text: 'Tipo',
          value: 'tipo'
        },
        {
          sortable: false,
          text: 'Status',
          align: 'center',
          value: 'status'
        },
        {
          sortable: false,
          text: 'Cancelar',
          align: 'center'
        }
      ],
      vendas: [],
      items: [],
      loading: false,
      loadingBtn: false,
      itemSelecionado: null,
      situacoes: [],
      headersParcela: [
        {
          sortable: false,
          text: 'Parcela',
          value: 'numero',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Vencimento',
          value: 'dataVencimento',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Valor Parcela',
          value: 'valorParcela',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Pagto Em',
          value: 'dataPagamento',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Status',
          value: 'status',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Ações',
          value: 'acoes',
          class: 'grey lighten-1'
        }
      ]
    }
  },
  beforeMount () {
    TiposBusiness.getAllStatus()
      .then(response => {
        this.situacoes = response.data
    })
    this.paginar()
  },
  methods: {
    pesquisar () {
      this.loadingBtn = true
      this.paginar()
    },
    closeDialogCancelar () {
      this.dialogCancelar = false
      this.vendaId = null
      this.itemSelecionado = null
    },
    closeDialogPagar () {
      this.dialogPagar = false
      this.vendaId = null
      this.itemSelecionado = null
    },
    confirmarPagar () {
      this.loadingBtn = true
      ParcelaBusiness.pagarParcela(this.parcelaId)
        .then(response => {
          this.$root.showSucesso('Operação realizada com sucesso')
          this.paginar()
        }).catch(erro => {
          this.$root.showErro(erro.data.message)
        }).finally(() => {
          this.loadingBtn = false
          this.closeDialogPagar()
        })
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
        });
    },
    openDialogPagar (item) {
      this.dialogPagar = true
      this.parcelaId = item.id
      this.itemSelecionado = { ...item }
    },
    openDialogCancelar (item) {
      this.dialogCancelar = true
      this.vendaId = item.id
      this.itemSelecionado = { ...item }
    },
    paginar () {
      this.loading = true
      ClienteBusiness.vendasCliente(this.value.id, this.filtros).then(response => {
        this.vendas = response.data
        this.toggleAll()
        this.vendas.forEach(venda => {
          venda.expanded = true
        })
      }).finally(() => {
        this.loadingBtn = false
        this.loading = false
      })
    },
    toggleAll () {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.selected = this.vendas.slice()
      }
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    }
  }
}
</script>
