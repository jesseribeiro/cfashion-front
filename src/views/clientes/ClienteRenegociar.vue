<template>
  <v-container
    fluid
    grid-list-md>
    <core-progress-modal :show="loading" />
    <v-layout
      v-if="!loading"
      row
      wrap>
      <v-flex
        v-if="!novaRenegociacao"
        md12>
        <material-card
          color="primary"
          flat
          full-width
          title="Renegociações Efetuadas">
          <v-card>
            <v-data-table
              :headers="headersEfetuadas"
              :items="renegociacoesEfetuadas"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr class="text-xs-right">
                  <td
                    class="text-xs-center"
                  >{{ item.id }}</td>
                  <td
                    class="text-xs-center"
                  >{{ item.dataAcordo | moment("DD/MM/YYYY H:mm") }}</td>
                  <td>R$ {{ formatValorMonetario(item.valorTotal) }}</td>
                  <td>R$ {{ formatValorMonetario(item.valorEntrada) }}</td>
                  <td>R$ {{ formatValorMonetario(item.valorRenegociado) }}</td>
                  <td>{{ item.qtdParcela }}</td>
                  <td>R$ {{ formatValorMonetario(item.valorParcela) }}</td>
                  <td class="text-xs-center">{{ item.dataFim | moment("DD/MM/YYYY") }}</td>
                  <td class="text-xs-center">
                    <core-status-pagamento
                      :status="item.status"
                    />
                  </td>
                  <td class="text-xs-center">
                    <v-icon
                      v-if="item.status === 'Em Aberto'"
                      @click="openImprimirCarne(item)">mdi-printer</v-icon>
                    <v-icon
                      title="Visualizar Renegociação"
                      @click="openVisualizar(item)"
                    >mdi-magnify</v-icon>
                    <v-icon
                      v-if="item.status === 'Em Aberto'"
                      color="red"
                      title="Cancelar Renegociação"
                      @click="openDialogCancelar(item)"
                    >mdi-delete</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn
                color="black"
                @click="iniciarNovaRenegociacao(true)"
              >Simulador de Renegociação</v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                @click="iniciarNovaRenegociacao(false)"
              >Nova Renegociação de Dívida</v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
      <v-flex
        v-else
        md12>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1">Selecione as Parcelas do Acordo</v-stepper-step>

            <v-divider />

            <v-stepper-step
              :complete="e1 > 2"
              step="2">Calcular Acordo</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <cliente-renegociar-carnes
                :value="value"
                :dados-acordo="dadosAcordo"
                :next-step="continuar"
                :set-data="setDadosPreenchidosNoPasso1"
                :cancelar="cancelar"
                :simulacao="simulacao"
              />
            </v-stepper-content>

            <v-stepper-content step="2">
              <template v-if="e1 === 2">
                <cliente-renegociar-calculo
                  :value="value"
                  :dados-acordo="dadosAcordo"
                  :divida="divida"
                  :go-back="voltar"
                  :finalizar="finalizaRenegociacao"
                  :simulacao="simulacao"
                />
              </template>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
    <template
      v-if="dialogCancelar"
    >
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="dialogCancelar"
          max-width="490">
          <v-card>
            <v-card-title class="headline">
              Cancelar Renegociação - ID {{ item.id }}
            </v-card-title>

            <v-card-text>
              <p>Confirma o cancelamento da Renegociação?</p>
              <p>
                Ao cancelar essa renegociação, as parcelas que foram pagas, continuarão como pagas,
                as que não foram pagas irão para o status de cancelada e o carnê dessa
                renegociação será cancelado.
              </p>
              <p>
                Com isso a dívida que havia sido renegociada será reaberta,
                com as datas em atraso, como se nada tivesse acontecido.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogCancelar">Desistir</v-btn>
              <v-spacer />
              <v-btn
                color="red"
                @click="confirmarCancelamento">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <core-dialog-imprimir-carne
      v-if="dialogImprimirCarne"
      :value="dialogImprimirCarne"
      :carne-id="carneId"
      :close="closeImprimirCarne"
    />
    <template
      v-if="dialogVisualizar">
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="dialogVisualizar"
          persistent
          max-width="600">
          <v-card>
            <v-card-title class="headline">
              Dados Renegociação - ID {{ item.id }}
              <v-spacer/>
              <core-status-pagamento
                :status="item.status"
              />
              <v-icon
                v-if="item.status === 'Em Aberto'"
                @click="openImprimirCarne(item)">mdi-printer
              </v-icon>
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap>
                <v-flex md4>
                  <core-label-value
                    :label="'Data Acordo'"
                    :value="item.dataAcordo | moment('DD/MM/YYYY H:mm')"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Total da Dívida'"
                    :value="'R$ ' + formatValorMonetario(item.valorTotal)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Valor Renegociado'"
                    :value="'R$ ' + formatValorMonetario(item.valorRenegociado)"
                    :class-value="'title'"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Desconto Acordo'"
                    :value="'R$ ' + formatValorMonetario(item.valorDesconto)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Taxa Juros'"
                    :value="formatValorMonetario(item.taxaJuros) + '%'"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Entrada Acordo'"
                    :value="'R$ ' + formatValorMonetario(item.valorEntrada)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Outros Acréscimos'"
                    :value="'R$ ' + formatValorMonetario(item.outrosAcrescimos)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Qtde. Parcelas'"
                    :value="item.qtdParcela"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Valor Parcela'"
                    :value="'R$ ' + formatValorMonetario(item.valorParcela)"
                    :class-value="'title'"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Taxa Juros Parcelamento'"
                    :value="formatValorMonetario(item.taxaJurosParcelamento) + '%'"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Tarifa Acordo'"
                    :value="'R$ ' + formatValorMonetario(item.tarifaAcordo)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Tarifa Boleto'"
                    :value="'R$ ' + formatValorMonetario(item.tarifaBoleto)"
                  />
                </v-flex>
                <v-flex md4>
                  <core-label-value
                    :label="'Tarifa Serviço'"
                    :value="'R$ ' + formatValorMonetario(item.tarifaServico)"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="primary"
                @click="closeVisualizar()">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import numberUtils from '../../utils/numberUtils'

