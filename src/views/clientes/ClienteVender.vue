<template>
  <v-container
    fluid
    grid-list-md
  >
    <template v-if="flgNaoVender">
      <v-alert
        :value="true"
        type="warning"
      >
        <span
          class="subheading"
        >Cliente em análise de crédito! Não é possível realizar a venda,
        aguarde o retorno da nossa equipe.</span>
      </v-alert>
      <v-layout class="justify-end">
        <v-btn
          outline
          style="color: black !important"
          @click="cancelar"
        >
          Cancelar
        </v-btn>
      </v-layout>
    </template>
    <template v-else>
      <core-progress-modal :show="loading" />
      <v-layout
        v-if="!loading"
        row
        wrap
      >
        <v-flex md12>
          <span
            class="body-2"
          >Cliente: {{ value.nome }} CPF: {{ value.cpf }}</span>
        </v-flex>
        <v-flex
          md4
          sm6
          xs12
        >
          <v-layout
            justify-center
            row
            wrap
          >
            <v-flex
              md12
              class="headline text-md-center"
            >
              <span>Escolha a forma de pagamento</span>
            </v-flex>
            <v-flex
              v-for="item in formasPagamento"
              :key="item"
              sm6
              xs12
            >
              <a @click="selecionaTipoPagamento(item)">
                <v-btn
                  :outline="
                    dadosCalcular.formaPagamento === item ? false : true
                  "
                  :color="
                    dadosCalcular.formaPagamento === item ? '#4caf50' : ''
                  "
                  :disabled="
                    dadosCalcular.formaPagamento === item ? false : true
                  "
                  large
                >
                  {{ item == 'CARNE' ? 'Carnê' : 'Boleto' }}
                </v-btn>
              </a>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex
          md4
          sm6
          xs12
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              md12
              class="headline text-md-center"
            >
              <span
                v-if="!!limite && limite > 0"
              >Limite Disponível R$
                {{
                  limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                }}</span>
              <span
                v-else
                class="red--text"
              >Sem Limite Disponível</span>
            </v-flex>
            <v-flex md12>
              <v-text-field
                v-model.trim="dadosCalcular.nomeProduto"
                label="Nome do Produto"
              />
            </v-flex>
            <v-flex md12>
              <v-text-field
                v-validate="'required'"
                v-money="money"
                v-model="dadosCalcular.vlProduto"
                :error-messages="errors.collect('Valor do Produto')"
                data-vv-name="Valor do Produto"
                required
                prefix="R$"
                label="Valor do Produto"
              />
            </v-flex>
            <v-flex
              v-if="listPlanoPagamento.length > 1"
              md12
            >
              <v-autocomplete
                v-model="dadosCalcular.planoPagamentoId"
                :items="listPlanoPagamento"
                label="Parcelar em até (Plano de Pagamento)"
                item-text="descricao"
                item-value="id"
                @change="changePlanoPagamento"
              />
            </v-flex>
            <v-flex md12>
              <v-btn
                :loading="loadingBtn"
                block
                color="#4caf50"
                @click="calcular()"
              >
                Calcular
              </v-btn>
            </v-flex>
            <v-container
              v-if="parcelasSimuladas.length > 0"
              fluid
            >
              <v-flex md12>
                <p class="headline">
                  Entrada de R$
                  <span
                    v-if="!flagIncluir"
                    class="red--text"
                  >{{
                    parcelasSimuladas[0].vlEntrada.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2
                    })
                  }}
                  </span>
                  <v-icon
                    v-if="!$root.isAdmin()"
                    outline
                    color="primary"
                    @click="incluirValor"
                  >
                    mdi-pencil
                  </v-icon>
                  <template v-if="flagIncluir">
                    <v-flex md10>
                      <v-text-field
                        v-money="money"
                        v-model="dadosCalcular.vlEntrada"
                        :error-messages="errors.collect('Valor da Entrada')"
                        data-vv-name="Valor da Entrada"
                        prefix="R$"
                        label="Valor da Entrada"
                      />
                      <v-btn
                        :loading="loadingBtn"
                        small
                        color="primary"
                        elevation="5"
                        dark
                        @click="calcular"
                      >
                        <v-icon
                          dark
                          right
                        >
                          mdi-checkbox-marked
                        </v-icon>
                      </v-btn>
                      <v-btn
                        small
                        color="error"
                        elevation="5"
                        dark
                        @click="cancelarEntrada"
                      >
                        <v-icon
                          dark
                          right
                        >
                          mdi-close-box
                        </v-icon>
                      </v-btn>
                    </v-flex>
                  </template>
                </p>
              </v-flex>
              <v-flex 
                v-if="$root.isAdmin()"
                md12>
                <p class="headline"
                  color="orange"
                  small>
                  Qtd dias primeira parcela
                  <v-icon
                    v-if="!$root.isAdmin()"
                    outline
                    color="orange"
                    @click="incluirDias"
                  >
                    mdi-pencil
                  </v-icon>
                  <template v-if="flagIncluirDias">
                    <v-flex md10>
                      <v-text-field
                        v-model="diasPrimeiraParcela"
                        :error-messages="errors.collect('Dias para vencimento da primeira parcela')"
                        data-vv-name="Dias para vencimento da primeira parcela"
                        suffix="dias"
                        type="number"
                        min="1"
                        label="Dias para vencimento da primeira parcela"
                      />
                      <v-btn
                        :loading="loadingBtn"
                        small
                        color="primary"
                        elevation="5"
                        dark
                        @click="confirmarIncluirDias"
                      >
                        <v-icon
                          dark
                          right
                        >
                          mdi-checkbox-marked
                        </v-icon>
                      </v-btn>
                      <v-btn
                        small
                        color="error"
                        elevation="5"
                        dark
                        @click="cancelarIncluirDias"
                      >
                        <v-icon
                          dark
                          right
                        >
                          mdi-close-box
                        </v-icon>
                      </v-btn>
                    </v-flex>
                  </template>
                </p>
              </v-flex>
              <v-radio-group v-model="dadosCalcular.parcelaSelecionada">
                <v-radio
                  v-for="item in parcelasSimuladas"
                  :key="item.qtdParcela"
                  :value="item"
                >
                  <template :slot="'label'">
                    <span class="headline">{{
                      item.qtdParcela +
                        'x          R$' +
                        item.vlPrimeiraParcela.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2
                        })
                    }}</span>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-btn
                block
                color="#4caf50"
                @click="autorizarCompra"
              >
                Autorizar Compra
              </v-btn>

              <v-btn
                v-if="$root.isAdmin()"
                block
                color="#000"
                @click="vender"
              >
                Autorizar Compra Sem Código
              </v-btn>
            </v-container>
          </v-layout>
        </v-flex>
        <v-flex
          md4
          sm6
          xs12
        >
          <template v-if="!loading">
            <v-layout
              wrap
              row
              class="justify-center"
            >
              <div class="headline mb-3">
                <span>Possibilidades de Negociação</span>
              </div>
              <div class="pa-2">
                <apexchart
                  :options="chartOptions"
                  :series="series"
                  width="300"
                  height="300"
                  type="donut"
                />
              </div>
            </v-layout>
          </template>
        </v-flex>

        <v-flex
          md12
          class="mt-5"
        >
          <v-layout class="justify-end">
            <v-btn
              dark
              @click="goBack"
            >
              Voltar
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex v-if="dadosCalcular.flagAutorizacao" md12>
          <v-layout wrap justify-center align-center>
            <div class="card-login">
              <v-flex md12>
                <v-textarea readonly v-html="msgErro" />
                <span
                  >É necessária autorização para liberar essa compra!!!</span
                >
              </v-flex>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <core-autorizacao-compra
        v-if="showDialogAutorizacao"
        :cliente-nome="value.nome"
        :cliente-telefone="value.celular"
        :cliente-loja-id="value.lojaId + ''"
        :nome-produto="dadosCalcular.nomeProduto"
        :valor-produto="dadosCalcular.parcelaSelecionada.valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})"
        :cliente-email="value.email"
        :lojista-email="lojistaEmail"
        :callback="callbackAutorizacao"
        :close="closeDialogAutorizacao"
        :qtd-parcela="dadosCalcular.parcelaSelecionada.qtdParcela + ''"
        :valor-parcela="dadosCalcular.parcelaSelecionada.vlPrimeiraParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})"
      />
      <core-btn-permissao
        v-if="autorizaCompra && $root.isAdmin()"
        :action="calcular"
        :close="closeDialog"
        :data-form="value"
      />
    </template>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="flagSolicitarCredito" max-width="390">
          <v-card>
            <v-card-title class="headline">Será enviado uma notificação para os operadores da Prático liberar crédito</v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex md6>
                  <v-layout>
                    <v-btn color="error" @click="cancelarSolicitacao"
                      >Cancelar</v-btn
                    >
                  </v-layout>
                </v-flex>
                <v-flex md6>
                  <v-layout class="justify-end">
                    <v-btn color="primary" @click="confirmarSolicitacao">OK</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { LojaBusiness, ClienteBusiness, VendaBusiness } from '../../business'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      msgErro: null,
      autorizaCompra: false,
      flagSolicitarCredito: false,
      flgNaoVender: false,
      flagIncluir: false,
      flagIncluirDias: false,
      loading: false,
      diasPrimeiraParcela: null,
      loadingBtn: false,
      formasPagamento: [],
      listPlanoPagamento: [],
      dadosCalcular: {
        nomeProduto: null,
        formaPagamento: 'CARNE',
        vlProduto: null,
        vlEntrada: null,
        clienteId: null,
        lojaId: null,
        parcelaSelecionada: null,
        planoPagamentoId: null,
        diasPrimeiraParcela: null,
        autorizacaoId: null,
        flagAutorizacao: false,
      },
      limite: 0,
      series: [30, 40, 30],
      scoreInicial: null,
      parcelasSimuladas: [],
      showDialogAutorizacao: false,
      lojistaEmail: '',
      parcelarEm: null,
      chartOptions: {
        tooltip: {
          enabled: false
        },
        chart: {
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        labels: [],
        stroke: {
          width: 0
        },
        dataLabels: {
          enabled: false,
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  color: '#000',
                  offsetY: 20
                },
                value: {
                  show: true,
                  fontSize: '30px',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  color: '#000',
                  offsetY: -30,
                  formatter: function (val) {
                    var formatter = new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2
                    })
                    return formatter.format(val)
                  }
                }
              }
            }
          }
        },
        legend: {
          show: false
        },
        colors: ['#4caf50', '#157DEC', '#FF9800'] //, '#F44336'
      }
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.value.flagAutorizacao = false;

    if (this.value.status === 'ANALISE_VISUAL') {
      this.flgNaoVender = true
    } else {
      this.loading = true
      LojaBusiness.getPlanospagamento(this.value.lojaId)
        .then(response => {
          this.listPlanoPagamento = response.data
          if (
            this.listPlanoPagamento != null &&
            this.listPlanoPagamento.length > 0
          ) {
            this.dadosCalcular.planoPagamentoId = this.listPlanoPagamento[0].id
          }
        })
        .finally(() => {
          this.getDadosVenda()
        })
    }

    if(this.$root.isAdmin()){
      this.incluirValor();
      this.incluirDias();
    }
  },
  methods: {
    calcular () {
      this.autorizaCompra = false
      // this.dadosCalcular.flagAutorizacao = this.value.flagAutorizacao
      if (!this.dadosCalcular.formaPagamento) {
        this.$root.showAlerta('Informe a forma de pagamento')
        return
      }
      if (!this.dadosCalcular.nomeProduto) {
        this.$root.showAlerta('Informe o nome do produto')
        return
      }
      if (this.dadosCalcular.vlProduto === '0,00') {
        this.$root.showAlerta('Informe o valor do produto')
        return
      }
      this.loadingBtn = true
      this.dadosCalcular.clienteId = this.value.id
      this.dadosCalcular.lojaId = this.value.lojaId
      this.parcelasSimuladas = []
      VendaBusiness.calcular(this.dadosCalcular)
        .then(response => {
          this.parcelasSimuladas = response.data
        })
        .catch((erro) => {
          this.$root.showAlerta(erro.data);
          if (erro.status === 405) {
            this.dadosCalcular.flagAutorizacao = true;
            this.autorizaCompra = true;
            if (this.$root.isProprietario() || this.$root.isCrediarista()) {
              this.flagSolicitarCredito = true;
            }
          }
        })
        .finally(() => {
          if(!this.$root.isAdmin()){ 
            this.flagIncluir = false
          }
          this.loadingBtn = false
        })
    },
    confirmarIncluirDias () {
      if (this.diasPrimeiraParcela == null || this.diasPrimeiraParcela < 1) {
        this.$root.showAlerta('Insira um número válido')
      } else {
        this.loadingBtn = true
        this.dadosCalcular.diasPrimeiraParcela = this.diasPrimeiraParcela;
        this.loadingBtn = false
      }
    },
    cancelar () {
      this.$router.push('/lista-cliente')
    },
    cancelarEntrada () {
      this.loadingBtn = true
      this.flagIncluir = false
      this.loadingBtn = false
    },
    cancelarIncluirDias () {
      this.loadingBtn = true
      this.flagIncluirDias = false
      this.loadingBtn = false
    },
    incluirValor () {
      this.loadingBtn = true
      this.flagIncluir = true
      this.loadingBtn = false
    },
    incluirDias () {
      this.loadingBtn = true
      this.flagIncluirDias = true
      this.loadingBtn = false
    },
    selecionaTipoPagamento (tipo) {
      this.dadosCalcular.formaPagamento = tipo
      this.parcelasSimuladas = []
    },
    colorPagamento (tipo) {
      if (tipo === this.dadosCalcular.formaPagamento) {
        return 'blue-grey darken-2'
      }
      return 'grey lighten-3'
    },
    autorizarCompra () {
      if (!this.dadosCalcular.parcelaSelecionada) {
        this.$root.showAlerta('Selecione a quantidade de parcela')
      } else {
        this.showDialogAutorizacao = true
      }
    },
    callbackAutorizacao (autorizacaoId) {
      this.closeDialogAutorizacao()
      this.dadosCalcular.autorizacaoId = autorizacaoId
      this.vender()
    },
    vender () {
      this.loading = true
      VendaBusiness.vender(this.dadosCalcular)
        .then(response => {
          this.value.vendaId = response.data.id
          this.value.carneId = response.data.carneId
          this.nextStep()
        })
        .catch(erro => {
          console.log('Erro ao vender', erro)
          this.$root.showErro(erro.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    closeDialog() {
      this.autorizaCompra = false;
    },
    closeDialogAutorizacao () {
      this.showDialogAutorizacao = false
    },
    getDadosVenda () {
      this.loading = true
      LojaBusiness.getDadosVenda(
        this.value.lojaId,
        this.dadosCalcular.planoPagamentoId
      )
        .then(response => {
          this.formasPagamento = response.data.formasPagamento
          this.lojistaEmail = response.data.lojistaEmail || ''
          this.parcelarEm = response.data.parcelarEm
          if (this.formasPagamento.length > 0) {
            this.selecionaTipoPagamento(this.formasPagamento[0])
          }
        })
        .finally(() => {
          ClienteBusiness.getLimiteDisponivel(this.value.id, this.value.lojaId)
            .then(response => {
              this.limite = response.data
            })
            .finally(() => {
              ClienteBusiness.consultaScore(this.value.id, this.value.lojaId)
                .then(response => {
                  this.scoreInicial = response.data
                  // this.series[0] = 'R$ ' + this.scoreInicial.faixaFinal1.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                  // this.series[1] = 'R$ ' + this.scoreInicial.faixaFinal2.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                  // this.series[2] = 'R$ ' + this.scoreInicial.faixaFinal3.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                  this.series[0] = this.scoreInicial.faixaFinal1
                  this.series[1] = this.scoreInicial.faixaFinal2
                  this.series[2] = this.scoreInicial.faixaFinal3
                  this.chartOptions.labels[0] = this.scoreInicial.peEntrada1
                    ? ' 1 + ' + this.parcelarEm + 'x'
                    : this.parcelarEm + 'x'
                  this.chartOptions.labels[1] = this.scoreInicial.peEntrada2
                    ? ' Entrada (' +
                      this.scoreInicial.peEntrada2 +
                      '%) + ' +
                      this.parcelarEm +
                      'x'
                    : this.parcelarEm + 'x'
                  this.chartOptions.labels[2] = this.scoreInicial.peEntrada3
                    ? ' Entrada (' +
                      this.scoreInicial.peEntrada3 +
                      '%) + ' +
                      this.parcelarEm +
                      'x'
                    : this.parcelarEm + 'x'
                })
                .catch(() => console.log('Erro na consultaScore'))
                .finally(() => {
                  this.loading = false
                })
            })
        })
    },
    changePlanoPagamento (planoId) {
      this.dadosCalcular.planoPagamentoId = planoId
      this.parcelasSimuladas = []
      this.getDadosVenda()
    },
    cancelarSolicitacao() {
      this.flagSolicitarCredito = false;
    },
    confirmarSolicitacao() {
      this.loadingBtn = true;
      ClienteBusiness.solicitarCredito(
        this.value.id,
        this.value.lojaId,
        true
      )
        .then((response) => {
          this.flagSolicitarCredito = false;
          this.$root.showSucesso(response.data);
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    formatDinheiro (val) {
      var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
      })
      return formatter.format(val)
    }
  }
}
</script>
