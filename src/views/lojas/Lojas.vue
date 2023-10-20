<!-- eslint-disable vue/no-template-shadow -->
<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex md12>
        <material-card
          color="pink"
          title="Pesquisar Marca"
        >
          <v-card class="elevation-0">
            <v-card-text>
              <v-form>
                <v-layout
                  row
                  wrap
                >
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.nomeFantasia"
                      label="Nome Fantasia"
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
                color="pink"
                @click="pesquisar"
              >
                Pesquisar
              </v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white"
          >
            <v-toolbar-title>Marcas</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            />
            <v-spacer />
            <v-btn
              small
              fab
              color="pink"
            >
              <v-icon @click="newItem()">
                mdi-plus
              </v-icon>
            </v-btn>
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="red"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="lojas"
            :total-items="totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            class="elevation-1 arrow-pagintion"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5
            >
              <td>{{ item.dataCadastro }}</td>
              <td>{{ item.nomeFantasia }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.whatsapp }}</td>
              <td>{{ item.pessoaContato }}</td>
              <td class="justify-end layout ma-2">
                <v-icon
                  class="mr-2"
                  color="red"
                  title="Editar dados da loja"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  color="brown"
                  title="Excluir loja"
                  @click="openDialogDelete(item)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <template
        v-if="dialog"
      >
        <v-layout
          row
          justify-center
        >
          <v-dialog
            v-model="dialog"
            max-width="390"
          >
            <v-card>
              <v-card-title class="headline">
                Excluir Marca
              </v-card-title>

              <v-card-text>Confirma a exclusão da Loja <span class="title">{{ item.nomeFantasia }}</span>? Essa operação não poderá ser desfeita.</v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogDelete"
                >
                  Cancelar
                </v-btn>

                <v-btn
                  color="red"
                  @click="deleteItem"
                >
                  Excluir
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { LojaBusiness, TiposBusiness } from '../../business'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'

export default {
  metaInfo: {
    titleTemplate: '%s - Marcas'
  },
  data () {
    return {
      dialog: false,
      item: null,
      loading: false,
      totalItems: 0,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
	      rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
        sortBy: 'id'
      },
      filtros: {
        id: null,
        nomeFantasia: null,
      },
      lojas: [],
      headers: [
        {
          text: 'Data Cadastro',
          value: 'dataCadastro',
          sortable: false
        },
        {
          text: 'Nome Fantasia',
          value: 'nmFantasia',
          sortable: false
        },
        {
          text: 'Email',
          value: 'email',
          sortable: false
        },
        {
          text: 'Whatsapp',
          value: 'whatsapp',
          sortable: false
        },
        {
          sortable: false,
          text: 'Contato',
          value: 'pessoaContato'
        },
        {
          sortable: false,
          text: ''
        }
      ],
      listaStatus: [],
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
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
    },
    newItem () {
      this.$router.push('cad-loja')
    },
    editItem (item) {
      this.$router.push(`cad-loja/${item.id}`)
    },
    openDialogDelete (item) {
      this.item = item
      this.dialog = true
    },
    closeDialogDelete () {
      this.item = null
      this.dialog = false
    },
    deleteItem () {
      LojaBusiness.delete(this.item.id)
        .then(response => {
          this.$root.showSucesso(response.data)
          this.closeDialogDelete()
          this.paginar()
        })
        .catch(error => this.$root.showErro(error.data))
    },
    pesquisar () {
      this.loadingBtn = true
      this.paginar()
    },
    paginar () {
      this.loading = true
      LojaBusiness.pagination(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'id', this.filtros)
        .then(response => {
          this.lojas = response.data.content
          this.totalItems = response.data.totalElements
        })
        .finally(() => {
          this.loadingBtn = false
          this.loading = false
        })

      this.reload()
    }
  }
}
</script>
