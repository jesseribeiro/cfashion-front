(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["b855"],{b855:function(e,a,r){"use strict";r.r(a);var o=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("v-container",{attrs:{fluid:"","grid-list-md":""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{md12:""}},[r("material-card",{attrs:{color:"primary",title:"Cadastro de Usuário"}},[r("v-form",{attrs:{"lazy-validation":""},on:{submit:function(a){return a.preventDefault(),e.validateBeforeSubmit(a)}},model:{value:e.valid,callback:function(a){e.valid=a},expression:"valid"}},[r("v-card",{staticClass:"elevation-0"},[r("v-card-text",[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{md12:""}},[r("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:e.roles,"error-messages":e.errors.collect("role"),label:"Perfil de Acesso",name:"role","item-value":"id","item-text":"nome","data-vv-name":"Perfil de Acesso",multiple:"",chips:"",required:""},model:{value:e.form.roles,callback:function(a){e.$set(e.form,"roles",a)},expression:"form.roles"}})],1),r("v-flex",{attrs:{md6:""}},[r("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:e.requiredEmpresaLoja,expression:"requiredEmpresaLoja"}],attrs:{items:e.empresas,"error-messages":e.errors.collect("Empresa"),"data-vv-name":"Empresa",label:"Empresa",name:"empresa","item-value":"id","item-text":"nome",chips:""},on:{change:e.changeEmpresa},model:{value:e.form.empresaId,callback:function(a){e.$set(e.form,"empresaId",a)},expression:"form.empresaId"}})],1),r("v-flex",{attrs:{md6:""}},[r("v-autocomplete",{directives:[{name:"validate",rawName:"v-validate",value:e.requiredEmpresaLoja,expression:"requiredEmpresaLoja"}],attrs:{items:e.lojas,"error-messages":e.errors.collect("Loja"),"data-vv-name":"Loja",label:"Loja",name:"lojas","item-value":"id","item-text":"descricao",multiple:"",chips:""},model:{value:e.form.lojas,callback:function(a){e.$set(e.form,"lojas",a)},expression:"form.lojas"}})],1),r("v-flex",{attrs:{md6:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("Nome Usuário"),label:"Nome Usuário","data-vv-name":"Nome Usuário",required:""},model:{value:e.form.nome,callback:function(a){e.$set(e.form,"nome",a)},expression:"form.nome"}})],1),r("v-flex",{attrs:{md6:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{"error-messages":e.errors.collect("E-mail"),label:"Email",type:"email","data-vv-name":"E-mail",required:""},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}})],1),r("v-flex",{attrs:{md4:""}},[e.form.id?r("v-text-field",{attrs:{label:"Login",disabled:""},model:{value:e.form.login,callback:function(a){e.$set(e.form,"login",a)},expression:"form.login"}}):r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"lowercase",attrs:{"error-messages":e.errors.collect("Login"),label:"Login","data-vv-name":"Login",required:""},model:{value:e.form.login,callback:function(a){e.$set(e.form,"login",a)},expression:"form.login"}})],1),r("v-flex",{attrs:{md4:""}},[e.form.id?r("v-text-field",{attrs:{label:"Senha",type:"password",value:"fdsjflaçjsdflajdsflkjalkdjflasdjfdlskj",disabled:""}}):r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"senha",attrs:{"error-messages":e.errors.collect("Senha"),"append-icon":e.showPasswd?"mdi-eye":"mdi-eye-off",rules:[e.rulesPasswd.required,e.rulesPasswd.min],type:e.showPasswd?"text":"password",label:"Senha",name:"senha","data-vv-name":"Senha",hint:"Mínimo de 6 caracteres",counter:""},on:{"click:append":function(a){e.showPasswd=!e.showPasswd}},model:{value:e.form.senha,callback:function(a){e.$set(e.form,"senha",a)},expression:"form.senha"}})],1),r("v-flex",{attrs:{md4:""}},[e.form.id?r("v-text-field",{attrs:{label:"Confirmar Senha",type:"password",value:"fdsjflaçjsdflajdsflkjalkdjflasdjfdlskj",disabled:""}}):r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|confirmed:senha",expression:"'required|confirmed:senha'"}],attrs:{"error-messages":e.errors.collect("Confirmar Senha"),label:"Confirmar Senha",type:"password",name:"confirmaSenha","data-vv-name":"Confirmar Senha"},model:{value:e.form.confirmaSenha,callback:function(a){e.$set(e.form,"confirmaSenha",a)},expression:"form.confirmaSenha"}})],1),r("v-flex",{attrs:{md12:""}},[r("v-text-field",{attrs:{label:"Bloqueio de IPs",name:"bloqueioIp",hint:"Informe os endereços IPs que o usuário poderá acessar o sistema, separados por <span class='title'>;</span> (ponto e vígula) "},model:{value:e.form.bloqueioIp,callback:function(a){e.$set(e.form,"bloqueioIp",a)},expression:"form.bloqueioIp"}})],1),r("v-flex",{attrs:{md12:""}},[r("v-checkbox",{attrs:{label:"Ativo",color:"primary"},model:{value:e.form.ativo,callback:function(a){e.$set(e.form,"ativo",a)},expression:"form.ativo"}})],1)],1)],1),r("v-card-actions",[e.form.id?r("v-btn",{attrs:{color:"accent"},on:{click:e.openAlterarSenha}},[e._v("Alterar Senha")]):e._e(),r("v-spacer"),r("v-btn",{staticStyle:{color:"black !important"},attrs:{outline:""},on:{click:e.cancelar}},[e._v("Cancelar")]),r("v-btn",{attrs:{disabled:!e.valid,loading:e.loadingBtn,type:"submit",color:"primary"}},[e._v("Salvar")])],1)],1)],1)],1)],1)],1),e.dialogAlterarSenha?r("core-alterar-senha",{attrs:{"usuario-id":e.form.id,show:e.dialogAlterarSenha,close:e.closeAlterarSenha}}):e._e()],1)},t=[],l=r("3a86"),s=r("5a50"),i={metaInfo:{titleTemplate:"%s - Usuário"},data:function(){return{form:{id:null,nome:null,email:null,login:null,senha:"",confirmaSenha:"",roles:[],lojas:[],ativo:!0,empresaId:null,bloqueioIp:null},showPasswd:!1,valid:!0,roles:[],empresas:[],lojas:[],loadingBtn:!1,loadingAlterarSenha:!1,rulesPasswd:{required:function(e){return!!e||"Required."},min:function(e){return e.length>=6||"Mínimo de 6 caracteres"}},dialogAlterarSenha:!1}},computed:{requiredEmpresaLoja:function(){if(this.form.roles&&this.roles.length>0)for(var e=null,a=0;a<this.form.roles.length;a++)if(e=this.getRoleById(this.form.roles[a]),"CREDIARISTA"===e.nome||"PROPRIETARIO"===e.nome)return"required";return""}},beforeMount:function(){var e=this,a=this.$route.params.id;a&&l["D"].getById(a).then(function(a){e.form=a.data,s["a"]===e.$route.params.acao&&(e.form.id=null,e.form.login=null,e.form.senha=null,e.form.nome=null,e.form.email=null),e.carregarLojas(e.form.empresaId)}),l["z"].findAll().then(function(a){e.roles=a.data}),l["l"].findAll().then(function(a){e.empresas=a.data})},methods:{validateBeforeSubmit:function(){var e=this;this.$validator.validate().then(function(a){a?(e.loadingBtn=!0,l["D"].salvar(e.form).then(function(a){e.$root.showSucesso(a.data),e.$router.push("/lista-user")}).catch(function(a){e.$root.showErro(a.data)}).finally(function(){e.loadingBtn=!1})):e.$root.showAlerta(e.$vuetify.t("$vuetify.Erro.camposObrigatorios"))})},cancelar:function(){this.$router.back()},changeEmpresa:function(e){this.form.lojas=[],this.lojas=[],this.carregarLojas(e)},carregarLojas:function(e){var a=this;e&&(this.form.empresaId=e,l["C"].getAllLojas(e).then(function(e){a.lojas=e.data}))},getRoleById:function(e){return this.roles.filter(function(a){return a.id===e})[0]},openAlterarSenha:function(){this.dialogAlterarSenha=!0},closeAlterarSenha:function(){this.dialogAlterarSenha=!1}}},n=i,m=r("2877"),d=Object(m["a"])(n,o,t,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=b855.9f1b6f4f.js.map