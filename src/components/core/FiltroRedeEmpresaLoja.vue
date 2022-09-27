/* eslint-disable vue/no-mutating-props */
<template>
  <v-layout v-if="!$root.isCrediarista()" row wrap>
    <v-flex v-if="$root.isAdminSupComercial()" md4 sm6 xs12 class="pa-1">
      <v-autocomplete
        v-validate="obrigatorio ? 'required' : ''"
        v-model="value.redeId"
        :items="redes"
        :error-messages="errors.collect('Rede')"
        :disabled="disabled"
        label="Rede"
        data-vv-name="Rede"
        item-value="id"
        item-text="descricao"
        @change="changeRede"
      />
    </v-flex>
    <v-flex v-if="!hiddenEmpresa && $root.isAdminSupComercial()" md4 sm6 xs12 class="pa-1">
      <v-autocomplete
        v-validate="obrigatorio ? 'required' : ''"
        v-model="value.empresaId"
        :disabled="disabled"
        :items="empresas"
        :error-messages="errors.collect('Empresa')"
        data-vv-name="Empresa"
        label="Empresa"
        item-value="id"
        item-text="descricao"
        @change="changeEmpresa"
      />
    </v-flex>
    <v-flex v-if="!hiddenLoja" md4 sm6 xs12 class="pa-1">
      <v-autocomplete
        v-validate="obrigatorio ? 'required' : ''"
        v-model="value.lojaId"
        :disabled="disabled"
        :items="lojas"
        :error-messages="errors.collect('Loja')"
        data-vv-name="Loja"
        label="Loja"
        item-value="id"
        item-text="descricao"
        @change="onLojaSelecionada"
      />
    </v-flex>
  </v-layout>
  <v-layout v-else row wrap>
    <v-flex v-if="$root.isAdminSupComercial()" sm6 xs12 class="pa-1">
      <v-autocomplete
        v-validate="obrigatorio ? 'required' : ''"
        v-model="value.redeId"
        :disabled="disabled"
        :items="redes"
        :error-messages="errors.collect('Rede')"
        label="Rede"
        data-vv-name="Rede"
        item-value="id"
        item-text="descricao"
        @change="changeRede"
      />
    </v-flex>
    <v-flex v-if="$root.isAdminSupComercial()" sm6 xs12 class="pa-1">
      <v-autocomplete
        v-validate="obrigatorio ? 'required' : ''"
        v-model="value.empresaId"
        :disabled="disabled"
        :items="empresas"
        :error-messages="errors.collect('Empresa')"
        data-vv-name="Empresa"
        label="Empresa"
        item-value="id"
        item-text="descricao"
        @change="changeEmpresa"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { TiposBusiness } from "../../business";
import { TODAS_ID } from "../../constants";

export default {
  inject: ["$validator"],
  // https://zaengle.com/blog/using-v-model-on-nested-vue-components
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    onChangeRede: {
      type: Function,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    onChangeEmpresa: {
      type: Function,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    lojaSelecionada: {
      type: Function,
      required: false,
    },
    showTodas: {
      type: Boolean,
      required: false,
      default: false,
    },
    obrigatorio: {
      type: Boolean,
      required: false,
      default: false,
    },
    hiddenLoja: {
      type: Boolean,
      required: false,
      default: false,
    },
    hiddenEmpresa: {
      type: Boolean,
      required: false,
      default: false,
    },
      disabled:{
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      redes: [],
      empresas: [],
      lojas: [],
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
  beforeMount() {
    if (this.showTodas) {
      this.redes.push({ id: TODAS_ID, descricao: "Todas Redes" });
      this.empresas.push({ id: TODAS_ID, descricao: "Todas Empresas" });
      this.lojas.push({ id: TODAS_ID, descricao: "Todas Lojas" });
      // eslint-disable-next-line vue/no-mutating-props
      this.value.redeId = TODAS_ID;
      // eslint-disable-next-line vue/no-mutating-props
      this.value.empresaId = TODAS_ID;
      // eslint-disable-next-line vue/no-mutating-props
      this.value.lojaId = TODAS_ID;
    }

    if (this.$root.isAdminSupComercial()) {
      TiposBusiness.getAllRedes().then((response) => {
        this.redes = this.redes.concat(response.data);
      });
      this.carregaEmpresas(this.value.redeId);
      this.carregaLojas(this.value.empresaId);
    } else {
      if (!this.$root.isCrediarista()) {
        this.carregaLojas(this.$root.empresaId());
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.value.lojaId = this.$root.lojaId();
    }
  },
  methods: {
    carregaEmpresas(redeId) {
      this.empresas = [];
      if (this.showTodas) {
        this.empresas.push({ id: TODAS_ID, descricao: "Todas Empresas" });
      }

      if (redeId && redeId !== TODAS_ID) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.redeId = redeId;
        TiposBusiness.getAllEmpresasOfRede(this.value.redeId).then(
          (response) => {
            this.empresas = this.empresas.concat(response.data);
          }
        );
      }
    },
    carregaLojas(empresaId) {
      this.lojas = [];
      if (this.showTodas) {
        this.lojas.push({ id: TODAS_ID, descricao: "Todas Lojas" });
      }

      if (empresaId && empresaId !== TODAS_ID) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.empresaId = empresaId;
        TiposBusiness.getAllLojas(this.value.empresaId).then((response) => {
          this.lojas = this.lojas.concat(response.data);
        });
      }
    },
    changeRede(redeId) {
      if (this.onChangeRede) {
        this.onChangeRede(this.redes.filter((e) => e.id === redeId)[0]);
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.value.empresaId = null;
      // eslint-disable-next-line vue/no-mutating-props
      this.value.lojaId = null;
      if (this.showTodas) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.empresaId = TODAS_ID;
        // eslint-disable-next-line vue/no-mutating-props
        this.value.lojaId = TODAS_ID;
      }
      this.carregaEmpresas(redeId);
    },
    changeEmpresa(empresaId) {
      if (this.onChangeEmpresa) {
        this.onChangeEmpresa(
          this.empresas.filter((e) => e.id === empresaId)[0]
        );
      }

      if (!this.hiddenLoja) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.lojaId = null;
        if (this.showTodas) {
          // eslint-disable-next-line vue/no-mutating-props
          this.value.lojaId = TODAS_ID;
        }
        this.carregaLojas(empresaId);
      }

      if (!this.hiddenEmpresa) {
        // eslint-disable-next-line vue/no-mutating-props
        this.value.empresaId = null;
        if (this.showTodas) {
          // eslint-disable-next-line vue/no-mutating-props
          this.value.empresaId = TODAS_ID;
        }
      }
    },
    onLojaSelecionada(lojaId) {
      if (this.lojaSelecionada) {
        this.lojaSelecionada(this.lojas.filter((e) => e.id === lojaId)[0]);
      }
    },
    validaForm() {
      return this.value.redeId && this.value.empresaId && this.value.lojaId;
    },
  },
};
</script>
