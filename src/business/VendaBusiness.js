import axios from 'axios'

export default {
  calcular (dadosCalcular) {
    return axios.post(`/v1/venda/calcular`, dadosCalcular)
  },
  vender (dadosCalcular) {
    return axios.post(`/v1/venda/vender`, dadosCalcular)
  },
  cancelarVenda (vendaId) {
    return axios.get(`/v1/venda/cancelar-venda/${vendaId}`)
  },
  pagarParcela (item) {
    return axios.post(`/v1/venda/pagar-carne`, item)
  },
  pagarListaParcela (lista) {
    return axios.post(`/v1/venda/pagar-lista-carne`, lista)
  },
  cancelarPagamento (item) {
    return axios.post(`/v1/venda/cancelar-pagamento`, item)
  },
  getReciboPagamento (pagamentoId) {
    return axios.get(`/v1/venda/recibo-pagamento/${pagamentoId}`)
  },

  getReciboVenda (vendaId) {
    return axios.get(`/v1/venda/recibo-venda/${vendaId}`)
  },

  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataVenda', filtros) {
    return axios.post(`/v1/venda/pagination`, {
      pageSize, pageNo, sortBy, filtros
    })
  }
}
