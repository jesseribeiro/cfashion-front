(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["51f2"],{"51f2":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","grid-list-md":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("material-card",{attrs:{color:"primary",title:"Pesquisar Rede"}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("v-form",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Nome Rede"},model:{value:t.filtros.nome,callback:function(e){t.$set(t.filtros,"nome",e)},expression:"filtros.nome"}})],1),a("v-flex",{attrs:{md3:""}},[a("v-text-field",{attrs:{label:"Sigla Rede"},model:{value:t.filtros.sigla,callback:function(e){t.$set(t.filtros,"sigla",e)},expression:"filtros.sigla"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{loading:t.loadingBtn,color:"primary"},on:{click:t.pesquisar}},[t._v("Pesquisar")])],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-card",[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Redes")]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-btn",{attrs:{small:"",fab:"",color:"primary"}},[a("v-icon",{on:{click:function(e){t.newItem()}}},[t._v("mdi-plus")])],1)],1),a("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.items,"total-items":t.totalItems,pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"headerCell",fn:function(e){var i=e.header;return[a("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(i.text)}})]}},{key:"items",fn:function(e){var i=e.item;return[a("td",[t._v(t._s(i.nome))]),a("td",[t._v(t._s(i.sigla))]),a("td",{staticClass:"justify-end layout ma-2"},[a("v-icon",{staticClass:"mr-2",attrs:{color:"blue",title:"Editar dados da rede"},on:{click:function(e){t.editItem(i)}}},[t._v("mdi-pencil")]),a("v-icon",{attrs:{color:"red",title:"Excluir rede"},on:{click:function(e){t.openDialogDelete(i)}}},[t._v("mdi-delete")])],1)]}}])})],1)],1),t.dialog?[a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{"max-width":"390"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Excluir Rede")]),a("v-card-text",[t._v("\n              Confirma a exclusão da Rede "),a("span",{staticClass:"title"},[t._v(t._s(t.item.nome))]),t._v("? Essa operação não poderá ser desfeita.\n            ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:t.closeDialogDelete}},[t._v("Cancelar")]),a("v-btn",{attrs:{color:"red"},on:{click:t.deleteItem}},[t._v("Excluir")])],1)],1)],1)],1)]:t._e()],2)],1)},o=[],n=a("a850"),l={metaInfo:{titleTemplate:"%s - Redes"},data:function(){return{dialog:!1,item:null,loading:!1,loadingBtn:!1,totalItems:0,pagination:{pageNo:1,rowsPerPage:25,sortBy:"nome",descending:!0},selected:[],filtros:{nome:"",sigla:""},search:"",headers:[{text:"Nome Rede",value:"nome",sortable:!1},{text:"Sigla Rede",value:"sigla",sortable:!1},{sortable:!1,text:""}],items:[]}},watch:{pagination:{handler:function(){this.paginar()}}},methods:{reload:function(){this.paginar()},newItem:function(){this.$router.push("cad-rede")},editItem:function(t){this.$router.push("cad-rede/".concat(t.id)),this.reload()},openDialogDelete:function(t){this.item=t,this.dialog=!0},closeDialogDelete:function(){this.item=null,this.dialog=!1},deleteItem:function(){var t=this;n["a"].delete(this.item.id).then(function(e){t.$root.showSucesso(e.data),t.closeDialogDelete(),t.reload()}).catch(function(e){return t.$root.showErro(e.data)})},pesquisar:function(){this.loadingBtn=!0,this.paginar()},paginar:function(){var t=this;this.loading=!0,n["a"].pagination(this.pagination,this.filtros).then(function(e){t.items=e.data.content,t.totalItems=e.data.totalElements}).finally(function(){t.loadingBtn=!1,t.loading=!1})}}},s=l,r=a("2877"),c=Object(r["a"])(s,i,o,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=51f2.0845008b.js.map