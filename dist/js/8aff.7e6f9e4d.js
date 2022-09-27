(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["8aff"],{"8aff":function(a,t,e){"use strict";e.r(t);var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-container",{attrs:{fluid:"","grid-list-md":""}},[e("v-form",{ref:"form2",on:{submit:function(t){return t.preventDefault(),a.validateBeforeSubmit(t)}}},[e("core-progress-modal",{attrs:{show:a.loading}}),a.loading?a._e():e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:""}},[e("v-card",{staticClass:"elevation-0"},[e("v-card-title",[e("h3",{staticClass:"headline mb-0"},[a._v("Pagamento do repasse")])]),e("v-card-text",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md3:""}},[e("core-label-value",{attrs:{label:"Rede",value:a.value.redeNome}})],1),e("v-flex",{attrs:{md3:""}},[e("core-label-value",{attrs:{label:"Empresa",value:a.value.empresaNome}})],1),e("v-flex",{attrs:{md6:""}},[e("core-label-value",{attrs:{label:"Loja",value:a.value.lojaNome}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Vencimento até",value:a._f("moment")(a.value.vencimentoAte,"DD/MM/YYYY")}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Pagamento em",value:a._f("moment")(a.value.pagamentoEm,"DD/MM/YYYY")}})],1),e("v-flex",{attrs:{md3:""}},[e("core-label-value",{attrs:{label:"Comissão compras (% a.m.)",value:a.value.peComissaoCompra}})],1)],1),e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md1:""}},[e("core-label-value",{attrs:{label:"Compras",value:a.value.extratoRepasse.vlTotalCompras.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Comissão compras",value:a.value.extratoRepasse.vlTotalComissaoCompras.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md1:""}},[e("core-label-value",{attrs:{label:"Antecipação compras",value:a.value.extratoRepasse.vlTotalAntecipacaoCompras.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Créditos admin",value:a.value.extratoRepasse.vlTotalCreditoAdmin.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Pagamentos loja",value:a.value.extratoRepasse.vlTotalPagamentosLoja.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Créditos lojista",value:a.value.extratoRepasse.vlTotalCreditoLojista.toLocaleString("pt-BR",{minimumFractionDigits:2})}})],1),e("v-flex",{attrs:{md2:""}},[e("core-label-value",{attrs:{label:"Valor a pagar",value:a.value.extratoRepasse.vlTotalPagar.toLocaleString("pt-BR",{minimumFractionDigits:2}),"class-value":"headline font-weight-black"}})],1),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Depósito em",type:"date"},model:{value:a.value.depositoEm,callback:function(t){a.$set(a.value,"depositoEm",t)},expression:"value.depositoEm"}})],1),e("v-flex",{staticClass:"layout align-end justify-end row fill-height",attrs:{md3:""}},[e("label",{staticClass:"caption",staticStyle:{cursor:"pointer"},attrs:{for:"anexar",title:"Anexar Comprovante"}},[a._v("\n                  "+a._s(a.formData?a.formData.get("name"):"Anexar Comprovante")+"\n                  "),e("v-icon",{attrs:{color:"dark",for:"anexar"}},[a._v("mdi-paperclip")]),e("input",{staticStyle:{display:"none"},attrs:{id:"anexar",type:"file"},on:{change:function(t){a.anexar(t)}}})],1)]),e("v-flex",{attrs:{md2:""}},[e("v-btn",{attrs:{disabled:!a.value.depositoEm,type:"submit",color:"primary"}},[a._v("Processar")])],1)],1)],1)],1)],1),e("v-flex",{attrs:{md12:""}},[e("v-layout",{staticClass:"justify-end"},[e("v-btn",{attrs:{dark:""},on:{click:a.goBack}},[a._v("Voltar")])],1)],1),[e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{"max-width":"390"},model:{value:a.dialogConfirma,callback:function(t){a.dialogConfirma=t},expression:"dialogConfirma"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[a._v("Confirma Processamento")]),e("v-card-text",[e("p",[a._v("Confirma o processamento do repasse?")]),e("p",[a._v("Após este processamento, será efetivado o repasse e não será mais possível desfazer.")])]),e("v-card-actions",[e("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:function(t){a.dialogConfirma=!1}}},[a._v("Cancelar")]),e("v-spacer"),e("v-btn",{attrs:{color:"primary"},on:{click:function(t){a.confirmaRepasse()}}},[a._v("Confirmar")])],1)],1)],1)],1)]],2)],1)],1)},l=[],r=(e("7f7f"),e("3a86")),s={props:{value:{type:Object,required:!0},setData:{type:Function,requided:!0},goBack:{type:Function,requided:!0},nextStep:{type:Function}},data:function(){return{loading:!1,file:{},formData:null,dialogConfirma:!1}},watch:{value:function(){this.$emit("input",this.value)}},methods:{validateBeforeSubmit:function(){var a=this;this.$validator.validate().then(function(t){t?a.dialogConfirma=!0:a.$root.showAlerta(a.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},confirmaRepasse:function(){var a=this;this.dialogConfirma=!1,this.loading=!0,r["y"].processarIndividual(this.value).then(function(t){a.$root.showSucesso("Repasse incluído com sucesso."),a.loading=!1,a.formData&&r["y"].uploadDocumento(t.data.id,a.formData).catch(function(){return a.$root.showErro("O Repasse foi feito, mas deu erro ao enviar o comprovante de anexo, entrar em contato com o suporte")}),document.location.reload()}).catch(function(){a.$root.showErro("Erro ao cadastrar o Repasse, tentar mais tarde"),a.loading=!1})},anexar:function(a){a&&a.target&&a.target.files.length>0&&(this.file=a.target.files[0],this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("name",this.file.name))}}},i=s,n=e("2877"),m=Object(n["a"])(i,o,l,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=8aff.7e6f9e4d.js.map