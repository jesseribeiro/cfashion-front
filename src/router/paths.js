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
    path: '/comissao',
    name: 'Comissão',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/comissao/Comissao.vue')
  },
  {
    path: '/movimentacao',
    name: 'Movimentações',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/movimentacoes/Movimentacoes.vue')
  },
  {
    path: '/relatorios',
    name: 'Relatórios',
    component: () => import(/* webpackNameChuck: "relatorios" */'../views/relatorios/Relatorios')
  },
  {
    path: '/lista-produtos',
    name: 'Relatório - Lista de Produtos',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ListaProdutos.vue')
  },
  {
    path: '/lista-clientes',
    name: 'Relatório - Lista de Clientes',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ListaClientes.vue')
  },
  {
    path: '/lista-movimentacao',
    name: 'Relatório - Lista de Movimentações',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ListaMovimentacao.vue')
  },
  {
    path: '/lista-vendas',
    name: 'Relatório - Lista de Vendas',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/Vendas.vue')
  },
  {
    path: '/compras-clientes',
    name: 'Relatório - Lista de Compras por Clientes',
    component: () => import(/* webpackNameChuck: "nome-chuck" */'../views/relatorios/ComprasClientes.vue')
  },
]
