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
          title="Pesquisar Carnês/Boletos">
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
                  <v-flex md2>
                    <v-autocomplete
                      v-model="filtros.status"
                      :items="statusCarne"
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
            <v-toolbar-title>Carnês/Boletos</v-toolbar-title>
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
            :headers="headersCarne"
            :items="carnes"
            :expand="false"
            hide-actions
            class="elevation-1 arrow-pagintion"

          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <tr :active="item.expanded">
                <td class="justify-center layout">
                  <v-icon @click="item.expanded = !item.expanded">
                    {{ item.expanded ? 'mdi-minus' : 'mdi-plus' }}
                  </v-icon>
                </td>
                <td class="text-xs-center">{{ item.dataCompra | moment("DD/MM/YYYY") }}</td>
                <td class="text-xs-right">{{ item.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-right">{{ item.valorEntrada.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-center">{{ item.qtdParcela }}</td>
                <td>{{ item.nomeLoja }}</td>
                <td class="text-xs-right">{{ item.totalAtrasoCarne.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-right">{{ item.totalMultaJurosCarne.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-right">{{ item.saldoDevedorCarne.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-center font-weight-black">{{ item.tipoCarne }}</td>
                <td class="text-xs-center">
                  <core-status-pagamento
                    :status="item.status"
                  />
                </td>
                <td class="text-xs-center">
                  <v-icon
                    v-if="item.status === 'Em Aberto'"
                    @click="gerarCarnePDF(item.carneId)">mdi-printer</v-icon>
                </td>
                <td class="text-xs-center">
                  <v-icon
                    v-if="(item.status != 'Pago' && item.status != 'Cancelado') && $root.isAdminSupCredProp()"
                    color="error"
                    title="Cancelar Carnê"
                    @click="openDialogCancelar(item)">mdi-delete-outline
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
                      ma-5>
                      <tr>
                        <td class="text-xs-center">{{ item.numero === 0 ? 'Entrada' : item.numero }}</td>
                        <td class="text-xs-center">{{ item.dataVencimento }}</td>
                        <td class="text-xs-right">{{ item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-if="!!item.valorMulta"
                          class="text-xs-right">{{ item.valorMulta.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-else
                          class="text-xs-right">-</td>
                        <td
                          v-if="!!item.valorJurosMora"
                          class="text-xs-right">{{ item.valorJurosMora.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-else
                          class="text-xs-right">-</td>
                        <td
                          v-if="!!item.desconto"
                          class="text-xs-right">{{ item.desconto.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-else
                          class="text-xs-right">-</td>
                        <td
                          v-if="!!item.valorPago"
                          class="text-xs-right">{{ item.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-else
                          class="text-xs-right">-</td>
                        <td
                          v-if="!!item.dataPagto"
                          class="text-xs-center">{{ item.dataPagto }}</td>
                        <td
                          v-else
                          class="text-xs-center"
                        >-</td>
                        <td>{{ item.localPagto }}</td>
                        <td class="text-xs-center">
                          <core-status-pagamento
                            :status="item.status"
                            :motivo-cancelamento="item.motivoCancelamento"
                          />
                        </td>
                        <td class="text-xs-center">
                          <v-icon
                            v-if="(item.status === 'Pago' || item.status === 'Cancelado')  && item.pagamentoId"
                            @click="openRecibo(item)"
                          >mdi-receipt
                          </v-icon>
                          <v-btn
                            v-if="item.status === 'Em Aberto'"
                            color="primary"
                            @click="openDialogPagar(item)">
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
    <template
      v-if="dialogPagar">
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="dialogPagar"
          persistent
          max-width="400">
          <v-card>
            <v-card-title class="headline">Pagar Parcela</v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap>
                <v-flex
                  v-if="$root.isAdminSup()"
                  md12>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="itemSelecionado.tipoPagamento"
                    :items="tpPagamento"
                    :error-messages="errors.collect('Tipo')"
                    label="Tipo de Pagamento"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-model="itemSelecionado.dataVencimento"
                    label="Vencimento"
                    box
                    readonly
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.valor"
                    v-money="money"
                    v-model.lazy="itemSelecionado.valor"
                    box
                    readonly
                    type="tel"
                    prefix="R$"
                    label="Valor Original"
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.valorMulta"
                    v-money="money"
                    v-model.lazy="itemSelecionado.valorMulta"
                    box
                    readonly
                    type="tel"
                    prefix="R$"
                    label="Multa [ + ]"
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.valorJurosMora"
                    v-money="money"
                    v-model.lazy="itemSelecionado.valorJurosMora"
                    box
                    readonly
                    type="tel"
                    prefix="R$"
                    label="Juros Mora [ + ]"
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.desconto"
                    v-money="money"
                    v-model.lazy="itemSelecionado.desconto"
                    box
                    readonly
                    type="tel"
                    prefix="R$"
                    label="Desconto [ - ] "
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-formata-moeda="itemSelecionado.valorPago"
                    v-money="money"
                    v-model.lazy="itemSelecionado.valorPago"
                    box
                    type="tel"
                    prefix="R$"
                    label="Valor a Pagar"
                  />
                  <embed
                    v-if="!$root.isAdmin()"
                    readonly
                  >
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogPagar">Cancelar</v-btn>

              <v-spacer/>
              <v-btn
                :loading="loadingBtn"
                color="primary"
                @click="confirmarPagar">Confirmar Pagamento</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template v-if="openViewCarne">
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="openViewCarne"
          max-width="800">
          <v-layout
            v-if="!filePDF"
            class="justify-center">
            <core-progress-modal :show="!filePDF" />
          </v-layout>
          <embed
            v-else
            id="plugin"
            :src="filePDF"
            width="100%"
            height="1000px"
            name="plugin"
            type="application/pdf">
        </v-dialog>
      </v-layout>
    </template>
    <core-recibo-venda
      v-if="dialogReciboVenda"
      :venda-id="vendaId"
    />
    <cliente-recibo-pagamento
      v-if="dialogRecibo"
      :pagamento-id="pagamentoId"
      :show="dialogRecibo"
      :close="closeRecibo"
    />
  </v-container>
</template>
<script>
import { ClienteBusiness, VendaBusiness, TiposBusiness, CarneBusiness } from '../../business'
import { MONEY } from '../../constants'

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
      dialogRecibo: false,
      pagamentoId: null,
      openViewCarne: false,
      filePDF: null,
      expanded: false,
      currentPage: 0,
      pageCount: 0,
      dialogCancelar: false,
      dialogReciboVenda: false,
      dialogPagar: false,
      form: {},
      selected: [],
      filtros: {
        dataInicial: null,
        dataFinal: null,
        lojaId: null,
        status: null
      },
      tpPagamento: [],
      headersCarne: [
        {
          sortable: false,
          text: ''
        },
        {
          sortable: false,
          text: 'Data',
          align: 'center',
          value: 'dataCompra'
        },
        {
          sortable: false,
          text: 'Valor',
          align: 'right',
          value: 'valorTotal'
        },
        {
          sortable: false,
          text: 'Entrada',
          align: 'right',
          value: 'valorEntrada'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Parcelas',
          value: 'qtdParcela'
        },
        {
          sortable: false,
          text: 'Loja',
          value: 'nomeLoja'
        },
        {
          sortable: false,
          text: 'Multa',
          align: 'right',
          value: 'totalAtrasoCarne'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Juros Mora',
          value: 'totalMultaJurosCarne'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Saldo Devedor',
          value: 'saldoDevedorCarne'
        },
        {
          sortable: false,
          text: 'Carnê',
          align: 'center',
          value: 'tipoCarne'
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
        },
        {
          sortable: false,
          text: 'Cancelar',
          align: 'center'
        }
      ],
      carnes: [],
      items: [],
      loading: false,
      loadingBtn: false,
      itemSelecionado: null,
      statusCarne: [],
      headersParcela: [
        {
          sortable: false,
          align: 'center',
          text: 'Parcela',
          value: 'numero',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Vencto',
          value: 'dataVencimento',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Valor Parcela',
          value: 'valor',
          align: 'right',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Multa',
          value: 'valorMulta',
          align: 'right',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Juros Mora',
          value: 'valorJurosMora',
          align: 'right',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Desconto',
          value: 'desconto',
          align: 'right',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Valor Pago',
          value: 'valorPago',
          align: 'right',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Pagto Em',
          value: 'dataPagto',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Local Pagto',
          value: 'localPagto',
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
    // if (this.$root.isCrediarista() || this.$root.isProprietario()) {
    this.filtros.lojaId = Number(this.value.lojaId)
    // }
    TiposBusiness.getAllTipoPagamento()
      .then(response => {
        this.tpPagamento = response.data
      })
    TiposBusiness.getAllStatusCarne()
      .then(response => {
        this.statusCarne = response.data
      })
    this.paginar()
  },
  methods: {
    pesquisar () {
      this.loadingBtn = true
      this.paginar()
    },
    gerarCarnePDF (carneId) {
      this.filePDF = null
      this.openViewCarne = true
      CarneBusiness.geraCarnePDF(carneId)
        .then(response => {
          // For IE using atob convert base64 encoded data to byte array
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            this.openViewCarne = false
            var byteCharacters = atob(response.data)
            var byteNumbers = new Array(byteCharacters.length)
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            var byteArray = new Uint8Array(byteNumbers)
            var blob = new Blob([byteArray], {
              type: 'application/pdf'
            })
            window.navigator.msSaveOrOpenBlob(blob, 'carne_compra.pdf')
          } else {
            this.filePDF = window.URL.createObjectURL(response.data)
            // this.filePDF = 'data:application/pdf;base64,' + response.data
          }
        })
        .catch(erro => {
          this.$root.showErro('Erro ao gerar o carne de compra')
          this.filePDF = null
          this.openViewCarne = false
        })
        .finally(() => {
        })
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
      if (!this.$root.isAdminSup()) {
        this.itemSelecionado.tipoPagamento = 'LOJA'
      }
      if (!this.itemSelecionado.tipoPagamento) {
        this.$root.showAlerta('Informe o tipo de Pagamento')
        return
      }
      this.loadingBtn = true
      VendaBusiness.pagarParcela(this.itemSelecionado)
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
        });
    },
    openDialogPagar (item) {
      if (!this.$root.isAdminSup()) {
        this.$root.showAlerta('Apenas Administradores ou Supervisores podem realizar essa ação')
        return
      }  
      this.dialogPagar = true
      this.vendaId = item.vendaId
      this.itemSelecionado = { ...item }
    },
    openDialogCancelar (item) {
      this.dialogCancelar = true
      this.vendaId = item.vendaId
      this.itemSelecionado = { ...item }
    },
    paginar () {
      this.loading = true
      ClienteBusiness.carnesCliente(this.value.id, this.filtros).then(response => {
        this.carnes = response.data
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
      this.pagamentoId = item.pagamentoId
      this.dialogRecibo = true
    }
  }
}
</script>
