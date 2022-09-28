(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3cc","65e0","65e0"],{"65e0":function(t,a,e){"use strict";e("a481"),e("c5f6");a["a"]={convertStringToNumber:function(t){return t?Number(t.replaceAll(".","").replace(",",".").replace(/[^0-9.-]+/g,"")):0},calculaDescontoPercentual:function(t,a){if(a){var e=this.convertStringToNumber(a)/100;return console.log("percentualCalculado: "+e),console.log("valorBase: "+t),console.log("multiplicado: "+t*e),t*e}return 0},formatValorMonetario:function(t){return t?t.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}):"0,00"}}},c460:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:"","grid-list-md":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:""}},[e("material-card",{attrs:{color:"primary",title:"Consultar Pagamentos"}},[e("v-form",{attrs:{novalidate:""},on:{submit:function(a){return a.preventDefault(),t.pesquisar(a)}}},[e("v-card",{staticClass:"elevation-0"},[e("v-card-text",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md3:""}},[e("v-autocomplete",{attrs:{items:t.redes,"item-value":"id","item-text":"descricao",label:"Rede"},model:{value:t.filtros.redeId,callback:function(a){t.$set(t.filtros,"redeId",a)},expression:"filtros.redeId"}})],1),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Data Inicial",type:"date"},model:{value:t.filtros.dataInicial,callback:function(a){t.$set(t.filtros,"dataInicial",a)},expression:"filtros.dataInicial"}})],1),e("v-flex",{attrs:{md1:""}},[e("span",{staticClass:"layout fill-height align-center justify-center"},[t._v("a")])]),e("v-flex",{attrs:{md2:""}},[e("v-text-field",{attrs:{label:"Data Final",type:"date"},model:{value:t.filtros.dataFinal,callback:function(a){t.$set(t.filtros,"dataFinal",a)},expression:"filtros.dataFinal"}})],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{loading:t.loadingBtn,color:"primary",type:"submit"}},[t._v("Pesquisar")])],1)],1)],1)],1)],1),e("v-flex",{attrs:{md12:""}},[e("v-card",[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",{staticClass:"mt-5"},[t._v("\n            Pagamentos\n            "),e("p",{staticClass:"body-1 mt-2"},[t._v("\n              Foram encontrados "),e("span",{staticClass:"title"},[t._v(t._s(t.qtdItems)+" ")]),t._v(" pagamento(s) no valor total de "),e("span",{staticClass:"title"},[t._v("R$ "+t._s(t.formatValorMonetario(t.valorTotal)))])])])],1),e("v-progress-linear",{attrs:{active:t.loading,color:"light-blue",indeterminate:"",height:"3"}}),e("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.items,"total-items":t.totalItems,pagination:t.pagination,"rows-per-page-items":t.pagination.rowsPerPageItems,"rows-per-page-text":t.pagination.rowsPerPageText,"item-key":"id"},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"items",fn:function(a){var o=a.item;return[e("td",{staticClass:"text-xs-center"},[t._v(t._s(t._f("moment")(o.dataPagto,"DD/MM/YYYY H:mm")))]),e("td",[e("a",{attrs:{href:"/cad-cliente/"+o.clienteId+"/"+o.localPagamentoId}},[t._v("\n                "+t._s(o.clienteCpf)+"\n              ")])]),e("td",{staticClass:"text-xs-right"},[t._v(t._s(t.formatValorMonetario(o.valorPago)))]),e("td",[t._v(t._s(o.tipoPagto))]),e("td",[t._v(t._s(o.nomeLoja))]),e("td",{staticClass:"text-xs-center"},[e("v-icon",{attrs:{title:"Comprovante"},on:{click:function(a){t.openRecibo(o)}}},[t._v("mdi-receipt")])],1),e("td",{staticClass:"text-xs-center"},[o.flgCancelado?e("core-status-pagamento",{attrs:{status:"Cancelado","motivo-cancelamento":o.motivoCancelamento}}):e("v-icon",{attrs:{color:"error",title:"Cancelar Pagamento"},on:{click:function(a){t.openDialogCancelar(o)}}},[t._v("\n                mdi-delete-outline\n              ")])],1)]}}])})],1)],1),t.dialogCancelar?[e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{persistent:"","max-width":"390"},model:{value:t.dialogCancelar,callback:function(a){t.dialogCancelar=a},expression:"dialogCancelar"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[t._v("Cancelar Pagamento")]),e("v-card-text",[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:""}},[e("v-alert",{attrs:{value:!0,type:"warning"}},[e("span",[t._v("Essa operação não poderá ser desfeita.")])])],1),e("v-flex",{attrs:{md12:""}},[e("v-textarea",{attrs:{label:"Informe o motivo do cancelamento"},model:{value:t.itemSelecionado.motivo,callback:function(a){t.$set(t.itemSelecionado,"motivo",a)},expression:"itemSelecionado.motivo"}})],1)],1)],1),e("v-card-actions",[e("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:t.closeDialogCancelar}},[t._v("Cancelar")]),e("v-spacer"),e("v-btn",{attrs:{loading:t.loadingBtn,color:"red"},on:{click:t.confirmarCancelar}},[t._v("Confirmar")])],1)],1)],1)],1)]:t._e(),t.dialogRecibo?e("cliente-recibo-pagamento",{attrs:{"pagamento-id":t.pagamentoId,show:t.dialogRecibo,close:t.closeRecibo}}):t._e()],2)],1)},i=[],n=e("5530"),l=e("3a86"),r=e("5a50"),s=e("fa1c"),c=e("65e0"),d=function(){return e.e("chunk-2e0c").then(e.bind(null,"560e"))},m={components:{ClienteReciboPagamento:d},data:function(){return{money:r["i"],dialogCancelar:!1,dialogRecibo:!1,pagination:{rowsPerPage:r["j"][2],rowsPerPageItems:r["j"]},filtros:{redeId:r["k"],dataInicial:s["a"].ontem(),dataFinal:s["a"].currentDate(),localPagamentoId:r["k"]},headers:[{sortable:!1,text:"Data do pagamento",align:"center",value:"dataPagto"},{sortable:!1,text:"CPF",value:"clienteCpf"},{sortable:!1,text:"Valor Pago",value:"valorPago",align:"right"},{sortable:!1,text:"Tipo",value:"tipo"},{sortable:!1,text:"Local Pagto",value:"nomeLoja"},{sortable:!1,text:"Recibo",align:"center"},{sortable:!1,text:"Ações",align:"center"}],items:[],totalItems:0,valorTotal:0,qtdItems:0,loading:!1,loadingBtn:!1,pagamentoId:null,itemSelecionado:null,redes:[],locaisPagamento:[{id:r["k"],descricao:"Todos"}]}},watch:{pagination:{handler:function(){this.paginar()}}},beforeMount:function(){var t=this;this.loading=!0,this.redes.push({id:r["k"],descricao:"Todas Redes"}),l["C"].getAllRedes().then(function(a){t.redes=t.redes.concat(a.data)}).finally(function(){t.loading=!1})},methods:{closeDialogCancelar:function(){this.dialogCancelar=!1,this.itemSelecionado=null},closeRecibo:function(){this.dialogRecibo=!1,this.pagamentoId=null},confirmarCancelar:function(){var t=this;this.itemSelecionado.motivo?(this.loading=!0,this.loadingBtn=!0,l["E"].cancelarPagamento({id:this.itemSelecionado.id,motivo:this.itemSelecionado.motivo,lojaId:this.itemSelecionado.lojaId,usuarioId:this.$root.usuarioId()}).then(function(a){t.$root.showSucesso(a.data),t.paginar(),t.closeDialogCancelar()}).catch(function(a){t.$root.showErro(a.data),t.loading=!1,t.loadingBtn=!1})):this.$root.showAlerta("Informe o motivo do cancelamento")},openDialogCancelar:function(t){this.dialogCancelar=!0,this.itemSelecionado=Object(n["a"])({},t)},openRecibo:function(t){this.pagamentoId=t.id,this.dialogRecibo=!0},pesquisar:function(){var t=this;this.$validator.validate().then(function(a){a?(t.loadingBtn=!0,t.paginar()):t.$root.showAlerta(t.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},paginar:function(){var t=this;this.loading=!0,l["r"].pagination(this.pagination.rowsPerPage,this.pagination.page-1,this.pagination.sortBy||"dataPagto",this.filtros).then(function(a){t.items=a.data.content[0]["pagamentos"],t.valorTotal=a.data.content[0]["valorTotal"],t.qtdItems=a.data.content[0]["qtdItems"],t.totalItems=a.data.totalElements}).catch(function(a){t.$root.showErro(a.data.message)}).finally(function(){t.loadingBtn=!1,t.loading=!1})},formatValorMonetario:function(t){return c["a"].formatValorMonetario(t)}}},u=m,g=e("2877"),v=Object(g["a"])(u,o,i,!1,null,null,null);a["default"]=v.exports}}]);
//# sourceMappingURL=chunk-e3cc.00266403.js.map