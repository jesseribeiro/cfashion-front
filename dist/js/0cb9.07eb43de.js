(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["0cb9"],{"0cb9":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","grid-list-md":""}},[a("v-form",{ref:"form2",on:{submit:function(e){return e.preventDefault(),t.validateBeforeSubmit(e)}}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("core-filtro-rede-empresa-loja",{attrs:{"show-todas":!0,obrigatorio:!0},model:{value:t.filtros,callback:function(e){t.filtros=e},expression:"filtros"}})],1),a("v-flex",{attrs:{md4:""}},[a("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:t.tipos,"error-messages":t.errors.collect("Tipo"),"data-vv-name":"Tipo",label:"Tipo","item-value":"id","item-text":"descricao"},model:{value:t.filtros.tipoLancamentoId,callback:function(e){t.$set(t.filtros,"tipoLancamentoId",e)},expression:"filtros.tipoLancamentoId"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Data Inicial",type:"date"},model:{value:t.filtros.dataInicio,callback:function(e){t.$set(t.filtros,"dataInicio",e)},expression:"filtros.dataInicio"}})],1),a("v-flex",{attrs:{md1:""}},[a("span",{staticClass:"layout fill-height align-center justify-center"},[t._v("a")])]),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Data Final",type:"date"},model:{value:t.filtros.dataFim,callback:function(e){t.$set(t.filtros,"dataFim",e)},expression:"filtros.dataFim"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Atraso Inicial",type:"number",min:"0"},model:{value:t.filtros.atrasoInicio,callback:function(e){t.$set(t.filtros,"atrasoInicio",e)},expression:"filtros.atrasoInicio"}})],1),a("v-flex",{attrs:{md1:""}},[a("span",{staticClass:"layout fill-height align-center justify-center"},[t._v("a")])]),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Atraso Final",type:"number",min:"0"},model:{value:t.filtros.atrasoFim,callback:function(e){t.$set(t.filtros,"atrasoFim",e)},expression:"filtros.atrasoFim"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-autocomplete",{attrs:{items:t.tiposRel,label:"Relatório em","item-value":"id","item-text":"descricao"},model:{value:t.filtros.tipoRel,callback:function(e){t.$set(t.filtros,"tipoRel",e)},expression:"filtros.tipoRel"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-checkbox",{attrs:{label:"Listar estornos de compras"},model:{value:t.filtros.listarEstornos,callback:function(e){t.$set(t.filtros,"listarEstornos",e)},expression:"filtros.listarEstornos"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-checkbox",{attrs:{label:"Listar apenas Pagamentos de acordo"},model:{value:t.filtros.listarPagamentoAcordo,callback:function(e){t.$set(t.filtros,"listarPagamentoAcordo",e)},expression:"filtros.listarPagamentoAcordo"}})],1)],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-layout",{staticClass:"justify-end"},[a("v-btn",{attrs:{loading:t.loadingBtn,type:"submit",color:"primary"}},[t._v("Gerar")])],1)],1),a("core-progress-modal",{attrs:{show:t.loading}}),t.filePDF?a("embed",{attrs:{id:"plugin",src:t.filePDF,width:"100%",height:"1000px",name:"plugin",type:"application/pdf"}}):t._e()],1)],1)],1)},i=[],l=(a("28a5"),a("3a86")),r=a("5a50"),s={metaInfo:{titleTemplate:"%s - Relatório"},data:function(){return{filtros:{redeId:null,empresaId:null,lojaId:null,tipoLancamentoId:null,tipoRel:"PDF",dataInicio:null,dataFim:null,listarEstornos:!1,atrasoInicio:null,atrasoFim:null,listarPagamentoAcordo:!1},filePDF:null,tiposRel:[],tipos:[],loadingBtn:!1,loading:!1}},beforeMount:function(){var t=this;console.log("Chamando beforeMount"),this.tipos.push({id:r["k"],descricao:"Todos Lançamentos"}),l["C"].getAllTiposRelatorio().then(function(e){t.tiposRel=e.data}),l["C"].tiposLancamentoRepasse().then(function(e){t.tipos=t.tipos.concat(e.data)})},methods:{validateBeforeSubmit:function(){var t=this;this.$validator.validate().then(function(e){if(e){if(!t.filtros.redeId&&t.filtros.redeId===r["k"])return void t.$root.showAlerta("Selecione uma rede!");if(!t.filtros.empresaId&&t.filtros.empresaId===r["k"])return void t.$root.showAlerta("Selecione uma empresa!");l["w"].geraPagamentoClientes(t.filtros).then(function(e){if("PDF"===t.filtros.tipoRel)t.filePDF=window.URL.createObjectURL(e.data);else{var a=window.URL.createObjectURL(new Blob([e.data])),o=document.createElement("a");o.href=a,o.setAttribute("download",e.headers["content-disposition"].split(";")[1].split("=")[1]),document.body.appendChild(o),o.click()}}).catch(function(e){return t.$root.showErro(t.$vuetify.t("$vuetify.Erro.carregarRelatorio"))}).finally(function(){t.loading=!1,t.loadingBtn=!1})}else t.$root.showAlerta(t.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})}}},n=s,c=a("2877"),d=Object(c["a"])(n,o,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=0cb9.07eb43de.js.map