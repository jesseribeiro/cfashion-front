(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["5f26"],{"5f26":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:"","grid-list-md":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("material-card",{attrs:{color:"primary",title:"Lançamento Extra"}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("v-form",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("core-filtro-rede-empresa-loja",{attrs:{"on-change-rede":e.onChangeRede,"on-change-empresa":e.onChangeEmpresa,"loja-selecionada":e.lojaSelecionada},model:{value:e.filtros,callback:function(t){e.filtros=t},expression:"filtros"}})],1)],1)],1)],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[e.filtros.lojaId?a("v-card",[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[e._v("Lançamentos de Repasse Digitados (Não Processados)")]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-btn",{attrs:{small:"",fab:"",color:"primary"}},[a("v-icon",{on:{click:function(t){e.openDialogNew()}}},[e._v("mdi-plus")])],1)],1),a("v-progress-linear",{attrs:{active:e.loading,color:"light-blue",indeterminate:"",height:"3"}}),a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:e.headers,items:e.items,"hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){var o=t.item;return[a("td",[e._v(e._s(o.nomeLoja))]),a("td",[e._v(e._s(o.tipoLancamento))]),a("td",[e._v(e._s(e._f("moment")(o.data,"DD/MM/YYYY")))]),a("td",[e._v(e._s(o.valor.toLocaleString("pt-BR",{minimumFractionDigits:2})))]),a("td",[e._v(e._s(o.historico))]),a("td",{staticClass:"justify-end layout mr-2"},[o.temAnexo?a("v-icon",{staticClass:"mr-2",attrs:{title:"Baixar Anexo"},on:{click:function(t){e.downloadAnexo(o)}}},[e._v("mdi-cloud-download-outline")]):e._e(),a("v-icon",{attrs:{color:"red",title:"Excluir o lançamento"},on:{click:function(t){e.openDialogDelete(o)}}},[e._v("mdi-delete")])],1)]}}])})],1):e._e()],1),e.dialogNew?[a("v-layout",{attrs:{row:"","justify-center":""}},[e.loading?e._e():a("v-dialog",{attrs:{"max-width":"390"},model:{value:e.dialogNew,callback:function(t){e.dialogNew=t},expression:"dialogNew"}},[a("v-card",[a("v-form",{attrs:{novalidate:"",enctype:"multipart/form-data"},on:{submit:function(t){return t.preventDefault(),e.validateBeforeSubmit(t)}}},[a("v-card-title",{staticClass:"headline"},[e._v("Incluir Lançamento")]),a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("v-text-field",{attrs:{label:"Loja",readonly:""},model:{value:e.newItem.nomeLoja,callback:function(t){e.$set(e.newItem,"nomeLoja",t)},expression:"newItem.nomeLoja"}})],1),a("v-flex",{attrs:{md12:""}},[a("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:e.tipos,"error-messages":e.errors.collect("Tipos"),"data-vv-name":"Tipos","item-value":"id","item-text":"descricao",label:"Tipo"},model:{value:e.newItem.tipoId,callback:function(t){e.$set(e.newItem,"tipoId",t)},expression:"newItem.tipoId"}})],1),a("v-flex",{attrs:{md12:""}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("Data"),"data-vv-name":"Data",type:"date",label:"Data"},model:{value:e.newItem.data,callback:function(t){e.$set(e.newItem,"data",t)},expression:"newItem.data"}})],1),a("v-flex",{attrs:{md12:""}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"formata-moeda",rawName:"v-formata-moeda",value:e.newItem.valor,expression:"newItem.valor"},{name:"money",rawName:"v-money",value:e.money,expression:"money"}],attrs:{"error-messages":e.errors.collect("Valor"),"data-vv-name":"Valor",type:"tel",prefix:"R$",label:"Valor"},model:{value:e.newItem.valor,callback:function(t){e.$set(e.newItem,"valor",t)},expression:"newItem.valor"}})],1),a("v-flex",{attrs:{md12:""}},[a("v-textarea",{attrs:{label:"Histórico (opcional)"},model:{value:e.newItem.historico,callback:function(t){e.$set(e.newItem,"historico",t)},expression:"newItem.historico"}})],1),a("v-flex",{staticClass:"text-md-right",attrs:{md12:""}},[a("label",{staticClass:"caption",staticStyle:{cursor:"pointer"},attrs:{for:"anexar",title:"Anexar Comprovante"}},[e._v("\n                      "+e._s(e.formData?e.formData.get("name"):"Anexar Comprovante")+"\n                      "),a("v-icon",{attrs:{color:"dark",for:"anexar"}},[e._v("mdi-paperclip")]),a("input",{staticStyle:{display:"none"},attrs:{id:"anexar",type:"file"},on:{change:function(t){e.anexar(t)}}})],1)])],1)],1),a("v-card-actions",[a("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:e.closeDialogNew}},[e._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{color:"primary",type:"submit"}},[e._v("Salvar")])],1)],1)],1)],1),a("core-progress-modal",{attrs:{show:e.loading}})],1)]:e._e(),[a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{"max-width":"390"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Excluir Lançamento")]),a("v-card-text",[e._v("Confirma a exclusão do lançamento, essa operação não poderá ser desfeita?")]),a("v-card-actions",[a("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:e.closeDialogDelete}},[e._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{color:"red"},on:{click:e.deleteItem}},[e._v("Excluir")])],1)],1)],1)],1)]],2)],1)},i=[],l=(a("7f7f"),a("5a50")),n=a("3a86"),r={metaInfo:{titleTemplate:"%s - Lançamento Extra"},data:function(){return{money:l["i"],dialogNew:!1,dialogDelete:!1,newItem:{nomeLoja:null,lojaId:null,valor:0,file:null,tipoId:null},item:null,selected:[],filtros:{redeId:null,empresaId:null,lojaId:null},tipos:[],search:"",headers:[{sortable:!1,text:"Loja",value:"nomeLoja"},{sortable:!1,text:"Tipo",value:"tipo"},{sortable:!1,text:"Data",value:"data"},{sortable:!1,text:"Valor",value:"valor"},{sortable:!1,text:"Histórico",value:"historico"},{sortable:!1,text:""}],items:[],totalItems:null,loading:!1,file:{},formData:null}},beforeMount:function(){var e=this;n["C"].tiposLancamentoRepasse().then(function(t){e.tipos=t.data})},mounted:function(){this.reload()},methods:{validateBeforeSubmit:function(){var e=this;this.$validator.validate().then(function(t){t?(e.loading=!0,n["n"].salvar(e.newItem).then(function(t){var a="Cadastro realizado com sucesso";e.$root.showSucesso(a),e.loading=!1,e.closeDialogNew(),e.formData?n["n"].uploadDocumento(t.data.id,e.formData).catch(function(){return e.$root.showErro("O Repasse foi feito, mas deu erro ao enviar o comprovante de anexo, entrar em contato com o suporte")}).finally(function(){e.pesquisar()}):e.pesquisar()}).catch(function(t){e.$root.showErro(t.data),e.loading=!1})):e.$root.showAlerta(e.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},anexar:function(e){e&&e.target&&e.target.files.length>0&&(this.file=e.target.files[0],this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("name",this.file.name))},downloadAnexo:function(e){n["n"].downloadAnexo(e.id)},reload:function(){},onChangeRede:function(e){this.clear()},onChangeEmpresa:function(e){this.clear()},lojaSelecionada:function(e){this.filtros.lojaId=e.id,this.newItem.lojaId=e.id,this.newItem.nomeLoja=e.descricao,this.pesquisar()},clear:function(){this.items=[],this.filtros.lojaId=null},openDialogNew:function(){this.dialogNew=!0},closeDialogNew:function(){this.dialogNew=!1,this.newItem.valor=0,this.newItem.file=null,this.newItem.historico=null,this.newItem.data=null},pesquisar:function(){var e=this;this.loading=!0,n["n"].findAll(this.filtros.lojaId).then(function(t){e.items=t.data}).catch(function(t){return e.$root.showErro(t.data)}).finally(function(){e.loading=!1})},openDialogDelete:function(e){this.item=e,this.dialogDelete=!0},closeDialogDelete:function(){this.item=null,this.dialogDelete=!1},deleteItem:function(){var e=this;this.loading=!0,n["n"].delete(this.item.id).then(function(t){e.$root.showSucesso(t.data),e.pesquisar(),e.closeDialogDelete()}).catch(function(t){e.$root.showErro(t.data)}).finally(function(){e.loading=!1})}}},s=r,c=a("2877"),d=Object(c["a"])(s,o,i,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=5f26.3847d8e8.js.map