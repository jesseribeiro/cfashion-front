import axios from 'axios'

export default {
  salvar (cliente) {
    if (cliente.id) {
      return this.update(cliente)
    } else {
      return this.novo(cliente)
    }
  },

  findAll () {
    return axios.get('/v1/cliente/')
  },

  pagination (pageSize = 10, pageNo = 0, sortBy = 'nome', filtros) {
    return axios.post('/v1/cliente/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },

  parcelasCliente (pageSize = 10, pageNo = 0, sortBy = 'dataCadastro', cpf, filtros) {
    return axios.post(`/v1/cliente/${cpf}/parcelas`, {
      pageSize, pageNo, sortBy, filtros
    })
  },

  novo (cliente) {
    return axios.post('/v1/cliente/', cliente)
  },

  update (cliente) {
    return axios.post(`/v1/cliente/${cliente.id}`, cliente)
  },

  delete (id) {
    return axios.delete(`/v1/cliente/${id}`)
  },

  getById (id) {
    return axios.get(`/v1/cliente/${id}`)
  },

  consultaCPF (cliente) {
    return axios.post('/v1/cliente/consulta-cpf', cliente)
  },
}
