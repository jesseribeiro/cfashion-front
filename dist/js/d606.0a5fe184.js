(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["d606"],{d606:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","grid-list-md":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-title",[a("h3",{staticClass:"headline mb-0"},[t._v("Selecione as parcelas para o acordo")])]),a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md3:""}},[a("core-label-value",{attrs:{label:"Nome",value:t.value.nome}})],1),a("v-flex",{attrs:{md3:""}},[a("core-label-value",{attrs:{label:"CPF",value:t.value.cpf}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Parcela Maior Atraso",value:t.dadosAcordo.diasAtraso+" dias"}})],1)],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Total em Atraso",value:t.formatValorMonetario(t.dadosAcordo.totalAtraso)}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Total a Vencer",value:t.formatValorMonetario(t.dadosAcordo.totalVencer)}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Saldo Devedor",value:t.formatValorMonetario(t.dadosAcordo.saldoDevedor)}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Total Multa + Juros Mora",value:t.formatValorMonetario(t.dadosAcordo.totalMultaJuros)}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Total da Dívida",value:t.formatValorMonetario(t.dadosAcordo.totalDivida)}})],1),a("v-flex",{attrs:{md2:""}},[a("core-label-value",{attrs:{label:"Total a Renegociar",value:t.formatValorMonetario(t.totalRenegociar),"class-value":"headline font-weight-black","class-label":"title"}})],1)],1)],1)],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-card",[a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headersCarne,items:t.carnes,expand:!1,"item-value":"carneId","hide-actions":"","select-all":"","item-key":"carneId"},scopedSlots:t._u([{key:"headers",fn:function(e){return[a("tr",[a("th",{staticStyle:{width:"5%"}},[t._v("\n                 \n              ")]),a("th",{staticStyle:{width:"5%"}},[a("v-checkbox",{attrs:{"input-value":e.all,indeterminate:e.indeterminate,primary:"","hide-details":""},nativeOn:{click:function(e){return t.toggleAll(e)}}})],1),t._l(e.headers,function(e){return a("th",{key:e.text,class:e.class},[t._v("\n                "+t._s(e.text)+"\n              ")])})],2)]}},{key:"items",fn:function(e){return[a("tr",{attrs:{active:e.selected}},[a("td",{staticClass:"justify-center layout"},[a("v-icon",{on:{click:function(t){e.item.expanded=!e.item.expanded}}},[t._v("\n                  "+t._s(e.item.expanded?"mdi-minus":"mdi-plus")+"\n                ")])],1),a("td",[a("v-checkbox",{attrs:{"input-value":e.selected,primary:"","hide-details":""},on:{click:function(t){e.selected=!e.selected}}})],1),a("td",{staticClass:"text-xs-center"},[t._v(t._s(t._f("moment")(e.item.dataCompra,"DD/MM/YYYY")))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.valorTotal.toLocaleString("pt-BR",{minimumFractionDigits:2})))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.valorEntrada.toLocaleString("pt-BR",{minimumFractionDigits:2})))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.qtdParcela))]),a("td",[t._v(t._s(e.item.nomeLoja))]),a("td",{staticClass:"text-xs-left font-weight-black"},[t._v(t._s(e.item.tipoCarne))])]),e.item.expanded?a("tr",[a("td",{attrs:{colspan:"10"}},[a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headersParcela,items:e.item.parcelas,"hide-actions":""},scopedSlots:t._u([{key:"headers",fn:function(e){return[a("tr",t._l(e.headers,function(e){return a("th",{key:e.text,class:e.class},[t._v("\n                        "+t._s(e.text)+"\n                      ")])}),0)]}},{key:"items",fn:function(e){return[a("tr",[a("td",[t._v(" \n                      ")]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(0===e.item.numero?"Entrada":e.item.numero))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(t._f("moment")(e.item.dataVencimento,"DD/MM/YYYY")))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.valor.toLocaleString("pt-BR",{minimumFractionDigits:2})))]),e.item.valorMulta?a("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.valorMulta.toLocaleString("pt-BR",{minimumFractionDigits:2})))]):a("td",[t._v("-")]),e.item.valorJurosMora?a("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.valorJurosMora.toLocaleString("pt-BR",{minimumFractionDigits:2})))]):a("td",[t._v("-")]),e.item.qtdDiasAtraso>0?a("td",{staticClass:"text-xs-center font-weight-black"},[t._v(t._s(e.item.qtdDiasAtraso))]):a("td",[t._v(" ")])])]}}])})],1)]):t._e()]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)],1),a("v-flex",{attrs:{md12:""}},[a("v-layout",{staticClass:"justify-end"},[a("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:t.cancelar}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{disabled:t.disableBtn,color:"primary"},on:{click:t.proximoPasso}},[t._v("Continuar")])],1)],1)],1)],1)},s=[],r=(a("ac6a"),a("65e0")),o={props:{value:{type:Object,required:!0},dadosAcordo:{type:Object,required:!0},nextStep:{type:Function,requided:!0},setData:{type:Function,requided:!0},cancelar:{type:Function,requided:!0}},data:function(){return{disableBtn:!1,dialogRecibo:!1,pagamentoId:null,openViewCarne:!1,filePDF:null,expanded:!1,currentPage:0,pageCount:0,form:{},pagination:{rowsPerPage:15},selected:[],filtros:{dataInicial:null,dataFinal:null,lojaId:null,status:null},headersCarne:[{sortable:!1,text:"Data",class:"grey lighten-1 text-xs-center",value:"dataCompra"},{sortable:!1,text:"Valor",class:"grey lighten-1 text-xs-right",value:"valorTotal"},{sortable:!1,text:"Entrada",class:"grey lighten-1 text-xs-right",value:"valorEntrada"},{sortable:!1,text:"Parcelas",class:"grey lighten-1 text-xs-center",value:"qtdParcela"},{sortable:!1,text:"Loja",class:"grey lighten-1 text-xs-left",value:"nomeLoja"},{sortable:!1,text:"Carnê",class:"grey lighten-1 text-xs-left",value:""}],carnes:[],totalCarnes:null,loading:!1,loadingBtn:!1,statusCarne:[],headersParcela:[{sortable:!1,align:"center",class:"grey lighten-1"},{sortable:!1,text:"Parcela",value:"numero",class:"grey lighten-1 text-xs-center"},{sortable:!1,text:"Vencto",value:"dataVencimento",class:"grey lighten-1 text-xs-center"},{sortable:!1,text:"Valor Parcela",value:"valor",class:"grey lighten-1 text-xs-right"},{sortable:!1,text:"Multa",value:"valorMulta",class:"grey lighten-1 text-xs-right"},{sortable:!1,text:"Juros Mora",value:"valorJurosMora",class:"grey lighten-1 text-xs-right"},{sortable:!1,text:"Qtd. Dias em Atraso",value:"qtdDiasAtraso",class:"grey lighten-1 text-xs-center"}]}},computed:{totalRenegociar:function(){return 0===this.selected.length?0:this.selected.map(function(t){return t.saldoDevedorCarne}).reduce(function(t,e){return t+e})}},beforeMount:function(){this.carnes=this.dadosAcordo.carnes,this.toggleAll(),this.carnes.forEach(function(t){t.expanded=!0})},methods:{proximoPasso:function(){this.selected&&this.selected.length>0?(this.setData(this.selected,this.totalRenegociar),this.nextStep()):this.$root.showAlerta("Não possui dívida para renegociar")},toggleAll:function(){this.selected.length?this.selected=[]:this.selected=this.carnes.slice()},formatValorMonetario:function(t){return"R$ "+r["a"].formatValorMonetario(t)}}},i=o,n=a("2877"),c=Object(n["a"])(i,l,s,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=d606.0a5fe184.js.map