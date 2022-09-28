<template>
  <v-container
    fluid
    grid-list-md
  >
    <core-progress-modal :show="loading" />
    <v-form
      v-if="!loading"
      ref="form2"
      v-model="valid"
      lazy-validation
      @submit.prevent="validateBeforeSubmit"
    >
      <v-layout
        row
        wrap
      >
        <v-flex md12>
          <v-expansion-panel
            v-model="panel"
            expand
          >
            <v-expansion-panel-content
              :key="0"
              class="primary"
            >
              <template slot="actions">
                <v-icon color="white">
                  mdi-chevron-down
                </v-icon>
              </template>
              <template slot="header">
                <span class="title white--text">Identificação</span>
              </template>
              <v-card class="elevation-0">
                <v-card-text>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex md4>
                      <v-text-field
                        v-model="value.nome"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nome')"
                        name="nome"
                        data-vv-name="Nome"
                        label="Nome"
                      />
                    </v-flex>

                    <v-flex md4>
                      <v-text-field
                        v-model.trim="value.cpf"
                        v-mask="['###.###.###-##']"
                        v-validate="'required'"
                        :error-messages="errors.collect('CPF')"
                        readonly
                        type="text"
                        name="cpf"
                        data-vv-name="CPF"
                        label="CPF"
                      />
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="value.dataNascimento"
                        :error-messages="errors.collect('Nascimento')"
                        :rules="[rulesDate.dataFutura]"
                        type="date"
                        label="Nascimento"
                        name="dataNascimento"
                        data-vv-name="Nascimento"
                      />
                    </v-flex>
                    <v-flex md4>
                      <v-autocomplete
                        v-model="value.sexo"
                        :error-messages="errors.collect('Sexo')"
                        :items="sexos"
                        label="Sexo"
                        name="sexo"
                        data-vv-name="Sexo"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>

                    <v-flex md4>
                      <v-text-field
                        v-model="value.celular"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        :error-messages="errors.collect('Celular')"
                        label="Celular"
                        name="celular"
                        data-vv-name="Celular"
                        hint="<span class='body-2 red--text'>!Incluir o celular do cliente, qualquer informação será enviada para esse número!</span>"
                      />
                    </v-flex>
                
                    <v-flex md4>
                      <v-text-field
                        v-model="value.email"
                        :error-messages="errors.collect('Email')"
                        type="email"
                        label="Email"
                        name="email"
                        data-vv-name="Email"
                        hint="<span class='body-2 red--text'>!caso cliente não possua email, digitar nao@email.com.br</span>"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <core-endereco
              v-if="value.endereco"
              v-model="value.endereco"
              :loading="loading"
              :disabled="disabled"
            >
            </core-endereco>
          </v-expansion-panel>
        </v-flex>
        <v-flex
          v-if="!cobranca"
          md12
        >
          <v-layout class="justify-end">
            <v-btn
              dark
              @click="goBack"
            >
              {{
                editando ? "Sair" : "Voltar"
              }}
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="loadingBtn"
              type="submit"
              color="primary"
            >
              {{ editando ? "Salvar" : "Continuar" }}
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import {
  ClienteBusiness,
  EstadoBusiness,
  TiposBusiness,
} from "../../business";
import numberUtils from "../../utils/numberUtils";
import dateUtils from "../../utils/dateUtils";

export default {
  components: {
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false,
    // eslint-disable-next-line vue/require-default-prop
    editando: false,
    cobranca: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      startEndereco: false,
      panel: [true, true, true],
      loading: false,
      valid: true,
      sexos: [],
      loadingBtn: false,
      hoje: this.$moment().format("YYYY-MM-DD"),
      rulesDate: {
        dataFutura: (value) => {
          return dateUtils.validaDataFutura(value);
        },
      },
      rulesDesde: {
        dataFutura: (value) => {
          if (!dateUtils.validaDesdeMMYYYY(value)) {
            return "O período tem que ser menor que a data atual";
          }
          return true;
        },
      },
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
  beforeMount() {
    this.reload();
  },
  mounted() {
    setTimeout(() => {
      this.startEndereco = true;
    }, 4000);
  },
  methods: {
    validateBeforeSubmit() {
      var self = this;
      this.$validator.validate().then((result) => {
        if (result) {
          this.loadingBtn = true;
          ClienteBusiness.salvar(this.value)
            .then((response) => {
              this.$root.showSucesso("Dados enviados com sucesso");
              this.setData(response.data);
              this.nextStep();
            })
            .catch((erro) => {
              return this.$root.showErro(erro.data);
            })
            .finally(() => {
              this.loadingBtn = false;
            });
          
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
    },
    cancelar() {
      this.$router.push("/lista-cliente");
    },
    reload() {
      this.loading = true;
      TiposBusiness.getAllSexo().then((response) => {
        this.sexos = response.data;
      });
      this.loading = false;
      this.loadingBtn = false;
    },
    formatValorMonetario(valor) {
      return "R$ " + numberUtils.formatValorMonetario(valor);
    },
    visualizarCliente(item) {
      this.$router.push(`/cad-cliente/${item.clienteId}`);
      this.loading = true;
      window.location.reload();
    },
  },
};
</script>