const ClienteRenegociarCarnes = () => import('./ClienteRenegociarCarnes')
const ClienteRenegociarCalculo = () => import('./ClienteRenegociarCalculo')

export default {
  components: {
    ClienteRenegociarCarnes,
    ClienteRenegociarCalculo
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loadingBtn: false,
      novaRenegociacao: false,
      dialogCancelar: false,
      dialogImprimirCarne: false,
      dialogVisualizar: false,
      carneId: null,
      item: null,
      form: {
      },
      e1: 0,
      headersEfetuadas: [
        {
          align: 'center',
          sortable: false,
          text: 'ID'
        },
        {
          align: 'center',
          sortable: false,
          text: 'Data Acordo'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Total da Dívida'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Entrada Acordo'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Valor Renegociado'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Parcelas'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Valor Parcela'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Fim Acordo'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Status'
        },
        {
          sortable: false,
          align: 'center',
          text: ''
        }
      ],
      renegociacoesEfetuadas: [],
      possuiDividaParaRenegociar: false,
      dadosAcordo: null,
      simulacao: false,
      listaCedente: [],
      divida: {
        valorAtraso: 0,
        valorVencer: 0,
        valorMultaJurosMora: 0,
        valorTotal: 0
      }
    }
  },
  beforeMount () {
    this.reload()
  },
  methods: {
    iniciarNovaRenegociacao (simulacaoParam) {
      this.simulacao = simulacaoParam;
      this.loading = true
    },
    validateBeforeSubmit () {
      if (this.$refs.form.validate()) {
        this.continuar()
      } else {
        this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
      }
    },
    continuar () {
      this.e1 < 2 ? this.e1++ : (this.e1 = 1)
    },
    voltar () {
      this.e1 > 1 ? this.e1-- : (this.e1 = 1)
    },
    setDadosPreenchidosNoPasso1 (selected, totalRenegociar) {
      this.dadosAcordo['selected'] = selected
      this.dadosAcordo['totalRenegociar'] = totalRenegociar
      this.divida.valorAtraso = selected.map(carne => carne.totalAtrasoCarne).reduce((total, valor) => total + valor)
      this.divida.valorVencer = selected.map(carne => carne.totalVencerCarne).reduce((total, valor) => total + valor)
      this.divida.valorMultaJurosMora = selected.map(carne => carne.totalMultaJurosCarne).reduce((total, valor) => total + valor)
      this.divida.valorTotal = totalRenegociar
    },
    cancelar () {
      this.novaRenegociacao = false
    },
    closeDialogCancelar () {
      this.dialogCancelar = false
    },
    openDialogCancelar (item) {
      this.item = item
      this.novaRenegociacao = false
      this.dialogCancelar = true
    },
    finalizaRenegociacao () {
      this.novaRenegociacao = false
      this.e1 = 0
      this.reload()
    },
    reload () {
      this.loading = true
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    },
    confirmarCancelamento () {
      this.loading = true
    },
    openVisualizar (item) {
      this.item = item
      this.dialogVisualizar = true
    },
    closeVisualizar () {
      this.dialogVisualizar = false
      this.item = null
    },
    openImprimirCarne (item) {
      this.carneId = item.carneId
      this.dialogImprimirCarne = true
    },
    closeImprimirCarne () {
      this.dialogImprimirCarne = false
      this.carneId = null
    }
  }
}
</script>
