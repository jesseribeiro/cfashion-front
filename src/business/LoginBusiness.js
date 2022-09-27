import axios from 'axios'

export default {
  login (_login, _senha) {
    return axios.post('/v1/auth/login', { username: _login, password: _senha })
  },
  loginAdmin (_login, _senha) {
    return axios.post('/v1/auth/login-admin', { username: _login, password: _senha })
  },
  getDadosUsuario (username) {
    return axios.get(`/v1/auth/dadosusuario/${username}`)
  }
}
