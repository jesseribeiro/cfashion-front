(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app~fd785af2"],{"16cf":function(t,n,e){"use strict";var o=e("bc3a"),a=e.n(o);n["a"]={login:function(t,n){return a.a.post("/v1/auth/login",{username:t,password:n})},getDadosUsuario:function(t){return a.a.get("/v1/auth/dadosusuario/".concat(t))}}},"3a86":function(t,n,e){"use strict";e.d(n,"h",function(){return o["a"]}),e.d(n,"i",function(){return i}),e.d(n,"l",function(){return c}),e.d(n,"o",function(){return u["a"]}),e.d(n,"p",function(){return s}),e.d(n,"t",function(){return l["a"]}),e.d(n,"z",function(){return p}),e.d(n,"D",function(){return g}),e.d(n,"C",function(){return d}),e.d(n,"a",function(){return v}),e.d(n,"m",function(){return f}),e.d(n,"g",function(){return m}),e.d(n,"v",function(){return h}),e.d(n,"c",function(){return A}),e.d(n,"E",function(){return y}),e.d(n,"s",function(){return C}),e.d(n,"n",function(){return R}),e.d(n,"y",function(){return N}),e.d(n,"w",function(){return B}),e.d(n,"q",function(){return S}),e.d(n,"e",function(){return x}),e.d(n,"B",function(){return w}),e.d(n,"r",function(){return j}),e.d(n,"d",function(){return z}),e.d(n,"k",function(){return T}),e.d(n,"x",function(){return E}),e.d(n,"f",function(){return L}),e.d(n,"u",function(){return O}),e.d(n,"j",function(){return I}),e.d(n,"A",function(){return D}),e.d(n,"b",function(){return U});var o=e("edc6"),a=e("bc3a"),r=e.n(a),i={inserirClienteLoja:function(t){return r.a.post("/v1/clienteloja/",t)}},c=(e("c5f6"),{salvar:function(t){return t.id?this.update(t):this.novo(t)},findAll:function(){return r.a.get("/v1/empresa")},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"nome",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/empresa/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},novo:function(t){return r.a.post("/v1/empresa/",t)},update:function(t){return r.a.post("/v1/empresa/".concat(t.id),t)},delete:function(t){return r.a.delete("/v1/empresa/".concat(t))},getById:function(t){return r.a.get("/v1/empresa/".concat(t))},uploadLogo:function(t,n){return r.a.post("/v1/empresa/".concat(Number(t),"/upload-logo"),n,{})},getRegrafinanceiraVigenteById:function(t){return r.a.get("/v1/empresa/regrafinanceira-vigente/".concat(t))}}),u=e("16cf"),s={salvar:function(t){return t.id?this.update(t):this.novo(t)},findAll:function(){return r.a.get("/v1/loja/")},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/loja/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},getLojasByEmpresaId:function(t){return r.a.get("/v1/loja/empresa/".concat(t))},novo:function(t){return r.a.post("/v1/loja/",t)},update:function(t){return r.a.post("/v1/loja/".concat(t.id),t)},delete:function(t){return r.a.delete("/v1/loja/".concat(t))},getById:function(t){return r.a.get("/v1/loja/".concat(t))},getDadosVenda:function(t,n){return r.a.get("/v1/loja/".concat(t,"/dadosvenda/").concat(n))},getPlanospagamento:function(t){return r.a.get("/v1/loja/".concat(t,"/planospagamento"))},uploadLogo:function(t,n){return r.a.post("/v1/loja/".concat(Number(t),"/upload-logo"),n,{})},getPeComissaoCompra:function(t){return r.a.get("/v1/loja/".concat(Number(t),"/comissao-compra"))}},l=e("a850"),p={salvar:function(t){return r.a.post("/v1/role/",t)},findAll:function(){return r.a.get("/v1/role/")},getById:function(t){return r.a.get("/v1/role/".concat(t))}},g={salvar:function(t){return t.id?this.update(t):this.novo(t)},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"nome",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/usuario/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},novo:function(t){return r.a.post("/v1/usuario",t)},update:function(t){return r.a.post("/v1/usuario/".concat(t.id),t)},delete:function(t,n){return r.a.delete("/v1/usuario/".concat(t),{params:n})},getById:function(t){return r.a.get("/v1/usuario/".concat(t))},updateRoleAtiva:function(t,n){return r.a.post("/v1/usuario/".concat(t,"/role-ativa"),{role:n})},alterarSenha:function(t,n){return r.a.post("/v1/usuario/".concat(t,"/alterar-senha"),{senha:n})},temAgendamentoCobrancaHoje:function(t){return r.a.get("/v1/usuario/".concat(t,"/tem-agendamento-cobranca-hoje"))},getAllAgendamentoCobrancaDia:function(t){return r.a.get("/v1/usuario/".concat(t,"/agendamento-cobranca"))}},d={listRepasse:function(){return r.a.get("/v1/tipos/repasse")},listRamoAtividade:function(){return r.a.get("/v1/tipos/ramoatividade")},listStatus:function(){return r.a.get("/v1/tipos/status-loja")},listPlanoPagamento:function(){return r.a.get("/v1/tipos/planopagamento")},listTiposContaBanco:function(){return r.a.get("/v1/tipos/tipos-conta-banco")},listBancos:function(){return r.a.get("/v1/tipos/bancos")},tiposLancamentoRepasse:function(){return r.a.get("/v1/tipos/tipos-lancamento-repasse")},listEmbocadora:function(){return r.a.get("/v1/tipos/embocadora")},getAllRedes:function(){return r.a.get("/v1/tipos/redes")},getAllEmpresasOfRede:function(t){return r.a.get("/v1/tipos/empresas/".concat(t))},getAllEmpresas:function(){return r.a.get("/v1/tipos/empresas")},getAllLojas:function(t){return r.a.get("/v1/tipos/lojas/".concat(t))},getAllStatusCarne:function(){return r.a.get("/v1/tipos/status-carne")},getAllStatusParcela:function(){return r.a.get("/v1/tipos/status-parcela")},getAllStatusVenda:function(){return r.a.get("/v1/tipos/status-venda")},getAllServicoSPC:function(){return r.a.get("/v1/tipos/servico-spc")},getAllTiposRelatorio:function(){return r.a.get("/v1/tipos/tipos-relatorio")},getAllSexo:function(){return r.a.get("/v1/tipos/sexo")},getAllEstadoCivil:function(){return r.a.get("/v1/tipos/estado-civil")},getAllEscolaridade:function(){return r.a.get("/v1/tipos/escolaridade")},getAllTipoResidencia:function(){return r.a.get("/v1/tipos/tipo-residencia")},getAllTipoReferenciaPessoal:function(){return r.a.get("/v1/tipos/tipo-referencia-pessoal")},getAllTiposOcorrencia:function(){return r.a.get("/v1/tipos/tipos-ocorrencia")},getAllSituacaoRps:function(){return r.a.get("/v1/tipos/situacao-rps")},getAllNaturezaOperacaoRps:function(){return r.a.get("/v1/tipos/natureza-operacao-rps")},getAllUsuarios:function(){return r.a.get("/v1/tipos/usuarios")},getAllEntitiesAuditaveis:function(){return r.a.get("/v1/tipos/entities-auditoria")},getAllOperacoesAuditaveis:function(){return r.a.get("/v1/tipos/operacoes-auditoria")}},v=(e("28a5"),{getById:function(t){return r.a.get("/v1/anexo/".concat(t))},downloadAnexo:function(t){r()({url:"/v1/anexo/".concat(t,"/download"),method:"GET",responseType:"blob"}).then(function(t){var n=window.URL.createObjectURL(new Blob([t.data])),e=document.createElement("a");e.href=n,e.setAttribute("download",t.headers["content-disposition"].split(";")[1].split("=")[1]),document.body.appendChild(e),e.click()})}}),f={findAll:function(){return r.a.get("/v1/estado")},getById:function(t){return r.a.get("/v1/estado/".concat(t))},getCidadesByUf:function(t){return r.a.get("/v1/cidade/uf/".concat(t))}},m=(e("a481"),{salvar:function(t){return r.a.post("/v1/cep",t)},consultaCep:function(t){var n=t.replace(/\D/g,"");if(""!==n){var e=/^[0-9]{8}$/;if(e.test(n))return r.a.get("/v1/cep/".concat(n))}return Promise.reject(new Error("CEP inválido"))}}),b=(e("96cf"),e("1da1")),h={salvar:function(){var t=Object(b["a"])(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.a.post("/v1/regrafinanceira",n);case 2:case"end":return t.stop()}},t)}));function n(n){return t.apply(this,arguments)}return n}(),findAll:function(){return r.a.get("/v1/regrafinanceira")},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/regrafinanceira/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},delete:function(t){return r.a.delete("/v1/regrafinanceira/".concat(t))},getById:function(t){return r.a.get("/v1/regrafinanceira/".concat(t))}},A={enviarAutorizacao:function(t){return r.a.post("/v1/codigo-autorizacao/gerar",t)},confirmarCodigo:function(t){return r.a.post("/v1/codigo-autorizacao/confirmar",t)}},y={calcular:function(t){return r.a.post("/v1/venda/calcular",t)},vender:function(t){return r.a.post("/v1/venda/vender",t)},cancelarVenda:function(t){return r.a.get("/v1/venda/cancelar-venda/".concat(t))},pagarParcela:function(t){return r.a.post("/v1/venda/pagar-carne",t)},pagarListaParcela:function(t){return r.a.post("/v1/venda/pagar-lista-carne",t)},cancelarPagamento:function(t){return r.a.post("/v1/venda/cancelar-pagamento",t)},getReciboPagamento:function(t){return r.a.get("/v1/venda/recibo-pagamento/".concat(t))},getReciboVenda:function(t){return r.a.get("/v1/venda/recibo-venda/".concat(t))},paginationAutorizacao:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dataCompra",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/venda/autorizacoes",{pageSize:t,pageNo:n,sortBy:e,filtros:o})}},C={salvar:function(t){return t.id?this.update(t):this.novo(t)},findAll:function(){return r.a.get("/v1/planopagamento")},pagination:function(t,n){var e=null==t.page?0:t.page-1,o=t.sortBy||"qtdParcelas";return r.a.post("/v1/planopagamento/pagination",{pageSize:t.rowsPerPage,pageNo:e,sortBy:o,direction:t.descending,filtros:n})},novo:function(t){return r.a.post("/v1/planopagamento",t)},update:function(t){return r.a.post("/v1/planopagamento/".concat(t.id),t)},delete:function(t){return r.a.delete("/v1/planopagamento/".concat(t))},getById:function(t){return r.a.get("/v1/planopagamento/".concat(t))}},R={salvar:function(t){return this.novo(t)},findAll:function(t){return r.a.get("/v1/lancamentoextra/loja/".concat(t))},novo:function(t){return r.a.post("/v1/lancamentoextra",t)},delete:function(t){return r.a.delete("/v1/lancamentoextra/".concat(t))},uploadDocumento:function(t,n){return r.a.post("/v1/lancamentoextra/".concat(Number(t),"/upload-documento"),n,{})},downloadAnexo:function(t){r()({url:"/v1/lancamentoextra/".concat(t,"/anexo"),method:"GET",responseType:"blob"}).then(function(t){var n=window.URL.createObjectURL(new Blob([t.data])),e=document.createElement("a");e.href=n,e.setAttribute("download",t.headers["content-disposition"].split(";")[1].split("=")[1]),document.body.appendChild(e),e.click()})}},N={processarIndividual:function(t){return r.a.post("/v1/repasse/processar-individual",t)},calculaRepasseIndividual:function(t){return r.a.post("/v1/repasse/calcula-repasse-individual",t)},processarGeral:function(t){return r.a.post("/v1/repasse/processar-geral",t)},calculaRepasseGeral:function(t){return r.a.post("/v1/repasse/calcula-repasse-geral",t)},calculaReembolsoRepasse:function(t){return r.a.post("/v1/repasse/calcula-reembolso-repasse",t)},uploadDocumento:function(t,n){return r.a.post("/v1/repasse/".concat(Number(t),"/upload-documento"),n,{})},downloadAnexo:function(t){r()({url:"/v1/repasse/".concat(t,"/anexo"),method:"GET",responseType:"blob"}).then(function(t){var n=window.URL.createObjectURL(new Blob([t.data])),e=document.createElement("a");e.href=n,e.setAttribute("download",t.headers["content-disposition"].split(";")[1].split("=")[1]),document.body.appendChild(e),e.click()})},gerarArquivoTEDs:function(t){return r()({url:"/v1/repasse/gerar-arquivo-teds",method:"POST",data:t})}},B={geraRelatorioLanctoExtra:function(t){return r()({url:"/v1/relatorio/lancamento-extra",method:"POST",responseType:"blob",data:t})},geraRelatorioCliente:function(t){return r()({url:"/v1/relatorio/relatorio-cliente",method:"POST",responseType:"blob",data:t})},geraMovimentoCompras:function(t){return r()({url:"/v1/relatorio/mov-compras",method:"POST",responseType:"blob",data:t})},geraPagamentoClientes:function(t){return r()({url:"/v1/relatorio/pag-clientes",method:"POST",responseType:"blob",data:t})},geraRelatorioPrevisaoPagamento:function(t){return r()({url:"/v1/relatorio/previsao-pagamento",method:"POST",responseType:"blob",data:t})},geraRelatorioPagamentoEfetuado:function(t){return r()({url:"/v1/relatorio/pagamento-efetuado",method:"POST",responseType:"blob",data:t})}},P="/v1/notificacao",S={getById:function(t){return r.a.get("".concat(P,"/").concat(t))},marcarComoVisualizado:function(t){return r.a.post("".concat(P,"/visualizado/").concat(t))},paginationLoja:function(t){return r.a.post("".concat(P,"/pagination-loja"),{pageSize:10,pageNo:0,sortBy:"notificacao.dataCadastro",filtros:t})},paginationCliente:function(t){return r.a.post("".concat(P,"/pagination-cliente"),{pageSize:10,pageNo:0,sortBy:"notificacao.dataCadastro",filtros:t})},paginationPratico:function(t){return r.a.post("".concat(P,"/pagination-pratico"),{pageSize:10,pageNo:0,sortBy:"notificacao.dataCadastro",filtros:t})}},x={uploadArquivoRetorno:function(t,n){return r.a.post("/v1/retornobanco/upload-arquivo-retorno/".concat(t),n,{})},getUltimoArquivoRetorno:function(t){return r.a.get("/v1/retornobanco/ultimo-retorno/".concat(t))}},w={novaRemesa:function(t){return r.a.post("/v1/spc/nova-remessa",t)},gerarRemesa:function(t,n){return r.a.post("/v1/spc/gerar-remessa/".concat(n),t)},gerarRemesaOnline:function(t,n){return r.a.post("/v1/spc/incluir-excluir-list/".concat(n),t)},getResultadoRemessa:function(t){return r.a.get("/v1/spc/resultado-remessa/".concat(t))},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dataCadastro",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/spc/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},incluirOrExcluir:function(t){return r.a.post("/v1/spc/incluir-excluir",t)},novaConsultaSPC:function(t,n){return r.a.get("/v1/spc/nova-consulta-spc/".concat(t,"/").concat(n))},getDetalheConsultaSPC:function(t){return r.a.get("/v1/spc/consulta-spc/".concat(t))},findAllConsultaSPC:function(t){return r.a.get("/v1/spc/findall-consulta-spc/".concat(t))},findUltimoHistoricoClienteSPC:function(t){return r.a.get("/v1/spc/ultimo-historico-clientespc/".concat(t))}},j={pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dataPagto",o=arguments.length>3?arguments[3]:void 0;return n=null==n?0:n,r.a.post("/v1/pagamento/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},getById:function(t){return r.a.get("/v1/pagamento/".concat(t))}},z={findAll:function(){return r.a.get("/v1/beneficiario/")},findAllBanco:function(){return r.a.get("/v1/beneficiario/banco")},getById:function(t){return r.a.get("/v1/beneficiario/".concat(t))},salvar:function(t){return r.a.post("/v1/beneficiario/",t)},delete:function(t){return r.a.delete("/v1/beneficiario/".concat(t))}},T={getConfiguracaoGeral:function(){return r.a.get("/v1/configuracaogeral")},salvar:function(t){return r.a.post("/v1/configuracaogeral/",t)}},E={findAllRenegociacao:function(t,n){return r.a.get("/v1/renegociacao/".concat(t,"/").concat(n))},findCarnesParaAcordo:function(t,n){return r.a.get("/v1/renegociacao/carnes/".concat(t,"/").concat(n))},efetuaRenegociacao:function(t,n,e){return r.a.post("/v1/renegociacao/renegociar/".concat(t,"/").concat(n),e)},cancelarRenegociacao:function(t){return r.a.post("/v1/renegociacao/cancelar",t)}},L={geraCarnePDF:function(t){return r()({url:"/v1/carne/gera-carne-pdf/".concat(t),method:"GET",responseType:"blob"})}},O={calculaReembolsoRepasse:function(t){return r.a.post("/v1/reembolso/calcula-reembolso-repasse",t)},consultarBoletosReembolso:function(t){return r.a.post("/v1/reembolso/boletos",t)},efetuarReembolso:function(t){return r.a.post("/v1/reembolso/efetuar-reembolso-repasse",t)}},I={iniciarCobranca:function(t){return r.a.post("/v1/cobranca/iniciar-cobranca",t)},pagination:function(t,n){var e=null==t.page?0:t.page-1,o=t.sortBy;return r.a.post("/v1/cobranca/ocorrencias-pagination",{pageSize:t.rowsPerPage,pageNo:e,sortBy:o,direction:t.descending,filtros:n})},salvarOcorrencia:function(t){return r.a.post("/v1/cobranca/ocorrencia",t)},getDadosCobrancaCliente:function(t,n){return r.a.get("/v1/cobranca/dados-cobranca/".concat(t,"/").concat(n))},salvarConfigMailing:function(t){return r.a.post("/v1/cobranca/config-mailing",t)},getConfigMailing:function(t){return r.a.get("/v1/cobranca/config-mailing/usuario/".concat(t))},geraRelatorioMailing:function(t){return r()({url:"/v1/cobranca/mailing",method:"POST",responseType:"blob",data:t})}},D={gerarRPS:function(t){return r.a.post("/v1/rps",t,{headers:{"Content-Type":"multipart/form-data"}})},paginationLote:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dhEnvio",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/rps/pagination-lote",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},getLoteRps:function(t){return r.a.get("/v1/rps/".concat(t))},proximoNumeroRps:function(){return r.a.get("/v1/rps/proximo-numero-rps")}},U={paginationAuditoria:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=arguments.length>3?arguments[3]:void 0;return r.a.post("/v1/audit/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})}}},a850:function(t,n,e){"use strict";var o=e("bc3a"),a=e.n(o);n["a"]={salvar:function(t){return t.id?this.update(t):this.novo(t)},findAll:function(){return a.a.get("/v1/rede")},pagination:function(t,n){var e=null==t.page?0:t.page-1,o=t.sortBy||"nome";return a.a.post("/v1/rede/pagination",{pageSize:t.rowsPerPage,pageNo:e,sortBy:o,direction:t.descending,filtros:n})},novo:function(t){return a.a.post("/v1/rede",t)},update:function(t){return a.a.post("/v1/rede/".concat(t.id),t)},delete:function(t){return a.a.delete("/v1/rede/".concat(t))},getById:function(t){return a.a.get("/v1/rede/".concat(t))},getRegrafinanceiraVigenteById:function(t){return a.a.get("/v1/rede/regrafinanceira-vigente/".concat(t))}}},edc6:function(t,n,e){"use strict";e("c5f6");var o=e("bc3a"),a=e.n(o);n["a"]={salvar:function(t){return t.id?this.update(t):this.novo(t)},findAll:function(){return a.a.get("/v1/cliente/")},pagination:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"nome",o=arguments.length>3?arguments[3]:void 0;return a.a.post("/v1/cliente/pagination",{pageSize:t,pageNo:n,sortBy:e,filtros:o})},carnesCliente:function(t,n){return a.a.post("/v1/cliente/".concat(t,"/carnes"),n)},pagamentosCliente:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dataPagto",o=arguments.length>3?arguments[3]:void 0,r=arguments.length>4?arguments[4]:void 0;return a.a.post("/v1/cliente/".concat(o,"/pagamentos"),{pageSize:t,pageNo:n,sortBy:e,filtros:r})},parcelasCliente:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dataVencimento",o=arguments.length>3?arguments[3]:void 0,r=arguments.length>4?arguments[4]:void 0;return a.a.post("/v1/cliente/".concat(o,"/parcelas"),{pageSize:t,pageNo:n,sortBy:e,filtros:r})},novo:function(t){return a.a.post("/v1/cliente/",t)},update:function(t){return a.a.post("/v1/cliente/".concat(t.id),t)},delete:function(t){return a.a.delete("/v1/cliente/".concat(t))},getById:function(t){return a.a.get("/v1/cliente/".concat(t))},consultaSPC:function(t){return a.a.post("/v1/cliente/consulta-spc",t)},geraPropostaAdesao:function(t,n){return a.a.get("/v1/cliente/gera-proposta-adesao/".concat(t,"/").concat(n))},uploadDocumento:function(t,n,e){return a.a.post("/v1/cliente/".concat(Number(t),"/upload-documento/").concat(n),e,{})},getAnexosOfCliente:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/anexos/").concat(n))},consultaScore:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/score/").concat(Number(n)))},deleteAnexo:function(t,n){return a.a.delete("/v1/cliente/".concat(Number(t),"/anexos/").concat(Number(n)))},getLimiteDisponivel:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/limite-disponivel/").concat(Number(n)))},getLimiteCompartilhadoDisponivel:function(t){return a.a.get("/v1/cliente/".concat(Number(t),"/limite-compartilhado-disponivel"))},getLimiteExclusivoDisponivel:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/limite-exclusivo-disponivel/").concat(Number(n)))},getLimiteExclusivoCliente:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/limite-exclusivo/").concat(Number(n)))},loadResumoCliente:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/resumo-cliente/").concat(Number(n)))},loadResumoClienteOutrasLojas:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/resumo-cliente-outras-lojas/").concat(Number(n)))},inserirObservacao:function(t,n){return a.a.post("/v1/cliente/".concat(Number(t),"/observacao"),n)},getAllObservacao:function(t){return a.a.get("/v1/cliente/".concat(Number(t),"/observacao"))},cruzarDadosCliente:function(t,n){return a.a.get("/v1/cliente/".concat(Number(t),"/cruzardados/").concat(Number(n)))},alterarLimite:function(t,n){return a.a.post("/v1/cliente/".concat(Number(t),"/altera-limite-cliente"),{novoLimite:n})},alterarStatus:function(t,n,e){return a.a.post("/v1/cliente/".concat(Number(t),"/altera-status-cliente/").concat(Number(n)),{novoStatus:e})}}}}]);
//# sourceMappingURL=app~fd785af2.73bfe1be.js.map