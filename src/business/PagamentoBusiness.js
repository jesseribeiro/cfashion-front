import axios from 'axios'

export default {
  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataPagto', filtros) {
    pageNo = pageNo == null ? 0 : pageNo
    return axios.post('/v1/pagamento/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },

  getById (id) {
    return axios.get(`/v1/pagamento/${id}`)
  }
}
