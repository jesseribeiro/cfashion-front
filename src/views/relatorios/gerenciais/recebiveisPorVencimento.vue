<template>
  <v-container 
    fluid 
    grid-list-md>
    <vTitulo class="tw-bg-red-500">
      Recebiveis por Vencimento
    </vTitulo>
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
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataInicio"
                    label="Período Inicial"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.dataFim"
                    label="Período Final"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex md4>
                  <v-checkbox
                    v-model="filtros.totalizarDia"
                    label="Totalizar por dia"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.inicioAtraso"
                    label="Atraso inicial"
                    type="number"
                  />
                </v-flex>
                <v-flex md4>
                  <v-text-field
                    v-model="filtros.fimAtraso"
                    label="Atraso final"
                    type="number"
                  />
                </v-flex>
                <v-flex md4>
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
            >Gerar</v-btn>
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
import { RelatorioBusiness } from "@/business";
import {
  RedeEmpresaLoja,
  MethodsTypeReport,
  DefaultInterface,
} from "../mixins";
import reportUtils from '../../../utils/reportUtils';

export default {
  mixins: [RedeEmpresaLoja, MethodsTypeReport, DefaultInterface],
  metaInfo: {
    titleTemplate: "%s - Relatório",
  },
  data() {
    return {
      filtros: {
        tipoRel: "PDF",
        totalizarDia: false,
        dataInicio: null,
        dataFim: null,
        inicioAtraso: null,
        fimAtraso: null
      }
    };
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
          RelatorioBusiness.gerarRecebiveisPorVencimento(this.filtros)
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
    changeDataAtraso(item) {
      console.log(" Item selecionado ", item);
      this.filtros.inicioAtraso = item.valor_inicio;
      this.filtros.fimAtraso = item.valor_fim;
    },
    changeDataDefas(item) {
      console.log(" Item selecionado ", item);
      this.filtros.inicioDefas = item.valor_inicio;
      this.filtros.fimDefas = item.valor_fim;
    },
  },
};
</script>
