<!-- eslint-disable vue/no-lone-template -->
<template>
  <v-container 
    fluid 
    grid-list-md
  >
    <v-layout 
      row 
      wrap
    >
      <template>
        <v-flex md12>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step 
                :complete="e1 > 1" 
                step="1"
              >
                Consulta CPF
              </v-stepper-step>

              <v-divider />

              <v-stepper-step 
                :complete="e1 > 2" 
                step="2"
              >
                Vender
              </v-stepper-step>
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
        id: null,
        nome: null,
        cpf: null,
        dataNascimento: null,
        sexo: null,
        celular: null,
        email: null,
        endereco: new Endereco(),
      },
      e1: 0,
      disabled: false,
    };
  },
  beforeMount() {
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
        if (!this.form.id) {
          this.$router.push(
            "/cad-cliente-etapa2?payload=" + JSON.stringify(this.form)
          );
          return;
        }
      }
      this.e1 < 2 ? this.e1++ : (this.e1 = 1);
    },
    voltar() {
      this.e1 > 1 ? this.e1-- : (this.e1 = 1);
    },
    setData(data) {
      this.form = { ...data };
      this.formatDatas();
    },
    formatDatas() {
      if (this.form.dataNascimento) {
        this.form.dataNascimento = this.$moment(
          this.form.dataNascimento
        ).format("YYYY-MM-DD");
      }
    },
    cancelar() {
      this.$router.push(`/lista-cliente`);
    },
  },
};
</script>
