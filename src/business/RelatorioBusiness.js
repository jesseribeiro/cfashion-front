import axios from 'axios'

export default {
  geraListaProdutos (filtros) {
    return axios({
      url: `/v1/relatorio/lista-produtos`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraListaClientes (filtros) {
    return axios({
      url: `/v1/relatorio/lista-clientes`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraListaMovimentacao (filtros) {
    return axios({
      url: `/v1/relatorio/lista-movimentacao`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraListaVendas (filtros) {
    return axios({
      url: `/v1/relatorio/lista-vendas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasClientes (filtros) {
    return axios({
      url: `/v1/relatorio/compras-clientes`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasLojas (filtros) {
    return axios({
      url: `/v1/relatorio/compras-lojas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasOrigem (filtros) {
    return axios({
      url: `/v1/relatorio/compras-origem`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraParcelasClientes (filtros) {
    return axios({
      url: `/v1/relatorio/parcelas-clientes`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
}
