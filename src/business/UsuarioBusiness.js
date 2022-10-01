import axios from 'axios'

export default {
  salvar (usuario) {
    if (usuario.id) {
      return this.update(usuario)
    } else {
      return this.novo(usuario)
    }
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

  alterarSenha (id, novaSenha) {
    return axios.post(`/v1/usuario/${id}/alterar-senha`, { senha: novaSenha })
  },
}
