(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["155f"],{"155f":function(e,s,o){"use strict";o.r(s);var t=function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",[o("core-progress-modal",{attrs:{show:e.loading}}),e.loading?e._e():o("v-tabs",{attrs:{color:"primary",dark:"","icons-and-text":""}},[o("v-tabs-slider",{attrs:{color:"white"}}),o("v-tab",{attrs:{href:"#online"}},[e._v("\n      SPC Online\n      "),o("v-icon",[e._v("mdi-cloud-sync")])],1),o("v-tab",{attrs:{href:"#arquivo"}},[e._v("\n      Remessa Arquivo\n      "),o("v-icon",[e._v("mdi-file-account")])],1),o("v-tab-item",{attrs:{value:"online",lazy:""}},[o("spc-remessa-online",{attrs:{redes:e.redes,"clientes-em-acordo":e.clientesEmAcordo,"servico-spc-list":e.servicoSPCList,"remessa-id":e.remessaId}})],1),o("v-tab-item",{attrs:{value:"arquivo",lazy:""}},[o("spc-remessa-arquivo",{attrs:{redes:e.redes,"clientes-em-acordo":e.clientesEmAcordo,"servico-spc-list":e.servicoSPCList}})],1)],1)],1)},r=[],i=o("3a86"),n=o("5a50"),a=function(){return o.e("5148").then(o.bind(null,"5148"))},c=function(){return o.e("3bc8").then(o.bind(null,"3bc8"))},d={metaInfo:{titleTemplate:"%s - SPC"},components:{SpcRemessaArquivo:a,SpcRemessaOnline:c},data:function(){return{clientesEmAcordo:[{id:n["k"],descricao:"Todos"},{id:1,descricao:"Apenas os em Acordo"},{id:2,descricao:"Exceto os em Acordo"}],servicoSPCList:[],redes:[],loading:!1,remessaId:"0"}},beforeMount:function(){var e=this;this.loading=!0,this.redes.push({id:n["k"],descricao:"Todas Redes"}),i["C"].getAllRedes().then(function(s){e.redes=e.redes.concat(s.data)}).finally(function(){i["C"].getAllServicoSPC().then(function(s){e.servicoSPCList=s.data}).catch(function(){e.$root.showErro("Não foi possível buscar as informações dos motores de créditos")}).finally(function(){e.loading=!1})}),this.$route.params.remessaId&&(this.remessaId=this.$route.params.remessaId)}},l=d,u=o("2877"),m=Object(u["a"])(l,t,r,!1,null,null,null);s["default"]=m.exports}}]);
//# sourceMappingURL=155f.6423cb42.js.map