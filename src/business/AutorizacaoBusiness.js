import axios from 'axios'

export default {
  enviarAutorizacao (dados) {
    return axios.post(`/v1/codigo-autorizacao/gerar`, dados)
  },
  confirmarCodigo (dados) {
    return axios.post(`/v1/codigo-autorizacao/confirmar`, dados)
  }
}
