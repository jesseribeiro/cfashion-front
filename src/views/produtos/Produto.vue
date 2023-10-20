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
      <v-flex md12>
        <v-form
          v-model="valid"
          novalidate
          @submit.prevent="validateBeforeSubmit"
        >
          <v-card class="Card">
            <v-card-title class="cardTitle">
              <h3 class="headline mb-0">
                Identificação
              </h3>
            </v-card-title>
            <v-card-text>
              <v-layout 
                row 
                wrap
              >
                <v-flex 
                  xs12 
                  sm6 
                  md4
                >
                  <v-text-field
                    v-validate="'required'"
                    v-model="form.nome"
                    :error-messages="errors.collect('Nome')"
                    label="Nome"
                    data-vv-name="Nome"
                    required
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="form.codigo"
                    :error-messages="errors.collect('Código')"
                    name="codigo"
                    data-vv-name="Codigo"
                    maxlength="15"
                    label="Codigo"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="form.cor"
                    label="Cor"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-money="money"
                    v-validate="'required'"
                    v-formata-moeda="form.valorCompra"
                    v-model.lazy="form.valorCompra"
                    :error-messages="errors.collect('Valor Compra')"
                    :disabled="disabled"
                    data-vv-name="Valor Compra"
                    suffix="R$"
                    label="Valor Compra"
                    reverse  
                    clearable                 
                    type="tel"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="form.tamanho"
                    :error-messages="errors.collect('Tamanho')"
                    :items="tamanhos"
                    label="Tamanho"
                    name="tamanho"
                    data-vv-name="Tamanho"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="form.categoria"
                    :error-messages="errors.collect('Categoria')"
                    :items="categorias"
                    label="Categoria"
                    name="categoria"
                    data-vv-name="Categoria"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="form.qtd"
                    :disabled="disabled"
                    :error-messages="errors.collect('Qtd')"
                    :rules="[rules.required]"
                    data-vv-name="Qtd"
                    required
                    min="0"
                    step="1"
                    type="number"
                    oninput="validity.valid||(value='')"
                    label="Qtd"
                    reverse
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="form.marcaId"
                    :error-messages="errors.collect('Marca')"
                    :items="marcas"
                    label="Marca"
                    data-vv-name="Marca"
                    name="Marca"
                    item-text="nomeFantasia"
                    item-value="id"
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
                  color="pink"
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
import { TiposBusiness, ProdutoBusiness, LojaBusiness } from "../../business";
import { MONEY } from '../../constants'
import numberUtils from '../../utils/numberUtils'

export default {
  metaInfo: {
    titleTemplate: "%s - Produto",
  },
  data() {
    return {
      money: MONEY,
      editando: false,
      form: {
        nome: null,
        tamanho: null,
        categoria: null,
        cor: null,
        qtd: null,
        codigo: null,
        valorCompra: null,
        marcaId: null,
      },
      rules: {
        required: value => !!value || 'Defina este campo',
        maiorQueZero: value => value > 0 || "Valor não pode ser menor que zero"
      },
      tamanhos: [],
      categorias: [],
      marcas: [],
      filtros: {
        produtoId: null,
      },
      loading: false,
      totalItems: 0,
      valid: false,
      disabled: false,
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
          this.salvarProduto();
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
      this.loadingBtn = false;
    },
    salvarProduto() {
      this.loadingBtn = true;
      var msgSucesso = !this.form.id
        ? "Cadastro realizado com sucesso"
        : "Atualização realizada com sucesso";
      ProdutoBusiness.salvar(this.form)
        .then((response) => {
          this.form.id = response.data.id;
          var promiseLogo = null;
          var promiseRegra = null;
          // eslint-disable-next-line no-extra-boolean-cast    
          Promise.all([promiseLogo, promiseRegra])
            .then(() => {
              this.$root.showSucesso(msgSucesso);
              this.$router.push("/lista-produto");
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
      this.$router.push("/lista-produto");
    },
    voltar() {
      this.reset();
    },
    paginar() {
      if (this.filtros.produtoId != null) {
        this.editando = true;
      }
      if (!this.filtros.produtoId) return;
    },
    reset() {
      this.disabled = false;
    },
    reload() {
      TiposBusiness.getAllTamanho().then((response) => {
        this.tamanhos = response.data;
      });
      TiposBusiness.getAllCategoria().then((response) => {
        this.categorias = response.data;
      });
      LojaBusiness.findAll().then((response) => {
        this.marcas = response.data;
      });
      this.reset();
      this.filtros.produtoId = this.$route.params.id;
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!this.filtros.produtoId) {
        this.loading = true;
        ProdutoBusiness.getById(this.filtros.produtoId)
          .then((response) => {
            this.form = response.data;
            console.log(this.formatValorMonetario(this.form.valorProduto))
            this.form.valorProduto = this.formatValorMonetario(this.form.valorProduto);
            this.form.valorCompra = this.formatValorMonetario(this.form.valorCompra);
            this.paginar();
          })
          .catch(() =>
            this.$root.showErro("Erro ao buscar informações do produto")
          )
          .finally(() => {
            this.loading = false;
          });
      } 
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    }
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