<template>
  <div>
    <core-progress-modal :show="loading" />
    <v-tabs
      v-if="!loading"
      v-model="tab"
      centered
      color="primary"
      dark
      icons-and-text
    >
      <v-tabs-slider color="white" />

      <v-tab 
        key="dados-cliente" 
        href="#dados-cliente">
        Dados Cliente
        <v-icon>mdi-card-account-details</v-icon>
      </v-tab>

      <v-tab 
        key="vendas" 
        href="#vendas">
        Vendas
        <v-icon>mdi-animation</v-icon>
      </v-tab>

      <v-tab 
        key="pagamentos" 
        href="#pagamentos">
        Pagamentos
        <v-icon>mdi-cash-multiple</v-icon>
      </v-tab>

      <v-tab-item
        key="item-dados-cliente"
        value="dados-cliente"
        lazy
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
        key="item-vendas"
        value="vendas"
        lazy
      >
        <cliente-vendas
          :value="form"
        />
      </v-tab-item>
      <v-tab-item
        key="item-pagamentos"
        value="pagamentos"
        lazy
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
  watch: {
    tab: {
      handler (val) {
        this.tab = 'item-dados-cliente'
      },
      deep: true
    }
  },
  beforeMount () {
    this.reload(this.$route.params.id)
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
