<template>
  <v-container
    fluid
    grid-list-md>
    <core-progress-modal :show="loading" />
    <v-layout
      v-if="!loading"
      row
      wrap>
      <v-flex md12>
        <v-card class="elevation-0">
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
                  :value="''+dadosAcordo.diasAtraso"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        md-12>
        <material-card
          color="primary"
          flat
          full-width
          title="Nova Renegociação de Dívida">
          <v-layout
            row
            wrap
          >
            <v-flex
              md4>
              <v-card
                class="pa-3"
              >
                <v-layout
                  row
                  wrap>
                  <v-flex
                    style="background-color: #1b84b5; border-color: #1b84b5; color: #FFFFFF;"
                    class="text-xs-center label-divida"
                    xs12>
                    <span class="title">Total da Dívida Selecionada</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida"
                    sm6
                    xs6
                  >
                    <span class="body-2">Valor em Atraso</span>
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm6
                    xs6>
                    <span>R$ {{ formatValorMonetario(divida.valorAtraso) }}</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida"
                    sm6
                    xs6
                  >
                    <span class="body-2">(+) Valor a Vencer</span>
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm6
                    xs6>
                    <span>R$ {{ formatValorMonetario(divida.valorVencer) }}</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida"
                    sm6
                    xs6
                  >
                    <span class="body-2">(=) Saldo Devedor</span>
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm6
                    xs6>
                    <span>R$ {{ formatValorMonetario(divida.valorAtraso + divida.valorVencer) }}</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida body-2"
                    sm6
                    xs6
                  >
                    (+) Multa + Juros de Mora
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm6
                    xs6>
                    <span>R$ {{ formatValorMonetario(divida.valorMultaJurosMora) }}</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida title"
                    sm6
                    xs6
                  >
                    (=) Total da Dívida
                  </v-flex>
                  <v-flex
                    class="valor-divida title"
                    sm6
                    xs6>
                    <span>R$ {{ formatValorMonetario(divida.valorTotal) }}</span>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex
              md8>
              <v-card
                class="pa-3"
              >
                <v-layout
                  row
                  wrap>
                  <v-flex
                    style="background-color: #1b84b5; border-color: #1b84b5; color: #FFFFFF;"
                    class="text-xs-center label-divida"
                    xs12>
                    <span class="title">Renegociação - Descontos até 150,00% | 150,00% / Parcelamento até 99 vez(es) / Atraso mínimo de 60 dia(s)</span>
                  </v-flex>
                  <v-flex
                    class="text-xs-right label-divida"
                    sm8
                    xs10
                  >
                    <v-layout
                      row
                    >
                      <v-flex
                        md4
                        sm12
                        xs12>
                        <span class="body-2">(-) Desconto de </span>
                      </v-flex>
                      <v-flex
                        md2
                        sm12
                        xs12>
                        <v-text-field
                          v-money="money"
                          v-model="form.peDescontoValorAtraso"
                          :background-color="bgcolor"
                          :rules="[rules.maxDescontoAtraso]"
                          maxlength="6"
                          reverse
                          prefix="%"
                          class="text-field-custom"
                          type="tel"
                        />
                      </v-flex>
                      <v-flex
                        class="text-xs-left"
                        md6
                        sm12
                        xs12>
                        <span class="body-2">sobre o valor em atraso </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    R$ {{ formatValorMonetario(calculaDescontoAtraso) }}
                  </v-flex>

                  <v-flex
                    class="text-xs-right label-divida"
                    sm8
                    xs10
                  >
                    <v-layout
                      row
                    >
                      <v-flex
                        md4
                        sm12
                        xs12>
                        <span class="body-2">(-) Desconto de </span>
                      </v-flex>
                      <v-flex
                        md2
                        sm12
                        xs12>
                        <v-text-field
                          v-money="money"
                          v-model="form.peDescontoMultaJuros"
                          :background-color="bgcolor"
                          reverse
                          prefix="%"
                          class="text-field-custom"
                          type="tel"
                          maxlength="6"
                        />
                      </v-flex>
                      <v-flex
                        class="text-xs-left"
                        md6
                        sm12
                        xs12>
                        <span class="body-2">sobre multa + juros de mora </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    R$ {{ formatValorMonetario(calculaDescontoJurosMulta) }}
                  </v-flex>

                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs10
                  >
                    (=) Total com Desconto
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    R$ {{ formatValorMonetario(calculaTotalComDesconto) }}
                  </v-flex>

                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    (-) Entrada de
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      v-model="form.valorEntrada"
                      :background-color="bgcolor"
                      suffix="R$"
                      reverse
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>

                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    (+) Tarifa Serviço
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      v-model="form.tarifaServico"
                      :background-color="bgcolor"
                      reverse
                      suffix="R$"
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>

                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    (+) Outros Acréscimos
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      v-model="form.outrosAcrescimos"
                      :background-color="bgcolor"
                      reverse
                      suffix="R$"
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>

                  <v-flex
                    class="text-xs-center label-divida title"
                    sm8
                    xs4
                  >
                    (=) Valor Renegociado
                  </v-flex>
                  <v-flex
                    class="valor-divida title"
                    sm4
                    xs2>
                    R$ {{ formatValorMonetario(calculaValorRenegociado) }}
                  </v-flex>

                  <v-flex
                    style="background-color: #1b84b5; border-color: #1b84b5; color: #FFFFFF;"
                    class="text-xs-center label-divida body-2"
                    sm12
                    xs12
                  >
                    Condições de parcelamento
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    Cobrar TAC na primeira fatura de
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      v-model="form.valorTacPrimeiraFatura"
                      :background-color="bgcolor"
                      reverse
                      suffix="R$"
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    Taxa de Juros Parcelamento de
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      v-model="form.taxaJurosParcelamento"
                      :background-color="bgcolor"
                      reverse
                      prefix="%"
                      maxlength="6"
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    Tarifa Boleto por Parcela
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-money="money"
                      ref="inputTarifaBoleto"
                      v-model.lazy="form.tarifaBoleto"
                      :background-color="bgcolor"
                      reverse
                      suffix="R$"
                      type="tel"
                      class="text-field-custom"
                    />
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm4
                    xs4
                  >
                    Cobrar pelo
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm8
                    xs2>
                    <v-autocomplete
                      v-validate="'required'"
                      v-model="form.beneficiarioId"
                      :items="listaCedente"
                      :background-color="bgcolor"
                      reverse
                      item-text="descricao"
                      item-value="id"
                      class="text-field-custom"
                      @change="changeCobrarCarne"
                    />
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    Parcelar Em
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-model="form.qtdParcelas"
                      :background-color="bgcolor"
                      :rules="[rules.qtdMaxParcelas]"
                      reverse
                      type="tel"
                      prefix="x"
                      class="text-field-custom"
                      maxlength="3"
                      min="1"
                      @change="changeQtdParcelas"
                    />
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida title"
                    sm8
                    xs4
                  >
                    Valor da(s) Parcela(s)
                  </v-flex>
                  <v-flex
                    class="valor-divida title"
                    sm4
                    xs2>
                    R$ {{ formatValorMonetario(calculaValorParcelas) }}
                  </v-flex>
                  <v-flex
                    class="text-xs-center label-divida body-2"
                    sm8
                    xs4
                  >
                    Primeiro Vencimento
                  </v-flex>
                  <v-flex
                    class="valor-divida"
                    sm4
                    xs2>
                    <v-text-field
                      v-model="form.dataVencimento"
                      :background-color="bgcolor"
                      :rules="[rules.qtdMaxDiasVencimento]"
                      type="date"
                      reverse
                      class="text-field-custom"
                    />
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-divider class="mt-4"/>
          <v-layout class="justify-end">
            <v-btn
              style="color: black !important"
              outline
              @click="goBack">Voltar</v-btn>
            <v-spacer />
            <h3
              v-if="simulacao"
              style="color: red"
            >
              Simulação de renegociação ativa
            </h3>
            <v-spacer />
            <v-btn
              v-if="!simulacao"
              :loading="loadingBtn"
              color="primary"
              @click="validaNovaRenegociacao()">Confirmar</v-btn>
          </v-layout>
          <template>
            <v-layout
              row
              justify-center>
              <v-dialog
                v-model="dialogConfirma"
                max-width="390">
                <v-card>
                  <v-card-title class="headline">Confirma Renegociação</v-card-title>

                  <v-card-text>
                    <p>Confirma a renegocição da dívida?</p>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      outline
                      style="color: black !important"
                      @click="dialogConfirma = false">Cancelar</v-btn>

                    <v-spacer/>

                    <v-btn
                      color="primary"
                      @click="confirmarNovaRenegociacao()">Confirmar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { RenegociarBusiness } from '../../business'
