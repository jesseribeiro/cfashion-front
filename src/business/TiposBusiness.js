import axios from 'axios'

export default {
  getAllStatus () {
    return axios.get(`/v1/tipos/status`)
  },
  getAllTiposRelatorio () {
    return axios.get(`/v1/tipos/tipos-relatorio`)
  },
  getAllSexo () {
    return axios.get(`/v1/tipos/sexo`)
  },
  getAllTipoPagamento () {
    return axios.get(`/v1/tipos/tipo-pagamento`)
  },
  getAllTamanho () {
    return axios.get(`/v1/tipos/tamanhos`)
  },
  getAllBalanco () {
    return axios.get(`/v1/tipos/balancos`)
  },
  getAllCategoria () {
    return axios.get(`/v1/tipos/categorias`)
  }
}
