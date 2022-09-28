(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["075c"],{"075c":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:"","grid-list-md":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:""}},[e("material-card",{attrs:{color:"primary",title:"Pesquisar Loja"}},[e("v-card",{staticClass:"elevation-0"},[e("v-card-text",[e("v-form",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md1:""}},[e("v-text-field",{attrs:{label:"Código"},model:{value:t.filtros.id,callback:function(a){t.$set(t.filtros,"id",a)},expression:"filtros.id"}})],1),e("v-flex",{attrs:{md4:""}},[e("v-text-field",{attrs:{label:"Razão Social"},model:{value:t.filtros.razaoSocial,callback:function(a){t.$set(t.filtros,"razaoSocial",a)},expression:"filtros.razaoSocial"}})],1),e("v-flex",{attrs:{md4:""}},[e("v-text-field",{attrs:{label:"Nome Fantasia"},model:{value:t.filtros.nomeFantasia,callback:function(a){t.$set(t.filtros,"nomeFantasia",a)},expression:"filtros.nomeFantasia"}})],1),e("v-flex",{attrs:{md3:""}},[e("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],attrs:{label:"CNPJ"},model:{value:t.filtros.cnpj,callback:function(a){t.$set(t.filtros,"cnpj","string"===typeof a?a.trim():a)},expression:"filtros.cnpj"}})],1),e("v-flex",{attrs:{md3:""}},[e("v-autocomplete",{attrs:{items:t.listaStatus,label:"Status",clearable:""},model:{value:t.filtros.status,callback:function(a){t.$set(t.filtros,"status",a)},expression:"filtros.status"}})],1),e("v-flex",{attrs:{md3:""}},[e("v-autocomplete",{attrs:{items:t.ramosAtividade,label:"Ramo Atividade","item-value":"id","item-text":"descricao",clearable:""},model:{value:t.filtros.ramoAtividadeId,callback:function(a){t.$set(t.filtros,"ramoAtividadeId",a)},expression:"filtros.ramoAtividadeId"}})],1)],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{loading:t.loadingBtn,color:"primary"},on:{click:t.pesquisar}},[t._v("Pesquisar")])],1)],1)],1)],1),e("v-flex",{attrs:{md12:""}},[e("v-card",[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("Lojas")]),e("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-btn",{attrs:{small:"",fab:"",color:"primary"}},[e("v-icon",{on:{click:function(a){t.newItem()}}},[t._v("mdi-plus")])],1)],1),e("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),e("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.lojas,"total-items":t.totalItems,pagination:t.pagination},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"headerCell",fn:function(a){var i=a.header;return[e("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(i.text)}})]}},{key:"items",fn:function(a){var i=a.item;return[e("td",[t._v(t._s(i.razaoSocial))]),e("td",[t._v(t._s(i.nomeFantasia))]),e("td",[t._v(t._s(i.cnpj))]),e("td",["ATIVO"===i.status?e("v-chip",{staticClass:"ml-0",attrs:{color:"green","text-color":"white"}},[e("v-avatar",{staticClass:"green darken-4"},[t._v("A")]),t._v("\n                "+t._s(i.status)+"\n              ")],1):t._e(),"BLOQUEADO"===i.status?e("v-chip",{staticClass:"ml-0",attrs:{color:"red","text-color":"white"}},[e("v-avatar",{staticClass:"red darken-4"},[t._v("B")]),t._v("\n                "+t._s(i.status)+"\n              ")],1):t._e(),"CANCELADO"===i.status?e("v-chip",{staticClass:"ml-0",attrs:{color:"orange","text-color":"white"}},[e("v-avatar",{staticClass:"orange darken-4"},[t._v("C")]),t._v("\n                "+t._s(i.status)+"\n              ")],1):t._e()],1),e("td",[t._v(t._s(i.empresaLabel))]),e("td",[t._v(t._s(i.ramoAtividadeLabel))]),e("td",[t._v(t._s(i.chaveTEF))]),e("td",{staticClass:"justify-end layout ma-2"},[e("v-icon",{staticClass:"mr-2",attrs:{color:"blue",title:"Editar dados da loja"},on:{click:function(a){t.editItem(i)}}},[t._v("mdi-pencil")]),e("v-icon",{attrs:{color:"red",title:"Excluir loja"},on:{click:function(a){t.openDialogDelete(i)}}},[t._v("mdi-delete")])],1)]}}])})],1)],1),t.dialog?[e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{"max-width":"390"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[t._v("Excluir Loja")]),e("v-card-text",[t._v("Confirma a exclusão da Loja "),e("span",{staticClass:"title"},[t._v(t._s(t.item.razaoSocial))]),t._v("? Essa operação não poderá ser desfeita.")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:t.closeDialogDelete}},[t._v("Cancelar")]),e("v-btn",{attrs:{color:"red"},on:{click:t.deleteItem}},[t._v("Excluir")])],1)],1)],1)],1)]:t._e()],2)],1)},s=[],o=e("3a86"),l={metaInfo:{titleTemplate:"%s - Lojas"},data:function(){return{dialog:!1,item:null,loading:!1,totalItems:0,pagination:{rowsPerPage:10,sortBy:"id"},filtros:{id:null,razaoSocial:null,nomeFantasia:null,cnpj:null,status:null,ramoAtividadeId:null,empresaId:null},lojas:[],ramosAtividade:[],headers:[{text:"Razão Social",value:"razaoSocial",sortable:!1},{text:"Nome Fantasia",value:"nmFantasia",sortable:!1},{text:"CNPJ",value:"cnpj",sortable:!1},{text:"Status",value:"status",sortable:!1},{sortable:!1,text:"Empresa",value:"empresaId"},{sortable:!1,text:"Ramo Atividade",value:"ramoAtividade"},{sortable:!1,text:"Chave TEF",value:"chaveTEF"},{sortable:!1,text:""}],listaStatus:[],loadingBtn:!1}},watch:{pagination:{handler:function(){this.paginar()}}},mounted:function(){this.reload()},methods:{reload:function(){var t=this;this.listaStatus.length<=0&&o["C"].listStatus().then(function(a){t.listaStatus=a.data}).catch(function(){return t.$root.showErro("Não foi possível buscar as informações da lista de status")}),this.ramosAtividade.length<=0&&o["C"].listRamoAtividade().then(function(a){t.ramosAtividade=a.data}).catch(function(){return t.$root.showErro("Não foi possível buscar as informações da lista de ramo atividade")})},newItem:function(){this.$router.push("cad-loja")},editItem:function(t){this.$router.push("cad-loja/".concat(t.id))},openDialogDelete:function(t){this.item=t,this.dialog=!0},closeDialogDelete:function(){this.item=null,this.dialog=!1},deleteItem:function(){var t=this;o["p"].delete(this.item.id).then(function(a){t.$root.showSucesso(a.data),t.closeDialogDelete(),t.paginar()}).catch(function(a){return t.$root.showErro(a.data)})},pesquisar:function(){this.loadingBtn=!0,this.paginar()},paginar:function(){var t=this;this.$root.isProprietario()&&(this.filtros.empresaId=this.$root.empresaId()),this.loading=!0,o["p"].pagination(this.pagination.rowsPerPage,this.pagination.page-1,this.pagination.sortBy||"id",this.filtros).then(function(a){t.lojas=a.data.content,t.totalItems=a.data.totalElements}).finally(function(){t.loadingBtn=!1,t.loading=!1}),this.reload()}}},r=l,n=e("2877"),c=Object(n["a"])(r,i,s,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=075c.7a873e2a.js.map