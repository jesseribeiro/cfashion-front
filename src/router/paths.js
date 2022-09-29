/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: '/',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/Home.vue'),
    name: 'Início'
  },
  {
    path: '/home',
    name: 'Início',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/Login.vue')
  },
  {
    path: '/lista-loja',
    name: 'Lojas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/lojas/Lojas.vue')
  },
  {
    path: '/cad-loja',
    name: 'Cadastro da Loja',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/lojas/Loja.vue')
  },
  {
    path: '/cad-loja/:id',
    name: 'Atualização da Loja',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/lojas/Loja.vue')
  },
  {
    path: '/lista-produto',
    name: 'Produtos',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/produtos/Produtos.vue')
  },
  {
    path: '/cad-produto',
    name: 'Cadastro do Produto',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/produtos/Produto.vue')
  },
  {
    path: '/cad-produto/:id',
    name: 'Atualização da Produto',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/produtos/Produto.vue')
  },
  {
    path: '/lista-cliente',
    name: 'Clientes',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/clientes/Clientes.vue')
  },
  {
    path: '/cad-cliente',
    name: 'Cadastro de Cliente',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/clientes/Cliente.vue')
  },
  {
    path: '/cad-cliente-etapa2',
    name: 'Cliente',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/clientes/Cliente.vue')
  },
  {
    path: '/cad-cliente/:id',
    name: 'Atualização de Cliente',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/clientes/ClienteEditar.vue')
  },
  {
    path: '/vender',
    name: 'Vender',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/vender/Vender.vue')
  },
  {
    path: '/parcelas',
    name: 'Parcelas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/parcelas/Parcelas.vue')
  },
  {
    path: '/vendas',
    name: 'Vendas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/vendas/Vendas.vue')
  },
  {
    path: '/relatorios',
    name: 'Relatórios',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/Relatorios')
  },
  {
    path: '/rel-gerenciais-resumo-faturamento',
    name: "Relatorio - Gerenciais - Resumo Faturamento",
    component: () => import(/* webpackNameChuck: "relatorios" */ "@/views/relatorios/gerenciais/ResumoFaturamento.vue")
  },
  {
    path: '/evolucao-carteira',
    name: "Evolução de carteira",
    component: () => import(/* webpackNameChuck: "relatorios" */ "@/views/relatorios/gerenciais/EvolucaoCarteira.vue")
  },
  {
    path: '/rel-gerenciais-resumo-inadimplencia',
    name: 'Relatório - Gerenciais - Resumo Inadimplencia',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/gerenciais/ResumoInadimplencia.vue')
  },
  {
    path: '/resumo-utilizacao',
    name: 'Relatório - Gerenciais - Resumo Utilização',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/gerenciais/ResumoUtilizacao.vue')
  },
  {
    path: '/resumo-auditoria',
    name: 'Relatório - Gerenciais - Resumo Auditoria',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/gerenciais/ResumoAuditoria.vue')
  },
  {
    path: '/resumo-gerencial',
    name: 'Relatório - Gerenciais - Resumo Gerencial',
    component: () => import(/* webpackNameChuck: "relatorios" */'@/views/relatorios/gerenciais/ResumoGerencial.vue')
  },
  {
    path: "/rel-gerencial-recebiveis-por-vencimento",
    name: "Relatório Gerencial - Recebiveis por vencimento",
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/gerenciais/recebiveisPorVencimento.vue')
  },
  {
    path: '/rel-repasse-lancamento-extra',
    name: 'Relatório - Repasse Lançamento Extra',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/RelRepasseLancamentoExtra.vue')
  },
  {
    path: '/rel-repasse-pagamento-efetuado',
    name: 'Relatório - Repasse Pagamento Efetuado',
    component: () => import(/* webpackNameChuck: "nrelatorios" */'../views/relatorios/RelRepassePagamentoEfetuado.vue')
  },
  {
    path: '/rel-clientes',
    name: 'Relatório - Relação de Clientes',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/RelClientes.vue')
  },
  {
    path: '/rel-consulta-spc',
    name: 'Relatório - Consultas no SPC',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/ConsultaSPCAnalitico.vue')
  },
  {
    path: '/resumo-consulta-spc',
    name: 'Relatório - Consultas no SPC',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/ConsultaSPCResumo.vue')
  },
  {
    path: '/mov-retornos-banco',
    name: "Relatório - Movimento de Retornos do Banco",
    component: () => import(/* webpackNameChuck: "relatorios" */'@/views/relatorios/MovRetornosBanco.vue')
  },
  {
    path: '/mov-compras',
    name: 'Relatório - Movimento de Compras',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/MovCompras.vue')
  },
  {
    path: '/pag-clientes',
    name: 'Relatório - Pagamento de Clientes',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/PagClientes.vue')
  },
  {
    path: '/pag-local',
    name: 'Relatório - Pagamento por Local',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/PagLocal.vue')
  },
  {
    path: '/mov-loja',
    name: 'Relatório - Movimento por Loja',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/MovLoja.vue')
  },
  {
    path: '/mov-pagamentos',
    name: 'Relatório - Movimento de Pagamentos',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/MovPagamentos.vue')
  },
  {
    path: '/defas-cobranca',
    name: 'Cobrança - Defasagem cobrança',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/DefasagemCobranca.vue')
  },
  {
    path: '/ultimas-cobrancas',
    name: 'Cobrança - Últimas Cobranças',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/UltimasCobrancas.vue')
  },
  {
    path: '/cobranca-retorno-por-usuario',
    name: "Cobrança - Retorno por usuario",
    component: ()=> import(/* webpackNameChuck: "relatorios" */ '@/views/relatorios/CobrancaRetornoPorUsuario.vue')
  },
  {
    path: '/cobranca-por-usuario-analitico',
    name: "Cobrança - Por Usuário Analítico",
    component: ()=> import(/* webpackNameChuck: "relatorios" */ '@/views/relatorios/CobrancaPorUsuarioAnalitico.vue')
  },
  {
    path: '/cobranca-por-usuario-sintetico',
    name: "Cobrança - Por Usuário Sintético",
    component: ()=> import(/* webpackNameChuck: "relatorios" */ '@/views/relatorios/CobrancaPorUsuarioSintetico.vue')
  },
  {
    path: '/acordos-efetuados',
    name: "Acordos Efetuados",
    component: ()=> import(/* webpackNameChuck: "relatorios" */ '@/views/relatorios/AcordosEfetuados.vue')
  },
  {
    path: '/recompra-loja',
    name: "Recompra Loja",
    component: ()=> import(/* webpackNameChuck: "relatorios" */ '@/views/relatorios/RecompraLoja.vue')
  },
  {
    path: '/clientes-atraso',
    name: 'Clientes - Em atraso',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ClientesAtraso.vue')
  },
  {
    path: '/compras-clientes',
    name: 'Relatório - Compras por Clientes',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasClientes.vue')
  },
  {
    path: '/compras-parcelas',
    name: 'Relatório - Compras por Parcelas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasPorParcelas.vue')
  },
  {
    path: '/compras-vencimento',
    name: 'Relatório - Compras por Vencimento',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasVencimento.vue')
  },
  {
    path: '/compras-lojas',
    name: 'Relatório - Compras por Lojas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasLojas.vue')
  },
  {
    path: '/compras-canceladas',
    name: 'Relatório - Compras Canceladas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasCanceladas.vue')
  },
  {
    path: '/compras-recusadas-sintetico',
    name: 'Relatório - Autorizações Recusadas Sintéticas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RecusadasSinteticas.vue')
  },
  {
    path: '/compras-recusadas-analitico',
    name: 'Relatório - Autorizações Recusadas Analíticas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RecusadasAnaliticas.vue')
  },
  {
    path: '/lojas-credenciadas',
    name: 'Relatório - Lojas credenciadas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/LojasCredenciadas.vue')
  },
  {
    path: '/proposta-adesao',
    name: 'Relatório - Proposta de Adesão',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/PropostaAdesaoClientes.vue')
  },
  {
    path: '/clientes-novos',
    name: 'Relatório - Clientes Novos',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ClientesNovos.vue')
  },
  {
    path: '/clientes-ativos',
    name: 'Relatório - Clientes Ativos',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/gerenciais/ResumoClientesAtivos.vue')
  },
  {
    path: '/perfil-carteira',
    name: 'Relatório - Perfil da Carteira',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/PerfilCarteira.vue')
  },
  {
    path: '/duplicidade',
    name: 'Relatório - Duplicidade de Autorizações',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/Duplicidade.vue')
  },
  {
    path: '/repique-loja',
    name: 'Relatório - Repique Loja',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RepiqueLoja.vue')
  },
  {
    path: '/idas-a-loja',
    name: 'Relatório - Repique Loja',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/IdasaLoja.vue')
  },
  {
    path: '/docs-armazenados',
    name: 'Relatório - Documentos Armazenados',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/DocumentosArmazenados.vue')
  },
  {
    path: '/compras-ramo',
    name: 'Relatório - Compras por Ramo de Atividade',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasPorRamo.vue')
  },
  {
    path: '/rel-comprovante-quitacao',
    name: 'Relatório - Comprovante de Quitação',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprovanteQuitacao.vue')
  },
  {
    path: '/compras-perfil',
    name: 'Relatório - Compras por Perfil Cliente',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasPorPerfil.vue')
  },
  {
    path: '/compras-tipo-transacao',
    name: 'Relatório - Compras por tipo de transação',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasTipoTransacao.vue')
  },
  {
    path: '/compras-modalidade',
    name: 'Relatório - Compras por Modalidade',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasModalidade.vue')
  },
  {
    path: '/compras-origem',
    name: 'Relatório - Compras por Origem',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasOrigem.vue')
  },
  {
    path: '/rel-tarifa-por-loja',
    name: 'Relatório - Tarifa por Loja',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/TarifaPorLoja.vue')
  },
  {
    path: '/tarifa-por-rede',
    name: 'Relatório - Tarifa por Rede',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/TarifaPorRede.vue')
  },
  {
    path: '/empresas-lojas',
    name: 'Relatório - Relação de Empresas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/EmpresasLojas.vue')
  },
  {
    path: '/limite-disponivel',
    name: 'Relatório - Limite Disponível',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/LimiteDisponivel.vue')
  },
  {
    path: '/rel-usuario',
    name: 'Relação de Usuários',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RelUsuario.vue')
  },
  {
    path: '/analise-inadimplencia',
    name: 'Analise de de Inadimplência',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/AnaliseInadimplencia.vue')
  },
  {
    path: '/inadimplencia-primeira-fatura',
    name: 'Inadimplência Primeira Fatura',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'@/views/relatorios/inadimplenciaPrimeiraFatura.vue')
  },
  {
    path: '/recupera-atrasados-v1',
    name: 'Relatório - Recuperação de Atrasados (Carnê - V1)',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RecuperaAtrasados1.vue')
  },
  {
    path: '/recupera-atrasados-v2',
    name: 'Relatório - Recuperação de Atrasados (Carnê - V2)',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RecuperaAtrasados2.vue')
  },
  {
    path: '/demonstrativo-resultado',
    name: 'Relatório - Demostrativo Resultado Por Exercício',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/DemonstrativoResultado.vue')
  },
  {
    path: '/rel-cliente-sem-cobranca',
    name: "Relatório - Cliente sem cobrança",
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RelClienteSemCobranca')
  },
  {
    path: '/rel-repasse-lancamentos',
    name: 'Relatório - Repasse de Lançamentos Analíticos',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RelRepasseLancamentos.vue')
  },
  {
    path: '/rel-repasse-resumo-pagto',
    name: 'Relatório - Repasse Resumo de Pagamentos Efetuados',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RelRepasseResumoPgto.vue')
  },
  {
    path: '/rel-repasse-previsao-pagamento',
    name: 'Relatório - Repasse Previsão de Pagamento',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/RelRepassePrevisaoPagamento.vue')
  },
]
