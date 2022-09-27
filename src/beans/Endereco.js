export default class Endereco {
  cep
  logradouro
  numero
  complemento
  bairro
  cidade
  estado
  constructor () {
    this.cep = null
    this.logradouro = null
    this.numero = null
    this.complemento = null
    this.bairro = null
    this.cidade = null
    this.estado = null
  }

  printEndereco () {
    return this.logradouro + ',' + this.numero + ',' + this.cidade + '/' + this.estado + ' CEP: ' + this.cep
  }
}
