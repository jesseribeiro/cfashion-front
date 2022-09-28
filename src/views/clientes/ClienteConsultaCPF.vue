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
      </v-layout>
    </v-form>
    <core-progress-modal :show="loading" />
  </v-container>
</template>
<script>
import { ClienteBusiness } from "../../business";

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
      this.$validator.validate().then((result) => {
        if (result) {
          this.consultaCPF(this.validateBeforeSubmit);
        } else {
          this.$root.showAlerta("Erros no formulário, informe os dados!");
        }
      });
    },
    consultaCPF(dados) {
      this.loading = true;
      this.loadingBtn = true;
      ClienteBusiness.consultaCPF(this.value)
        .then((response) => {
          if (!!response.data) {
            this.setData(response.data);
          }
          this.nextStep();
        })
        .catch((erro) => {
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
