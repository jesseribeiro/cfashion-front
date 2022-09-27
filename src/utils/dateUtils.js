import moment from 'moment/src/moment'

const currentDate = () => {
  return formatDate(new Date())
}

const ontem = () => {
  var dataAtual = new Date()
  dataAtual.setDate(dataAtual.getDate() - 1)
  return formatDate(dataAtual)
}

const formatDate = (date) => {
  var d = date
  var dia = d.getDate()
  var mes = d.getMonth() + 1
  var ano = d.getFullYear()
  return [ano, (mes < 10) ? '0' + mes : mes, (dia < 10) ? '0' + dia : dia].join('-')
}

const addDia = (dateParam, qtdDias) => {
  var dataAtual = new Date()
  dataAtual.setDate(dateParam.getDate() + (qtdDias))
  return formatDate(dataAtual)
}

const diffDate = (date1, date2) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  return Math.round((date1 - date2) / (1000 * 60 * 60 * 24))
}

const validaDataFutura = (value) => {
  let hoje = moment().format('YYYY-MM-DD')
  if (!!value && value <= hoje) {
    return true
  }
  return 'A data tem que ser menor que a data atual'
}

const validaDataVigencia = (value) => {
  let hoje = moment().format('YYYY-MM-DD')
  if (!!value && value >= hoje) {
    return true
  }
  return 'A data tem que ser maior ou igual a data atual'
}

// ex.: 01/2020
const validaDesdeMMYYYY = (value) => {
  if (value && value.length === 7) {
    let valores = value.split('/')
    let mes = Number(valores[0])
    let ano = Number(valores[1])
    var d = new Date()
    var mesAtual = d.getMonth() + 1
    var anoAtual = d.getFullYear()
    if (ano < anoAtual) {
      return true
    }
    if (ano === anoAtual && mes < mesAtual) {
      return true
    }
  }
  return false
}

export default {
  currentDate: currentDate,
  formatDate: formatDate,
  addDia: addDia,
  ontem: ontem,
  diffDate: diffDate,
  validaDesdeMMYYYY: validaDesdeMMYYYY,
  validaDataFutura: validaDataFutura,
  validaDataVigencia: validaDataVigencia
}
