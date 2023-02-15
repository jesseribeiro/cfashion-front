import axios from 'axios'

export default {
  pagination (pageSize = 10, pageNo = 0, sortBy = 'id') {
    return axios.post('/v1/comissao/pagination', {
      pageSize, pageNo, sortBy
    })
  },

  update (comissao) {
    return axios.post(`/v1/comissao/${comissao.id}`, comissao)
  },
}
