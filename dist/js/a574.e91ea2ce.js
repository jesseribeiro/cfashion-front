(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["a574"],{a574:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","grid-list-md":""}},[a("v-form",{ref:"form2",on:{submit:function(e){return e.preventDefault(),t.validateBeforeSubmit(e)}}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("core-filtro-rede-empresa-loja",{attrs:{"show-todas":!0,obrigatorio:!1},model:{value:t.filtros,callback:function(e){t.filtros=e},expression:"filtros"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Vencimento até",type:"date"},model:{value:t.filtros.vencimentoAte,callback:function(e){t.$set(t.filtros,"vencimentoAte",e)},expression:"filtros.vencimentoAte"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-autocomplete",{attrs:{items:t.tiposAnalise,label:"Tipo","item-value":"id","item-text":"descricao"},model:{value:t.filtros.tpAnalise,callback:function(e){t.$set(t.filtros,"tpAnalise",e)},expression:"filtros.tpAnalise"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-autocomplete",{attrs:{items:t.tiposRel,label:"Relatório em","item-value":"id","item-text":"descricao"},model:{value:t.filtros.tipoRel,callback:function(e){t.$set(t.filtros,"tipoRel",e)},expression:"filtros.tipoRel"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-autocomplete",{attrs:{items:t.tiposLancamento,label:"Tipo Lançamento Extra","item-value":"id","item-text":"descricao"},model:{value:t.filtros.tipoLancamentoId,callback:function(e){t.$set(t.filtros,"tipoLancamentoId",e)},expression:"filtros.tipoLancamentoId"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-checkbox",{attrs:{label:"Listar contas bancárias"},model:{value:t.filtros.listarContas,callback:function(e){t.$set(t.filtros,"listarContas",e)},expression:"filtros.listarContas"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-checkbox",{attrs:{label:"Listar saldos credores"},model:{value:t.filtros.listarSaldos,callback:function(e){t.$set(t.filtros,"listarSaldos",e)},expression:"filtros.listarSaldos"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-checkbox",{attrs:{label:"Listar lançamentos"},model:{value:t.filtros.listarLancamentos,callback:function(e){t.$set(t.filtros,"listarLancamentos",e)},expression:"filtros.listarLancamentos"}})],1)],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-layout",{staticClass:"justify-end"},[a("v-btn",{attrs:{loading:t.loadingBtn,type:"submit",color:"primary"}},[t._v("Gerar")])],1)],1),a("core-progress-modal",{attrs:{show:t.loading}}),t.filePDF?a("embed",{attrs:{id:"plugin",src:t.filePDF,width:"100%",height:"1000px",name:"plugin",type:"application/pdf"}}):t._e()],1)],1)],1)},i=[],l=(a("28a5"),a("3a86")),s={metaInfo:{titleTemplate:"%s - Relatório"},data:function(){return{filtros:{redeId:null,empresaId:null,lojaId:null,tipo:null,tipoRel:"PDF",vencimentoAte:null,tpRepasse:null,tpAnalise:"A",tipoLancamentoId:null,listarContas:!1,listarSaldos:!1,listarLancamentos:!1},tiposRepasse:[],tiposLancamento:[],tiposAnalise:[{id:"S",descricao:"Sintético"},{id:"A",descricao:"Analítico"}],ordenacao:[{id:"razaoSocial",descricao:"Razão Social"},{id:"nomeFantasia",descricao:"Nome Fantasia"},{id:"banco",descricao:"Banco"}],filePDF:null,tiposRel:[],tipos:[],loadingBtn:!1,loading:!1}},beforeMount:function(){var t=this;this.tiposLancamento.push({id:null,descricao:"Todos Lançamentos"}),l["C"].getAllTiposRelatorio().then(function(e){t.tiposRel=e.data}),l["C"].listRepasse().then(function(e){t.tiposRepasse=e.data}),l["C"].tiposLancamentoRepasse().then(function(e){t.tiposLancamento=t.tiposLancamento.concat(e.data)}),this.$root.isProprietario()&&(this.filtros.empresaId=this.$root.empresaId())},methods:{validateBeforeSubmit:function(){var t=this;this.$validator.validate().then(function(e){e?(t.loading=!0,t.loadingBtn=!0,l["w"].geraRelatorioPrevisaoPagamento(t.filtros).then(function(e){if("PDF"===t.filtros.tipoRel)t.filePDF=window.URL.createObjectURL(e.data);else{var a=window.URL.createObjectURL(new Blob([e.data])),o=document.createElement("a");o.href=a,o.setAttribute("download",e.headers["content-disposition"].split(";")[1].split("=")[1]),document.body.appendChild(o),o.click()}}).catch(function(e){return t.$root.showErro(t.$vuetify.t("$vuetify.Erro.carregarRelatorio"))}).finally(function(){t.loading=!1,t.loadingBtn=!1})):t.$root.showAlerta(t.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})}}},n=s,r=a("2877"),c=Object(r["a"])(n,o,i,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=a574.e91ea2ce.js.map