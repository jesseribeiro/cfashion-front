import axios from 'axios'

export default {
  pagination (pageSize = 10, pageNo = 0, sortBy = 'dataCadastro', filtros) {
    return axios.post(`/v1/parcela/pagination`, {
      pageSize, pageNo, sortBy, filtros
    })
  }
}
