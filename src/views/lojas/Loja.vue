<template>
  <v-container 
    fluid 
    grid-list-md>
    <v-layout 
      row 
      wrap>
      <v-flex md12>
        <v-form
          v-model="valid"
          novalidate
          @submit.prevent="validateBeforeSubmit"
        >
          <v-card class="Card">
            <v-card-title 
              class="cardTitle" 
              color="error">
              <h3 
                class="headline mb-0" 
                color="error">Identificação</h3>
            </v-card-title>
            <v-card-text color="error">
              <v-layout 
                row 
                wrap 
                color="error">
                <v-flex 
                  xs12 
                  sm6 
                  md4 
                  color="error">
                  <v-text-field
                    v-validate="'required'"
                    v-model="form.nomeFantasia"
                    :error-messages="errors.collect('Nome Fantasia')"
                    label="Nome Fantasia"
                    data-vv-name="Nome Fantasia"
                    required
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field
                    v-mask="['(##) #### - ####', '(##) ##### - ####']"
                    v-validate="'required'"
                    v-model="form.telefone"
                    :error-messages="errors.collect('Telefone')"
                    label="Telefone"
                    type="text"
                    data-vv-name="Telefone"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field
                    v-mask="['(##) ##### - ####']"
                    v-model="form.whatsapp"
                    label="Whatsapp"
                    type="text"
                    prepend-inner-icon="mdi-whatsapp"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field
                    v-model="form.pessoaContato"
                    label="Pessoa Contato"
                    type="text"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field
                    v-validate="'email'"
                    v-model="form.email"
                    :error-messages="errors.collect('E-mail')"
                    label="Email"
                    type="email"
                    data-vv-name="E-mail"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <template>
            <v-layout class="justify-end">
              <template>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="cancelar"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  :disabled="!valid"
                  :loading="loadingBtn"
                  type="submit"
                  color="primary"
                >
                  Salvar
                </v-btn>
              </template>
            </v-layout>
          </template>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  LojaBusiness,
} from "../../business";

export default {
  metaInfo: {
    titleTemplate: "%s - Marca",
  },
  data() {
    return {
      editando: false,
      form: {
        nomeFantasia: null,
        telefone: null,
        pessoaContato: null,
        email: null,
        whatsapp: null,
      },
      filtros: {
        lojaId: null,
      },
      loading: false,
      totalItems: 0,
      valid: false,
      disabled: false,
      loadingCidades: false,
      loadingBtn: false,
    };
  },
  watch: {
    pagination: {
      handler() {
        this.paginar();
      },
    },
  },
  beforeMount() {
    this.reload();
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.loadingBtn = true;
          this.salvarLoja();
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
      this.loadingBtn = false;
    },
    salvarLoja() {
      this.loadingBtn = true;
      var msgSucesso = !this.form.id
        ? "Cadastro realizado com sucesso"
        : "Atualização realizada com sucesso";
      LojaBusiness.salvar(this.form)
        .then((response) => {
          this.form.id = response.data.id;
          var promiseLogo = null;
          var promiseRegra = null;
          // eslint-disable-next-line no-extra-boolean-cast    
          Promise.all([promiseLogo, promiseRegra])
            .then(() => {
              this.$root.showSucesso(msgSucesso);
              this.$router.push("/lista-loja");
            })
            .catch((error) => this.$root.showErro(error.data))
            .finally(() => {
              this.loadingBtn = false;
            });
        })
        .catch((error) => {
          this.loadingBtn = false;
          this.$root.showErro(error.data);
        });
    },
    cancelar() {
      this.$router.push("/lista-loja");
    },
    voltar() {
      this.reset();
    },
    paginar() {
      if (this.filtros.lojaId != null) {
        this.editando = true;
      }
      if (!this.filtros.lojaId) return;
      //this.loading = true;
    },
    reset() {
      this.disabled = false;
    },
    reload() {
      this.reset();
      this.filtros.lojaId = this.$route.params.id;
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!this.filtros.lojaId) {
        this.loading = true;
        LojaBusiness.getById(this.filtros.lojaId)
          .then((response) => {
            this.form = response.data;
            this.paginar();
          })
          .catch(() =>
            this.$root.showErro("Erro ao buscar informações da loja")
          )
          .finally(() => {
            this.loading = false;
          });
      } 
    },
  },
};
</script>

<style lang="scss">
.Card {
  border-radius: 5px;
}
.hoverable {
  justify-content: center;
  justify-items: center;
  text-align: center;
  border: 2px solid rgba(150, 200, 255, 0);
  transition: border 0.2s ease-in-out;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 2px solid rgba(150, 200, 255, 0.5);
  }
}
.cardTitle {
  background-color: rgba(50, 50, 50, 0.05) !important;
}
</style>