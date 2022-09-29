import axios from 'axios'

export default {
  salvar (valor) {
    return axios.post('/v1/cep', valor)
  },
  
  consultaCep (valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '')
    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/
      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return axios.get(`/v1/cep/${cep}`)
      }
    }
    return Promise.reject(new Error('CEP inválido'))
  }
}
