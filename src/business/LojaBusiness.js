import axios from 'axios'

export default {
  salvar (loja) {
    if (loja.id) {
      return this.update(loja)
    } else {
      return this.novo(loja)
    }
  },

  findAll () {
    return axios.get('/v1/loja/')
  },

  pagination (pageSize = 10, pageNo = 0, sortBy = 'id', filtros) {
    return axios.post('/v1/loja/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },

  novo (loja) {
    return axios.post('/v1/loja/', loja)
  },

  update (loja) {
    return axios.post(`/v1/loja/${loja.id}`, loja)
  },

  delete (id) {
    return axios.delete(`/v1/loja/${id}`)
  },

  getById (id) {
    return axios.get(`/v1/loja/${id}`)
  },

  getDadosVenda (id, planoId) {
    return axios.get(`/v1/loja/${id}/dadosvenda/${planoId}`)
  },
}
