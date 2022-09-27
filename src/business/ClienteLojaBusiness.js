import axios from 'axios'

export default {
  inserirClienteLoja (clienteLoja) {
    return axios.post('/v1/clienteloja/', clienteLoja)
  },
  listAllLojasClientes (id) {
    return axios.post(`/v1/clienteloja/list-all-lojas-clientes/${id}`)
  }
}
