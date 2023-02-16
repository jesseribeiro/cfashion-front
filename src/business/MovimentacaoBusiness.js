import axios from 'axios'

export default {
  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataLancamento', filtros) {
    return axios.post(`/v1/movimentacao/pagination`, {
      pageSize, pageNo, sortBy, filtros
    })
  },

  create (movimentacao) {
    return axios.post(`/v1/movimentacao/`, movimentacao)
  },

  delete (id) {
    return axios.delete(`/v1/movimentacao/${id}`)
  },
}
