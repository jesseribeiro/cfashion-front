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

  vendasCliente (id, filtros) {
    return axios.post(`/v1/cliente/${id}/vendas`, filtros)
  },

  pagamentosCliente (pageSize = 10, pageNo = 0, sortBy = 'dataPagamento', id, filtros) {
    return axios.post(`/v1/cliente/${id}/pagamentos`, {
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
