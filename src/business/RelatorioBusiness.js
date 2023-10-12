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
}
