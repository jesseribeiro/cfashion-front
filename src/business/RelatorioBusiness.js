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
}
