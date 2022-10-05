import axios from 'axios'

export default {
  vender (dadosCalcular) {
    return axios.post(`/v1/venda/vender`, dadosCalcular)
  },

  cancelarVenda (vendaId) {
    return axios.get(`/v1/venda/cancelar-venda/${vendaId}`)
  },

  pagarVenda (vendaId) {
    return axios.post(`/v1/venda/pagar-venda/${vendaId}`)
  },

  calcularFreteDesconto (item) {
    return axios.post(`/v1/venda/calcular-frete-desconto`, item)
  },

  calcularParcela (item) {
    return axios.post(`/v1/venda/calcular-parcela`, item)
  },

  calcularComissao (item) {
    return axios.post(`/v1/venda/calcular-comissao`, item)
  },

  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataVenda', filtros) {
    return axios.post(`/v1/venda/pagination`, {
      pageSize, pageNo, sortBy, filtros
    })
  }
}
