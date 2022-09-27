<template>
  <v-container fluid grid-list-md>
    <vTitulo>
      Resumo Auditoria
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
                <v-flex
                  v-if="!customizarTempo"
                  md8>
                  <v-autocomplete
                    v-validate="'required'"
                    v-model="filtros.tpLanc"
                    :items="periodos"
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
                <v-flex md4>
                  <v-checkbox
                    v-model="customizarTempo"
                    label="Customizar tempo de atraso"
                  />
                </v-flex>
                <v-flex md4>
                  <v-select
                    v-model="filtros.tipoRel"
                    :items="tiposRel"
                    label="Relatório em"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.totalizacao"
                    :items="totalizar"
                    label="Totalização"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md4>
                  <v-autocomplete
                    v-model="filtros.operacao"
                    :items="operacoes"
                    label="Operação"
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
import { RelatorioBusiness,TiposBusiness } from "@/business";
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
        dataInicio: null,
        listarEstornos: false,
        tpLanc: 4,
        totalizacao: 'DIARIA',
        operacao: 0,
        dataFim: null,
      },
      customizarTempo: false,
      totalizar: [],
      operacoes: [
        { id: 0, descricao: 'Criação' },
        { id: 1, descricao: 'Modificação' },
        { id: 2, descricao: 'Exclusão' },
        { id: 3, descricao: 'Todos' },
      ],
      periodos: [
        { id: 0, descricao: 'Último mês' },
        { id: 1, descricao: 'Últimos 2 meses' },
        { id: 2, descricao: 'Últimos 3 meses' },
        { id: 3, descricao: 'Últimos 6 meses' },
        { id: 4, descricao: 'Últimos 12 meses' },
        { id: 5, descricao: 'Últimos 18 meses' },
      ],
    };
  },
  beforeMount () {
    TiposBusiness.getAllTotalizarPorDataRelatorio()
      .then(response => {
        this.totalizar = response.data
      })
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
          RelatorioBusiness.gerarResumoAuditoria(this.filtros)
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
