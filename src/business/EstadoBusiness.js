import axios from 'axios'

export default {
  findAll () {
    return axios.get('/v1/estado')
  },
  getById (id) {
    return axios.get(`/v1/estado/${id}`)
  },
  getCidadesByUf (uf) {
    return axios.get(`/v1/cidade/uf/${uf}`)
  }
}
