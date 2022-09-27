import axios from 'axios'

export default {
  geraCarnePDF (carneId) {
    return axios({
      url: `/v1/carne/gera-carne-pdf/${carneId}`,
      method: 'GET',
      responseType: 'blob'
    })
  }
}
