<template>
  <div class="px-4 pt-4">
    <div class="title pb-3">Inadimplência Primeira Fatura</div>
    <v-form 
      ref="form2" 
      @submit.prevent="validateBeforeSubmit">
      <v-layout 
        row 
        wrap>
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout 
                row 
                wrap>
                <v-flex md12>
                  <core-filtro-rede-empresa-loja
                    v-model="filtros"
                    :show-todas="true"
                    :obrigatorio="true"
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-text-field
                    v-model="filtros.dataInicio"
                    :error-messages="errors.collect('Data Inicial')"
                    data-vv-name="Data Inicial"
                    label="Data Inicial"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-text-field
                    v-model="filtros.dataFim"
                    :error-messages="errors.collect('Data Final')"
                    data-vv-name="Data Final"
                    label="Data Final"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-autocomplete
                    v-model="filtros.tipoRel"
                    :items="tiposRel"
                    label="Relatório em"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex 
                  md4 
                  class="pa-1">
                  <v-autocomplete
                    v-model="filtros.tpAnalise"
                    :items="tiposAnalise"
                    label="Tipo"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-flex md12>
        <v-layout class="justify-end">
          <v-btn 
            :loading="loadingBtn" 
            type="submit" 
            color="primary"
          >Gerar</v-btn
          >
        </v-layout>
      </v-flex>
      <core-progress-modal :show="loading" />

      <embed
        v-if="filePDF"
        id="plugin"
        :src="filePDF"
        width="100%"
        height="1000px"
        name="plugin"
        type="application/pdf"
      >
    </v-form>
  </div>
</template>

<script>
import { TiposBusiness, RelatorioBusiness } from "../../business";
import TiposAnalise from "@/constants/tipoAnalise";
import reportUtils from '../../utils/reportUtils';

export default {
  data() {
    return {
      loading: false,
      loadingBtn: false,
      filePDF: "",
      tiposRel: [],
      tiposAnalise: [],
      filtros: {},
    };
  },
  mounted() {
    this.filtros.tipoRel = "PDF";
    this.filtros.tpAnalise = "S";
  },
  beforeMount() {
    TiposBusiness.getAllTiposRelatorio().then((response) => {
      this.tiposRel = response.data;
    });
    this.tiposAnalise = TiposAnalise;
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validate().then((result) => {
        if (result) {
          if (!this.filtros.redeId && this.filtros.redeId === TODAS_ID) {
            this.$root.showAlerta("Selecione uma rede!");
            return;
          }
          if (!this.filtros.empresaId && this.filtros.empresaId === TODAS_ID) {
            this.$root.showAlerta("Selecione uma empresa!");
            return;
          }
          if (!this.filtros.lojaId) {
            this.$root.showAlerta('Selecione uma loja!')
            return
          }
          this.loading = true;
          this.loadingBtn = true;
          RelatorioBusiness.geraInadimplenciaPrimeiraFatura(this.filtros)
            .then((response) => {
              if (this.filtros.tipoRel === "PDF") {
                this.filePDF = window.URL.createObjectURL(response.data);
              } else {
                reportUtils.downloadExcel(response)
              }
            })
            .catch(erro => {
              if (erro && erro.response.data) {
                this.$root.showAlerta(erro.response.data.message)
              } else {
                this.$root.showErro(this.$vuetify.t('$vuetify.Erro.carregarRelatorio'))
              }
            })
            .finally(() => {
              this.loading = false;
              this.loadingBtn = false;
            });
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
    },
  },
};
</script>

<style>
</style>