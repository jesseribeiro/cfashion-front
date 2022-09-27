<template>
  <v-container fluid grid-list-md>
    <vTitulo>
      Resumo Gerencial
    </vTitulo>
    <v-form ref="form2" @submit.prevent="validateBeforeSubmit">
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <core-filtro-rede-empresa-loja
                    v-model="filtros"
                    :show-todas="true"
                    :obrigatorio="true"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="filtros.tipoRel"
                    :items="tiposRel"
                    label="Relatório em"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-checkbox
                    v-model="filtros.listarContas"
                    label="Incluir faturas congeladas nos recebíveis"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-layout class="justify-end">
            <v-btn :loading="loadingBtn" type="submit" color="primary"
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
        incluirFaturasCongeladas: false
      },
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
          RelatorioBusiness.gerarResumoGerencial(this.filtros)
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