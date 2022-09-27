(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0710"],{5847:function(a,e,t){"use strict";t.r(e);var i=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("v-container",{attrs:{fluid:"","grid-list-md":""}},[t("core-progress-modal",{attrs:{show:a.loading}}),a.loading?a._e():t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{md12:""}},[t("v-form",{attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),a.validateBeforeSubmit(e)}},model:{value:a.valid,callback:function(e){a.valid=e},expression:"valid"}},[t("v-card",{staticClass:"elevation-0"},[t("v-card-title",[t("h3",{staticClass:"headline mb-0"},[a._v("Identificação")])]),t("v-card-text",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{md12:""}},[t("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:a.empresas,"error-messages":a.errors.collect("empresa"),disabled:null!=a.filtros.lojaId,label:"Empresa",name:"empresa","item-value":"id","item-text":"nome"},model:{value:a.form.empresaId,callback:function(e){a.$set(a.form,"empresaId",e)},expression:"form.empresaId"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("CNPJ"),"return-masked-value":!1,disabled:null!=a.filtros.lojaId,label:"CNPJ",type:"text","data-vv-name":"CNPJ",required:""},model:{value:a.form.cnpj,callback:function(e){a.$set(a.form,"cnpj","string"===typeof e?e.trim():e)},expression:"form.cnpj"}})],1),t("v-flex",{attrs:{md5:""}},[t("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("Razao Social"),label:"Razao Social","data-vv-name":"Razao Social",required:""},model:{value:a.form.razaoSocial,callback:function(e){a.$set(a.form,"razaoSocial",e)},expression:"form.razaoSocial"}})],1),t("v-flex",{attrs:{md5:""}},[t("v-text-field",{attrs:{label:"Nome Fantasia"},model:{value:a.form.nomeFantasia,callback:function(e){a.$set(a.form,"nomeFantasia",e)},expression:"form.nomeFantasia"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:["(##) #### - ####","(##) ##### - ####"],expression:"['(##) #### - ####', '(##) ##### - ####']"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":a.errors.collect("Telefone Comercial"),label:"Telefone Comercial",type:"text","data-vv-name":"Telefone Comercial"},model:{value:a.form.telComercial,callback:function(e){a.$set(a.form,"telComercial",e)},expression:"form.telComercial"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:["(##) ##### - ####"],expression:"['(##) ##### - ####']"}],attrs:{label:"Whatsapp",type:"text","prepend-icon":"mdi-whatsapp"},model:{value:a.form.whatsapp,callback:function(e){a.$set(a.form,"whatsapp",e)},expression:"form.whatsapp"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Pessoa Contato",type:"text"},model:{value:a.form.pessoaContato,callback:function(e){a.$set(a.form,"pessoaContato",e)},expression:"form.pessoaContato"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Site",type:"text"},model:{value:a.form.site,callback:function(e){a.$set(a.form,"site",e)},expression:"form.site"}})],1),t("v-flex",{attrs:{md3:""}},[t("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:a.ramosAtividade,"error-messages":a.errors.collect("ramoAtividade"),disabled:null!=a.filtros.lojaId,label:"Ramo Atividade",name:"ramoAtividade","item-text":"descricao","item-value":"id"},model:{value:a.form.ramoAtividadeId,callback:function(e){a.$set(a.form,"ramoAtividadeId",e)},expression:"form.ramoAtividadeId"}})],1),t("v-flex",{attrs:{md7:""}},[t("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"email",expression:"'email'"}],attrs:{"error-messages":a.errors.collect("E-mail"),label:"Email",type:"email","data-vv-name":"E-mail"},model:{value:a.form.email,callback:function(e){a.$set(a.form,"email",e)},expression:"form.email"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:a.listaStatus,"error-messages":a.errors.collect("status"),label:"Status",name:"status"},model:{value:a.form.status,callback:function(e){a.$set(a.form,"status",e)},expression:"form.status"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{attrs:{label:"Chave TEF",type:"text",readonly:"",hint:"A chave TEF é gerada automaticamente pelo sistema, não precisa preenchê-la."},model:{value:a.form.chaveTEF,callback:function(e){a.$set(a.form,"chaveTEF",e)},expression:"form.chaveTEF"}})],1),t("v-flex",{attrs:{md3:""}},[t("v-checkbox",{attrs:{label:"Emitir cartão loja"},model:{value:a.form.emitirCartaoLoja,callback:function(e){a.$set(a.form,"emitirCartaoLoja",e)},expression:"form.emitirCartaoLoja"}})],1),t("v-flex",{attrs:{md3:""}},[t("v-checkbox",{attrs:{label:"Enviar SMS de boas vindas"},model:{value:a.form.envioSMSBoasVindas,callback:function(e){a.$set(a.form,"envioSMSBoasVindas",e)},expression:"form.envioSMSBoasVindas"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-checkbox",{attrs:{label:"Permitir pagamento de fatura/recarga na loja"},model:{value:a.form.permitirPagamentoLoja,callback:function(e){a.$set(a.form,"permitirPagamentoLoja",e)},expression:"form.permitirPagamentoLoja"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-checkbox",{attrs:{label:"Permitir autorização de compra no APP"},model:{value:a.form.permitirAutorizacaoCompra,callback:function(e){a.$set(a.form,"permitirAutorizacaoCompra",e)},expression:"form.permitirAutorizacaoCompra"}})],1),t("v-flex",{attrs:{md3:""}},[t("v-checkbox",{attrs:{label:"Possui limite exclusivo"},model:{value:a.form.possuiLimiteExclusivo,callback:function(e){a.$set(a.form,"possuiLimiteExclusivo",e)},expression:"form.possuiLimiteExclusivo"}})],1),t("v-flex",{attrs:{md12:""}},[t("v-textarea",{attrs:{name:"observacao",label:"Observações",hint:"Observações"},model:{value:a.form.observacoes,callback:function(e){a.$set(a.form,"observacoes",e)},expression:"form.observacoes"}})],1),t("v-flex",{attrs:{md12:""}},[t("v-layout",{attrs:{column:""}},[t("span",{staticClass:"body-2"},[a._v("Logo da Loja")]),t("v-image-input",{staticClass:"arrow-pagintion",attrs:{"image-quality":.85,"image-height":400,"image-width":600,"image-min-scaling":"contain",clearable:"","image-format":"jpeg"},model:{value:a.logo,callback:function(e){a.logo=e},expression:"logo"}})],1)],1)],1)],1)],1),t("br"),t("core-endereco",{attrs:{disabled:a.disabled},model:{value:a.form.endereco,callback:function(e){a.$set(a.form,"endereco",e)},expression:"form.endereco"}}),t("br"),t("v-card",{staticClass:"elevation-0"},[t("v-card-title",[t("h3",{staticClass:"headline mb-0"},[a._v("Terminais POS/TEF")])]),t("v-card-text",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{md2:""}},[t("v-text-field",{attrs:{label:"Terminal 1"},model:{value:a.form.terminal.terminal1,callback:function(e){a.$set(a.form.terminal,"terminal1",e)},expression:"form.terminal.terminal1"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Número de Série"},model:{value:a.form.terminal.serial1,callback:function(e){a.$set(a.form.terminal,"serial1",e)},expression:"form.terminal.serial1"}})],1),t("v-flex",{attrs:{md6:""}},[t("v-text-field",{attrs:{label:"Observação"},model:{value:a.form.terminal.observacao1,callback:function(e){a.$set(a.form.terminal,"observacao1",e)},expression:"form.terminal.observacao1"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{attrs:{label:"Terminal 2"},model:{value:a.form.terminal.terminal2,callback:function(e){a.$set(a.form.terminal,"terminal2",e)},expression:"form.terminal.terminal2"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Número de Série"},model:{value:a.form.terminal.serial2,callback:function(e){a.$set(a.form.terminal,"serial2",e)},expression:"form.terminal.serial2"}})],1),t("v-flex",{attrs:{md6:""}},[t("v-text-field",{attrs:{label:"Observação"},model:{value:a.form.terminal.observacao2,callback:function(e){a.$set(a.form.terminal,"observacao2",e)},expression:"form.terminal.observacao2"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{attrs:{label:"Terminal 3"},model:{value:a.form.terminal.terminal3,callback:function(e){a.$set(a.form.terminal,"terminal3",e)},expression:"form.terminal.terminal3"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Número de Série"},model:{value:a.form.terminal.serial3,callback:function(e){a.$set(a.form.terminal,"serial3",e)},expression:"form.terminal.serial3"}})],1),t("v-flex",{attrs:{md6:""}},[t("v-text-field",{attrs:{label:"Observação"},model:{value:a.form.terminal.observacao3,callback:function(e){a.$set(a.form.terminal,"observacao3",e)},expression:"form.terminal.observacao3"}})],1),t("v-flex",{attrs:{md2:""}},[t("v-text-field",{attrs:{label:"Terminal 4"},model:{value:a.form.terminal.terminal4,callback:function(e){a.$set(a.form.terminal,"terminal4",e)},expression:"form.terminal.terminal4"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{attrs:{label:"Número de Série"},model:{value:a.form.terminal.serial4,callback:function(e){a.$set(a.form.terminal,"serial4",e)},expression:"form.terminal.serial4"}})],1),t("v-flex",{attrs:{md6:""}},[t("v-text-field",{attrs:{label:"Observação"},model:{value:a.form.terminal.observacao4,callback:function(e){a.$set(a.form.terminal,"observacao4",e)},expression:"form.terminal.observacao4"}})],1)],1)],1)],1),t("v-card",{staticClass:"elevation-0"},[t("v-card-title",[t("h3",{staticClass:"headline mb-0"},[a._v("Campanhas")])]),t("v-card-text",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{md12:""}},[t("v-checkbox",{attrs:{label:"Possui Campanha Ativa"},model:{value:a.form.campanhaAtiva,callback:function(e){a.$set(a.form,"campanhaAtiva",e)},expression:"form.campanhaAtiva"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{staticClass:"text-field-custom",attrs:{label:"Número de vendas",suffix:"dias",step:"1",min:"0",type:"number"},model:{value:a.form.campanhaQtdVendas,callback:function(e){a.$set(a.form,"campanhaQtdVendas",e)},expression:"form.campanhaQtdVendas"}})],1),t("v-flex",{attrs:{md4:""}},[t("v-text-field",{staticClass:"text-field-custom",attrs:{label:"Primeira parcela",suffix:"dias",step:"1",min:"0",type:"number"},model:{value:a.form.campanhaQtdDiasPrimeiraParcela,callback:function(e){a.$set(a.form,"campanhaQtdDiasPrimeiraParcela",e)},expression:"form.campanhaQtdDiasPrimeiraParcela"}})],1)],1)],1)],1),t("br"),t("v-alert",{attrs:{value:!0,type:"warning"}},[t("span",{staticClass:"subheading"},[a._v("As regras cadastradas na Loja substitui as regras da Empresa, caso não seja cadastrado regras aqui, será utilizado a da Empresa.")])]),t("br"),a.acao===a.acaoListar?[t("v-card",[t("v-toolbar",{attrs:{flat:"",color:"white"}},[t("v-toolbar-title",[a._v("Regras da Loja")]),t("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),t("v-spacer"),t("v-btn",{attrs:{small:"",fab:"",color:"primary"}},[t("v-icon",{on:{click:function(e){a.newRegra()}}},[a._v("mdi-plus")])],1)],1),t("v-progress-linear",{attrs:{active:a.loading,color:"light-blue",indeterminate:"",height:"3"}}),t("v-data-table",{staticClass:"elevation-1 arrow-pagintion",attrs:{headers:a.headers,items:a.regras,"total-items":a.totalItems,pagination:a.pagination},on:{"update:pagination":function(e){a.pagination=e}},scopedSlots:a._u([{key:"items",fn:function(e){var i=e.item;return[t("core-tr-item-regra",{attrs:{item:i,"visualizar-regra":a.visualizarRegra,"alterar-regra":a.editarRegra,reload:a.reload}})]}}])})],1),t("v-layout",{staticClass:"justify-end"},[[t("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:a.cancelar}},[a._v("Cancelar")]),t("v-btn",{attrs:{disabled:!a.valid,loading:a.loadingBtn,type:"submit",color:"primary"}},[a._v("Salvar")])]],2)]:[a.disabled?a._e():t("v-card",{staticClass:"elevation-0"},[t("v-card-text",[t("v-autocomplete",{attrs:{items:a.empresas,"item-value":"id","item-text":"nome",label:"Copiar dados da regra vigente de outra empresa"},on:{change:a.carregaDadosCopy},model:{value:a.copyId,callback:function(e){a.copyId=e},expression:"copyId"}})],1)],1),t("core-regra-financeira",{attrs:{disabled:a.disabled,salvar:a.validateBeforeSubmit,voltar:a.voltar,cancelar:a.cancelar,acao:a.acao,"primeira-regra":!1},model:{value:a.regra,callback:function(e){a.regra=e},expression:"regra"}})]],2)],1)],1)],1)},o=[],r=t("5530"),s=(t("ac6a"),t("5df3"),t("3a86")),l=t("89d9"),n=t("fd17"),c=t("5a50"),d=t("fa1c"),m={metaInfo:{titleTemplate:"%s - Loja"},data:function(){return{form:{id:null,empresaId:null,razaoSocial:null,nomeFantasia:null,cnpj:null,status:"ATIVO",telComercial:null,chaveTEF:null,pessoaContato:null,site:null,email:null,whatsapp:null,ramoAtividadeId:null,emitirCartaoLoja:!1,envioSMSBoasVindas:!1,permitirPagamentoLoja:!1,permitirAutorizacaoCompra:!1,observacoes:null,campanhaAtiva:null,campanhaQtdVendas:null,campanhaQtdDiasPrimeiraParcela:null,planoPagamentoId:null,logoId:null,terminal:{id:null,terminal1:null,serial1:null,observacao1:null,terminal2:null,serial2:null,observacao2:null,terminal3:null,serial3:null,observacao3:null,terminal4:null,serial4:null,observacao4:null},endereco:new n["a"]},copyId:null,regra:new l["a"],headers:[{class:"grey lighten-1",sortable:!1,text:"Vigente",align:"center"},{class:"grey lighten-1",sortable:!1,text:"Vigente Desde",value:"dtVigencia"},{class:"grey lighten-1",sortable:!1,text:"Multa atraso",align:"right",value:"peMultaPorAtraso"},{class:"grey lighten-1",sortable:!1,text:"Juros Mora atraso",align:"right",value:"peJurosMoraPorAtraso"},{class:"grey lighten-1",sortable:!1,text:"Tarifa Parcela Banco",align:"right",value:"vlTarifaParcelaBanco"},{class:"grey lighten-1",sortable:!1,text:"Tarifa Parcela Loja",align:"right",value:"vlTarifaParcelaLoja"},{class:"grey lighten-1",sortable:!1,text:"Cobrar Carnê em Loja",align:"right",value:"cobrarCarneLoja"},{class:"grey lighten-1",sortable:!1,text:"Incluída Por",value:"nomeUsuario"},{class:"grey lighten-1",sortable:!1,text:"",value:"",align:"center"}],pagination:{rowsPerPage:10,sortBy:"dataVigencia"},filtros:{lojaId:null},loading:!1,logo:null,regras:[],totalItems:0,valid:!1,redes:[],acao:c["c"],disabled:!1,acaoListar:c["c"],listaStatus:[],empresas:[],ramosAtividade:[],planosPagamento:[],loadingCidades:!1,loadingBtn:!1}},watch:{pagination:{handler:function(){this.paginar()}}},beforeMount:function(){this.reload()},methods:{validateBeforeSubmit:function(){var a=this;this.$validator.validate().then(function(e){e?a.salvarLoja():a.$root.showAlerta(a.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},salvarLoja:function(){var a=this;this.loadingBtn=!0;var e=this.form.id?"Atualização realizada com sucesso":"Cadastro realizado com sucesso";s["p"].salvar(this.form).then(function(t){a.form.id=t.data.id;var i=null,o=null;if(a.logo){var r=new FormData;r.append("file",a.logo),r.append("nome","loja-logo"),i=s["p"].uploadLogo(a.form.id,r)}a.regra&&!a.regra.id&&(a.regra.lojaId=a.form.id,o=s["v"].salvar(a.regra)),Promise.all([i,o]).then(function(){a.$root.showSucesso(e),a.$router.push("/lista-loja")}).catch(function(e){return a.$root.showErro(e.data)}).finally(function(){a.loadingBtn=!1})}).catch(function(e){a.loadingBtn=!1,a.$root.showErro(e.data)})},cancelar:function(){this.$router.push("/lista-loja")},voltar:function(){this.reset()},visualizarRegra:function(a){var e=this;this.disabled=!0,s["v"].getById(a.id).then(function(a){e.regra=a.data,e.regra.dataVigencia=e.$moment(a.data.dataVigencia).format("YYYY-MM-DD"),e.regra.dataVigenciaLancamento=e.$moment(a.data.dataVigenciaLancamento).format("YYYY-MM-DD"),e.acao=c["f"]}).catch(function(){return e.$root.showAlerta("Problemas para recuperar os dados da regra, tentar mais tarde")})},editarRegra:function(a){var e=this;s["v"].getById(a.id).then(function(a){e.regra=a.data,e.regra.dataVigencia=e.$moment(a.data.dataVigencia).format("YYYY-MM-DD"),a.data.dataVigenciaLancamento&&(e.regra.dataVigenciaLancamento=e.$moment(a.data.dataVigenciaLancamento).format("YYYY-MM-DD")),e.acao=c["b"]}).catch(function(){return e.$root.showAlerta("Problemas para recuperar os dados da regra, tentar mais tarde")})},newRegra:function(){this.acao=c["d"],this.regra=new l["a"]},paginar:function(){var a=this;this.filtros.lojaId&&s["v"].pagination(this.pagination.rowsPerPage,this.pagination.page-1,this.pagination.sortBy||"dataVigencia",this.filtros).then(function(e){a.regras=e.data.content,a.totalItems=e.data.totalElements}).catch(function(){return a.$root.showErro("Erro ao carregar as regras da rede")})},reset:function(){this.acao=c["c"],this.disabled=!1,this.regra=null},reload:function(){var a=this;this.reset(),this.filtros.lojaId=this.$route.params.id,this.filtros.lojaId&&(this.loading=!0,s["p"].getById(this.filtros.lojaId).then(function(e){a.form=e.data,a.form.endereco||(a.form.endereco=new n["a"]),a.form.logoId&&s["a"].getById(a.form.logoId).then(function(e){a.logo=e.data.strBase64}),a.paginar()}).catch(function(){return a.$root.showErro("Erro ao buscar informações da loja")}).finally(function(){a.loading=!1})),s["l"].findAll().then(function(e){return a.empresas=e.data}).catch(function(){return a.$root.showErro("Não foi possível buscar as informações das empresas")}),s["C"].listStatus().then(function(e){return a.listaStatus=e.data}).catch(function(){return a.$root.showErro("Não foi possível buscar as informações da lista de status")}),s["C"].listRamoAtividade().then(function(e){return a.ramosAtividade=e.data}).catch(function(){return a.$root.showErro("Não foi possível buscar as informações da lista de ramo atividade")}),s["C"].listPlanoPagamento().then(function(e){return a.planosPagamento=e.data}).catch(function(){return a.$root.showErro("Não foi possível buscar as informações dos planos de pagamentos")})},carregaDadosCopy:function(a){var e=this;this.loading=!0,s["l"].getRegrafinanceiraVigenteById(a).then(function(a){e.regra=Object(r["a"])({},a.data),e.regra.dataVigencia=d["a"].addDia(new Date,1),e.regra.dataVigenciaLancamento=null,e.regra.id=null,e.regra.isVigente=!1}).catch(function(a){e.$root.showAlerta("Problemas para copiar dados: "+a)}).finally(function(){e.loading=!1})}}},v=m,u=t("2877"),f=Object(u["a"])(v,i,o,!1,null,null,null);e["default"]=f.exports},"5df3":function(a,e,t){"use strict";var i=t("02f4")(!0);t("01f9")(String,"String",function(a){this._t=String(a),this._i=0},function(){var a,e=this._t,t=this._i;return t>=e.length?{value:void 0,done:!0}:(a=i(e,t),this._i+=a.length,{value:a,done:!1})})},"89d9":function(a,e,t){"use strict";t.d(e,"a",function(){return l});var i=t("d4ec"),o=t("ade3"),r=function a(){Object(i["a"])(this,a),Object(o["a"])(this,"id",void 0),Object(o["a"])(this,"faixaInicial1",void 0),Object(o["a"])(this,"faixaFinal1",void 0),Object(o["a"])(this,"peEntrada1",void 0),Object(o["a"])(this,"faixaInicial2",void 0),Object(o["a"])(this,"faixaFinal2",void 0),Object(o["a"])(this,"peEntrada2",void 0),Object(o["a"])(this,"faixaInicial3",void 0),Object(o["a"])(this,"faixaFinal3",void 0),Object(o["a"])(this,"peEntrada3",void 0),Object(o["a"])(this,"flgAnaliseVisual",void 0),Object(o["a"])(this,"grupo",void 0),this.flgAnaliseVisual=!1},s=t("fa1c"),l=function a(){Object(i["a"])(this,a),Object(o["a"])(this,"id",void 0),Object(o["a"])(this,"redeId",void 0),Object(o["a"])(this,"empresaId",void 0),Object(o["a"])(this,"lojaId",void 0),Object(o["a"])(this,"dataVigencia",void 0),Object(o["a"])(this,"usuarioId",void 0),Object(o["a"])(this,"nomeUsuario",void 0),Object(o["a"])(this,"listCobrarCarneId",[]),Object(o["a"])(this,"peMultaPorAtraso",void 0),Object(o["a"])(this,"peJurosMoraPorAtraso",void 0),Object(o["a"])(this,"limiteCreditoMesMinimo",void 0),Object(o["a"])(this,"limiteCreditoMesMaximo",void 0),Object(o["a"])(this,"excessoLimiteCredito",void 0),Object(o["a"])(this,"listPlanoPagamentoId",void 0),Object(o["a"])(this,"vlTarifaParcelaBanco",void 0),Object(o["a"])(this,"vlTarifaParcelaLoja",void 0),Object(o["a"])(this,"peOverLimite",10),Object(o["a"])(this,"peLimiteGlobal",void 0),Object(o["a"])(this,"registroFatura",void 0),Object(o["a"])(this,"peMaxDescontoAtrasoAcordo",void 0),Object(o["a"])(this,"peMaxDescontoAtualizacaoAcordo",void 0),Object(o["a"])(this,"parcelaAcordoEmAte",void 0),Object(o["a"])(this,"vlMinParcelaAcordo",void 0),Object(o["a"])(this,"qtdDiasVencimentoEntradaAcordo",void 0),Object(o["a"])(this,"qtdDiasAtrasoCancelaAutoAcordo",void 0),Object(o["a"])(this,"qtdDiasAtrasoMinAcordo",void 0),Object(o["a"])(this,"vlTarifaParaAcordo",void 0),Object(o["a"])(this,"taxaJurosParcelaAcordo",void 0),Object(o["a"])(this,"flgRealizarConsCadastral",void 0),Object(o["a"])(this,"tempoDeCadastro",void 0),Object(o["a"])(this,"qtdDiasValidSPCAutoriz1",void 0),Object(o["a"])(this,"qtdDiasMaiorAtrasoSPCAutoriz1",void 0),Object(o["a"])(this,"qtdDiasValidSPCAutoriz2",void 0),Object(o["a"])(this,"qtdDiasMaiorAtrasoSPCAutoriz2",void 0),Object(o["a"])(this,"peMultaAtraso",void 0),Object(o["a"])(this,"peJurosMoraAtraso",void 0),Object(o["a"])(this,"tarifaParcela",void 0),Object(o["a"])(this,"contaCobrancaCarneId",void 0),Object(o["a"])(this,"qtdMinPagCarneClienteAntigo",void 0),Object(o["a"])(this,"peEntradaCarneAntigos",void 0),Object(o["a"])(this,"qtDiasAtrasoEntradaCarneAntigos",void 0),Object(o["a"])(this,"peEntradaCarneNovos",void 0),Object(o["a"])(this,"flgObrigaEntradaNovos",void 0),Object(o["a"])(this,"qtdMinDiasCompraClienteAntigo",void 0),Object(o["a"])(this,"peMinPagPrimCompraEntradaCarne",void 0),Object(o["a"])(this,"qtdDiasMaxAtrasoClienteEspecial",void 0),Object(o["a"])(this,"flgProgRecompensa",void 0),Object(o["a"])(this,"qtdPontosMin",void 0),Object(o["a"])(this,"qtdPontosMax",void 0),Object(o["a"])(this,"qtdDiasValidade",void 0),Object(o["a"])(this,"qtdLimCruzaDados",void 0),Object(o["a"])(this,"flgUtilizarCruzamentoCadastroCompleto",void 0),Object(o["a"])(this,"flgLimitarCruzamentoPropriaRede",void 0),Object(o["a"])(this,"flgIncluirIndependenteCruzamento",void 0),Object(o["a"])(this,"flgNomeCliente",void 0),Object(o["a"])(this,"flgNomePai",void 0),Object(o["a"])(this,"flgTelResidencial",void 0),Object(o["a"])(this,"flgTelComercial",void 0),Object(o["a"])(this,"flgCelular",void 0),Object(o["a"])(this,"flgRg",void 0),Object(o["a"])(this,"flgNomeMae",void 0),Object(o["a"])(this,"flgEndereco",void 0),Object(o["a"])(this,"flgRefPessoais",void 0),Object(o["a"])(this,"flgTelComercialConjuge",void 0),Object(o["a"])(this,"tpRegra",void 0),Object(o["a"])(this,"rotinaAtualizaLimCred1",void 0),Object(o["a"])(this,"qtdFaturasPagas1",void 0),Object(o["a"])(this,"qtdDiasAtrasoMax1",void 0),Object(o["a"])(this,"peAumentoMes1",void 0),Object(o["a"])(this,"peAumentoAcm1",void 0),Object(o["a"])(this,"vlLimMesMaxAumento1",void 0),Object(o["a"])(this,"vlLimAcmMaxAumento1",void 0),Object(o["a"])(this,"qtdDiasSemCompraMin1",void 0),Object(o["a"])(this,"qtdDiasAtrasoContaMaxLimite1",void 0),Object(o["a"])(this,"qtdDiasAtrasoMax2",void 0),Object(o["a"])(this,"peMinPagFaturaAumentoLimite2",void 0),Object(o["a"])(this,"vlLimiteMinPeUtilizAumentoLimiteAuto2",void 0),Object(o["a"])(this,"peMinUtilizAumentoLimiteAuto2",void 0),Object(o["a"])(this,"vlAumentoLimiteAbaixoVlBaseAumentoLimiteAuto2",void 0),Object(o["a"])(this,"vlBaseLimCreditoAumentoLimiteAuto2",void 0),Object(o["a"])(this,"vlAumentoLimiteAcimaVlBaseAumentoLimiteAuto2",void 0),Object(o["a"])(this,"vlLimAcmMaxAumento2",void 0),Object(o["a"])(this,"diasPagtoLoja",void 0),Object(o["a"])(this,"diasPagtoBanco",void 0),Object(o["a"])(this,"diasCarenciaEncargos",void 0),Object(o["a"])(this,"qtdMaxDependentes",void 0),Object(o["a"])(this,"diasAtrasoBloqueioAutorizacao",void 0),Object(o["a"])(this,"vlAtrasoLimiteAutorizacao",void 0),Object(o["a"])(this,"flgEmiteCartaoBloqueado",void 0),Object(o["a"])(this,"flgLiberarComprasClientesSPC",void 0),Object(o["a"])(this,"flgLiberarComprasClientesSPCOutrasRedes",void 0),Object(o["a"])(this,"embocadoraId",1),Object(o["a"])(this,"msgPadraoSms",void 0),Object(o["a"])(this,"concessaoCreditoId",void 0),Object(o["a"])(this,"peMaxRenda",void 0),Object(o["a"])(this,"qtdPontosScore",void 0),Object(o["a"])(this,"permiteCadAbaixoScore",void 0),Object(o["a"])(this,"limiteCreditoGrupoA",new r),Object(o["a"])(this,"limiteCreditoGrupoB",new r),Object(o["a"])(this,"limiteCreditoGrupoC",new r),Object(o["a"])(this,"limiteCreditoGrupoD",new r),Object(o["a"])(this,"limiteCreditoGrupoE",new r),Object(o["a"])(this,"limiteCreditoGrupoF",new r),Object(o["a"])(this,"limiteCreditoGrupoZ",new r),Object(o["a"])(this,"tpLancamentoId",void 0),Object(o["a"])(this,"diaLancamento",void 0),Object(o["a"])(this,"vlLancamento",void 0),Object(o["a"])(this,"dataVigenciaLancamento",void 0),Object(o["a"])(this,"msgBoasVindas",void 0),Object(o["a"])(this,"msgAutorizaCompra",void 0),Object(o["a"])(this,"msgCompraEfetuada",void 0),Object(o["a"])(this,"msgAumentoCredito",void 0),Object(o["a"])(this,"tpPrazoRepasseCompra","N dias após 5, 15 e 25"),Object(o["a"])(this,"qtdDiasPrazoRepasseCompra",void 0),Object(o["a"])(this,"peComissaoCompra",void 0),Object(o["a"])(this,"peEncAtrasoRepasseCompra",void 0),Object(o["a"])(this,"peDescAdiantaRepasseCompra",void 0),Object(o["a"])(this,"flgRepasseParcelado",void 0),Object(o["a"])(this,"flgTarifaVariavel",void 0),Object(o["a"])(this,"flgNovaComissao",void 0),Object(o["a"])(this,"peComissaoCompra01",void 0),Object(o["a"])(this,"peComissaoCompra02",void 0),Object(o["a"])(this,"peComissaoCompra03",void 0),Object(o["a"])(this,"peComissaoCompra04",void 0),Object(o["a"])(this,"peComissaoCompra05",void 0),Object(o["a"])(this,"peComissaoCompra06",void 0),Object(o["a"])(this,"peComissaoCompra07",void 0),Object(o["a"])(this,"peComissaoCompra08",void 0),Object(o["a"])(this,"peComissaoCompra09",void 0),Object(o["a"])(this,"peComissaoCompra10",void 0),Object(o["a"])(this,"peComissaoCompra11",void 0),Object(o["a"])(this,"peComissaoCompra12",void 0),Object(o["a"])(this,"servicoSPC",void 0),this.dataVigencia=s["a"].addDia(new Date,1),this.servicoSPC="SPC"}},d4ec:function(a,e,t){"use strict";function i(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}t.d(e,"a",function(){return i})},fd17:function(a,e,t){"use strict";t.d(e,"a",function(){return l});var i=t("d4ec");function o(a,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,i.key,i)}}function r(a,e,t){return e&&o(a.prototype,e),t&&o(a,t),a}var s=t("ade3"),l=function(){function a(){Object(i["a"])(this,a),Object(s["a"])(this,"cep",void 0),Object(s["a"])(this,"logradouro",void 0),Object(s["a"])(this,"numero",void 0),Object(s["a"])(this,"complemento",void 0),Object(s["a"])(this,"bairro",void 0),Object(s["a"])(this,"cidade",void 0),Object(s["a"])(this,"estado",void 0),this.cep=null,this.logradouro=null,this.numero=null,this.complemento=null,this.bairro=null,this.cidade=null,this.estado=null}return r(a,[{key:"printEndereco",value:function(){return this.logradouro+","+this.numero+","+this.cidade+"/"+this.estado+" CEP: "+this.cep}}]),a}()}}]);
//# sourceMappingURL=chunk-0710.2766b73d.js.map