import axios from 'axios'

export default {
  salvar (usuario) {
    if (usuario.id) {
      return this.update(usuario)
    } else {
      return this.novo(usuario)
    }
  },
  pagination (pageSize = 10, pageNo = 0, sortBy = 'nome', filtros) {
    return axios.post('/v1/usuario/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },
  novo (usuario) {
    return axios.post('/v1/usuario', usuario)
  },

  update (usuario) {
    return axios.post(`/v1/usuario/${usuario.id}`, usuario)
  },

  delete (id, _params) {
    return axios.delete(`/v1/usuario/${id}`, { params: _params })
  },

  getById (id) {
    return axios.get(`/v1/usuario/${id}`)
  },
  updateRoleAtiva (id, _role) {
    return axios.post(`/v1/usuario/${id}/role-ativa`, { role: _role })
  },
  alterarSenha (id, novaSenha) {
    return axios.post(`/v1/usuario/${id}/alterar-senha`, { senha: novaSenha })
  },
  temAgendamentoCobrancaHoje (usuarioId) {
    return axios.get(`/v1/usuario/${usuarioId}/tem-agendamento-cobranca-hoje`)
  },
  getAllAgendamentoCobrancaDia (usuarioId) {
    return axios.get(`/v1/usuario/${usuarioId}/agendamento-cobranca`)
  },
  listAllNegociador () {
    return axios.get(`/v1/usuario/listNegociador`)
  }
}
