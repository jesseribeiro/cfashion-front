(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6564"],{d4ec:function(t,e,a){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}a.d(e,"a",function(){return n})},fb95:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("core-progress-modal",{attrs:{show:t.loading}}),t.loading?t._e():a("v-tabs",{attrs:{centered:"",color:"primary",dark:"","icons-and-text":""}},[a("v-tabs-slider",{attrs:{color:"white"}}),a("v-tab",{attrs:{href:"#dados-cliente"}},[t._v("\n      Dados Cliente\n      "),a("v-icon",[t._v("mdi-card-account-details")])],1),a("v-tab",{attrs:{href:"#proposta-adesao"}},[t._v("\n      Proposta de Adesão\n      "),a("v-icon",[t._v("mdi-text-box-search")])],1),a("v-tab",{attrs:{href:"#doc-digitalizados"}},[t._v("\n      Doc. Digitalizados\n      "),a("v-icon",[t._v("mdi-file-document")])],1),a("v-tab",{attrs:{href:"#carnes"}},[t._v("\n      Carnês\n      "),a("v-icon",[t._v("mdi-animation")])],1),a("v-tab",{attrs:{href:"#pagamentos"}},[t._v("\n      Pagamentos\n      "),a("v-icon",[t._v("mdi-cash-multiple")])],1),t.$root.isRolesPratico()?a("v-tab",{attrs:{href:"#spc"}},[t._v("\n      SPC\n      "),a("v-icon",[t._v("mdi-account-off-outline")])],1):t._e(),t.$root.isRolesPratico()?a("v-tab",{attrs:{href:"#renegociar"}},[t._v("\n      Renegociar Dívida\n      "),a("v-icon",[t._v("mdi-handshake")])],1):t._e(),a("v-tab-item",{attrs:{value:"dados-cliente",lazy:""}},[a("cliente-dados",{attrs:{value:t.form,"next-step":t.salvar,"go-back":t.cancelar,"set-data":t.setData,editando:!0}})],1),a("v-tab-item",{attrs:{value:"proposta-adesao",lazy:""}},[a("cliente-contrato",{attrs:{value:t.form,editando:!0}})],1),a("v-tab-item",{attrs:{value:"doc-digitalizados",lazy:""}},[a("cliente-digitalizar-docs",{attrs:{value:t.form,"next-step":t.salvar,"go-back":t.cancelar,editando:!0}})],1),a("v-tab-item",{attrs:{value:"carnes",lazy:""}},[a("cliente-carnes",{attrs:{value:t.form}})],1),a("v-tab-item",{attrs:{value:"pagamentos",lazy:""}},[a("cliente-pagamentos",{attrs:{value:t.form}})],1),t.$root.isRolesPratico()?a("v-tab-item",{attrs:{value:"spc",lazy:""}},[a("cliente-SPC",{attrs:{value:t.form}})],1):t._e(),t.$root.isRolesPratico()?a("v-tab-item",{attrs:{value:"renegociar",lazy:""}},[a("cliente-renegociar",{attrs:{value:t.form}})],1):t._e()],1)],1)},o=[],l=a("fd17"),i=a("3a86"),r=function(){return a.e("9916").then(a.bind(null,"9916"))},s=function(){return Promise.all([a.e("2e20"),a.e("65e0")]).then(a.bind(null,"2e20"))},u=function(){return Promise.all([a.e("e73b"),a.e("65e0")]).then(a.bind(null,"e73b"))},c=function(){return a.e("b7d4").then(a.bind(null,"b7d4"))},d=function(){return a.e("78ae").then(a.bind(null,"78ae"))},m=function(){return a.e("c6e4").then(a.bind(null,"c6e4"))},f=function(){return a.e("4321").then(a.bind(null,"4321"))},h=function(){return a.e("1029").then(a.bind(null,"1029"))},v=function(){return a.e("3970").then(a.bind(null,"3970"))},b=function(){return a.e("4b8e").then(a.bind(null,"4b8e"))},p={components:{ClienteSPC:r,ClienteRenegociar:s,ClienteDados:u,ClienteConsultaCPF:c,ClienteContrato:d,ClienteDigitalizarDocs:m,ClienteVender:f,ClienteImprimirCarne:h,ClienteCarnes:v,ClientePagamentos:b},data:function(){return{form:{id:null,redeId:null,empresaId:null,lojaId:null,nome:null,cpf:null,identidade:null,orgaoEmissor:null,dataEmissao:null,uf:null,grupo:null,dataNascimento:null,naturalEstado:null,naturalCidade:null,sexo:null,estadoCivil:null,dependentes:null,nomePai:null,nomeMae:null,telResidencial:null,celular:null,email:null,escolaridade:null,rendaPrincipal:null,endereco:new l["a"],tipoResidencia:null,tempoResidenciaAnos:null,tempoResidenciaMeses:null,empresa:null,cargo:null,tempoEmpregoAnos:null,tempoEmpregoMeses:null,telComercial:null,ramal:null,nomeRef1:null,relacaoRef1:null,telRef1:null,nomeRef2:null,relacaoRef2:null,telRef2:null,nomeRef3:null,relacaoRef3:null,telRef3:null,nomeRef4:null,relacaoRef4:null,telRef4:null,vendaId:null,observacoes:[],ultimoHistoricoSPC:null},loading:!0}},beforeMount:function(){this.reload(this.$route.params.id,this.$route.params.lojaId)},methods:{reload:function(t,e){var a=this;this.form.id=t,this.form.lojaId=e,this.form.id&&i["h"].getById(this.form.id).then(function(t){a.form=t.data,a.form.lojaId=a.$route.params.lojaId,a.formatDatas()}).finally(function(){"BLOQUEADO"===a.form.status?i["B"].findUltimoHistoricoClienteSPC(a.form.id).then(function(t){a.form.ultimoHistoricoSPC=t.data}).finally(function(){a.loading=!1}):a.loading=!1})},salvar:function(){this.$root.showSucesso("Dados atualizados com sucesso")},setData:function(t){var e=this.form.lojaId;this.form=t,e&&(this.form.lojaId=e),this.formatDatas()},formatDatas:function(){var t=this;this.form.dataEmissao&&(this.form.dataEmissao=this.$moment(this.form.dataEmissao).format("YYYY-MM-DD")),this.form.dataNascimento&&(this.form.dataNascimento=this.$moment(this.form.dataNascimento).format("YYYY-MM-DD")),this.form.observacoes&&(this.form.observacoes=this.form.observacoes.map(function(e){return e.dataCadastro=t.$moment(e.dataCadastro).format("YYYY-MM-DD"),e}))},cancelar:function(){this.$router.push("/lista-cliente")}}},g=p,C=a("2877"),R=Object(C["a"])(g,n,o,!1,null,null,null);e["default"]=R.exports},fd17:function(t,e,a){"use strict";a.d(e,"a",function(){return r});var n=a("d4ec");function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function l(t,e,a){return e&&o(t.prototype,e),a&&o(t,a),t}var i=a("ade3"),r=function(){function t(){Object(n["a"])(this,t),Object(i["a"])(this,"cep",void 0),Object(i["a"])(this,"logradouro",void 0),Object(i["a"])(this,"numero",void 0),Object(i["a"])(this,"complemento",void 0),Object(i["a"])(this,"bairro",void 0),Object(i["a"])(this,"cidade",void 0),Object(i["a"])(this,"estado",void 0),this.cep=null,this.logradouro=null,this.numero=null,this.complemento=null,this.bairro=null,this.cidade=null,this.estado=null}return l(t,[{key:"printEndereco",value:function(){return this.logradouro+","+this.numero+","+this.cidade+"/"+this.estado+" CEP: "+this.cep}}]),t}()}}]);
//# sourceMappingURL=chunk-6564.772925ea.js.map