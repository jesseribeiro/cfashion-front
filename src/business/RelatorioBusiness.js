import axios_base from 'axios'
import { LOCALSTORAGE } from '../constants';

const URL_BASE_REPORT = process.env.NODE_ENV === 'production' ? 'https://praticoreport.trulogic.com.br/' : 'http://localhost:9020/';

let token = JSON.parse(localStorage.getItem(LOCALSTORAGE.JWT))

const axios = axios_base.create({
  baseURL: URL_BASE_REPORT,
});

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let containUrl = error.config.url;
    if (error.response.status === 401 && containUrl.indexOf('login') === -1) {
      // error.response.status === 403 ||
      localStorage.removeItem('JWT')
      window.location.reload()
    }
    if (
      error.request.responseType === 'blob' &&
      error.response.data instanceof Blob &&
      error.response.data.type &&
      error.response.data.type.toLowerCase().indexOf('json') !== -1
    ) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
          console.log('onload: ', reader.result)
          try {
            error.response.data = JSON.parse(reader.result)
          } catch (e) {
            error.response.data = reader.result
          }
          console.log('message 2 : ', error.response.data)
          resolve(Promise.reject(error))
        }
        reader.onerror = () => {
          console.log('onerror', error)
          reject(error)
        }
        reader.readAsText(error.response.data)
      })
    }
    return Promise.reject(error.response)
  }
)

