(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b0d8"],{"0d94":function(t,a,i){"use strict";i("f508")},"485a":function(t,a,i){"use strict";i.r(a);var o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-container",{attrs:{fluid:"","grid-list-xl":""}},[i("v-layout",{attrs:{"justify-center":"",wrap:""}},[i("v-flex",{attrs:{md12:""}},[i("material-card",{attrs:{color:"primary",flat:"","full-width":"",title:"Notificações"}},[i("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),i("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.items,"total-items":t.totalItems,pagination:t.pagination},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"items",fn:function(a){var o=a.item;return[i("tr",{staticStyle:{cursor:"pointer"},on:{click:function(a){t.openDialog(o)}}},[i("td",[i("core-notificacao-prioridade",{attrs:{prioridade:o.prioridade}})],1),i("td",[i("span",{class:o.visualizado?"":"nao-visualizado"},[t._v(t._s(o.titulo))])]),i("td",[i("v-chip",{staticClass:"ml-0 body-2",attrs:{color:"gray",small:""}},[t._v("\n                  "+t._s(o.tag)+"\n                ")])],1),i("td",[i("span",{class:o.visualizado?"":"nao-visualizado"},[t._v(t._s(t.formataData(o.dataCadastro)))])]),i("td",[o.anexoId?i("v-icon",{attrs:{color:"dark",title:"Baixar Anexo"},on:{click:function(a){t.downloadAnexo(o.anexoId)}}},[t._v("mdi-paperclip")]):t._e()],1)])]}}])})],1)],1)],1),t.dialog?[i("v-layout",{attrs:{row:"","justify-center":""}},[i("v-dialog",{attrs:{"max-width":"490"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[i("v-card",[i("v-card-title",{staticClass:"title"},[t._v("\n            "+t._s(t.item.titulo)+"\n            "),i("v-spacer"),i("v-icon",{on:{click:t.closeDialog}},[t._v("mdi-close")])],1),i("v-card-text",[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{staticClass:"layout align-end caption",attrs:{md12:""}},[i("span",[t._v(t._s(t.formataData(t.item.dataCadastro)))]),i("v-spacer"),i("span",[t._v("\n                  Anexo\n                ")]),t.item.anexoId?i("v-icon",{attrs:{color:"dark",title:"Baixar Anexo"},on:{click:function(a){t.downloadAnexo(t.item.anexoId)}}},[t._v("mdi-paperclip")]):t._e()],1),i("v-flex",{staticClass:"caption",attrs:{md12:""}},[i("span",[t._v("\n                  Notificação enviada por:\n                ")]),t.item.email?i("v-icon",{attrs:{color:"dark",small:"",title:"Enviado Por E-mail"}},[t._v("mdi-email")]):t._e(),t.item.sms?i("v-icon",{attrs:{color:"dark",small:"",title:"Enviado Por SMS"}},[t._v("mdi-cellphone-message")]):t._e(),t.item.whatsapp?i("v-icon",{attrs:{color:"dark",small:"",title:"Enviado Por WhatsApp"}},[t._v("mdi-whatsapp")]):t._e()],1),i("v-flex",{attrs:{md12:""}},[i("v-textarea",{staticStyle:{display:"block"},attrs:{readonly:""},domProps:{innerHTML:t._s(t.item.mensagem)}})],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"primary"},on:{click:function(a){t.closeDialog()}}},[t._v("Ok")])],1)],1)],1),i("core-progress-modal",{attrs:{show:t.loading}})],1)]:t._e()],2)},n=[],e=i("3a86"),l=i("986e"),s={metaInfo:{titleTemplate:"%s - Notificações"},data:function(){return{loading:!1,dialog:!1,item:null,items:[],totalItems:0,pagination:{pageNo:1,rowsPerPage:25,sortBy:"dataCadastro"},filtros:{lojaId:null,usuarioId:null,visualizado:null,prioridade:null,tag:""},headers:[{sortable:!1,text:"Prioridade",value:"prioridade"},{sortable:!1,text:"Titulo",value:"titulo"},{sortable:!1,text:"Tag",value:"tag"},{sortable:!1,text:"Data",value:"dataCadastro"},{sortable:!1,text:"",value:"informacao"}]}},watch:{pagination:{handler:function(){this.paginar()}}},beforeMount:function(){var t=this,a=this.$route.params.id;a&&(this.loading=!0,e["q"].getById(a).then(function(a){t.openDialog(a.data)}).finally(function(){t.loading=!1}))},methods:{paginar:function(){var t=this;this.loading=!0,this.$root.isRolesPratico()?(this.filtros.usuarioId=this.$root.usuarioId(),e["q"].paginationPratico(this.filtros).then(function(a){t.items=a.data.content,t.totalItems=a.data.totalElements}).finally(function(){t.loading=!1})):(this.filtros.lojaId=this.$root.lojaId(),e["q"].paginationLoja(this.filtros).then(function(a){t.items=a.data.content,t.totalItems=a.data.totalElements}).finally(function(){t.loading=!1}))},formataData:function(t){if(t)return this.$moment(t).calendar()},openDialog:function(t){var a=this;this.item=t,this.dialog=!0,t.visualizado||e["q"].marcarComoVisualizado(t.id).then(function(){l["a"].$emit("NOTIFICACAO_VISUALIZADA",t.id),a.paginar()})},closeDialog:function(){this.dialog=!1,this.item=null},downloadAnexo:function(t){e["a"].downloadAnexo(t)}}},r=s,d=(i("0d94"),i("2877")),c=Object(d["a"])(r,o,n,!1,null,"133fb368",null);a["default"]=c.exports},f508:function(t,a,i){}}]);
//# sourceMappingURL=chunk-b0d8.a705c49d.js.map