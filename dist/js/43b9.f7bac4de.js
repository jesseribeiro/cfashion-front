(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["43b9"],{"43b9":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"elevation-0"},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Cruzar dados do cliente")]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-btn",{attrs:{loading:t.loadingBtn,color:"primary"},on:{click:t.cruzarDados}},[t._v("\n      Cruzar Dados\n    ")])],1),a("v-card-text",[a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headers,items:t.dados,"hide-actions":""},scopedSlots:t._u([{key:"headers",fn:function(e){return[a("tr",t._l(e.headers,function(e){return a("th",{key:e.text,class:e.class,attrs:{align:e.align,width:e.width}},[t._v("\n            "+t._s(e.text)+"\n          ")])}),0)]}},{key:"items",fn:function(e){return[a("tr",[a("td",[a("v-icon",{on:{click:function(t){e.item.expanded=!e.item.expanded}}},[t._v("\n              "+t._s(e.item.expanded?"mdi-minus":"mdi-plus")+"\n            ")])],1),a("td",{staticStyle:{"font-weight":"500"}},[t._v(t._s(e.item.descricao))]),a("td",{staticClass:"text-xs-right",staticStyle:{"font-weight":"500"}},[t._v(t._s(e.item.quantidade))])]),e.item.expanded?a("tr",[a("td",{attrs:{colspan:"3"}},[a("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:t.headersItems,items:e.item.items,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){var s=e.item;return[a("tr",[a("td",{staticClass:"text-xs-left"},[t._v(t._s(s.redeNome))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(s.lojaNome))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(s.clienteNome))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(s.cpf))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(s.identidade))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(t._f("moment")(s.dataCadastro,"DD/M/YYYY")))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(s.saldoDevedor))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(s.status))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(s.diasAtraso))]),a("td",{staticClass:"text-xs-right"},[a("v-icon",{staticClass:"mr-2",on:{click:function(e){t.visualizarCliente(s)}}},[t._v("\n                      mdi-magnify\n                    ")])],1)])]}}])})],1)]):t._e()]}}])})],1)],1)},i=[],l=a("3a86"),n={props:{value:{type:Object,required:!0},expanded:{type:Boolean,required:!1,default:!0}},data:function(){return{panel:[this.expanded],loadingBtn:!1,dados:[],headers:[{sortable:!1,text:"",value:"",class:"grey lighten-1",align:"left",width:"2%"},{sortable:!1,text:"Informações Encontradas",value:"informacao",class:"grey lighten-1",align:"left",width:"100%"},{sortable:!1,text:"Quantidade",value:"quantidade",class:"grey lighten-1",align:"right"}],headersItems:[{sortable:!1,text:"Rede",value:"rede",class:"grey lighten-1",align:"left"},{sortable:!1,text:"Loja",value:"loja",class:"grey lighten-1",align:"left"},{sortable:!1,text:"Nome Cliente",value:"nome",class:"grey lighten-1",align:"left"},{sortable:!1,text:"CPF",value:"cpf",class:"grey lighten-1",align:"center"},{sortable:!1,text:"Identidade",value:"identidade",class:"grey lighten-1",align:"left"},{sortable:!1,text:"Cliente Desde",value:"dataCadastro",class:"grey lighten-1",align:"center"},{sortable:!1,text:"Saldo Devedor",value:"saldo",class:"grey lighten-1",align:"right"},{sortable:!1,text:"Situação Contrato",value:"status",class:"grey lighten-1",align:"left"},{sortable:!1,text:"Atraso",value:"diasAtraso",class:"grey lighten-1",align:"right"},{sortable:!1,text:"",value:"",class:"grey lighten-1",align:"right"}]}},watch:{value:function(){this.$emit("input",this.value)}},beforeMount:function(){},methods:{cruzarDados:function(){var t=this;this.loadingBtn=!0,l["h"].cruzarDadosCliente(this.value.id,this.value.lojaId).then(function(e){t.dados=e.data,t.loadingBtn=!1,t.dados&&0===t.dados.length&&t.$root.showAlerta(t.$vuetify.t("$vuetify.Alerta.semResultado"))}).catch(function(e){t.loadingBtn=!1,t.$root.showErro(e.data)})},visualizarCliente:function(t){this.$router.push("/cad-cliente/".concat(t.clienteId,"/").concat(t.lojaId)),window.location.reload()}}},r=n,o=a("2877"),d=Object(o["a"])(r,s,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=43b9.f7bac4de.js.map