import numberUtils from '../../utils/numberUtils'
import dateUtils from '../../utils/dateUtils'
import { MONEY } from '../../constants'

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
    divida: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    finalizar: {
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
      money: MONEY,
      bgcolor: 'rgba(0, 0, 0, 0.06)',
      loading: false,
      loadingBtn: false,
      novaRenegociacao: false,
      dialogConfirma: false,
      rules: {
        maxDescontoAtraso: value => {
          if (value && numberUtils.convertStringToNumber(value) > this.dadosAcordo.regra.peMaxDescontoAtrasoAcordo) {
            return '<div class="bg-erro">Máximo percentual desconto é ' + this.formatValorMonetario(this.dadosAcordo.regra.peMaxDescontoAtrasoAcordo) + '% </div>'
          }
          return true
        },
        qtdMaxParcelas: value => {
          if (value && numberUtils.convertStringToNumber(value) > this.dadosAcordo.regra.parcelaAcordoEmAte) {
            return '<div class="bg-erro">Qtde Máxima de parcelas é ' + this.formatValorMonetario(this.dadosAcordo.regra.parcelaAcordoEmAte) + '</div>'
          }
          return true
        },
        qtdMaxDiasVencimento: value => {
          if (value && dateUtils.diffDate(value, new Date()) > this.dadosAcordo.regra.qtdDiasVencimentoEntradaAcordo) {
            return '<div class="bg-erro">Qtde Máxima de dias para entrada é ' + this.dadosAcordo.regra.qtdDiasVencimentoEntradaAcordo + '</div>'
          }
          return true
        }
      },
      form: {
        totalDivida: 0,
        totalDescontoAcordo: 0,
        peDescontoValorAtraso: 0,
        totalDescontoValorAtraso: 0,
        peDescontoMultaJuros: 0,
        totalDescontoMultaJuros: 0,
        valorEntrada: '0',
        tarifaBoleto: '0',
        tarifaServico: '0',
        outrosAcrescimos: '0',
        valorTacPrimeiraFatura: '0',
        taxaJurosParcelamento: '0',
        beneficiarioId: 0,
        qtdParcelas: '1',
        valorRenegociado: 0,
        valorParcela: 0,
        carnesIds: [],
        maiorAtraso: 0,
        dataVencimento: dateUtils.currentDate()
      },
      headersEfetuadas: [
        {
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
          text: 'Desconto Acordo'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Taxa Juros'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Entrada Acordo'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Outros Acréscimos'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Tarifa Acordo'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Valor Renegociado'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Parcelas'
        },
        {
          sortable: false,
          align: 'center',
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
          text: 'Termo Confissão'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Carnê Renegociado'
        },
        {
          align: 'center',
          sortable: false,
          text: 'Cancelar'
        }
      ],
      items: [],
      totalItems: null,
      listaCedente: [],
      datasVencimento: [],
      possuiDividaParaRenegociar: false
    }
  },
  computed: {
    calculaDescontoAtraso () {
      this.form.totalDescontoValorAtraso = numberUtils.calculaDescontoPercentual(this.divida.valorAtraso, this.form.peDescontoValorAtraso)
      return this.form.totalDescontoValorAtraso;
    },
    calculaDescontoJurosMulta () {
      this.form.totalDescontoMultaJuros = numberUtils.calculaDescontoPercentual(this.divida.valorMultaJurosMora, this.form.peDescontoMultaJuros)
      return this.form.totalDescontoMultaJuros;
    },
    calculaTotalComDesconto () {
      return this.divida.valorTotal - (this.calculaDescontoJurosMulta + this.calculaDescontoAtraso)
    },
    calculaValorRenegociado () {
      let valorRenegociado = this.calculaTotalComDesconto
      valorRenegociado -= numberUtils.convertStringToNumber(this.form.valorEntrada)
      valorRenegociado += numberUtils.convertStringToNumber(this.form.tarifaServico)
      valorRenegociado += numberUtils.convertStringToNumber(this.form.outrosAcrescimos)
      return valorRenegociado
    },
    calculaValorParcelas () {
      let peTotalParcelamento = parseInt(this.form.qtdParcelas) * numberUtils.convertStringToNumber(this.form.taxaJurosParcelamento)
      let valorTotalCustoParcelamento = (this.calculaValorRenegociado * peTotalParcelamento) / 100
      valorTotalCustoParcelamento += numberUtils.convertStringToNumber(this.form.valorTacPrimeiraFatura)
      let valorParcela = (this.calculaValorRenegociado + valorTotalCustoParcelamento) / parseInt(this.form.qtdParcelas)
      valorParcela += numberUtils.convertStringToNumber(this.form.tarifaBoleto)
      return valorParcela
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.loading = true
    this.form.qtdParcelas = '' + this.dadosAcordo.regra.parcelaAcordoEmAte
    this.form.valorTacPrimeiraFatura = this.formatValorMonetario(this.dadosAcordo.regra.vlTarifaParaAcordo)
    this.form.taxaJurosParcelamento = this.formatValorMonetario(this.dadosAcordo.regra.taxaJurosParcelaAcordo)
  },
  methods: {
    validaValorParcela () {
      let value = this.calculaValorParcelas
      if (value) {
        if (numberUtils.convertStringToNumber(value) < this.dadosAcordo.regra.vlMinParcelaAcordo) {
          return '<div class="bg-erro">Valor mínimo da parcela é R$ ' + this.formatValorMonetario(this.dadosAcordo.regra.vlMinParcelaAcordo) + '</div>'
        }
        return true
      }
      return '<div class="bg-erro">Informe um valor para parcela</div>'
    },
    changeQtdParcelas () {
      if (this.form.qtdParcelas < 1) {
        this.$root.showErro("O mínimo de parcelas deve ser 1")
        this.form.qtdParcelas = 1;
      }
      this.form.valorParcela = this.formatValorMonetario(this.calculaValorParcelas)
    },
    validaNovaRenegociacao () {
      this.form.totalDivida = this.formatValorMonetario(this.divida.valorTotal)
      this.form.saldoDevedor = this.formatValorMonetario(this.divida.valorAtraso + this.divida.valorVencer)
      this.form.atualizacaoMonetaria = this.formatValorMonetario(this.divida.valorMultaJurosMora)
      this.form.maiorAtraso = this.dadosAcordo.diasAtraso
      this.form.totalDescontoAcordo = this.formatValorMonetario(this.form.totalDescontoValorAtraso + this.form.totalDescontoMultaJuros)
      this.form.valorRenegociado = this.formatValorMonetario(this.calculaValorRenegociado)
      this.form.valorParcela = this.formatValorMonetario(this.calculaValorParcelas)
      this.form.carnesIds = this.dadosAcordo.selected.map(item => item.carneId)
      this.dialogConfirma = true
    },
    confirmarNovaRenegociacao () {
      this.form.totalDescontoMultaJuros = this.formatValorMonetario(this.form.totalDescontoMultaJuros)
      this.form.totalDescontoValorAtraso = this.formatValorMonetario(this.form.totalDescontoValorAtraso)
      this.dialogConfirma = false
      this.loading = true
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    },
    changeCobrarCarne (beneficiarioId) {
      let beneficiario = this.listaCedente.filter(item => item.id === beneficiarioId)[0]
      if (beneficiario.banco !== 'EM_LOJA' && beneficiario.banco !== 'NO_CARTAO') {
        this.form.tarifaBoleto = this.formatValorMonetario(this.dadosAcordo.vlTarifaParcelaBanco)
      } else {
        this.form.tarifaBoleto = '0'
      }
      this.$refs.inputTarifaBoleto.$el.getElementsByTagName('input')[0].value = this.form.tarifaBoleto
    }
  }
}
</script>
<style>
  .bg-erro {
    background-color:rgb(255,255,255);
    font-weight: 700;
  }
</style>
<style scoped>
  .valor-divida {
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    text-align: right!important;
  }
  .label-divida {
    border-bottom: 1px solid lightgray;
  }
  .text-field-custom {
    padding: 0px;
    margin: 0px;
    height: 30px;
  }
  #custom-size > .v-text-field {
    width: 400px;
  }
</style>
