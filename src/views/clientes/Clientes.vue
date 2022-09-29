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
                  <v-flex md5>
                    <v-text-field
                      v-model="filtros.nome"
                      label="Nome"
                      clearable
                    />
                  </v-flex>
                  <v-flex md2>
                    <v-text-field
                      v-mask="'###.###.###-##'"
                      v-model.trim="filtros.cpf"
                      label="CPF"
                      type="text"
                      clearable
                    />
                  </v-flex>
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
              <td>{{ item.celular }}</td>
              <td>{{ item.cpf }}</td>
              <td v-if="!!item.dataNascimento">{{ item.dataNascimento | moment("DD/MM/YYYY") }}</td>
              <td v-else>{{ '-' }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.sexo }}</td>
              <td v-if="!!item.dataCadastro">{{ item.dataCadastro | moment("DD/MM/YYYY") }}</td>
              <td v-else>{{ '-' }}</td>
              <td class="justify-end layout ma-2">
                <v-icon
                  class="mr-2"
                  color="primary"
                  title="Editar dados da cliente"
                  @click="editItem(item)">mdi-pencil</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClienteBusiness from '../../business/ClienteBusiness'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'

export default {
  components: {
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
      filtros: {
        nome: '',
        cpf: null,
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
          value: 'celular'
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
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Sexo',
          value: 'sexo'
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
      console.log(item)
      this.$router.push(`/cad-cliente/${item.id}`)
    },
    validaFiltros () {
      return this.filtros.nome || this.filtros.cpf
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
  }
}
</script>
