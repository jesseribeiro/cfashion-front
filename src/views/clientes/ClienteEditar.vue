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

      <v-tab href="#vendas" key="vendas">
        Vendas
        <v-icon>mdi-animation</v-icon>
      </v-tab>

      <v-tab href="#pagamentos" key="pagamentos">
        Pagamentos
        <v-icon>mdi-cash-multiple</v-icon>
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
        value="vendas"
        lazy
        key="item-vendas"
      >
        <cliente-vendas
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
    </v-tabs>
  </div>
</template>
<script>
import Endereco from '../../beans/Endereco'
import { ClienteBusiness } from '../../business'

const ClienteDados = () => import('./ClienteDados.vue')
const ClienteVendas = () => import('./ClienteVendas.vue')
const ClientePagamentos = () => import('./ClientePagamentos')

export default {
  components: {
    ClienteDados,
    ClienteVendas,
    ClientePagamentos
  },
  data () {
    return {
      tab: "",
      form: {
        id: null,
        nome: null,
        cpf: null,
        dataNascimento: null,
        sexo: null,
        celular: null,
        email: null,
        endereco: new Endereco(),
      },
      loading: true
    }
  },
  beforeMount () {
    this.reload(this.$route.params.id)
  },
  watch: {
    tab: {
      handler (val) {
        this.tab = 'item-dados-cliente'
      },
      deep: true
    }
  },
  methods: {
    reload (clienteId) {
      this.form.id = clienteId
      
      if (!!this.form.id) {
        ClienteBusiness.getById(this.form.id).then(response => {
          this.setData(response.data)
          this.formatDatas()
          this.loading = false;
        })
      }
    },
    salvar () {
      this.$root.showSucesso('Dados atualizados com sucesso')
    },
    setData (data) {
      this.form = data
      if (!this.form.endereco) {
        this.form.endereco = new Endereco();
      }
      this.formatDatas()
    },
    formatDatas () {
      if (this.form.dataNascimento) {
        this.form.dataNascimento = this.$moment(this.form.dataNascimento).format('YYYY-MM-DD')
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
