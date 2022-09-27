(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["7e88"],{"7e88":function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-flex",{attrs:{md12:""}},[e("v-card",{staticClass:"elevation-0"},[e("v-card-text",[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("Contas Bancárias Prático")]),e("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-btn",{attrs:{small:"",fab:"",color:"primary"}},[e("v-icon",{on:{click:function(a){t.newItem()}}},[t._v("mdi-plus")])],1)],1),e("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),e("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.items,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(a){var o=a.item;return[o.principal?e("td",{staticClass:"text-xs-center"},[e("v-icon",{attrs:{color:"success"}},[t._v("mdi-check-bold")])],1):e("td"),e("td",[t._v("\n              "+t._s(o.bancoDescricao)+"\n            ")]),e("td",{staticClass:"text-xs-right"},[t._v("\n              "+t._s(o.agencia)+"\n            ")]),e("td",{staticClass:"text-xs-right"},[t._v("\n              "+t._s(o.digitoAgencia)+"\n            ")]),e("td",{staticClass:"text-xs-right"},[t._v("\n              "+t._s(o.conta)+"\n            ")]),e("td",{staticClass:"text-xs-right"},[t._v("\n              "+t._s(o.digitoConta)+"\n            ")]),e("td",{staticClass:"text-xs-right"},[t._v("\n              "+t._s(o.carteira)+"\n            ")]),e("td",[t._v("\n              "+t._s(o.tpContaDescricao)+"\n            ")]),e("td",{staticClass:"justify-end layout ma-2"},[e("v-icon",{staticClass:"mr-2",attrs:{color:"blue",title:"Editar conta"},on:{click:function(a){t.editItem(o)}}},[t._v("mdi-pencil")]),e("v-icon",{attrs:{color:"red",title:"Excluir conta"},on:{click:function(a){t.openDialogDelete(o)}}},[t._v("mdi-delete")])],1)]}}])})],1)],1)],1),t.dialog?[e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{"max-width":"600"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-form",{ref:"form2",on:{submit:function(a){return a.preventDefault(),t.validateBeforeSubmit(a)}}},[e("v-card",[e("v-card-title",{staticClass:"title"},[t._v("\n              Dados da Conta\n            ")]),e("v-card-text",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md6:""}},[e("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:t.tiposConta,"error-messages":t.errors.collect("Tipo Conta"),"item-value":"id","item-text":"descricao","data-vv-name":"Tipo Conta",label:"Tipo Conta"},model:{value:t.form.tpConta,callback:function(a){t.$set(t.form,"tpConta",a)},expression:"form.tpConta"}})],1),e("v-flex",{attrs:{md6:""}},[e("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:t.bancos,"error-messages":t.errors.collect("Banco"),"item-value":"id","item-text":"descricao","data-vv-name":"Banco",label:"Banco"},model:{value:t.form.banco,callback:function(a){t.$set(t.form,"banco",a)},expression:"form.banco"}})],1),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":t.errors.collect("Agência"),"data-vv-name":"Agência",label:"Agência"},model:{value:t.form.agencia,callback:function(a){t.$set(t.form,"agencia",a)},expression:"form.agencia"}})],1),e("v-flex",{attrs:{md3:""}},[e("v-text-field",{attrs:{label:"Dígito Agência"},model:{value:t.form.digitoAgencia,callback:function(a){t.$set(t.form,"digitoAgencia",a)},expression:"form.digitoAgencia"}})],1),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":t.errors.collect("Conta"),"data-vv-name":"Conta",label:"Conta"},model:{value:t.form.conta,callback:function(a){t.$set(t.form,"conta",a)},expression:"form.conta"}})],1),e("v-flex",{attrs:{md3:""}},[e("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":t.errors.collect("Dígito Conta"),"data-vv-name":"Dígito Conta",label:"Dígito Conta"},model:{value:t.form.digitoConta,callback:function(a){t.$set(t.form,"digitoConta",a)},expression:"form.digitoConta"}})],1),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Carteira",type:"text"},model:{value:t.form.carteira,callback:function(a){t.$set(t.form,"carteira",a)},expression:"form.carteira"}})],1),e("v-flex",{attrs:{md12:""}},[e("v-checkbox",{attrs:{label:"Conta Principal",title:"A conta principal, será utilizada nas TEDs em lote e geração de boletos quando nenhuma conta for definida."},model:{value:t.form.principal,callback:function(a){t.$set(t.form,"principal",a)},expression:"form.principal"}})],1)],1)],1),e("v-card-actions",[e("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:function(a){t.cancelar()}}},[t._v("Cancelar")]),e("v-spacer"),e("v-btn",{attrs:{loading:t.loadingBtn,type:"submit",color:"primary"}},[t._v("Salvar")])],1)],1)],1)],1),e("core-progress-modal",{attrs:{show:t.loading}})],1)]:t._e(),[e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{"max-width":"390"},model:{value:t.dialogDelete,callback:function(a){t.dialogDelete=a},expression:"dialogDelete"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[t._v("Excluir Conta Bancária")]),e("v-card-text",[t._v("Confirma a exclusão dessa conta bancária, essa operação não poderá ser desfeita?")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:t.closeDialogDelete}},[t._v("Cancelar\n            ")]),e("v-btn",{attrs:{color:"red"},on:{click:t.deleteItem}},[t._v("Excluir")])],1)],1)],1)],1)]],2)},i=[],n=e("5530"),l=e("3a86"),r={data:function(){return{loading:!1,loadingBtn:!1,dialog:!1,dialogDelete:!1,item:null,items:[],bancos:[],tiposConta:[],form:{id:null,tpConta:null,banco:null,agencia:null,digitoAgencia:null,conta:null,digitoConta:null,carteira:null},headers:[{sortable:!1,text:"Principal",value:"principal",align:"center"},{sortable:!1,text:"Banco",value:"banco"},{sortable:!1,text:"Agência",value:"agencia",align:"right"},{sortable:!1,text:"Dígito Agência",value:"digitoAgencia",align:"right"},{sortable:!1,text:"Conta",value:"conta",align:"right"},{sortable:!1,text:"Dígito Conta",value:"digitoConta",align:"right"},{sortable:!1,text:"Carteira",value:"carteira",align:"right"},{sortable:!1,text:"Tipo Conta",value:"tpConta"},{sortable:!1,text:"",value:"acoes"}]}},beforeMount:function(){var t=this;this.loading=!0,l["C"].listBancos().then(function(a){t.bancos=a.data}).finally(function(){t.loading=!1}),l["C"].listTiposContaBanco().then(function(a){t.tiposConta=a.data}).finally(function(){t.loading=!1}),this.loadContas()},methods:{validateBeforeSubmit:function(){var t=this;this.$validator.validate().then(function(a){a?(t.loadingBtn=!0,l["d"].salvar(t.form).then(function(a){t.$root.showSucesso("Dados enviados com sucesso"),t.cancelar(),t.loadContas()}).catch(function(){return t.$root.showErro("Erro ao cadastrar")}).finally(function(){t.loadingBtn=!1})):t.$root.showAlerta(t.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},loadContas:function(){var t=this;this.loading=!0,l["d"].findAllBanco().then(function(a){t.items=a.data}).finally(function(){t.loading=!1})},newItem:function(){this.resetForm(),this.dialog=!0},editItem:function(t){this.form=Object(n["a"])({},t),this.dialog=!0},cancelar:function(){this.dialog=!1,this.resetForm()},closeDialogDelete:function(){this.dialogDelete=!1,this.resetForm()},openDialogDelete:function(t){this.form=Object(n["a"])({},t),this.dialogDelete=!0},deleteItem:function(){var t=this;this.loading=!0,l["d"].delete(this.form.id).then(function(a){t.$root.showSucesso("Conta excluída"),t.closeDialogDelete(),t.loadContas(),t.loading=!1}).catch(function(a){t.$root.showErro("Erro ao tentar excluir a conta bancária."),t.closeDialogDelete(),t.loading=!1})},resetForm:function(){this.form={id:null,tpConta:null,banco:null,agencia:null,digitoAgencia:null,conta:null,digitoConta:null,carteira:null}}}},s=r,c=e("2877"),d=Object(c["a"])(s,o,i,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=7e88.caa141bb.js.map