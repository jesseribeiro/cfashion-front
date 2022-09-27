import axios from 'axios'

export default {
  findEndereco (clienteId) {
    return axios.get(`/v1/endereco/cliente/${clienteId}`)
  }
}
