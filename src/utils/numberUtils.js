export default {
  convertStringToNumber (valorStr) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!valorStr) {
      // return Number(valorStr.replace(',', '.').replace(/[^0-9.-]+/g, ''))
      return Number(valorStr.replaceAll('.', '').replace(',', '.').replace(/[^0-9.-]+/g, ''))
    }
    return 0
  },
  calculaDescontoPercentual (valorBase, percentual) {
    if (percentual) {
      let percentualCalculado = (this.convertStringToNumber(percentual) / 100)
      console.log('percentualCalculado: ' + percentualCalculado)
      console.log('valorBase: ' + valorBase)
      console.log('multiplicado: ' + valorBase * percentualCalculado)
      return valorBase * percentualCalculado
    }
    return 0
  },
  formatValorMonetario (valor) {
    if (valor) {
      return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return '0,00'
  }
}
