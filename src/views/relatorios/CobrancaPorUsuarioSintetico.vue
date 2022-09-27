<template>
  <div>
    <vScope
      :loading="loading"
      :loading-btn="loadingBtn"
      :file-pdf="filePDF"
      :filtros="filtros"
      titulo="Cobrança Por Usuário (Sintético)"
      @validateBeforeSubmit="validateBeforeSubmit"
    >
      <v-layout 
        row 
        wrap>
        <v-flex md4>
          <v-text-field
            v-model="filtros.dataInicio"
            label="Data Inicial"
            type="date"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-text-field
            v-model="filtros.dataFim"
            label="Data Final"
            type="date"
            clearable
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-validate="'required'"
            v-model="filtros.procedimento"
            :error-messages="errors.collect('Procedimentos')"
            :items="listaProcedimentos"
            label="Procedimentos"
            item-value="id"
            item-text="descricao"
          />
        </v-flex>
        <v-flex
          v-if="!$root.isNegoc()"
          md4
        >
          <v-autocomplete
            v-model="filtros.userPratico"
            :error-messages="errors.collect('Usuário Pratico')"
            :items="listaUsersPratico"
            label="Usuário Pratico"
            item-value="id"
            item-text="nome"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="filtros.tpOcorrencia"
            :error-messages="errors.collect('Ocorrência')"
            :items="tiposOcorrencia"
            label="Ocorrência"
            item-value="id"
            item-text="descricao"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-validate="'required'"
            v-model="filtros.tpSituacao"
            :error-messages="errors.collect('Situação')"
            :items="listaSituacao"
            label="Situação"
            item-value="id"
            item-text="descricao"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="filtros.porUsuario"
            :items="listaPorUsuarios"
            label="Por Usuário"
            item-value="id"
            item-text="descricao"
          />
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-validate="'required'"
            v-model="filtros.tipoRel"
            :error-messages="errors.collect('Relatório em')"
            :items="tiposRel"
            label="Relatório em"
            item-value="id"
            item-text="descricao"
          />
        </v-flex>
      </v-layout>
    </vScope>
  </div>
</template>

<script>
import vScope from "@/views/relatorios/scopeRelatorio";
import { TiposBusiness, RelatorioBusiness, UsuarioBusiness } from "../../business";
import ProcedimentosCobranca from "@/constants/procedimentosDeCobranca";
import PorUsuario from "@/constants/porusuario";
import SituacaoCobranca from "@/constants/situacaoCobranca";
import { TODAS_ID } from '../../constants';
import reportUtils from '../../utils/reportUtils'

export default {
  components: {
    vScope,
  },
  data() {
    return {
      tiposRel: [],
      listaProcedimentos: [],
      tiposOcorrencia: [],
      listaSituacao: [],
      listaUsersPratico: [],
      listaPorUsuarios: [],
      filtros: {
        redeId: null,
        empresaId: null,
        lojaId: null,
        tipoRel: 'PDF',
        dataInicio: null,
        dataFim: null,
        procedimento: 'TODOS',
        tpSituacao: 'TODAS',
        tpOcorrencia: 'Todos',
        userPratico: TODAS_ID,
        porUsuario: PorUsuario[0].id
      },
      filePDF: "",
      loadingBtn: false,
      loading: false,
    };
  },
  mounted() {
    this.filtros.tipoRel = "PDF";
    if(this.$root.isNegoc()){
        this.selecionar();
    }
  },
  beforeMount() {
    TiposBusiness.getAllTiposRelatorio().then((response) => {
      this.tiposRel = response.data;
    });
    TiposBusiness.getAllTiposOcorrencia()
      .then((response) => {
        this.tiposOcorrencia = response.data
        this.tiposOcorrencia.push("Todos")
      })
      .catch((err) => {
        console.log("err", err);
      });

    if(!this.$root.isNegoc()){
      this.listaUsersPratico.push({id: TODAS_ID, nome: "Todos"})
      UsuarioBusiness.listAllNegociador()
        .then(response => {
          this.listaUsersPratico = this.listaUsersPratico.concat(response.data)
        })
    } else {
      this.filtros.userPratico = this.$root.usuarioId()
    }
    this.listaProcedimentos = ProcedimentosCobranca;
    this.listaProcedimentos.push("Agendamento")
    this.listaPorUsuarios = PorUsuario;
    this.listaSituacao = SituacaoCobranca;
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validate().then((result) => {
        if (result && !!this.filtros.lojaId) {
          this.loading = true;
          this.loadingBtn = true;
          RelatorioBusiness.geraRelatorioCobrancaPorUsuarioSintetico(
            this.filtros
          )
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
    selecionar () {
      if(this.$root.usuarioDados()){
        this.listaUsersPratico = [];
        let userName = this.$root.usuarioDados().nome;
        this.listaUsersPratico.push({nome: userName});
        this.filtros.userPratico = userName;
        
      } else {
        console.log("Não é o caso!")
        // por algum caso não contem mais os dados
      }      
    }
  },
};
</script>

<style>
</style>