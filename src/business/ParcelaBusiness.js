import axios from 'axios'

export default {
  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataCadastro', filtros) {
    return axios.post(`/v1/parcela/pagination`, {
      pageSize, pageNo, sortBy, filtros
    })
  },

  pagarParcela (parcelaId) {
    return axios.post(`/v1/parcela/pagar-parcela/${parcelaId}`)
  },

  cancelarParcela (parcelaId) {
    return axios.post(`/v1/parcela/cancelar-parcela/${parcelaId}`)
  }
}
