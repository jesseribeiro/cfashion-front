<template>
  <v-container 
    fluid 
    grid-list-md>
    <v-layout 
      row 
      wrap>
      <template>
        <v-flex md12>
          <v-stepper 
            v-model="e1" 
            non-linear>
            <v-stepper-header>
              <v-stepper-step
                color="pink"   
                :complete="e1 > 1"
                editable
                class="body-2 mt-1"
                step="1"
                @click="e1 = 1"
              >Consulta CPF</v-stepper-step
              >

              <v-divider />

              <v-stepper-step
                color="pink"   
                :editable="ue >= 2"
                :complete="e1 > 2"
                class="body-2 mt-1"
                step="2"
                @click="clickable(2)"
              >Dados Cadastrais</v-stepper-step
              >
              <v-divider />

              <v-stepper-step
                color="pink"   
                :editable="ue >= 3"
                :complete="e1 > 3"
                class="body-2 mt-1"
                step="3"
                @click="clickable(3)"
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
import { ClienteBusiness } from "../../business";

const ClienteConsultaCPF = () => import("./ClienteConsultaCPF.vue");
const ClienteDados = () => import("./ClienteDados.vue");
const ClienteVender = () => import("./ClienteVender.vue");

export default {
  metaInfo: {
    titleTemplate: "%s - Cliente",
  },
  components: {
    ClienteConsultaCPF,
    ClienteDados,
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
          this.formatDatas();
          this.e1 = 2;
        });
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
      if (this.e1 === "1") {
        if (!this.form.id) {
          console.log(this.form);
          this.$router.push(
            "/cad-cliente-etapa2?payload=" + JSON.stringify(this.form)
          );
        }
      }
      this.e1 < 3 ? this.e1++ : (this.e1 = 1);

      if (this.ue < this.e1 && this.ue < 3) {
        this.ue++;
      }
    },
    voltar() {
      this.e1 > 1 ? this.e1-- : (this.e1 = 1);
    },
    setData(data) {
      this.form = { ...data };
      if (!this.form.endereco) {
        this.form.endereco = new Endereco();
      }
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
