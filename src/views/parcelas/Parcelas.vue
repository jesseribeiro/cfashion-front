<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <material-card color="primary" title="Pagamentos Carnê do Cliente">
          <v-form novalidate @submit.prevent="pesquisar">
            <v-card class="elevation-0">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex md12>
                    <core-filtro-rede-empresa-loja
                      v-model="filtros"
                      show-todas
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-mask="'###.###.###-##'"
                      v-validate="'required'"
                      v-model="filtros.cpf"
                      :error-messages="errors.collect('CPF')"
                      data-vv-name="CPF"
                      label="CPF"
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.status"
                      :items="statusParcelas"
                      item-value="id"
                      item-text="descricao"
                      label="Status"
                      clearable
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :loading="loadingBtn" color="primary" type="submit"
                  >Pesquisar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar flat color="white">
            <v-toolbar-title>PAGAMENTOS DE CARNÊS</v-toolbar-title>
            <v-divider class="mx-2" inset vertical />
            <v-spacer />
            <v-btn
              v-if="temItemSelecionado"
              color="primary"
              @click="openDialogPagarSelecionados"
            >
              Pagar Parcelas Selecionadas
            </v-btn>
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
            <template slot="items" slot-scope="{ item }" ma-5>
              <tr :active="item.selected">
                <td>
                  <v-checkbox
                    v-if="item.status == 'Em Aberto'"
                    v-model="item.selected"
                    primary
                    hide-details
                  />
                </td>
                <td class="text-xs-center">
                  {{ item.dataVencimento | moment("DD/MM/YYYY") }}
                </td>
                <td class="text-xs-center">
                  {{ item.numero === 0 ? "Entrada" : item.numero }}
                </td>
                <td>
                  {{
                    item.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-if="item.valorMulta">
                  {{
                    item.valorMulta.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-else>-</td>
                <td v-if="item.valorJurosMora">
                  {{
                    item.valorJurosMora.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-else>-</td>
                <td
                  v-if="
                    (item.status == 'Pago' || item.flgCancelado) &&
                    item.desconto
                  "
                >
                  {{
                    item.desconto.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-else>0,00</td>
                <td
                  v-if="
                    (item.status == 'Pago' || item.flgCancelado) &&
                    item.valorPago
                  "
                >
                  {{
                    item.valorPago.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-else>-</td>
                <td v-if="item.status == 'Em Aberto' && item.valorPago">
                  {{
                    item.valorPago.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
                <td v-else>-</td>
                <td v-if="item.dataPagto" class="text-xs-center">
                  {{ item.dataPagto }}
                </td>
                <td v-else>-</td>
                <td>{{ item.localPagto }}</td>
                <td class="text-xs-center">
                  <core-status-pagamento
                    :status="item.status"
                    :motivo-cancelamento="item.motivoCancelamento"
                  />
                </td>
                <td class="text-xs-center">
                  <v-btn
                    v-if="item.status == 'Em Aberto'"
                    color="primary"
                    @click="openDialogPagar(item)"
                  >
                    Pagar
                  </v-btn>
                  <v-btn
                    v-if="
                      item.status == 'Pago' &&
                      item.podeCancelar &&
                      item.numero !== 0
                    "
                    outline
                    color="error"
                    @click="openDialogCancelar(item)"
                  >
                    Cancelar Pagamento
                  </v-btn>
                </td>
                <td class="text-xs-center">
                  <v-icon
                    v-if="item.status == 'Pago' || item.flgCancelado"
                    @click="openRecibo(item)"
                    >mdi-receipt</v-icon
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <template v-if="dialogPagar">
        <v-layout row justify-center>
          <v-dialog v-model="dialogPagar" persistent max-width="400">
            <v-card>
              <v-card-title class="headline">Pagar Parcela</v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex md12>
                    <div class="containVencimento">
                      <div
                        style="
                          font-size: 0.75rem;
                          line-height: 1rem;
                          color: rgba(75 85 99, 0.2);
                        "
                      >
                        Vencimento
                      </div>
                      <div
                        style="
                          font-size: 0.875rem;
                          line-height: 1.25rem;
                          color: rgba(55 65 81, 1);
                        "
                      >
                        {{ itemSelecionado.dataVencimento }}
                      </div>
                    </div>
                    <!--
                    <v-text-field
                      v-model="itemSelecionado.dataVencimento"
                      label="Vencimento"
                      type="date"
                      box
                      format=""
                      readonly
                    />-->
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
                    <embed v-if="!$root.isAdmin()" readonly />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogPagar"
                  >Cancelar</v-btn
                >

                <v-spacer />
                <v-btn
                  :loading="loadingBtn"
                  color="primary"
                  @click="confirmarPagamento"
                  >Confirmar Pagamento</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <template v-if="dialogCancelar">
        <v-layout row justify-center>
          <v-dialog v-model="dialogCancelar" persistent max-width="390">
            <v-card>
              <v-card-title class="headline">Cancelar Pagamento</v-card-title>

              <v-card-text>
                <v-layout row wrap>
                  <v-flex md12>
                    <v-alert :value="true" type="warning">
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
                  @click="closeDialogCancelar"
                  >Cancelar</v-btn
                >
                <v-spacer />

                <v-btn
                  :loading="loadingBtn"
                  color="red"
                  @click="confirmarCancelar"
                  >Confirmar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <template v-if="dialogPagarSelecionados">
        <v-layout row justify-center>
          <v-dialog
            v-model="dialogPagarSelecionados"
            persistent
            max-width="600"
          >
            <v-card>
              <v-card-title class="headline"
                >Pagar Várias Parcelas</v-card-title
              >
              <v-card-text>
                <v-container v-if="loading" fluid fill-height>
                  <core-progress-modal :show="loading" />
                </v-container>
                <v-data-table
                  v-else
                  :headers="headersSelecionados"
                  :items="itemsSelecionado"
                  item-key="id"
                  class="elevation-1"
                  hide-actions
                >
                  <template slot="items" slot-scope="{ item }" ma-5>
                    <td class="text-xs-center">
                      {{ item.dataVencimento | moment.format("DD/MM/YYYY") }}
                    </td>
                    <td class="text-xs-center">{{ item.numero }}</td>
                    <td>
                      {{
                        item.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                    <td v-if="item.valorMulta">
                      {{
                        item.valorMulta.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                    <td v-else>-</td>
                    <td v-if="item.valorJurosMora">
                      {{
                        item.valorJurosMora.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                    <td v-else>-</td>
                    <td class="text-xs-right">
                      {{
                        item.valorPago.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                  </template>
                  <template slot="footer">
                    <td :colspan="headersSelecionados.length - 1">
                      <span class="title">Total a ser pago</span>
                    </td>
                    <td class="text-xs-right">
                      <span class="title">{{
                        totalApagarParcelasSelecionadas.toLocaleString(
                          "pt-BR",
                          { minimumFractionDigits: 2 }
                        )
                      }}</span>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogPagarSelecionados"
                  >Cancelar</v-btn
                >

                <v-spacer />
                <v-btn
                  :loading="loadingBtn"
                  color="primary"
                  @click="confirmarPagamentoSelecionados"
                  >Confirmar Pagamento</v-btn
                >
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
import { ClienteBusiness, VendaBusiness, TiposBusiness } from "../../business";
import { MONEY, ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from "../../constants";
import moment from "moment";
const ClienteReciboPagamento = () =>
  import("../clientes/ClienteReciboPagamento.vue");

export default {
  components: {
    ClienteReciboPagamento,
  },
  data() {
    return {
      selected: [],
      money: MONEY,
      statusParcelas: [],
      dialogCancelar: false,
      dialogPagar: false,
      dialogRecibo: false,
      dialogPagarSelecionados: false,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
      },
      filtros: {
        redeId: null,
        empresaId: null,
        lojaId: null,
        dataInicial: null,
        dataFinal: null,
        status: null,
        cpf: null,
      },
      headersSelecionados: [
        {
          sortable: false,
          text: "Vencimento",
          align: "center",
          value: "dataVencimento",
        },
        {
          sortable: false,
          text: "Parc.",
          align: "center",
          value: "numero",
        },
        {
          sortable: false,
          text: "Valor Original",
          value: "valorParcela",
        },
        {
          sortable: false,
          text: "Multa",
          value: "valorMulta",
        },
        {
          sortable: false,
          text: "Juros Mora",
          value: "valorJurosMora",
        },
        {
          sortable: false,
          text: "Valor a ser pago",
          value: "valorPago",
        },
      ],
      headers: [
        {
          sortable: false,
          text: "",
        },
        {
          sortable: false,
          text: "Vencimento",
          align: "center",
          value: "dataVencimento",
        },
        {
          sortable: false,
          text: "Parc.",
          align: "center",
          value: "numero",
        },
        {
          sortable: false,
          text: "Valor Original",
          value: "valorParcela",
        },
        {
          sortable: false,
          text: "Multa",
          value: "valorMulta",
        },
        {
          sortable: false,
          text: "Juros Mora",
          value: "valorJurosMora",
        },
        {
          sortable: false,
          text: "Desconto",
          value: "desconto",
        },
        {
          sortable: false,
          text: "Valor Pago",
          value: "valorPago",
        },
        {
          sortable: false,
          text: "Valor a Pagar",
          value: "valorDevedor",
        },
        {
          sortable: false,
          text: "Data Pagto",
          align: "center",
          value: "dataPagto",
        },
        {
          sortable: false,
          text: "Local Pagto",
          value: "nomeLoja",
        },
        {
          sortable: false,
          text: "Status",
          align: "center",
          value: "status",
        },
        {
          sortable: false,
          text: "Ações",
          align: "center",
        },
        {
          sortable: false,
          text: "Recibo",
          align: "center",
        },
      ],
      items: [],
      totalItems: null,
      loading: false,
      loadingBtn: false,
      itemSelecionado: null,
      pagamentoId: null,
    };
  },
  computed: {
    itemsSelecionado() {
      var self = this;
      return this.items
        .filter((item) => item.selected)
        .map((item) => {
          item.lojaId = self.filtros.lojaId;
          if (!item.valorPago) {
            item.valorPago = item.valor;
          }
          return item;
        });
    },
    temItemSelecionado() {
      return this.itemsSelecionado.length > 0;
    },
    totalApagarParcelasSelecionadas() {
      return this.itemsSelecionado
        .map((item) => item.valorPago)
        .reduce((total, valor) => total + valor);
    },
  },
  watch: {
    itemSelecionado(val) {
      console.log(val);
    },
    pagination: {
      handler() {
        this.paginar();
      },
    },
  },
  beforeMount() {
    TiposBusiness.getAllStatusParcela().then((response) => {
      this.statusParcelas = response.data;
    });
  },
  methods: {
    closeDialogPagar() {
      this.dialogPagar = false;
      this.itemSelecionado = null;
    },
    closeDialogCancelar() {
      this.dialogCancelar = false;
      this.itemSelecionado = null;
    },
    closeRecibo() {
      this.dialogRecibo = false;
      this.pagamentoId = null;
    },
    confirmarCancelar () {
      if (!this.$root.isAdminSupCredProp()) {
        this.$root.showAlerta('Esse usuário não pode realizar essa ação')
        return
      }
      if (!this.itemSelecionado.motivo) {
        this.$root.showAlerta("Informe o motivo do cancelamento");
        return;
      }
      this.loadingBtn = true;
      VendaBusiness.cancelarPagamento({
        id: this.itemSelecionado.pagamentoId,
        motivo: this.itemSelecionado.motivo,
        lojaId: this.itemSelecionado.lojaId,
        usuarioId: this.$root.usuarioId(),
      })
        .then((response) => {
          this.$root.showSucesso(response.data);
          this.paginar();
          this.closeDialogCancelar();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loading = false;
          this.loadingBtn = false;
        });
    },
    confirmarPagamento() {
      if (!this.$root.isAdminSupCredProp()) {
        this.$root.showAlerta("Esse usuário não pode realizar essa ação");
        return;
      }
      this.loadingBtn = true;
      VendaBusiness.pagarParcela(this.itemSelecionado)
        .then((response) => {
          this.$root.showSucesso("Parcela paga com sucesso");
          this.paginar();
          this.closeDialogPagar();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data.message);
          this.loading = false;
          this.loadingBtn = false;
        });
    },

    openDialogCancelar(item) {
      this.dialogCancelar = true;
      this.setItemSelecionado(item);
    },

    openDialogPagar(item) {
      this.dialogPagar = true;
      this.setItemSelecionado(item);
    },

    openRecibo(item) {
      this.pagamentoId = item.pagamentoId;
      this.dialogRecibo = true;
    },

    setItemSelecionado(item) {
      this.itemSelecionado = { ...item };
      this.itemSelecionado.lojaId = this.filtros.lojaId;
      /*this.itemSelecionado.dataVencimento = this.$moment(
        this.itemSelecionado.dataVencimento
      ).format("YYYY-MM-DD");*/
      if (this.itemSelecionado.dataPagto) {
        this.itemSelecionado.dataPagto = this.itemSelecionado.dataPagto;
      }
      if (!this.itemSelecionado.valorPago) {
        this.itemSelecionado.valorPago = this.itemSelecionado.valor;
      }
    },
    reload() {},
    pesquisar() {
      this.$validator.validate().then((result) => {
        if (result && this.filtros.lojaId) {
          this.loadingBtn = true;
          this.paginar();
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
    },
    paginar() {
      if (!this.filtros.cpf) return;
      this.loading = true;
      ClienteBusiness.parcelasCliente(
        this.pagination.rowsPerPage,
        this.pagination.page - 1,
        this.pagination.sortBy || "dataVencimento",
        this.filtros.cpf,
        this.filtros
      )
        .then((response) => {
          this.items = response.data.content;
          this.totalItems = response.data.totalElements;
        })
        .catch((error) => {
          this.$root.showErro(error.data.message);
        })
        .finally(() => {
          this.loadingBtn = false;
          this.loading = false;
        });
    },
    openDialogPagarSelecionados() {
      this.dialogPagarSelecionados = true;
    },
    closeDialogPagarSelecionados() {
      this.dialogPagarSelecionados = false;
    },
    confirmarPagamentoSelecionados() {
      if (!this.$root.isAdminSupCredProp()) {
        this.$root.showAlerta(
          "Apenas Administradores ou Supervisores podem realizar essa ação"
        );
        return;
      }
      this.loadingBtn = true;
      // tem que transformar os valores em string para o backend converte-los, senão da problemas
      var parcelasRequest = this.itemsSelecionado.map((item) => {
        item.valor = item.valor.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });
        item.valorPago = item.valorPago.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });
        if (item.desconto) {
          item.desconto = item.desconto.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          });
        }
        if (item.valorJurosMora) {
          item.valorJurosMora = item.valorJurosMora.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          });
        }
        if (item.valorMulta) {
          item.valorMulta = item.valorMulta.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          });
        }
        return item;
      });
      VendaBusiness.pagarListaParcela(parcelasRequest)
        .then(() => {
          this.$root.showSucesso("Parcela paga com sucesso");
          this.paginar();
          this.closeDialogPagarSelecionados();
        })
        .catch((erro) => {
          self.$root.showErro(erro.data.message);
        })
        .finally(() => {
          this.loading = false;
          this.loadingBtn = false;
        });
    },
  },
};
</script>

<style lang="css" scoped>
.containVencimento {
  color: rgb(31 41 55);
  padding-left: 10px;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: rgba(0, 0, 0, 0.06);
  border-bottom-style: solid;
  border-color: rgb(0, 0, 0, 0.07);
  border-bottom-width: 2px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.containVencimento:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>