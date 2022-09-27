(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["4b8e"],{"4b8e":function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:"","grid-list-md":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:""}},[e("material-card",{attrs:{color:"primary",title:"Pesquisar Pagamentos"}},[e("v-card",{staticClass:"elevation-0"},[e("v-card-text",[e("v-form",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Data Inicial",type:"date"},model:{value:t.filtros.dataInicial,callback:function(a){t.$set(t.filtros,"dataInicial",a)},expression:"filtros.dataInicial"}})],1),e("v-flex",{attrs:{md1:""}},[e("span",{staticClass:"layout fill-height align-center justify-center"},[t._v("a")])]),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Data Final",type:"date"},model:{value:t.filtros.dataFinal,callback:function(a){t.$set(t.filtros,"dataFinal",a)},expression:"filtros.dataFinal"}})],1)],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{loading:t.loadingBtn,color:"primary"},on:{click:t.pesquisar}},[t._v("Pesquisar")])],1)],1)],1)],1),e("v-flex",{attrs:{md12:""}},[e("v-card",[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("Pagamentos")]),e("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}})],1),e("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),e("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.pagamentos,"total-items":t.totalPagamentos,pagination:t.pagination},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"items",fn:function(a){var o=a.item;return[e("tr",[e("td",{staticClass:"text-xs-center"},[t._v(t._s(t._f("moment")(o.dataPagto,"DD/MM/YYYY")))]),e("td",[t._v(t._s(o.valorPago.toLocaleString("pt-BR",{minimumFractionDigits:2})))]),e("td",[t._v(t._s(o.tipoPagto))]),e("td",[t._v(t._s(o.nomeLoja))]),e("td",{staticClass:"text-xs-center"},[e("core-status-pagamento",{attrs:{status:o.flgCancelado?"Cancelado":"Pago","motivo-cancelamento":o.motivoCancelamento}})],1),e("td",{staticClass:"text-xs-center"},[e("v-icon",{on:{click:function(a){t.openRecibo(o)}}},[t._v("mdi-receipt")])],1)])]}}])})],1)],1)],1),t.dialogRecibo?e("cliente-recibo-pagamento",{attrs:{"pagamento-id":t.pagamentoId,show:t.dialogRecibo,close:t.closeRecibo}}):t._e()],1)},i=[],n=(e("c5f6"),e("3a86")),l=function(){return e.e("chunk-2e0c").then(e.bind(null,"560e"))},s={components:{ClienteReciboPagamento:l},props:{value:{type:Object,required:!0}},data:function(){return{dialogRecibo:!1,currentPage:0,pageCount:0,form:{},pagination:{rowsPerPage:15},filtros:{dataInicial:null,dataFinal:null,lojaId:null},headers:[{sortable:!1,text:"Data do Pagto",align:"center",value:"dataPagto"},{sortable:!1,text:"Valor Pago",value:"valorPago"},{sortable:!1,text:"Tipo",value:"tipoPagto"},{sortable:!1,text:"Local Pagto",value:"nomeLoja"},{sortable:!1,text:"Status",align:"center",value:"status"},{sortable:!1,text:""}],pagamentos:[],totalPagamentos:null,loading:!1,loadingBtn:!1,pagamentoId:null}},watch:{pagination:{handler:function(){this.paginar()}}},beforeMount:function(){this.loading=!0,this.loadingBtn=!0,this.filtros.lojaId=Number(this.value.lojaId)},methods:{reload:function(){},pesquisar:function(){this.loadingBtn=!0,this.paginar()},paginar:function(){var t=this;this.loading=!0,n["h"].pagamentosCliente(this.pagination.rowsPerPage,this.pagination.page-1,this.pagination.sortBy||"dataPagto",this.value.id,this.filtros).then(function(a){t.pagamentos=a.data.content,t.totalPagamentos=a.data.totalElements}).finally(function(){t.loadingBtn=!1,t.loading=!1})},closeRecibo:function(){this.dialogRecibo=!1,this.pagamentoId=null},openRecibo:function(t){this.pagamentoId=t.id,this.dialogRecibo=!0}}},r=s,c=e("2877"),d=Object(c["a"])(r,o,i,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=4b8e.ffdbb7ce.js.map