<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <template>
        <v-flex md12>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1"
                >Consulta CPF</v-stepper-step
              >

              <v-divider />

              <v-stepper-step :complete="e1 > 2" step="2"
                >Vender</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <cliente-consulta-CPF
                  :value="form"
                  :next-step="continuar"
                  :set-data="setData"
                  :cancelar="cancelar"
                  :descricao="`Informe abaixo o número do CPF do cliente e clique no botão <strong class='title'>CONTINUAR</strong> para iniciar o processo de venda.`"
                />
              </v-stepper-content>

              <v-stepper-content step="2">
                <template v-if="e1 === 2">
                  <cliente-vender
                    :value="form"
                    :disabled="disabled"
                    :next-step="continuar"
                    :go-back="voltar"
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

const ClienteConsultaCPF = () => import("../clientes/ClienteConsultaCPF.vue");
const ClienteVender = () => import("../clientes/ClienteVender.vue");

export default {
  metaInfo: {
    titleTemplate: "%s - Vender",
  },
  components: {
    ClienteConsultaCPF,
    ClienteVender,
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
        observacoes: [],
        jaTemCadastroNaLoja: false,
      },
      e1: 0,
      disabled: false,
    };
  },
  beforeMount() {
    this.form.redeId = this.$root.redeId();
    this.form.empresaId = this.$root.empresaId();
    this.form.lojaId = this.$root.lojaId();
  },
  methods: {
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
      if (this.e1 === "1") {
        if (!this.form.id || !this.form.jaTemCadastroNaLoja) {
          this.form.flagAutorizacao = false;
          this.$router.push(
            "/cad-cliente-etapa2?payload=" + JSON.stringify(this.form)
          );
          return;
        }
      }
      this.e1 < 3 ? this.e1++ : (this.e1 = 1);
    },
    voltar() {
      this.e1 > 1 ? this.e1-- : (this.e1 = 1);
    },
    setData(data) {
      // let lojaId = this.form.lojaId
      this.form = { ...data };
      // if (lojaId) {  this.form.lojaId = lojaId }
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
