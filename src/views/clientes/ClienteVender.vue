<template>
  <v-container
    fluid
    grid-list-md
  >
    <template>
      <core-progress-modal :show="loading" />
      <v-layout
        v-if="!loading"
        row
        wrap
      >
        <v-flex md12>
          <span
            class="body-2"
          >Cliente: {{ value.nome }} CPF: {{ value.cpf }}</span>
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-model="dadosCalcular.dataVenda"
            v-validate="'required'"
            label="Data Venda"
            type="date"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="dadosCalcular.marcaId"
            v-validate="'required'"
            :error-messages="errors.collect('Marca')"
            :items="marcas"
            label="Marca"
            data-vv-name="Marca"
            name="Marca"
            item-text="nomeFantasia"
            item-value="id"
            clearable
            @change="changeCategoria"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="dadosCalcular.categoria"
            v-validate="'required'"
            :items="categorias"
            :loading="loadingCategorias"
            :error-messages="errors.collect('Categoria')"
            label="Categoria"
            item-value="id"
            item-text="descricao"
            clearable
            @change="changeCodigo"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="dadosCalcular.codigo"
            v-validate="'required'"
            :items="codigos"
            :loading="loadingCodigos"
            :error-messages="errors.collect('Código')"
            label="Código"
            item-value="id"
            item-text="descricao"
            clearable
            @change="changeProduto"
          />
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="dadosCalcular.nomeProduto"
            v-validate="'required'"
            :loading="loadingProduto"
            :error-messages="errors.collect('Nome Produto')"
            label="Nome Produto"
            data-vv-name="Nome Produto"
            required
            reverse
            readonly
          />
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-formata-moeda="dadosCalcular.valorProduto"
            v-validate="'required'"
            v-model.lazy="dadosCalcular.valorProduto"
            :loading="loadingProduto"
            :error-messages="errors.collect('Valor Produto')"
            data-vv-name="Valor Produto"
            suffix="R$"
            reverse
            label="Valor Produto"
            readonly
          />
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-formata-moeda="dadosCalcular.comissao"
            v-validate="'required'"
            v-money="money"
            v-model.lazy="dadosCalcular.comissao"
            :error-messages="errors.collect('Comissao MKT')"
            data-vv-name="Comissão"
            suffix="R$"
            reverse
            label="Comissão MKT"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-formata-moeda="dadosCalcular.frete"
            v-validate="'required'"
            v-money="money"
            v-model.lazy="dadosCalcular.frete"
            :error-messages="errors.collect('Frete')"
            data-vv-name="Frete"
            suffix="R$"
            reverse
            label="Frete"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-formata-moeda="dadosCalcular.desconto"
            v-validate="'required'"
            v-money="money"
            v-model.lazy="dadosCalcular.desconto"
            :error-messages="errors.collect('Desconto')"
            data-vv-name="Desconto"
            suffix="R$"
            reverse
            label="Desconto"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="dadosCalcular.tipo"
            v-validate="'required'"
            :items="tipos"
            item-value="id"
            item-text="descricao"
            label="Tipo de Pagamento"
            clearable
            @change="changeTipo"
          />
        </v-flex>
        <v-flex md4>
          <v-text-field v-if="flagTipo"
            v-validate="'required'"
            v-model="dadosCalcular.qtdParcela"
            :disabled="disabled"
            :error-messages="errors.collect('Qtd Parcela')"
            data-vv-name="Qtd Parcela"
            :rules="[rules.required]"
            required
            min="0"
            step="1"
            type="number"
            oninput="validity.valid||(value='')"
            label="Qtd Parcela"
            reverse
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-text-field v-if="flagTipo"
            v-formata-moeda="dadosCalcular.valorParcela"
            v-validate="'required'"
            v-money="money"
            v-model.lazy="dadosCalcular.valorParcela"
            :error-messages="errors.collect('Valor Parcela')"
            data-vv-name="Valor Parcela"
            suffix="R$"
            reverse
            label="Valor Parcela"
            clearable
          />
        </v-flex>
        <v-flex
          md4
          class="mt-5"
        >
          <v-layout class="justify-end">
            <v-btn
              dark
              @click="goBack"
            >
              Voltar
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex md4/>
        <v-flex  
          md4
          class="mt-5"
        >
          <v-layout class="justify-end">
            <v-btn
              :loading="loadingBtn"
              color="#4caf50"
              @click="vender()"
            >
              Confirmar
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { LojaBusiness, VendaBusiness, TiposBusiness, ProdutoBusiness } from '../../business'
import DateUtils from '../../utils/dateUtils'
import numberUtils from "../../utils/numberUtils";

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2
      },
      rules: {
        required: value => !!value || 'Defina este campo',
        maiorQueZero: value => value > 0 || "Valor não pode ser menor que zero"
      },
      marcas: [],
      tipos: [],
      codigos: [],
      produto: [],
      categorias: [],
      loading: false,
      loadingCategorias: false,
      loadingCodigos: false,
      loadingProduto: false,
      loadingBtn: false,
      flagTipo: false,
      dadosCalcular: {
        marcaId: null,
        categoria: null,
        produtoId: null,
        nomeProduto: null,
        codigo: null,
        valorProduto: null,
        qtdParcela: 1,
        valorParcela: null,
        tipo: null,
        comissao: null,
        frete: null,
        desconto: null,
        clienteId: null,
        dataVenda: DateUtils.currentDate(),
      },
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.dadosCalcular.clienteId = this.value.id;
    this.loading = true
    TiposBusiness.getAllTipoPagamento()
      .then(response => {
        this.tipos = response.data
      })
    LojaBusiness.findAll().then((response) => {
        this.marcas = response.data;
      });
    this.loading = false;
  },
  methods: {
    cancelar () {
      this.$router.push('/lista-cliente')
    },
    changeCategoria(marcaId) {
      this.dadosCalcular.produtoId = null
      this.dadosCalcular.nomeProduto = null
      this.dadosCalcular.valorProduto = null
      this.dadosCalcular.categoria = null
      this.dadosCalcular.codigo = null
      this.dadosCalcular.marcaId = marcaId;
      if (this.dadosCalcular.marcaId) {
        this.loadingCategorias = true;
        ProdutoBusiness.getAllCategoriasByMarca(this.dadosCalcular.marcaId)
          .then((response) => {
            this.categorias = response.data;
          })
          .catch(() => {
            this.$root.showAlerta(
              "Não foi possível buscar as categorias"
            );
          })
          .finally(() => {
            this.loadingCategorias = false;
          });
      }
    },
    changeCodigo(categoria) {
      this.dadosCalcular.produtoId = null
      this.dadosCalcular.nomeProduto = null
      this.dadosCalcular.valorProduto = null
      this.dadosCalcular.codigo = null
      this.dadosCalcular.categoria = categoria;
      if (this.dadosCalcular.categoria) {
        this.loadingCodigos = true;
        ProdutoBusiness.getAllCodigos(this.dadosCalcular.marcaId, this.dadosCalcular.categoria)
          .then((response) => {
            this.codigos = response.data;
          })
          .catch(() => {
            this.$root.showAlerta(
              "Não foi possível buscar os códigos"
            );
          })
          .finally(() => {
            this.loadingCodigos = false;
          });
      }
    },
    changeProduto(codigo) {
      this.dadosCalcular.produtoId = null
      this.dadosCalcular.nomeProduto = null
      this.dadosCalcular.valorProduto = null
      this.dadosCalcular.codigo = codigo;
      if (this.dadosCalcular.codigo) {
        this.loadingProduto = true;
        ProdutoBusiness.getProduto(this.dadosCalcular.codigo)
          .then((response) => {
            this.produto = response.data;
            this.dadosCalcular.produtoId = this.produto.id
            this.dadosCalcular.nomeProduto = this.produto.nome
            this.dadosCalcular.valorProduto = this.formatValorMonetario(this.produto.valorProduto)
            this.dadosCalcular.valorParcela = this.formatValorMonetario(this.produto.valorProduto)
          })
          .catch(() => {
            this.$root.showAlerta(
              "Não foi possível buscar o produto"
            );
          })
          .finally(() => {
            this.loadingProduto = false;
          });
      }
    },
    changeTipo(tipo) {
      this.flagTipo = false;
      this.dadosCalcular.valorParcela = this.formatValorMonetario(this.dadosCalcular.valorProduto)
      this.dadosCalcular.qtdParcela = 1;
      if (tipo === 'CARTAO_CREDITO') {
        this.flagTipo = true;
      }
    },
    vender () {
      this.loading = true
      VendaBusiness.vender(this.dadosCalcular)
        .then(response => {
          this.$root.showSucesso("Venda cadastrada");
          this.nextStep()
        })
        .catch(erro => {
          this.$root.showErro(erro.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    formatValorMonetario(valor) {
      return numberUtils.formatValorMonetario(valor);
    },
  }
}
</script>
