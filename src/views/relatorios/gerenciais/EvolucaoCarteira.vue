<template>
  <v-container 
    fluid 
    grid-list-md>
    <vTitulo> Evolução de Carteira </vTitulo>
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
                <v-flex xs12>
                  <core-filtro-rede-empresa-loja
                    v-model="filtros"
                    :show-todas="true"
                    :obrigatorio="true"
                    :hidden-loja="true"
                    :hidden-empresa="true"
                  />
                </v-flex>
                <v-flex 
                  v-if="!customizarTempo" 
                  xs12 
                  md8>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpPeriodo"
                    :items="listaPeriodos"
                    :error-messages="errors.collect('Período')"
                    label="Período"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex 
                  v-if="customizarTempo" 
                  md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataInicio"
                    label="Data Inicial"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex 
                  v-if="customizarTempo" 
                  md4>
                  <v-text-field
                    v-validate="'required'"
                    v-model="filtros.dataFim"
                    label="Data Final"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm12 
                  md4>
                  <v-checkbox
                    v-model="customizarTempo"
                    label="Customizar tempo de atraso"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-autocomplete
                    v-model="filtros.tipos"
                    :items="listaTipos"
                    readonly
                    label="Tipo"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-autocomplete
                    v-model="filtros.tipoRel"
                    :items="tiposRel"
                    label="Relatório em"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
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
        <!-- eslint-disable-next-line vue/html-self-closing-->
        <embed
          v-if="filePDF"
          id="plugin"
          :src="filePDF"
          width="100%"
          height="1000px"
          name="plugin"
          type="application/pdf"
        />
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { RelatorioBusiness, TiposBusiness } from "@/business";
import {
  RedeEmpresaLoja,
  MethodsTypeReport,
  DefaultInterface,
} from "../mixins";
import reportUtils from "../../../utils/reportUtils";

export default {
  mixins: [RedeEmpresaLoja, MethodsTypeReport, DefaultInterface],
  metaInfo: {
    titleTemplate: "%s - Relatório",
  },
  data() {
    return {
      customizarTempo: false,
      listaPeriodos: [],
      listaTipos: [
        { id: 0, descricao: "Analítico" },
        { id: 1, descricao: "Gráfico" },
      ],
      filtros: {
        tipos: 0,
        tipoRel: "PDF",
        tpPeriodo: "SETE_DIAS",
        totalizacao: "DIARIA",
        dataInicio: null,
        dataFim: null,
        listarEstornos: false,
      },
    };
  },
  watch: {
    customizarTempo: function (named) {
      if (named) {
        this.filtros.tpPeriodo = null;
      } else {
        this.filtros.tpPeriodo = "SETE_DIAS";
        this.filtros.dataInicio = null;
        this.filtros.dataFim = null;
      }
    },
  },
  beforeMount() {
    TiposBusiness.getAllTotalizarPorDataRelatorio().then((response) => {
      this.listaTotalizacoes = response.data;
    });
    TiposBusiness.getAllPeriodoRelatorio().then((response) => {
      this.listaPeriodos = response.data;
    });
    TiposBusiness.getAllTiposRelatorio().then((response) => {
      this.tiposRel = response.data;
    });
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validate().then((result) => {
        if (result) {
          if (!this.validaRedeEmpresa()) {
            return;
          }
          this.loading = true;
          this.loadingBtn = true;
          RelatorioBusiness.gerarEvolucaoCarteira(this.filtros)
            .then((response) => {
              if (this.filtros.tipoRel === "PDF") {
                this.filePDF = window.URL.createObjectURL(response.data);
              } else {
                reportUtils.downloadExcel(response);
              }
            })
            .catch((erro) => {
              if (erro && erro.response.data) {
                this.$root.showAlerta(erro.response.data.message);
              } else {
                this.$root.showErro(
                  this.$vuetify.t("$vuetify.Erro.carregarRelatorio")
                );
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
