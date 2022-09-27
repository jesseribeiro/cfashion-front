<template>
  <v-container
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex md12>
        <v-card class="elevation-0">
          <v-card-title>
            <h3 class="headline mb-0">Selecione as parcelas para o acordo</h3>
          </v-card-title>
          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex md3>
                <core-label-value
                  :label="'Nome'"
                  :value="value.nome"
                />
              </v-flex>
              <v-flex md3>
                <core-label-value
                  :label="'CPF'"
                  :value="value.cpf"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Parcela Maior Atraso'"
                  :value="dadosAcordo.diasAtraso+' dias'"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md12>
        <v-card class="elevation-0">
          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex md2>
                <core-label-value
                  :label="'Total em Atraso'"
                  :value="formatValorMonetario(dadosAcordo.totalAtraso)"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Total a Vencer'"
                  :value="formatValorMonetario(dadosAcordo.totalVencer)"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Saldo Devedor'"
                  :value="formatValorMonetario(dadosAcordo.saldoDevedor)"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Total Multa + Juros Mora'"
                  :value="formatValorMonetario(dadosAcordo.totalMultaJuros)"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Total da Dívida'"
                  :value="formatValorMonetario(dadosAcordo.totalDivida)"
                />
              </v-flex>
              <v-flex md2>
                <core-label-value
                  :label="'Total a Renegociar'"
                  :value="formatValorMonetario(totalRenegociar)"
                  :class-value="'headline font-weight-black'"
                  :class-label="'title'"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-data-table
            v-model="selected"
            :headers="headersCarne"
            :items="carnes"
            :expand="false"
            item-value="carneId"
            class="elevation-1 arrow-pagintion"
            hide-actions
            select-all
            item-key="carneId"
          >
            <template
              slot="headers"
              scope="header"
            >
              <tr>
                <th style="width:5%">
                  &nbsp;
                </th>
                <th style="width:5%">
                  <v-checkbox
                    :input-value="header.all"
                    :indeterminate="header.indeterminate"
                    primary
                    hide-details
                    @click.native="toggleAll"
                  />
                </th>
                <th
                  v-for="h in header.headers"
                  :key="h.text"
                  :class="h.class"
                >
                  {{ h.text }}
                </th>
              </tr>
            </template>
            <template
              slot="items"
              scope="carne"
              ma-5>
              <tr :active="carne.selected">
                <td class="justify-center layout">
                  <v-icon @click="carne.item.expanded = !carne.item.expanded">
                    {{ carne.item.expanded ? 'mdi-minus' : 'mdi-plus' }}
                  </v-icon>
                </td>
                <td>
                  <v-checkbox
                    :input-value="carne.selected"
                    primary
                    hide-details
                    @click="carne.selected = !carne.selected"
                  />
                </td>
                <td class="text-xs-center">{{ carne.item.dataCompra | moment("DD/MM/YYYY") }}</td>
                <td class="text-xs-right">{{ carne.item.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-right">{{ carne.item.valorEntrada.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                <td class="text-xs-center">{{ carne.item.qtdParcela }}</td>
                <td>{{ carne.item.nomeLoja }}</td>
                <td class="text-xs-left font-weight-black">{{ carne.item.tipoCarne }}</td>
              </tr>
              <tr v-if="carne.item.expanded">
                <td colspan="10">
                  <v-data-table
                    :headers="headersParcela"
                    :items="carne.item.parcelas"
                    hide-actions
                    class="elevation-1 arrow-pagintion"
                  >
                    <template
                      slot="headers"
                      scope="header"
                    >
                      <tr>
                        <th
                          v-for="h in header.headers"
                          :key="h.text"
                          :class="h.class"
                        >
                          {{ h.text }}
                        </th>
                      </tr>
                    </template>
                    <template
                      slot="items"
                      scope="parcela"
                      ma-5>
                      <tr>
                        <td>&nbsp;
                        </td>
                        <td class="text-xs-center">{{ parcela.item.numero === 0 ? 'Entrada' : parcela.item.numero }}</td>
                        <td class="text-xs-center">{{ parcela.item.dataVencimento | moment("DD/MM/YYYY") }}</td>
                        <td class="text-xs-right">{{ parcela.item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td
                          v-if="!!parcela.item.valorMulta"
                          class="text-xs-right"
                        >{{ parcela.item.valorMulta.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td v-else>-</td>
                        <td
                          v-if="!!parcela.item.valorJurosMora"
                          class="text-xs-right"
                        >{{ parcela.item.valorJurosMora.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</td>
                        <td v-else>-</td>
                        <td
                          v-if="parcela.item.qtdDiasAtraso > 0"
                          class="text-xs-center font-weight-black"
                        >{{ parcela.item.qtdDiasAtraso }}</td>
                        <td v-else>&nbsp;</td>
                      </tr>
                    </template>
                  </v-data-table>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex md12>
        <v-layout class="justify-end">
          <v-btn
            style="color: black !important"
            outline
            @click="cancelar">Cancelar</v-btn>
          <v-spacer />
          <h3
            v-if="simulacao"
            style="color: red"
          >
            Simulação de renegociação ativa
          </h3>
          <v-spacer />
          <v-btn
            :disabled="disableBtn"
            color="primary"
            @click="proximoPasso">Continuar</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import numberUtils from '../../utils/numberUtils'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    dadosAcordo: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    cancelar: {
      type: Function,
      requided: true
    },
    simulacao: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      disableBtn: false,
      dialogRecibo: false,
      pagamentoId: null,
      openViewCarne: false,
      filePDF: null,
      expanded: false,
      currentPage: 0,
      pageCount: 0,
      form: {},
      pagination: {
        rowsPerPage: 15
      },
      selected: [],
      filtros: {
        dataInicial: null,
        dataFinal: null,
        lojaId: null,
        status: null
      },
      headersCarne: [
        {
          sortable: false,
          text: 'Data',
          class: 'grey lighten-1 text-xs-center',
          value: 'dataCompra'
        },
        {
          sortable: false,
          text: 'Valor',
          class: 'grey lighten-1 text-xs-right',
          value: 'valorTotal'
        },
        {
          sortable: false,
          text: 'Entrada',
          class: 'grey lighten-1 text-xs-right',
          value: 'valorEntrada'
        },
        {
          sortable: false,
          text: 'Parcelas',
          class: 'grey lighten-1 text-xs-center',
          value: 'qtdParcela'
        },
        {
          sortable: false,
          text: 'Loja',
          class: 'grey lighten-1 text-xs-left',
          value: 'nomeLoja'
        },
        {
          sortable: false,
          text: 'Carnê',
          class: 'grey lighten-1 text-xs-left',
          value: ''
        }
      ],
      carnes: [],
      totalCarnes: null,
      loading: false,
      loadingBtn: false,
      statusCarne: [],
      headersParcela: [
        {
          sortable: false,
          align: 'center',
          class: 'grey lighten-1'
        },
        {
          sortable: false,
          text: 'Parcela',
          value: 'numero',
          class: 'grey lighten-1 text-xs-center'
        },
        {
          sortable: false,
          text: 'Vencto',
          value: 'dataVencimento',
          class: 'grey lighten-1 text-xs-center'
        },
        {
          sortable: false,
          text: 'Valor Parcela',
          value: 'valor',
          class: 'grey lighten-1 text-xs-right'
        },
        {
          sortable: false,
          text: 'Multa',
          value: 'valorMulta',
          class: 'grey lighten-1 text-xs-right'
        },
        {
          sortable: false,
          text: 'Juros Mora',
          value: 'valorJurosMora',
          class: 'grey lighten-1 text-xs-right'
        },
        {
          sortable: false,
          text: 'Qtd. Dias em Atraso',
          value: 'qtdDiasAtraso',
          class: 'grey lighten-1 text-xs-center'
        }
      ]
    }
  },
  computed: {
    totalRenegociar () {
      if (this.selected.length === 0) {
        return 0
      }
      return this.selected
        .map(carne => carne.saldoDevedorCarne)
        .reduce((total, valor) => total + valor)
    }
  },
  beforeMount () {
    this.carnes = this.dadosAcordo.carnes
    this.toggleAll()
    this.carnes.forEach(carne => {
      carne.expanded = true
    })
  },
  methods: {
    proximoPasso () {
      if (!!this.selected && this.selected.length > 0) {
        this.setData(this.selected, this.totalRenegociar)
        this.nextStep()
      } else {
        this.$root.showAlerta('Não possui dívida para renegociar')
      }
    },
    toggleAll () {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.selected = this.carnes.slice()
      }
    },
    formatValorMonetario (valor) {
      return 'R$ ' + numberUtils.formatValorMonetario(valor)
    }
  }
}
</script>
