import axios from 'axios'

export default {
  salvar (cliente) {
    if (cliente.id) {
      return this.update(cliente)
    } else {
      return this.novo(cliente)
    }
  },
  findAll () {
    return axios.get('/v1/cliente/')
  },
  pagination (pageSize = 10, pageNo = 0, sortBy = 'nome', filtros) {
    return axios.post('/v1/cliente/pagination', {
      pageSize, pageNo, sortBy, filtros
    })
  },
  carnesCliente (id, filtros) {
    return axios.post(`/v1/cliente/${id}/carnes`, filtros)
  },
  pagamentosCliente (pageSize = 10, pageNo = 0, sortBy = 'dataPagto', id, filtros) {
    return axios.post(`/v1/cliente/${id}/pagamentos`, {
      pageSize, pageNo, sortBy, filtros
    })
  },
  parcelasCliente (pageSize = 10, pageNo = 0, sortBy = 'dataVencimento', cpf, filtros) {
    return axios.post(`/v1/cliente/${cpf}/parcelas`, {
      pageSize, pageNo, sortBy, filtros
    })
  },
  novo (cliente) {
    return axios.post('/v1/cliente/', cliente)
  },

  update (cliente) {
    return axios.post(`/v1/cliente/${cliente.id}`, cliente)
  },

  delete (id) {
    return axios.delete(`/v1/cliente/${id}`)
  },

  getById (id) {
    return axios.get(`/v1/cliente/${id}`)
  },

  consultaCPF (cliente) {
    return axios.post('/v1/cliente/consulta-cpf', cliente)
  },

  uploadDocumento (id, lojaId, formData) {
    return axios.post(`/v1/cliente/${Number(id)}/upload-documento/${lojaId}`, formData, {})
  },

  getAnexosOfCliente (id, lojaId) {
    return axios.get(`/v1/cliente/${Number(id)}/anexos/${lojaId}`)
  },

  consultaScore (id, lojaId) {
    return axios.get(`/v1/cliente/${Number(id)}/score/${Number(lojaId)}`)
  },

  deleteAnexo (id, anexoId) {
    return axios.delete(`/v1/cliente/${Number(id)}/anexos/${Number(anexoId)}`)
  },

  getLimiteDisponivel (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/limite-disponivel/${Number(lojaId)}`)
  },

  getLimiteCompartilhadoDisponivel (id) {
    return axios.get(`/v1/cliente/${Number(id)}/limite-compartilhado-disponivel`)
  },

  getLimiteExclusivoDisponivel (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/limite-exclusivo-disponivel/${Number(lojaId)}`)
  },

  getLimiteExclusivoCliente (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/limite-exclusivo/${Number(lojaId)}`)
  },
  loadResumoCliente (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/resumo-cliente/${Number(lojaId)}`)
  },
  loadResumoClienteOutrasLojas (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/resumo-cliente-outras-lojas/${Number(lojaId)}`)
  },
  inserirObservacao (clienteId, observacao) {
    return axios.post(`/v1/cliente/${Number(clienteId)}/observacao`, observacao)
  },
  alterarObservacao (observacao) {
    return axios.post(`/v1/cliente/alterar-observacao`, observacao)
  },
  excluirObservacao (observacao) {
    return axios.post(`/v1/cliente/excluir-observacao`, observacao)
  },
  getAllObservacao (clienteId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/observacao`)
  },
  getAllObservacaoNotif (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/observacao-notif/${Number(lojaId)}`)
  },
  cruzarDadosCliente (clienteId, lojaId) {
    return axios.get(`/v1/cliente/${Number(clienteId)}/cruzardados/${Number(lojaId)}`)
  },
  alterarLimite (clienteId, limite) {
    return axios.post(`/v1/cliente/${Number(clienteId)}/altera-limite-cliente`, { novoLimite: limite })
  },
  alterarStatus (clienteId, lojaId, status) {
    return axios.post(`/v1/cliente/${Number(clienteId)}/altera-status-cliente/${Number(lojaId)}`, { novoStatus: status })
  },
  solicitarCredito (clienteId, lojaId, isVenda) {
    return axios.post(`/v1/cliente/${Number(clienteId)}/solicitar-credito/${Number(lojaId)}`, { flagIsVenda: isVenda })
  },
  verificaCliente (cliente) {
    return axios.post(`/v1/cliente/verifica-cliente`, cliente)
  },
  imprimeComprovante(cliente) {
    return axios({
      url: `/v1/cliente/imprime-comprovante`,
      method: 'POST',
      responseType: 'blob',
      data: cliente
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', response.headers['content-disposition'].split(';')[1].split('=')[1])
      document.body.appendChild(link)
      link.click()
    })

  },
}
