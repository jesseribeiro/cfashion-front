<template>
  <div class="px-1">
    <div class="my-3 mx-2 title">Movimento Retorno Banco</div>
    <div class="ma-2">
      <v-form 
        ref="form2" 
        @submit.prevent="validateBeforeSubmit">
        <v-card class="elevation-0">
          <v-card-text>
            <v-layout 
              row 
              wrap 
              class="text-center">
              <v-flex md12>
                <core-filtro-rede-empresa-loja
                  v-model="filtros"
                  :show-todas="true"
                />
              </v-flex>
              <v-flex
                md2 
                class="px-1">
                <v-text-field
                  v-model="filtros.retornoInicial"
                  label="Retorno Inicial"
                  type="number"
                />
              </v-flex>
              <v-flex 
                md2 
                class="px-1">
                <v-text-field
                  v-model="filtros.retornoFinal"
                  label="Retorno final"
                  type="number"
                />
              </v-flex>
              <v-flex 
                md4 
                class="px-1">
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
                class="px-1">
                <v-text-field
                  v-model="filtros.dataFim"
                  :error-messages="errors.collect('Data Final')"
                  data-vv-name="Data Final"
                  label="Data Final"
                  type="date"
                  clearable
                />
              </v-flex>
              <v-flex md4>
                <v-autocomplete
                  v-model="filtros.situacao"
                  :items="situacoes"
                  label="Situação"
                  data-vv-name="Situação"
                  item-value="id"
                  item-text="descricao"
                />
              </v-flex>
              <v-flex 
                md4 
                class="px-1">
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
                class="px-1">
                <v-autocomplete
                  v-model="filtros.banco"
                  :items="bancos"
                  label="Banco"
                  item-value="id"
                  item-text="descricao"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <div class="py-2 text-right">
          <v-btn
            :loading="loadingBtn"
            type="submit"
            color="primary"
            @click="gerarRelatorio()"
          >
            GERAR
          </v-btn>
        </div>
      </v-form>
      <embed
        v-if="filePDF"
        id="plugin"
        :src="filePDF"
        width="100%"
        height="1000px"
        name="plugin"
        type="application/pdf">
    </div>
  </div>
</template>

<script>
import serviceTipos from "@/business/TiposBusiness";
import { TiposBusiness, RelatorioBusiness } from "@/business";
import { TODAS_ID } from '../../constants'
import reportUtils from '../../utils/reportUtils';

export default {
  data() {
    return {
      loading: false,
      loadingBtn: false,
      bancos: [],
      filePDF: null,
      filtros: {
        situacao: "TODOS",
        banco: "TODOS"
      },
      pagamentoInicial: "",
      pagamentoFinal: "",
      tiposRel: [],
      situacoes: [
        {
          descricao: "Todos",
          id: "TODOS",
        },
        {
          descricao: "Apenas OK",
          id: "APENAS_OK",
        },
        {
          descricao: "Apenas Recusado",
          id: "APENAS_RECUSADOS",
        },
      ],
    };
  },
  beforeMount() {
    this.GET_TIPOS_PAGAMENTO();
    this.GET_TIPOS_RELATORIO();
  },
  mounted() {
    this.filtros.tipoRel = "PDF";
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.loading = true;
          this.loadingBtn = true;

          RelatorioBusiness.geraMovimentoRetornoBanco(this.filtros)
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
    gerarRelatorio() {
      // teste
    },
    GET_TIPOS_RELATORIO() {
      TiposBusiness.getAllTiposRelatorio().then((response) => {
        this.tiposRel = response.data;
      });
    },
    GET_TIPOS_PAGAMENTO() {
      serviceTipos.getAllTipoPagamento().then((resp) => {
        this.bancos = resp.data;
      });
    },
  },
};
</script>

<style>
</style>