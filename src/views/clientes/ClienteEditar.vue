<template>
  <div>
    <core-progress-modal :show="loading" />
    <v-tabs
      v-if="!loading"
      centered
      color="primary"
      dark
      icons-and-text
      v-model="tab"
    >
      <v-tabs-slider color="white" />

      <v-tab href="#dados-cliente" key="dados-cliente">
        Dados Cliente
        <v-icon>mdi-card-account-details</v-icon>
      </v-tab>

      <v-tab href="#proposta-adesao" key="proposta-adesao">
        Proposta de Adesão
        <v-icon>mdi-text-box-search</v-icon>
      </v-tab>

      <v-tab href="#doc-digitalizados" key="doc-digitalizados">
        Doc. Digitalizados
        <v-icon>mdi-file-document</v-icon>
      </v-tab>

      <v-tab href="#carnes" key="carnes">
        Carnês/Boletos
        <v-icon>mdi-animation</v-icon>
      </v-tab>

      <v-tab href="#pagamentos" key="pagamentos">
        Pagamentos
        <v-icon>mdi-cash-multiple</v-icon>
      </v-tab>

      <v-tab
        v-if="$root.isRolesPratico()"
        href="#spc">
        SPC
        <v-icon>mdi-account-off-outline</v-icon>
      </v-tab>

      <v-tab
        v-if="$root.isRolesPratico()"
        href="#renegociar"
        key="renegociar">
        Renegociar Dívida
        <v-icon>mdi-handshake</v-icon>
      </v-tab>

      <v-tab
        v-if="$root.isRolesPratico()"
        href="#auditoria"
        key="auditoria">
        Auditoria Cliente
        <v-icon>mdi-database-search</v-icon>
      </v-tab>

      <v-tab-item
        value="dados-cliente"
        lazy
        key="item-dados-cliente"
      >
        <cliente-dados
          :value="form"
          :next-step="salvar"
          :go-back="cancelar"
          :set-data="setData"
          :editando="true"
        />
      </v-tab-item>
      <v-tab-item
        value="proposta-adesao"
        lazy
        key="item-proposta-adesao"
      >
        <cliente-contrato
          v-if="tab == 'proposta-adesao' && form.empregoCBO"
          :value="form"
          :editando="true"
          :go-back="tabDadosCliente"
        />
      </v-tab-item>
      <v-tab-item
        value="doc-digitalizados"
        lazy
        key="item-doc-digitalizados"
      >
        <cliente-digitalizar-docs
          :value="form"
          :next-step="salvar"
          :go-back="cancelar"
          :editando="true"
        />
      </v-tab-item>
      <v-tab-item
        value="carnes"
        lazy
        key="item-carnes"
      >
        <cliente-carnes
          :value="form"
        />
      </v-tab-item>
      <v-tab-item
        value="pagamentos"
        lazy
        key="item-pagamentos"
      >
        <cliente-pagamentos
          :value="form"
        />
      </v-tab-item>
      <v-tab-item
        v-if="$root.isRolesPratico()"
        value="spc"
        lazy
        key="item-spc"
      >
        <cliente-SPC
          :value="form"
        />
      </v-tab-item>
      <v-tab-item
        v-if="$root.isRolesPratico()"
        value="renegociar"
        lazy
        key="item-renegociar"
      >
        <cliente-renegociar
          :value="form"
        />
      </v-tab-item>
      <v-tab-item
        v-if="$root.isRolesPratico()"
        value="auditoria"
        lazy
        key="item-auditoria"
      >
        <cliente-auditoria
          :value="form"
        />
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import Endereco from '../../beans/Endereco'
import { ClienteBusiness, SPCBusiness } from '../../business'

const ClienteSPC = () => import('../clientes/ClienteSPC')
const ClienteRenegociar = () => import('../clientes/ClienteRenegociar')
const ClienteAuditoria = () => import('../clientes/ClienteAuditoria')
const ClienteDados = () => import('./ClienteDados.vue')
const ClienteContrato = () => import('./ClienteContrato.vue')
const ClienteDigitalizarDocs = () => import('./ClienteDigitalizarDocs.vue')
const ClienteCarnes = () => import('./ClienteCarnes.vue')
const ClientePagamentos = () => import('./ClientePagamentos')

