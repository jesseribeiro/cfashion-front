<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <template>
        <v-flex md12>
          <v-stepper v-model="e1" non-linear>
            <v-stepper-header>
              <v-stepper-step
                :complete="e1 > 1"
                editable
                class="body-2 mt-1"
                step="1"
                @click="e1 = 1"
                >Consulta CPF</v-stepper-step
              >

              <v-divider />

              <v-stepper-step
                :editable="ue >= 2"
                :complete="e1 > 2"
                class="body-2 mt-1"
                step="2"
                @click="clickable(2)"
                >Dados Cadastrais</v-stepper-step
              >
              <v-divider />

              <v-stepper-step
                :editable="ue >= 3"
                :complete="e1 > 3"
                class="body-2 mt-1"
                step="3"
                @click="clickable(3)"
                >Contrato/Assinatura</v-stepper-step
              >
              <v-divider />

              <v-stepper-step
                :editable="ue >= 4"
                :complete="e1 > 4"
                class="body-2 mt-1"
                step="4"
                @click="clickable(4)"
                >Digitalizar Docs</v-stepper-step
              >
              <v-divider />

              <v-stepper-step
                :editable="ue >= 5"
                :complete="e1 > 5"
                class="body-2 mt-1"
                step="5"
                @click="clickable(5)"
                >Vender</v-stepper-step
              >
              <v-divider />

              <v-stepper-step
                :editable="ue >= 6"
                :complete="e1 > 6"
                class="body-2 mt-1"
                step="6"
                @click="clickable(6)"
                >Impressão Carnê</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <cliente-consulta-CPF
                  :value="form"
                  :next-step="continuar"
                  :set-data="setData"
                  :cancelar="cancelar"
                  :descricao="`Informe abaixo o número do CPF do cliente a ser cadastrado e clique no botão <strong class='title'>CONTINUAR</strong> para iniciar o processo de cadastramento.`"
                />
              </v-stepper-content>

              <v-stepper-content step="2">
                <template v-if="e1 === 2">
                  <cliente-dados
                    :value="form"
                    :disabled="disabled"
                    :next-step="continuar"
                    :go-back="voltar"
                    :set-data="setData"
                  />
                </template>
              </v-stepper-content>

              <v-stepper-content step="3">
                <template v-if="e1 === 3">
                  <cliente-contrato
                    :value="form"
                    :disabled="disabled"
                    :next-step="continuar"
                    :go-back="voltar"
                  />
                </template>
              </v-stepper-content>

              <v-stepper-content step="4">
                <template v-if="e1 === 4">
                  <cliente-digitalizar-docs
                    :value="form"
                    :disabled="disabled"
                    :next-step="continuar"
                    :go-back="voltar"
                  />
                </template>
              </v-stepper-content>

              <v-stepper-content step="5">
                <template v-if="e1 === 5">
                  <cliente-vender
                    :value="form"
                    :disabled="disabled"
                    :next-step="continuar"
                    :go-back="voltar"
                  />
                </template>
              </v-stepper-content>

              <v-stepper-content step="6">
                <template v-if="e1 === 6">
                  <cliente-imprimir-carne
                    :value="form"
                    :disabled="disabled"
                    :cancelar="cancelar"
                  />
                </template>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>
<script>
import Endereco from "../../beans/Endereco";
import { ClienteBusiness } from "../../business";

const ClienteConsultaCPF = () => import("./ClienteConsultaCPF.vue");
const ClienteDados = () => import("./ClienteDados.vue");
const ClienteContrato = () => import("./ClienteContrato.vue");
const ClienteDigitalizarDocs = () => import("./ClienteDigitalizarDocs.vue");
const ClienteVender = () => import("./ClienteVender.vue");
const ClienteImprimirCarne = () => import("./ClienteImprimirCarne");

