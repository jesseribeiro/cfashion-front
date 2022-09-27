<template>
  <v-container
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex md12>
        <material-card
          color="primary"
          title="Pesquisar Cliente">
          <v-card class="elevation-0">
            <v-card-text>
              <v-form>
                <v-layout
                  row
                  wrap>
                  <v-flex md12>
                    <core-filtro-rede-empresa-loja
                      v-model="filtros"
                      show-todas
                    />
                  </v-flex>
                  <v-flex md5>
                    <v-text-field
                      v-model="filtros.nome"
                      label="Nome"/>
                  </v-flex>
                  <v-flex md2>
                    <v-text-field
                      v-mask="'###.###.###-##'"
                      v-model.trim="filtros.cpf"
                      label="CPF"
                      type="text"/>
                  </v-flex>
                  <!--
                  <v-flex md2>
                    <v-text-field label="Data Nascimento" v-model="filtros.dataNascimento" type="date"/>
                  </v-flex>
                  -->
                  <v-flex md2>
                    <v-text-field
                      v-mask="['(##) #### - ####', '(##) ##### - ####']"
                      v-model="filtros.telResidencial"
                      label="Telefone"
                      type="text"/>
                  </v-flex>

                  <v-flex md3>
                    <v-text-field
                      v-model="filtros.identidade"
                      label="Identidade"
                      type="text"/>
                  </v-flex>
                  <!--
                  <v-flex md2>
                    <v-text-field label="Data Inicial Cadastro" v-model="filtros.dataInicial" type="date"/>
                  </v-flex>
                  <v-flex md1>
                    <span class="layout fill-height align-center justify-center">a</span>
                  </v-flex>
                  <v-flex md2>
                    <v-text-field label="Data Final Cadastro" v-model="filtros.dataFinal" type="date"/>
                  </v-flex>
                  -->
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="primary"
                @click="pesquisar">Pesquisar</v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white">
            <v-toolbar-title>Clientes</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical />
            <v-spacer />
            <v-btn
              small
              fab
              color="primary">
              <v-icon @click="newItem()">mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="light-blue"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="true"
            :total-items="totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5>
              <td>{{ item.nome }}</td>
              <td>{{ item.telefone }}</td>
              <td>{{ item.cpf }}</td>
              <td v-if="!!item.dataNascimento">{{ item.dataNascimento | moment("DD/MM/YYYY") }}</td>
              <td v-else>{{ '-' }}</td>
              <td>{{ item.identidade }}</td>
              <td>{{ item.nomeLoja }}</td>
              <td v-if="!!item.clienteDesde">{{ item.clienteDesde | moment("DD/MM/YYYY") }}</td>
              <td v-else>{{ '-' }}</td>
              <td class="justify-end layout ma-2">
                <v-icon
                  class="mr-2"
                  color="primary"
                  title="Editar dados da cliente"
                  @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon
                  v-if="$root.isAdminSup() || $root.isNegoc()"
                  class="mr-2"
                  color="secondary"
                  title="Cobrança Cliente"
                  @click="iniciarCobranca(item)">mdi-headset</v-icon>
                <v-icon
                  class="mr-2"
                  color="error"
                  title="Comprovante de Quitação"
                  @click="comprovanteQuitacao(item)">mdi-certificate</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <cliente-comprovante-quitacao
      v-if="dialogComprovante"
      v-model="item"
      :show="dialogComprovante"
      :close="closeComprovante"
    />
  </v-container>
</template>

<script>
import ClienteBusiness from '../../business/ClienteBusiness'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS, TODAS_ID } from '../../constants'

const ClienteComprovanteQuitacao = () => import('./ClienteComprovanteQuitacao.vue')

export default {
  components: {
    ClienteComprovanteQuitacao
  },
  metaInfo: {
    titleTemplate: '%s - Clientes'
  },
  data () {
    return {
      dialog: false,
      item: null,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
	      rowsPerPageItems: ROWS_PER_PAGE_ITEMS
      },
      selected: [],
      dialogComprovante: false,
      filtros: {
        redeId: TODAS_ID,
        empresaId: TODAS_ID,
        lojaId: TODAS_ID,
        nome: '',
        cpf: null,
        dataNascimento: null,
        telResidencial: '',
        identidade: null,
        dataInicial: null,
        dataFinal: null
      },
      search: '',
      headers: [
        {
          sortable: false,
          text: 'Nome',
          value: 'nome'
        },
        {
          sortable: false,
          text: 'Telefone',
          value: 'telefone'
        },
        {
          sortable: false,
          text: 'CPF',
          value: 'cpf'
        },
        {
          sortable: false,
          text: 'Data Nascimento',
          value: 'dataNascimento'
        },
        {
          sortable: false,
          text: 'Identidade',
          value: 'identidade'
        },
        {
          sortable: false,
          text: 'Nome Loja',
          value: 'nomeLoja'
        },
        {
          sortable: false,
          text: 'Cliente Desde',
          value: 'dataCadastro'
        },
        {
          sortable: false,
          text: 'Ações',
          align: 'center'
        }
      ],
      items: [],
      totalItems: null,
      loading: false,
      loadingBtn: false
    }
  },
  watch: {
    pagination: {
      handler () {
        this.paginar()
      }
    }
  },
  beforeMount () {
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
    },
    newItem () {
      this.$router.push('/cad-cliente')
    },
    editItem (item) {
      this.$router.push(`/cad-cliente/${item.clienteId}/${item.lojaId}`)
    },
    validaFiltros () {
      return this.filtros.nome || this.filtros.cpf || this.filtros.identidade || this.filtros.telResidencial
    },
    pesquisar () {
      if (!this.validaFiltros()) {
        this.$root.showAlerta('Preencha alguma informação do cliente para a pesquisa.')
        return
      }
      this.loadingBtn = true
      this.paginar()
    },
    paginar () {
      if (this.validaFiltros()) {
        this.loading = true
        ClienteBusiness.pagination(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'nome', this.filtros).then(response => {
          this.items = response.data.content
          this.totalItems = response.data.totalElements
          try {
            if (this.items[0].data !== '') {
              this.$root.showSucesso('Cliente encontrado')
            }
          } catch (e) {
            this.$root.showAlerta('Cliente não encontrado')
          }
        })
          .finally(() => {
            this.loadingBtn = false
            this.loading = false
          })
      }
    },
    iniciarCobranca (item) {
      this.$router.push(`/cliente-cobranca/${item.clienteId}/${item.lojaId}`)
    },
    comprovanteQuitacao (item) {
      this.loading = true
      ClienteBusiness.verificaCliente(item)
        .then(response => {
          // this.openComprovante(item)
          ClienteBusiness.imprimeComprovante(item).then(reponse => {
            this.loading = false
          })
          .catch((erro) => {
            this.$root.showAlerta('Cliente não possui comprovante');
            this.loading = false
        }) 
        })
        .catch((erro) => {
          this.$root.showAlerta(erro.data);
          this.loading = false
        }) 
    },
    closeComprovante () {
      this.dialogComprovante = false
    },
    openComprovante (item) {
      this.item = item
      this.dialogComprovante = true
    }
  }
}
</script>
