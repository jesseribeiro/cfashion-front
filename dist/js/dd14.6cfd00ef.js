(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dd14"],{dd14:function(a,e,r){"use strict";r.r(e);var t=function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("v-container",{attrs:{fluid:"","grid-list-md":""}},[r("core-progress-modal",{attrs:{show:a.loading}}),a.loading?a._e():r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{md12:""}},[r("v-form",{attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),a.validateBeforeSubmit(e)}}},[r("v-card",{staticClass:"elevation-0"},[r("v-card-title",[r("h3",{staticClass:"headline mb-0"},[a._v("Identificação")])]),r("v-card-text",[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{md2:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("Sigla"),disabled:a.disabled,label:"Sigla","data-vv-name":"Sigla",required:""},model:{value:a.form.sigla,callback:function(e){a.$set(a.form,"sigla",e)},expression:"form.sigla"}})],1),r("v-flex",{attrs:{md4:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("Descrição"),disabled:a.disabled,label:"Descrição","data-vv-name":"Descrição",required:""},model:{value:a.form.descricao,callback:function(e){a.$set(a.form,"descricao",e)},expression:"form.descricao"}})],1),r("v-flex",{attrs:{md2:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("QtdParcelas"),disabled:a.disabled,type:"number",min:"0",label:"QtdParcelas","data-vv-name":"QtdParcelas",required:"",reverse:""},model:{value:a.form.qtdParcelas,callback:function(e){a.$set(a.form,"qtdParcelas",e)},expression:"form.qtdParcelas"}})],1),r("v-flex",{attrs:{md2:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"formata-moeda",rawName:"v-formata-moeda",value:a.form.valorMinimoParcela,expression:"form.valorMinimoParcela"},{name:"money",rawName:"v-money",value:a.money,expression:"money"}],attrs:{"error-messages":a.errors.collect("Valor Mínimo Parcela"),disabled:a.disabled,type:"tel",label:"Valor Mínimo Parcela","data-vv-name":"Valor Mínimo Parcela",suffix:"R$",reverse:""},model:{value:a.form.valorMinimoParcela,callback:function(e){a.$set(a.form,"valorMinimoParcela",e)},expression:"form.valorMinimoParcela"}})],1),r("v-flex",{attrs:{md2:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{disabled:a.disabled,"error-messages":a.errors.collect("Dias p/ Primeira Parcela"),type:"number",min:"0",label:"Dias p/ Primeira Parcela","data-vv-name":"Dias p/ Primeira Parcela",reverse:""},model:{value:a.form.diasPrimeiraParcela,callback:function(e){a.$set(a.form,"diasPrimeiraParcela",e)},expression:"form.diasPrimeiraParcela"}})],1)],1),r("v-layout",{staticClass:"justify-end"},[r("v-btn",{attrs:{disabled:a.disabled,color:"primary"},on:{click:a.gerarParcelas}},[a._v("Definir Parcelas")])],1)],1)],1),r("br"),a.form.parcelas.length>0?[r("v-card",[r("v-toolbar",{attrs:{flat:"",color:"white"}},[r("v-toolbar-title",[a._v("Parcelas do Plano")]),r("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}})],1),r("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:a.headers,items:a.form.parcelas,loading:a.loading,"hide-actions":""},scopedSlots:a._u([{key:"headerCell",fn:function(e){var t=e.header;return[r("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:a._s(t.text)}})]}},{key:"items",fn:function(e){var t=e.item;return[r("td",[a._v(a._s(t.parcelarEm))]),r("td",[r("v-text-field",{directives:[{name:"formata-moeda",rawName:"v-formata-moeda",value:t.peJurosMes,expression:"item.peJurosMes"},{name:"money",rawName:"v-money",value:a.money,expression:"money"}],attrs:{type:"tel",prefix:"%",maxlength:"5"},model:{value:t.peJurosMes,callback:function(e){a.$set(t,"peJurosMes",e)},expression:"item.peJurosMes"}})],1)]}}])})],1)]:a._e(),r("v-layout",{staticClass:"justify-end"},[r("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:a.voltar}},[a._v("Cancelar")]),r("v-btn",{attrs:{loading:a.loadingBtn,disabled:"visualizar"===a.acao,type:"submit",color:"primary"}},[a._v("Salvar")])],1)],2)],1)],1)],1)},s=[],o=r("3a86"),l=r("5a50"),i={metaInfo:{titleTemplate:"%s - Plano de Pagamento"},data:function(){return{form:{id:null,descricao:null,sigla:null,qtdParcelas:null,valorMinimoParcela:0,diasPrimeiraParcela:30,parcelas:[]},money:l["i"],headers:[{sortable:!1,text:"Parcelar Em",value:"parcelarEm"},{sortable:!1,text:"% Juros / mês",value:"peJurosMes"}],loading:!1,totalItems:0,disabled:!1,acao:null,loadingBtn:!1}},beforeMount:function(){var a=this,e=this.$route.params.id;e&&(this.disabled=!0,this.acao=this.$route.params.acao,this.loading=!0,o["s"].getById(e).then(function(e){a.form=e.data}).finally(function(){a.loading=!1}))},methods:{validateBeforeSubmit:function(){var a=this;this.$validator.validate().then(function(e){if(e){if(0===a.form.parcelas.length)return void a.$root.showAlerta("É necessário definir as parcelas antes de salvar");a.loadingBtn=!0,o["s"].salvar(a.form).then(function(e){a.form.id?a.$root.showSucesso("Plano de pagamento atualizado com sucesso."):(a.form=e.data,a.$root.showSucesso("Plano de pagamento cadastrado com sucesso.")),a.voltar()}).catch(function(e){return a.$root.showErro(e.data)}).finally(function(){a.loadingBtn=!1})}else a.$root.showAlerta(a.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},voltar:function(){this.$router.push("/lista-planopagamento")},gerarParcelas:function(){var a;if(this.form.qtdParcelas&&this.form.qtdParcelas>0)for(this.form.parcelas=[],a=0;a<this.form.qtdParcelas;a++)this.form.parcelas.push({parcelarEm:a+1,peJurosMes:null});else this.$root.showAlerta("Informe a quantidade de parcelas")}}},n=i,d=r("2877"),c=Object(d["a"])(n,t,s,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=dd14.6cfd00ef.js.map