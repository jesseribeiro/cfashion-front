(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2e20"],{"2e20":function(a,e,t){"use strict";t.r(e);var o=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("v-container",{attrs:{fluid:"","grid-list-md":""}},[t("core-progress-modal",{attrs:{show:a.loading}}),a.loading?a._e():t("v-layout",{attrs:{row:"",wrap:""}},[a.novaRenegociacao?t("v-flex",{attrs:{md12:""}},[t("v-stepper",{model:{value:a.e1,callback:function(e){a.e1=e},expression:"e1"}},[t("v-stepper-header",[t("v-stepper-step",{attrs:{complete:a.e1>1,step:"1"}},[a._v("Selecione as Parcelas do Acordo")]),t("v-divider"),t("v-stepper-step",{attrs:{complete:a.e1>2,step:"2"}},[a._v("Calcular Acordo")])],1),t("v-stepper-items",[t("v-stepper-content",{attrs:{step:"1"}},[t("cliente-renegociar-carnes",{attrs:{value:a.value,"dados-acordo":a.dadosAcordo,"next-step":a.continuar,"set-data":a.setDadosPreenchidosNoPasso1,cancelar:a.cancelar}})],1),t("v-stepper-content",{attrs:{step:"2"}},[2===a.e1?[t("cliente-renegociar-calculo",{attrs:{value:a.value,"dados-acordo":a.dadosAcordo,divida:a.divida,"go-back":a.voltar,finalizar:a.finalizaRenegociacao}})]:a._e()],2)],1)],1)],1):t("v-flex",{attrs:{md12:""}},[t("material-card",{attrs:{color:"primary",flat:"","full-width":"",title:"Renegociações Efetuadas"}},[t("v-card",[t("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:a.headersEfetuadas,items:a.renegociacoesEfetuadas,"hide-actions":""},scopedSlots:a._u([{key:"items",fn:function(e){var o=e.item;return[t("tr",{staticClass:"text-xs-right"},[t("td",{staticClass:"text-xs-center"},[a._v(a._s(o.id))]),t("td",{staticClass:"text-xs-center"},[a._v(a._s(a._f("moment")(o.dataAcordo,"DD/MM/YYYY H:mm")))]),t("td",[a._v("R$ "+a._s(a.formatValorMonetario(o.valorTotal)))]),t("td",[a._v("R$ "+a._s(a.formatValorMonetario(o.valorEntrada)))]),t("td",[a._v("R$ "+a._s(a.formatValorMonetario(o.valorRenegociado)))]),t("td",[a._v(a._s(o.qtdParcela))]),t("td",[a._v("R$ "+a._s(a.formatValorMonetario(o.valorParcela)))]),t("td",{staticClass:"text-xs-center"},[a._v(a._s(a._f("moment")(o.dataFim,"DD/MM/YYYY")))]),t("td",{staticClass:"text-xs-center"},[t("core-status-pagamento",{attrs:{status:o.status}})],1),t("td",{staticClass:"text-xs-center"},["Em Aberto"===o.status?t("v-icon",{on:{click:function(e){a.openImprimirCarne(o)}}},[a._v("mdi-printer")]):a._e(),t("v-icon",{attrs:{title:"Visualizar Renegociação"},on:{click:function(e){a.openVisualizar(o)}}},[a._v("mdi-magnify")]),"Em Aberto"===o.status?t("v-icon",{attrs:{color:"red",title:"Cancelar Renegociação"},on:{click:function(e){a.openDialogCancelar(o)}}},[a._v("mdi-delete")]):a._e()],1)])]}}])}),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"primary"},on:{click:function(e){a.iniciarNovaRenegociacao()}}},[a._v("Nova Renegociação de Dívida")])],1)],1)],1)],1)],1),a.dialogCancelar?[t("v-layout",{attrs:{row:"","justify-center":""}},[t("v-dialog",{attrs:{"max-width":"490"},model:{value:a.dialogCancelar,callback:function(e){a.dialogCancelar=e},expression:"dialogCancelar"}},[t("v-card",[t("v-card-title",{staticClass:"headline"},[a._v("\n            Cancelar Renegociação - ID "+a._s(a.item.id)+"\n          ")]),t("v-card-text",[t("p",[a._v("Confirma o cancelamento da Renegociação?")]),t("p",[a._v("\n              Ao cancelar essa renegociação, as parcelas que foram pagas, continuarão como pagas,\n              as que não foram pagas irão para o status de cancelada e o carnê dessa\n              renegociação será cancelado.\n            ")]),t("p",[a._v("\n              Com isso a dívida que havia sido renegociada será reaberta,\n              com as datas em atraso, como se nada tivesse acontecido.\n            ")])]),t("v-card-actions",[t("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:a.closeDialogCancelar}},[a._v("Desistir")]),t("v-spacer"),t("v-btn",{attrs:{color:"red"},on:{click:a.confirmarCancelamento}},[a._v("Confirmar")])],1)],1)],1)],1)]:a._e(),a.dialogImprimirCarne?t("core-dialog-imprimir-carne",{attrs:{value:a.dialogImprimirCarne,"carne-id":a.carneId,close:a.closeImprimirCarne}}):a._e(),a.dialogVisualizar?[t("v-layout",{attrs:{row:"","justify-center":""}},[t("v-dialog",{attrs:{persistent:"","max-width":"600"},model:{value:a.dialogVisualizar,callback:function(e){a.dialogVisualizar=e},expression:"dialogVisualizar"}},[t("v-card",[t("v-card-title",{staticClass:"headline"},[a._v("\n            Dados Renegociação - ID "+a._s(a.item.id)+"\n            "),t("v-spacer"),t("core-status-pagamento",{attrs:{status:a.item.status}}),"Em Aberto"===a.item.status?t("v-icon",{on:{click:function(e){a.openImprimirCarne(a.item)}}},[a._v("mdi-printer\n            ")]):a._e()],1),t("v-card-text",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Data Acordo",value:a._f("moment")(a.item.dataAcordo,"DD/MM/YYYY H:mm")}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Total da Dívida",value:"R$ "+a.formatValorMonetario(a.item.valorTotal)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Valor Renegociado",value:"R$ "+a.formatValorMonetario(a.item.valorRenegociado),"class-value":"title"}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Desconto Acordo",value:"R$ "+a.formatValorMonetario(a.item.valorDesconto)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Taxa Juros",value:a.formatValorMonetario(a.item.taxaJuros)+"%"}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Entrada Acordo",value:"R$ "+a.formatValorMonetario(a.item.valorEntrada)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Outros Acréscimos",value:"R$ "+a.formatValorMonetario(a.item.outrosAcrescimos)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Qtde. Parcelas",value:a.item.qtdParcela}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Valor Parcela",value:"R$ "+a.formatValorMonetario(a.item.valorParcela),"class-value":"title"}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Taxa Juros Parcelamento",value:a.formatValorMonetario(a.item.taxaJurosParcelamento)+"%"}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Tarifa Acordo",value:"R$ "+a.formatValorMonetario(a.item.tarifaAcordo)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Tarifa Boleto",value:"R$ "+a.formatValorMonetario(a.item.tarifaBoleto)}})],1),t("v-flex",{attrs:{md4:""}},[t("core-label-value",{attrs:{label:"Tarifa Serviço",value:"R$ "+a.formatValorMonetario(a.item.tarifaServico)}})],1)],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"primary"},on:{click:function(e){a.closeVisualizar()}}},[a._v("Fechar")])],1)],1)],1)],1)]:a._e()],2)},r=[],i=t("3a86"),l=t("65e0"),n=function(){return t.e("d606").then(t.bind(null,"d606"))},s=function(){return t.e("chunk-4d3d").then(t.bind(null,"5830"))},c={components:{ClienteRenegociarCarnes:n,ClienteRenegociarCalculo:s},props:{value:{type:Object,required:!0}},data:function(){return{loading:!1,loadingBtn:!1,novaRenegociacao:!1,dialogCancelar:!1,dialogImprimirCarne:!1,dialogVisualizar:!1,carneId:null,item:null,form:{},e1:0,headersEfetuadas:[{align:"center",sortable:!1,text:"ID"},{align:"center",sortable:!1,text:"Data Acordo"},{sortable:!1,align:"right",text:"Total da Dívida"},{sortable:!1,align:"right",text:"Entrada Acordo"},{sortable:!1,align:"right",text:"Valor Renegociado"},{sortable:!1,align:"right",text:"Parcelas"},{sortable:!1,align:"right",text:"Valor Parcela"},{sortable:!1,align:"center",text:"Fim Acordo"},{sortable:!1,align:"center",text:"Status"},{sortable:!1,align:"center",text:""}],renegociacoesEfetuadas:[],possuiDividaParaRenegociar:!1,dadosAcordo:null,listaCedente:[],divida:{valorAtraso:0,valorVencer:0,valorMultaJurosMora:0,valorTotal:0}}},beforeMount:function(){var a=this;i["d"].findAll().then(function(e){a.listaCedente=e.data}).catch(function(e){a.$root.showErro(e.data)}).finally(function(){a.loading=!1}),this.reload()},methods:{iniciarNovaRenegociacao:function(){var a=this;this.loading=!0,i["x"].findCarnesParaAcordo(this.value.id,this.value.lojaId).then(function(e){e.data?(a.dadosAcordo=e.data,a.novaRenegociacao=!0):a.$root.showAlerta("Cliente não possui dívida para ser renegociada!")}).catch(function(e){a.$root.showErro(e.data)}).finally(function(){a.loading=!1})},validateBeforeSubmit:function(){this.$refs.form.validate()?this.continuar():this.$root.showAlerta(this.$vuetify.t("$vuetify.Erro.camposObrigatorios"))},continuar:function(){this.e1<2?this.e1++:this.e1=1},voltar:function(){this.e1>1?this.e1--:this.e1=1},setDadosPreenchidosNoPasso1:function(a,e){this.dadosAcordo["selected"]=a,this.dadosAcordo["totalRenegociar"]=e,this.divida.valorAtraso=a.map(function(a){return a.totalAtrasoCarne}).reduce(function(a,e){return a+e}),this.divida.valorVencer=a.map(function(a){return a.totalVencerCarne}).reduce(function(a,e){return a+e}),this.divida.valorMultaJurosMora=a.map(function(a){return a.totalMultaJurosCarne}).reduce(function(a,e){return a+e}),this.divida.valorTotal=e},cancelar:function(){this.novaRenegociacao=!1},closeDialogCancelar:function(){this.dialogCancelar=!1},openDialogCancelar:function(a){this.item=a,this.novaRenegociacao=!1,this.dialogCancelar=!0},finalizaRenegociacao:function(){this.novaRenegociacao=!1,this.e1=0,this.reload()},reload:function(){var a=this;this.loading=!0,i["x"].findAllRenegociacao(this.value.id,this.value.lojaId).then(function(e){a.loading=!1,a.renegociacoesEfetuadas=e.data}).catch(function(e){a.$root.showErro("Erro ao buscar as renegociações efetuadas"),a.loading=!1})},formatValorMonetario:function(a){return l["a"].formatValorMonetario(a)},confirmarCancelamento:function(){var a=this;this.loading=!0,i["x"].cancelarRenegociacao({renegociacaoId:this.item.id}).then(function(e){a.$root.showSucesso(e.data),a.closeDialogCancelar(),a.reload()}).catch(function(e){a.$root.showErro(e.data),a.loading=!1})},openVisualizar:function(a){this.item=a,this.dialogVisualizar=!0},closeVisualizar:function(){this.dialogVisualizar=!1,this.item=null},openImprimirCarne:function(a){this.carneId=a.carneId,this.dialogImprimirCarne=!0},closeImprimirCarne:function(){this.dialogImprimirCarne=!1,this.carneId=null}}},d=c,u=t("2877"),v=Object(u["a"])(d,o,r,!1,null,null,null);e["default"]=v.exports}}]);
//# sourceMappingURL=2e20.e4b0ad73.js.map