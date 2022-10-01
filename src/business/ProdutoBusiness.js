import axios from 'axios'

export default {
  salvar (produto) {
    if (produto.id) {
      return this.update(produto)
    } else {
      return this.novo(produto)
    }
  },
  
  findAll () {
    return axios.get('/v1/produto/')
  },

  pagination (pageSize = 10, pageNo = 0, sortBy = 'id', filtros) {
    return axios.post('/v1/produto/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },
  
  novo (produto) {
    return axios.post('/v1/produto/', produto)
  },

  update (produto) {
    return axios.post(`/v1/produto/${produto.id}`, produto)
  },

  delete (id) {
    return axios.delete(`/v1/produto/${id}`)
  },

  getById (id) {
    return axios.get(`/v1/produto/${id}`)
  },

  getAllCategoriasByMarca (id) {
    return axios.get(`/v1/produto/categorias/${id}`)
  },

  getAllCodigos (id, categoria) {
    return axios.post(`/v1/produto/${id}/codigos/${categoria}`)
  },

  getProduto (codigo) {
    return axios.post(`/v1/produto/codigo/${codigo}`)
  },
}
