/* eslint-disable no-extra-boolean-cast */
<template>
  <v-container fluid grid-list-md>
    <v-form ref="form1" @submit.prevent="validateBeforeSubmit">
      <v-layout row wrap>
        <v-flex md12>
          <h3 class="subheading">
            <span v-html="descricao" />
          </h3>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout row wrap>
                <v-flex md12>
                  <core-filtro-rede-empresa-loja
                    v-model="value"
                    :disabled="disabled"
                    :obrigatorio="true"
                  />
                </v-flex>
                <v-flex md3>
                  <v-text-field
                    v-mask="'###.###.###-##'"
                    v-validate="value.nome ? '' : 'required'"
                    v-model="value.cpf"
                    label="CPF"
                    name="cpf"
                    hint="<span class='body-2 red--text'>!Informe o CPF do cliente neste campo</span>"
                  />
                </v-flex>
                <!--
                <v-flex md1>
                  <span class="layout fill-height align-center justify-center">
                    <strong class="title">ou</strong>
                  </span>
                </v-flex>
                <v-flex md3>
                  <v-text-field
                    v-model="value.nome"
                    label="Nome do Cliente"/>
                </v-flex>
                -->
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-layout class="justify-end">
            <v-btn outline style="color: black !important" @click="cancelar"
              >Cancelar</v-btn
            >
            <v-btn :loading="loadingBtn" type="submit" color="primary"
              >Continuar</v-btn
            >
          </v-layout>
        </v-flex>
        <v-flex v-if="value.flagAutorizacao" md12>
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
      <core-btn-permissao
        v-if="value.flagAutorizacao && $root.isAdminSupCredProp()"
        :action="consultaSpc"
        :close="closeDialog"
        :data-form="value"
      />
    </v-form>
    <core-progress-modal :show="loading" />
  </v-container>
</template>
<script>
import { ClienteBusiness, LoginBusiness } from "../../business";
import { LOCALSTORAGE } from "../../constants";

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      requided: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    cancelar: {
      type: Function,
      requided: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      loadingBtn: false,
      username: "",
      password: "",
      showPassword: false,
      msgErro: null,
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
  methods: {
    showErro(msg) {
      alert(msg);
    },
    validateBeforeSubmit() {
      this.value.flagAutorizacao = false;
      this.$validator.validate().then((result) => {
        if (result) {
          if (this.value.flagAutorizacao) {
            this.$root.showAlerta(
              "É necessária autorização para liberar essa compra!!!"
            );
            return;
          }
          if (!this.value.lojaId) {
            this.$root.showAlerta("É obrigatório informar uma loja");
            return;
          }
          let token = JSON.parse(localStorage.getItem(LOCALSTORAGE.JWT));
          this.consultaSpc(
            this.value,
            token.tokenType + " " + token.accessToken
          );
        } else {
          this.$root.showAlerta("Erros no formulário, informe os dados!");
        }
      });
    },
    closeDialog() {
      this.value.flagAutorizacao = false;
    },
    consultaSpc(dados, token) {
      this.loading = true;
      this.loadingBtn = true;
      ClienteBusiness.consultaSPC(dados, token)
        .then((response) => {
          // eslint-disable-next-line no-extra-boolean-cast
          if (!!response.data) {
            this.setData(response.data);
          }
          /*
          if (response.data.status === 'RESTRICAO') {
            this.$root.showAlerta('Cliente com restrição! Cadastro não pode ser concluído, tente novamente após regularização.')
            this.cancelar()
            return
          }
          if (response.data.status === 'ANALISE_VISUAL') {
            this.$root.showAlerta('Cliente em análise de crédito! Após finalizar o cadastro aguarde o retorno da nossa equipe.')
          }
          */
          this.nextStep();
        })
        .catch((erro) => {
          if (erro.status === 405) {
            this.value.flagAutorizacao = true;
          }
          this.msgErro = erro.data;
          this.$root.showErro(this.msgErro);
        })
        .finally(() => {
          this.loading = false;
          this.loadingBtn = false;
        });
    },
  },
};
</script>
