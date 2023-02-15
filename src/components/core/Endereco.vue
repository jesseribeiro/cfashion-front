<!-- eslint-disable vue/require-prop-type-constructor -->
<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-expansion-panel 
    v-if="!loading" 
    v-model="panel" 
    :class="classPanel" 
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
        <span class="title white--text">Endereço</span>
      </template>
      <v-card class="elevation-0">
        <v-card-text>
          <v-layout 
            row 
            wrap
          >
            <v-flex 
              md3 
              sm6
            >
              <v-text-field
                v-model="value.cep"
                v-mask="'#####-###'"
                v-validate="'required'"
                :error-messages="errors.collect('CEP')"
                data-vv-name="CEP"
                label="CEP"
                @blur="consultarCEP"
              />
            </v-flex>
            <template v-if="flagIncluir">
              <v-flex md10>
                <v-btn
                  :loading="loadingBtn"
                  dark
                  color="primary"
                  @click="incluirCEP"
                >
                  Incluir CEP
                </v-btn>

                <v-btn 
                  outline 
                  style="color: black !important" 
                  @click="cancelar"
                >
                  Cancelar
                </v-btn>
              </v-flex>
            </template>
            <template v-else>
              <v-flex 
                md3 
                sm6
              >
                <v-btn
                  :loading="loadingBtn"
                  dark
                  color="primary"
                  @click="consultarCEP"
                >
                  Consultar CEP
                </v-btn>
              </v-flex>
              <v-flex 
                md6 
                sm12
              >
                <v-layout 
                  align-center 
                  row 
                  fill-height 
                  wrap
                >
                  <v-label>ou pesquise pelo endereço nos</v-label>&nbsp;&nbsp;
                  <a 
                    href="http://www.buscacep.correios.com.br" 
                    target="_blank"
                  >
                    <v-img
                      src="/img/correios-logo.png"
                      height="20"
                      width="100"
                    />
                  </a>
                </v-layout>
              </v-flex>
            </template>

            <v-flex md7>
              <v-text-field
                v-model="value.logradouro"
                v-validate="'required'"
                :error-messages="errors.collect('Endereço (Rua,Av.,etc)')"
                data-vv-name="Endereço (Rua,Av.,etc)"
                label="Endereço (Rua,Av.,etc)"
              />
            </v-flex>
            <v-flex md2>
              <v-text-field
                v-model="value.numero"
                v-validate="'required'"
                :error-messages="errors.collect('Número')"
                data-vv-name="Número"
                label="Número"
              />
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="value.complemento"
                label="Complemento"
                type="text"
              />
            </v-flex>

            <v-flex md2>
              <v-autocomplete
                v-model="value.estado"
                v-validate="'required'"
                :items="estados"
                :error-messages="errors.collect('Estado')"
                label="Estado"
                data-vv-name="Estado"
                item-text="uf"
                item-value="uf"
                prepend-icon="mdi-map"
                @change="carregarCidades"
              />
            </v-flex>

            <v-flex md5>
              <v-autocomplete
                v-model="value.cidadeIbge"
                v-validate="'required'"
                :error-messages="errors.collect('Cidade')"
                :items="cidades"
                :loading="loadingCidades"
                label="Cidade"
                data-vv-name="Cidade"
                item-text="nome"
                item-value="ibge"
                no-data-text="Selecione um estado, para aparecer as cidades"
              />
            </v-flex>

            <v-flex md5>
              <v-text-field
                v-model="value.bairro"
                v-validate="'required'"
                :error-messages="errors.collect('Bairro')"
                data-vv-name="Bairro"
                label="Bairro"
              />
            </v-flex>
            <v-flex md12>
              <slot />
            </v-flex>
          </v-layout>
        </v-card-text>
        <template>
          <v-layout 
            row 
            justify-center
          >
            <v-dialog 
              v-model="dialog" 
              max-width="390"
            >
              <v-card>
                <v-card-title class="headline">
                  CEP Não Encontrado
                </v-card-title>

                <v-card-text>
                  <p>Não foi encontrado endereço com esse CEP.</p>
                  <p>
                    Para incluir esse CEP preencha os dados do endereço e clique
                    em <span class="font-weight-black">INCLUIR CEP</span>.
                  </p>
                  <p>
                    Para desistir da inclusão do CEP, cliente em
                    <span class="font-weight-black">CANCELAR</span>.
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn 
                    color="primary" 
                    @click="dialog = false"
                  >
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </template>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  <div v-else>
    <v-icon> Carregando </v-icon>
  </div>
</template>
<script>
import { EstadoBusiness, CepBusiness } from "../../business";
export default {
  name: "VEndereco",
  // https://zaengle.com/blog/using-v-model-on-nested-vue-components
  props: {
    value: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false,
    expanded: {
      type: Boolean,
      required: false,
      default: true,
    },
    classPanel: {
      type: String,
      required: false,
      default: "",
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      panel: [this.expanded],
      estados: [],
      cidades: [],
      loadingCidades: false,
      flagIncluir: false,
      dialog: false,
      loadingBtn: false,
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    loading() {
      if (this.value && this.value.estado) {
        this.carregarCidades(this.value.estado);
      }
    },
  },
  mounted() {
    if (this.value && this.value.estado) {
      this.carregarCidades(this.value.estado);
    }
  },
  beforeMount() {
    EstadoBusiness.findAll()
      .then((response) => {
        this.estados = response.data;
      })
      .catch(() =>
        this.$root.showAlerta(
          "Não foi possível buscar as informações de estado"
        )
      );
  },
  methods: {
    incluirCEP() {
      this.loadingBtn = true;
      CepBusiness.salvar({
        cep: this.value.cep,
        logradouro: this.value.logradouro,
        complemento: this.value.complemento,
        bairro: this.value.bairro,
        uf: this.value.estado,
        ibge: this.value.cidadeIbge,
      })
        .then(() => {
          this.$root.showSucesso("CEP cadastrado com sucesso");
        })
        .catch(() => {
          this.$root.showErro(
            "Não foi possível cadastrar o CEP, tentar mais tarde"
          );
        })
        .finally(() => {
          this.loadingBtn = false;
          this.flagIncluir = false;
        });
    },
    cancelar() {
      this.flagIncluir = false;
    },
    consultarCEP() {
      if(this.value.cep) {
        this.loadingBtn = true;
        CepBusiness.consultaCep(this.value.cep)
          .then((response) => {
            this.carregarCidades(response.data.uf);
            this.value.bairro = response.data.bairro
            this.value.cidadeIbge = Number(response.data.ibge)
            this.value.logradouro = response.data.logradouro
          })
          .catch(() => {
            this.dialog = true;
            this.flagIncluir = true;
          })
          .finally(() => {
            this.loadingBtn = false;
          });
      }
    },
    async carregarCidades(estado) {
      if (estado) {
        this.value.estado = estado;
        this.loadingCidades = true;
        await EstadoBusiness.getCidadesByUf(this.value.estado)
          .then((response) => {
            this.cidades = response.data;
            this.loadingCidades = false;
          })
          .catch(() => {
            this.$root.showAlerta(
              "Não foi possível buscar as informações das cidades"
            );
            this.loadingCidades = false;
          });
      } else {
        console.error("Não existe estado definido");
      }
    },
  },
};
</script>