export default {
  metaInfo: {
    titleTemplate: "%s - Cliente",
  },
  components: {
    ClienteConsultaCPF,
    ClienteDados,
    ClienteContrato,
    ClienteDigitalizarDocs,
    ClienteVender,
    ClienteImprimirCarne,
  },
  data() {
    return {
      form: {
        flagAutorizacao: false,
        id: null,
        redeId: null,
        empresaId: null,
        lojaId: null,
        nome: null,
        cpf: null,
        identidade: null,
        orgaoEmissor: null,
        dataEmissao: null,
        uf: null,
        grupo: null,
        dataNascimento: null,
        naturalEstado: null,
        naturalCidade: null,
        sexo: null,
        estadoCivil: null,
        dependentes: null,
        nomePai: null,
        nomeMae: null,
        telResidencial: null,
        celular: null,
        email: null,
        escolaridade: null,
        rendaPrincipal: null,
        endereco: new Endereco(),
        tipoResidencia: null,
        tempoResidenciaAnos: null,
        tempoResidenciaMeses: null,
        empresa: null,
        cargo: null,
        tempoEmpregoAnos: null,
        tempoEmpregoMeses: null,
        telComercial: null,
        ramal: null,
        nomeRef1: null,
        relacaoRef1: null,
        telRef1: null,
        nomeRef2: null,
        relacaoRef2: null,
        telRef2: null,
        nomeRef3: null,
        relacaoRef3: null,
        telRef3: null,
        nomeRef4: null,
        relacaoRef4: null,
        telRef4: null,
        vendaId: null,
        carneId: null,
        observacoes: [],
        limitesPreAprovado: null,
        permitirEnvioSPC: true,
        jaTemCadastroNaLoja: false,
        enderecoSecundario: false,
        enderecoAlternativo: {
          cep: null,
          logradouro: null,
          numero: null,
          complemento: null,
          uf: null,
          cidadeIbge: null,
          bairro: null
        }
      },
      e1: 0,
      ue: 0,
      disabled: false,
    };
  },
  beforeMount() {
    // caso o lojista tente vender e o cliente nao esteja cadastrado vai cair aqui e vai seguir os passos de cadastro, seguido de venda
    if (this.$route.query && this.$route.query.payload) {
      this.setData(JSON.parse(this.$route.query.payload));
      this.e1 = 2;
    } else {
      this.form.id = this.$route.params.id;
      if (this.form.id) {
        ClienteBusiness.getById(this.form.id).then((response) => {
          this.form = response.data;
          this.form.lojaId = this.$route.params.lojaId;
          this.formatDatas();
          this.e1 = 2;
        });
      } else {
        this.form.redeId = this.$root.redeId();
        this.form.empresaId = this.$root.empresaId();
        this.form.lojaId = this.$root.lojaId();
      }
    }
    this.ue == 0 ? (this.ue = 1) : (this.ue = this.e1);
  },
  methods: {
    clickable(fieldValue) {
      if (this.ue >= fieldValue) {
        this.e1 = fieldValue;
      }
    },
    validateBeforeSubmit() {
      if (this.$refs.form.validate()) {
        this.continuar();
      } else {
        this.$root.showAlerta(
          this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
        );
      }
    },
    continuar() {
      // * MODIFICAÇÃO NA REGRA PARA A AUTORIZACAO FECHAR
      if (this.e1 === "1") {
        if (!this.form.id || !this.form.jaTemCadastroNaLoja) {
          this.form.flagAutorizacao = false;
          this.$router.push(
            "/cad-cliente-etapa2?payload=" + JSON.stringify(this.form)
          );
        }
      }
      this.e1 < 6 ? this.e1++ : (this.e1 = 1);

      if (this.ue < this.e1 && this.ue < 6) {
        this.ue++;
      }
    },
    voltar() {
      this.e1 > 1 ? this.e1-- : (this.e1 = 1);
    },
    setData(data) {
      // let lojaId = this.form.lojaId
      this.form = { ...data };
      // if (lojaId) { this.form.lojaId = lojaId }
      if (!this.form.endereco) {
        this.form.endereco = new Endereco();
      }
      if (!this.form.enderecoAlternativo) {
        this.form.enderecoAlternativo = {
          cep: null,
          logradouro: null,
          numero: null,
          complemento: null,
          uf: null,
          cidadeIbge: null,
          bairro: null
        }
      }
      this.formatDatas();
    },
    formatDatas() {
      if (this.form.dataEmissao) {
        this.form.dataEmissao = this.$moment(this.form.dataEmissao).format(
          "YYYY-MM-DD"
        );
      }
      if (this.form.dataNascimento) {
        this.form.dataNascimento = this.$moment(
          this.form.dataNascimento
        ).format("YYYY-MM-DD");
      }
      if (this.form.observacoes) {
        this.form.observacoes = this.form.observacoes.map((value) => {
          value.dataCadastro = this.$moment(value.dataCadastro).format(
            "YYYY-MM-DD"
          );
          return value;
        });
      }
    },
    cancelar() {
      this.$router.push(`/lista-cliente`);
    },
  },
};
</script>
