import axios from 'axios'

/**
 * Business que deverá ser utilizado para centralizar todos os tipos do sistema, geralmente
 * listas fixas, enums, ai fazer um GET para cada tipo
 */
export default {
  listRepasse () {
    return axios.get('/v1/tipos/repasse')
  },
  listRamoAtividade () {
    return axios.get('/v1/tipos/ramoatividade')
  },
  listStatus () {
    return axios.get('/v1/tipos/status-loja')
  },
  listPlanoPagamento () {
    return axios.get('/v1/tipos/planopagamento')
  },
  listTiposContaBanco () {
    return axios.get('/v1/tipos/tipos-conta-banco')
  },
  listBancos () {
    return axios.get('/v1/tipos/bancos')
  },
  tiposLancamentoRepasse () {
    return axios.get('/v1/tipos/tipos-lancamento-repasse')
  },
  listEmbocadora () {
    return axios.get('/v1/tipos/embocadora')
  },
  getAllRedes () {
    return axios.get(`/v1/tipos/redes`)
  },
  getAllEmpresasOfRede (redeId) {
    return axios.get(`/v1/tipos/empresas/${redeId}`)
  },
  getAllEmpresas () {
    return axios.get(`/v1/tipos/empresas`)
  },
  getAllLojas (empresaId) {
    return axios.get(`/v1/tipos/lojas/${empresaId}`)
  },
  getAllStatusCarne () {
    return axios.get(`/v1/tipos/status-carne`)
  },
  getAllStatusCliente () {
    return axios.get(`/v1/tipos/status-cliente`)
  },
  getAllSituacaoConta () {
    return axios.get(`/v1/tipos/situacao-conta`)
  },
  getAllStatus () {
    return axios.get(`/v1/tipos/status`)
  },
  getAllStatusVenda () {
    return axios.get(`/v1/tipos/status-venda`)
  },
  getAllServicoSPC () {
    return axios.get(`/v1/tipos/servico-spc`)
  },
  getAllTiposRelatorio () {
    return axios.get(`/v1/tipos/tipos-relatorio`)
  },
  getAllSexo () {
    return axios.get(`/v1/tipos/sexo`)
  },
  getAllEstadoCivil () {
    return axios.get(`/v1/tipos/estado-civil`)
  },
  getAllEscolaridade () {
    return axios.get(`/v1/tipos/escolaridade`)
  },
  getAllTipoResidencia () {
    return axios.get(`/v1/tipos/tipo-residencia`)
  },
  getAllTipoPagamento () {
    return axios.get(`/v1/tipos/tipo-pagamento`)
  },
  getAllPeriodoRelatorio () {
    return axios.get(`/v1/tipos/periodo-relatorio`)
  },
  getAllPorRelatorio () {
    return axios.get(`/v1/tipos/por-relatorio`)
  },
  getAllTotalizarPorDataRelatorio () {
    return axios.get(`/v1/tipos/totalizar-data-relatorio`)
  },
  getAllTipoReferenciaPessoal () {
    return axios.get(`/v1/tipos/tipo-referencia-pessoal`)
  },
  getAllTiposOcorrencia () {
    return axios.get(`/v1/tipos/tipos-ocorrencia`)
  },
  getAllSituacaoRps () {
    return axios.get(`/v1/tipos/situacao-rps`)
  },
  getAllNaturezaOperacaoRps () {
    return axios.get(`/v1/tipos/natureza-operacao-rps`)
  },
  getAllUsuarios () {
    return axios.get(`/v1/tipos/usuarios`)
  },
  getAllEntitiesAuditaveis () {
    return axios.get(`/v1/tipos/entities-auditoria`)
  },
  getAllEntitiesClientesAuditaveis () {
    return axios.get(`/v1/tipos/entities-clientes-auditoria`)
  },
  getAllOperacoesAuditaveis () {
    return axios.get(`/v1/tipos/operacoes-auditoria`)
  },
  getAllPrioridades () {
    return axios.get(`/v1/tipos/prioridades`)
  },
  getAllSaldoDevedor () {
    return axios.get(`/v1/tipos/saldo-devedor`)
  },
  getAllClienteTipoDoc () {
    return axios.get(`/v1/tipos/cliente-tipo-doc`)
  },
  getAllSegmentos () {
    return axios.get(`/v1/tipos/segmentos`)
  },
  getAllTiposRegra () {
    return axios.get(`/v1/tipos/tipos-regra`)
  },
  getAllTiposConsultaSpc () {
    return axios.get(`/v1/tipos/tipo-consulta`)
  },
  getAllNivelAprovacao () {
    return axios.get(`/v1/tipos/nivel-aprovacao`)
  },
  getAllRoles () {
    return axios.get(`/v1/tipos/roles-ativas`)
  },
  getAllAssuntoObservacoes () {
    return axios.get(`/v1/tipos/assunto-observacao`)
  },
  getAllRecusaVenda () {
    return axios.get(`/v1/tipos/recusa-venda`)
  },
  getAllTamanho () {
    return axios.get(`/v1/tipos/tamanhos`)
  },
  getAllCategoria () {
    return axios.get(`/v1/tipos/categorias`)
  }
}
