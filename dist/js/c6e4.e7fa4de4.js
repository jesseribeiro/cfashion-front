(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["c6e4"],{c6e4:function(t,a,o){"use strict";o.r(a);var i=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("v-container",{attrs:{fluid:"","grid-list-md":""}},[o("core-progress-modal",{attrs:{show:t.loading}}),t.flgDigitalizando||t.loading?t._e():[o("v-form",{ref:"form2",on:{submit:function(a){return a.preventDefault(),t.validateBeforeSubmit(a)}}},[o("v-layout",{attrs:{row:"",wrap:""}},[o("v-flex",{staticClass:"mb-4",attrs:{sm12:""}},[o("v-alert",{attrs:{value:!0,type:"warning"}},[o("span",{staticClass:"subheading"},[t._v("Anexe abaixo os documentos digitalizados do cliente, formato: JPG, JPEG ou PNG.")])])],1),o("v-flex",{staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("Proposta de Adesão")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[t.docProposta?o("v-img",{attrs:{src:t.docProposta.strBase64},on:{click:function(a){t.openDialog(t.docProposta.strBase64)}}}):o("v-icon",{staticClass:"mb-4 mt-2",attrs:{size:"100"},on:{click:function(a){t.openDigitalizar("P")}}},[t._v("mdi-file-plus")])],1),t.$root.isAdmin()&&t.docProposta?o("v-card-actions",[o("v-spacer"),o("v-icon",{attrs:{color:"red"},on:{click:function(a){t.openDialogDelete(t.docProposta.anexoId)}}},[t._v("mdi-delete")])],1):t._e()],1)],1),o("v-flex",{staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("RG (frente)")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[t.docRgFrente?o("v-img",{attrs:{src:t.docRgFrente.strBase64},on:{click:function(a){t.openDialog(t.docRgFrente.strBase64)}}}):o("v-icon",{staticClass:"mb-4 mt-2",attrs:{size:"100"},on:{click:function(a){t.openDigitalizar("F")}}},[t._v("mdi-card-account-details")])],1),t.$root.isAdmin()&&t.docRgFrente?o("v-card-actions",[o("v-spacer"),o("v-icon",{attrs:{color:"red"},on:{click:function(a){t.openDialogDelete(t.docRgFrente.anexoId)}}},[t._v("mdi-delete")])],1):t._e()],1)],1),o("v-flex",{attrs:{md1:""}},[o("span",{staticClass:"layout fill-height align-center justify-left"},[t._v("OU")])]),o("v-flex",{staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("CNH")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[t.docCnh?o("v-img",{attrs:{src:t.docCnh.strBase64},on:{click:function(a){t.openDialog(t.docCnh.strBase64)}}}):o("v-icon",{staticClass:"mb-4 mt-2",attrs:{size:"100"},on:{click:function(a){t.openDigitalizar("C")}}},[t._v("mdi-card-plus")])],1),t.$root.isAdmin()&&t.docCnh?o("v-card-actions",[o("v-spacer"),o("v-icon",{attrs:{color:"red"},on:{click:function(a){t.openDialogDelete(t.docCnh.anexoId)}}},[t._v("mdi-delete")])],1):t._e()],1)],1),t._l(t.docOutros,function(a,i){return o("v-flex",{key:i,staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("Outros")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[o("v-img",{attrs:{src:a.strBase64},on:{click:function(o){t.openDialog(a.strBase64)}}})],1),t.$root.isAdmin()?o("v-card-actions",[o("v-spacer"),o("v-icon",{attrs:{color:"red"},on:{click:function(o){t.openDialogDelete(a.anexoId)}}},[t._v("mdi-delete")])],1):t._e()],1)],1)}),o("v-flex",{staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("Outros")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[o("v-icon",{staticClass:"mb-4 mt-2",attrs:{size:"100"},on:{click:function(a){t.openDigitalizar("O")}}},[t._v("mdi-plus")])],1)],1)],1),o("v-flex",{staticClass:"mr-5",attrs:{md3:""}},[o("v-card",{attrs:{"min-width":"250"}},[o("v-card-title",[o("v-layout",{attrs:{"justify-space-around":""}},[o("span",{staticClass:"title"},[t._v("RG (verso)")])])],1),o("v-divider"),o("v-layout",{attrs:{"justify-space-around":""}},[t.docRgVerso?o("v-img",{attrs:{src:t.docRgVerso.strBase64},on:{click:function(a){t.openDialog(t.docRgVerso.strBase64)}}}):o("v-icon",{staticClass:"mb-4 mt-2",attrs:{size:"100"},on:{click:function(a){t.openDigitalizar("V")}}},[t._v("mdi-card-plus")])],1),t.$root.isAdmin()&&t.docRgVerso?o("v-card-actions",[o("v-spacer"),o("v-icon",{attrs:{color:"red"},on:{click:function(a){t.openDialogDelete(t.docRgVerso.anexoId)}}},[t._v("mdi-delete")])],1):t._e()],1)],1),o("v-flex",{staticClass:"mt-5",attrs:{md12:""}},[o("v-layout",{staticClass:"justify-end"},[o("v-btn",{attrs:{dark:""},on:{click:t.goBack}},[t._v(t._s(t.editando?"Sair":"Voltar"))]),o("v-btn",{attrs:{loading:t.loadingBtn,type:"submit",color:"primary"}},[t._v(t._s(t.editando?"Salvar":"Continuar"))])],1)],1)],2)],1)],t.flgDigitalizando&&!t.loading?[o("core-digitalizar-documento",{attrs:{id:t.value.id,"loja-id":t.value.lojaId,tipo:t.tipo,callback:t.callbackDigitalizarDoc}})]:t._e(),t.currentImage&&!t.loading?[o("v-dialog",{attrs:{width:"600",scrollable:""},model:{value:t.dialogImage,callback:function(a){t.dialogImage=a},expression:"dialogImage"}},[o("v-card",[o("v-card-text",[o("v-img",{attrs:{src:t.currentImage}})],1)],1)],1)]:t._e(),t.loading?t._e():[o("v-layout",{attrs:{row:"","justify-center":""}},[o("v-dialog",{attrs:{"max-width":"390"},model:{value:t.dialogDelete,callback:function(a){t.dialogDelete=a},expression:"dialogDelete"}},[o("v-card",[o("v-card-title",{staticClass:"headline"},[t._v("Excluir Documento")]),o("v-card-text",[t._v("Confirma a exclusão do documento, essa operação não poderá ser desfeita?")]),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"primary"},on:{click:t.closeDialogDelete}},[t._v("Cancelar")]),o("v-btn",{attrs:{loading:t.loadingBtn,color:"red"},on:{click:t.deleteItem}},[t._v("Excluir")])],1)],1)],1)],1)]],2)},e=[],s=(o("ac6a"),o("3a86")),n={props:{value:{type:Object,required:!0},nextStep:{type:Function,requided:!0},goBack:{type:Function,requided:!0},setData:{type:Function,requided:!0},disabled:!1,editando:!1},data:function(){return{currentPage:0,pageCount:0,form:{},redes:[],empresas:[],lojas:[],filePDF:null,flgDigitalizando:!1,tipo:null,docProposta:null,docRgFrente:null,docRgVerso:null,docCnh:null,docOutros:[],listDocIds:[],currentImage:null,dialogImage:!1,dialogDelete:!1,anexoId:null,loadingBtn:!1,loading:!1}},watch:{value:function(){this.$emit("input",this.value)}},beforeMount:function(){this.callbackDigitalizarDoc(!0)},methods:{openDigitalizar:function(t){this.tipo=t,this.flgDigitalizando=!0},validateBeforeSubmit:function(){var t=this;this.docProposta&&(this.docRgFrente&&this.docRgVerso||this.docCnh)?(this.loadingBtn=!0,s["i"].inserirClienteLoja({clienteId:this.value.id,lojaId:this.value.lojaId}).then(function(){t.loadingBtn=!1,t.nextStep()}).catch(function(a){t.$root.showErro(a.data)})):this.$root.showAlerta("É obrigatório add a proposta de adesão e um documento com foto!")},callbackDigitalizarDoc:function(t){var a=this;this.flgDigitalizando=!1,this.tipo=null,t&&(this.loading=!0,this.listDocIds=null,this.docProposta=null,this.docRgFrente=null,this.docCnh=null,this.docRgVerso=null,this.docOutros=[],s["h"].getAnexosOfCliente(this.value.id,this.value.lojaId).then(function(t){a.listDocIds=t.data,a.listDocIds.forEach(function(t){switch(t.tipoDocumento){case"P":a.docProposta=t;break;case"F":a.docRgFrente=t;break;case"V":a.docRgVerso=t;break;case"C":a.docCnh=t;break;default:a.docOutros.push(t)}})}).catch(function(t){return console.log("erro: "+t)}).finally(function(){a.loading=!1}))},openDialog:function(t){this.currentImage=t,this.dialogImage=!0},openDialogDelete:function(t){this.anexoId=t,this.dialogDelete=!0},closeDialogDelete:function(){this.item=null,this.dialogDelete=!1},deleteItem:function(){var t=this;this.loadingBtn=!0,s["h"].deleteAnexo(this.value.id,this.anexoId).then(function(a){t.anexoId=null,t.dialogDelete=!1,t.$root.showSucesso("Registro excluido com sucesso"),t.callbackDigitalizarDoc(!0)}).catch(function(a){return t.$root.showError(a.data)}).finally(function(){t.loadingBtn=!1})}}},l=n,c=o("2877"),r=Object(c["a"])(l,i,e,!1,null,null,null);a["default"]=r.exports}}]);
//# sourceMappingURL=c6e4.e7fa4de4.js.map