export default {
  components: {
    ClienteSPC,
    ClienteRenegociar,
    ClienteAuditoria,
    ClienteDados,
    ClienteContrato,
    ClienteDigitalizarDocs,
    ClienteCarnes,
    ClientePagamentos
  },
  data () {
    return {
      tab: "",
      form: {
        id: null,
        redeId: null,
        empresaId: null,
        lojaId: null,
        nome: null,
        cpf: null,
        identidade: null,
        orgaoEmissor: null,
        dataEmissao: null,
        uf: null,
        grupo: null,
        dataNascimento: null,
        naturalEstado: null,
        naturalCidade: null,
        sexo: null,
        estadoCivil: null,
        dependentes: null,
        nomePai: null,
        nomeMae: null,
        telResidencial: null,
        celular: null,
        email: null,
        escolaridade: null,
        rendaPrincipal: null,
        endereco: new Endereco(),
        tipoResidencia: null,
        tempoResidenciaAnos: null,
        tempoResidenciaMeses: null,
        empresa: null,
        cargo: null,
        tempoEmpregoAnos: null,
        tempoEmpregoMeses: null,
        telComercial: null,
        ramal: null,
        nomeRef1: null,
        relacaoRef1: null,
        telRef1: null,
        nomeRef2: null,
        relacaoRef2: null,
        telRef2: null,
        nomeRef3: null,
        relacaoRef3: null,
        telRef3: null,
        nomeRef4: null,
        relacaoRef4: null,
        telRef4: null,
        vendaId: null,
        observacoes: [],
        ultimoHistoricoSPC: null,
        enderecoAlternativo: {
          cep: null,
          logradouro: null,
          numero: null,
          complemento: null,
          uf: null,
          cidadeIbge: null,
          bairro: null
        }
      },
      loading: true
    }
  },
  beforeMount () {
    this.reload(this.$route.params.id, this.$route.params.lojaId)
  },
  watch: {
    tab: {
      handler (val) {
        if (!this.form.empregoCBO && val == 'proposta-adesao') {
          this.$root.showErro('Cliente sem cargo: Atualize o cadastro para prosseguir.')
          this.tab = 'item-dados-cliente'
        }
      },
      deep: true
    }
  },
  methods: {
    reload (clienteId, lojaId) {
      this.form.id = clienteId
      this.form.lojaId = lojaId
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!this.form.id) {
        ClienteBusiness.getById(this.form.id).then(response => {
          this.form.lojaId = this.$route.params.lojaId
          this.setData(response.data)
          this.formatDatas()
        })
      }
    },
    salvar () {
      this.$root.showSucesso('Dados atualizados com sucesso')
    },
    setData (data) {
      let lojaId = this.form.lojaId
      this.form = data
      if (lojaId) {
        this.form.lojaId = lojaId
      }
      if (!this.form.endereco) {
        console.log('endereco nulo')
        this.form.endereco = new Endereco();
      }
      if (!this.form.enderecoAlternativo) {
        console.log('enderecoAlternativo nulo')
        this.form.enderecoAlternativo = {
          cep: null,
          logradouro: null,
          numero: null,
          complemento: null,
          uf: null,
          cidadeIbge: null,
          bairro: null
        }
      }
      this.formatDatas()
    },
    formatDatas () {
      if (this.form.dataEmissao) {
        this.form.dataEmissao = this.$moment(this.form.dataEmissao).format('YYYY-MM-DD')
      }
      if (this.form.dataNascimento) {
        this.form.dataNascimento = this.$moment(this.form.dataNascimento).format('YYYY-MM-DD')
      }
      if (this.form.observacoes) {
        this.form.observacoes = this.form.observacoes.map(value => {
          value.dataCadastro = this.$moment(value.dataCadastro).format('YYYY-MM-DD')
          return value
        })
      }
    },
    cancelar () {
      this.$router.push(`/lista-cliente`)
    },
    tabDadosCliente () {
      this.tab = 'dados-cliente'
    }
  }
}
</script>
