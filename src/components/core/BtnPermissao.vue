<template>
  <v-layout row justify-center>
    <v-dialog value="true" persistent max-width="420">
      <v-form novalidate @submit.prevent="validaForm">
        <v-card>
          <v-card-title class="headline">Controle de Permissão</v-card-title>
          <v-card-text>
            Essa operação necessita da autorização do seu superior
            <v-layout row wrap>
              <v-flex md6>
                <v-text-field
                  v-validate="'required'"
                  v-model="login"
                  :error-messages="errors.collect('Usuário')"
                  type="text"
                  label="Usuário"
                  data-vv-name="Usuário"
                  hint="Informe o login"
                />
              </v-flex>
              <v-flex md6>
                <v-text-field
                  v-validate="'required'"
                  v-model="senha"
                  :error-messages="errors.collect('Senha')"
                  label="Senha"
                  type="password"
                  data-vv-name="Senha"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn outline style="color: black !important" @click="cancelar"
              >Cancelar</v-btn
            >
            <v-btn :loading="loading" color="primary" type="submit"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import { LoginBusiness } from "../../business";
export default {
  props: {
    action: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    dataForm: {
      type: Object | String | Number,
      required: true,
    },
  },
  data() {
    return {
      login: null,
      senha: null,
      loading: false,
    };
  },
  methods: {
    dispatch(tokenSuperior) {
      this.loading = true;
      this.action(this.dataForm, tokenSuperior);
      this.loading = false;
    },
    validaForm() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.loading = true;
          LoginBusiness.login(this.login, this.senha)
            .then((response) => {
              let tokenSuperior = response.data;
              this.dispatch(tokenSuperior);
            })
            .catch((response) => {
              this.$root.showErro("Usuário ou senha inválidos");
              this.loading = false;
            });
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
    },
    cancelar() {
      this.loading = false;
      this.close();
    },
  },
};
</script>