export default {
  gerarGerenciaisResumoFaturamento(filtros) {
    return axios({
      url: `/v1/relatorio/gerenciais-resumo-faturamento`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
      })
  },
  gerarEvolucaoCarteira(filtros) {
    return axios({
      url: `/v1/relatorio/evolucao-carteira`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
      })
  },
  gerarResumoUtilizacao(filtros) {
    return axios({
      url: `/v1/relatorio/resumo-utilizacao`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarResumoAuditoria(filtros) {
    return axios({
      url: `/v1/relatorio/resumo-auditoria`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarResumoGerencial(filtros) {
    return axios({
      url: `/v1/relatorio/resumo-gerencial`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarGerenciaisResumoInadimplencia(filtros) {
    return axios({
      url: `/v1/relatorio/gerenciais-resumo-inadimplencia`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarRecebiveisPorVencimento(filtros) {
    return axios({
      url: `/v1/relatorio/recebiveis-por-vencimento`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarMovimentoCobrancaRegistradaSintetico(filtros) {
    return axios({
      url: `/v1/relatorio/movimento-cobranca-registrada-sintetico`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  gerarMovimentoCobrancaRegistradaAnalitico(filtros) {
    return axios({
      url: `/v1/relatorio/movimento-cobranca-registrada-analitico`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRelatorioLanctoExtra (filtros) {
    return axios({
      url: `/v1/relatorio/lancamento-extra`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
    /*
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        return url
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', response.headers['content-disposition'].split(';')[1].split('=')[1])
        document.body.appendChild(link)
        link.click()
      })
       */
  },
  geraRelatorioCobrancaRetornoPorUsuario(filtros) {
    return axios({
      url: `/v1/relatorio/cobranca-retorno-por-usuario`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraInadimplenciaPrimeiraFatura(filtros) {
    return axios({
      url: '/v1/relatorio/inadimplencia-primeira-fatura',
      method: 'POST',
      responseType: 'blob',
      data: filtros
    });
  },
  geraRelatorioCobrancaPorUsuarioAnalitico(filtros) {
    return axios({
      url: `/v1/relatorio/relatorio-cobranca-por-usuario-analitico`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
      })
  },
  geraRelatorioCobrancaPorUsuarioSintetico(filtros) {
    return axios({
      url: `/v1/relatorio/relatorio-cobranca-por-usuario-sintetico`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
      })
  },
  geraRelatorioClienteSemCobranca(filtros) {
    return axios({
      url: `/v1/relatorio/relatorio-cliente-sem-cobranca`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
      })
  },
  geraRelatorioCliente (filtros) {
    return axios({
      url: `/v1/relatorio/relatorio-cliente`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraAcordosEfetuados (filtros) {
    return axios({
      url: `/v1/relatorio/relatorio-acordos-efetuados`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraMovimentoRetornoBanco(filtros) {
    console.log(filtros)
    return axios({
      url: `/v1/relatorio/mov-retornos-banco`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraMovimentoCompras (filtros) {
    return axios({
      url: `/v1/relatorio/mov-compras`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraMovimentoCompras (filtros) {
    return axios({
      url: `/v1/relatorio/mov-compras`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraConsultaSpcAnalitico (filtros) {
    return axios({
      url: `/v1/relatorio/rel-consulta-spc`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRelatorioPrevisaoPagamento (filtros) {
    return axios({
      url: `/v1/relatorio/previsao-pagamento`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRelatorioPagamentoEfetuado (filtros) {
    return axios({
      url: `/v1/relatorio/pagamento-efetuado`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraMovimentoLoja (filtros) {
    return axios({
      url: `/v1/relatorio/mov-loja`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRepasseResumoPagto (filtros) {
    return axios({
      url: `/v1/relatorio/rel-repasse-resumo-pagto`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRepasseLancamentos (filtros) {
    return axios({
      url: `/v1/relatorio/rel-repasse-lancamentos`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraDefasagemCobranca (filtros) {
    return axios({
      url: `/v1/relatorio/defas-cobranca`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraClientesAtraso (filtros) {
    return axios({
      url: `/v1/relatorio/clientes-atraso`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasClientes (filtros) {
    return axios({
      url: `/v1/relatorio/compras-clientes`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasParcelas (filtros) {
    return axios({
      url: `/v1/relatorio/compras-parcelas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraLojasCredenciadas (filtros) {
    return axios({
      url: `/v1/relatorio/lojas-credenciadas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraClientesNovos (filtros) {
    return axios({
      url: `/v1/relatorio/clientes-novos`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraResumoClientesAtivos (filtros) {
    return axios({
      url: `/v1/relatorio/clientes-ativos`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasPorRamo (filtros) {
    return axios({
      url: `/v1/relatorio/compras-ramo`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRelUsuarios (filtros) {
    return axios({
      url: `/v1/relatorio/rel-usuario`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraAnaliseInadimplencia (filtros) {
    return axios({
      url: `/v1/relatorio/analise-inadimplencia`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasVencimento (filtros) {
    return axios({
      url: `/v1/relatorio/compras-vencimento`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasModalidade (filtros) {
    return axios({
      url: `/v1/relatorio/compras-modalidade`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasOrigem (filtros) {
    return axios({
      url: `/v1/relatorio/compras-origem`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasLojas (filtros) {
    return axios({
      url: `/v1/relatorio/compras-lojas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasCanceladas (filtros) {
    return axios({
      url: `/v1/relatorio/compras-canceladas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasRecusadas (filtros) {
    return axios({
      url: `/v1/relatorio/compras-recusadas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRecuperaAtrasados (filtros) {
    return axios({
      url: `/v1/relatorio/recupera-atrasados`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraPagamentoClientes (filtros) {
    return axios({
      url: `/v1/relatorio/pag-clientes`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraPagamentoLocal (filtros) {
    return axios({
      url: `/v1/relatorio/pag-local`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraTarifaPorLoja (filtros) {
    return axios({
      url: `/v1/relatorio/rel-tarifa-por-loja`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraTarifaPorRede (filtros) {
    return axios({
      url: `/v1/relatorio/tarifa-por-rede`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraEmpresasLojas (filtros) {
    return axios({
      url: `/v1/relatorio/rel-empresas-lojas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraDocsArmazenados (filtros) {
    return axios({
      url: `/v1/relatorio/docs-armazenados`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraDemonstrativoResultado (filtros) {
    return axios({
      url: `/v1/relatorio/demonstrativo-resultado`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraMovimentoPagamentos (filtros) {
    return axios({
      url: `/v1/relatorio/mov-pagamentos`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprovanteQuitacao (filtros) {
    return axios({
      url: `/v1/relatorio/comprovante-quitacao`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraLimiteDisponivel (filtros) {
    return axios({
      url: `/v1/relatorio/limite-disponivel`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraUltimasCobrancas (filtros) {
    return axios({
      url: `/v1/relatorio/ultimas-cobrancas`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRecompraLoja (filtros) {
    return axios({
      url: `/v1/relatorio/recompra-loja`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraPerfilCarteira (filtros) {
    return axios({
      url: `/v1/relatorio/perfil-carteira`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraDuplicidade (filtros) {
    return axios({
      url: `/v1/relatorio/duplicidade`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraRepiqueLoja (filtros) {
    return axios({
      url: `/v1/relatorio/repique-loja`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraIdasaLoja (filtros) {
    return axios({
      url: `/v1/relatorio/idas-a-loja`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraPropostaAdesao (filtros) {
    return axios({
      url: `/v1/relatorio/proposta-adesao`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasPerfil (filtros) {
    return axios({
      url: `/v1/relatorio/compras-perfil`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
  geraComprasTipoTransacao (filtros) {
    return axios({
      url: `/v1/relatorio/compras-tipo-transacao`,
      method: 'POST',
      responseType: 'blob',
      data: filtros
    })
  },
}
