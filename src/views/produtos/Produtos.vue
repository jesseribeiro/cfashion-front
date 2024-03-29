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
          title="Pesquisar Produto"
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
                      v-model="filtros.id"
                      label="Código"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.categoria"
                      :items="categorias"
                      :error-messages="errors.collect('Categoria')"
                      label="Categoria"
                      item-value="id"
                      item-text="descricao"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.marcaId"
                      :error-messages="errors.collect('Marca')"
                      :items="marcas"
                      label="Marca"
                      data-vv-name="Marca"
                      name="Marca"
                      item-text="nomeFantasia"
                      item-value="id"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.tamanho"
                      :items="tamanhos"
                      :error-messages="errors.collect('Tamanho')"
                      label="Tamanho"
                      item-value="id"
                      item-text="descricao"
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
            <v-toolbar-title>Produtos</v-toolbar-title>
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
            :items="produtos"
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
              <td>{{ item.codigo }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.marca }}</td>
              <td>{{ item.categoria }}</td>
              <td>{{ item.tamanho }}</td>
              <td>{{ item.qtd }}</td>
              <td>{{ formatValorMonetario(item.valorCompra) }}</td>
              <td class="justify-end layout ma-2">
                <v-icon
                  class="mr-2"
                  color="red"
                  title="Editar dados do produto"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  color="brown"
                  title="Excluir Produto"
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
                Excluir Produto
              </v-card-title>

              <v-card-text>Confirma a exclusão da Produto <span class="title">{{ item.nome }}</span>? Essa operação não poderá ser desfeita.</v-card-text>

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
import { ProdutoBusiness, TiposBusiness, LojaBusiness } from '../../business'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'
import numberUtils from '../../utils/numberUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Produtos'
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
        categoria: null,
        tamanho: null,
        marcaId: null,
      },
      produtos: [],
      marcas: [],
      tamanhos: [],
      categorias: [],
      headers: [
        {
          text: 'Código',
          value: 'codigo',
          sortable: false
        },
        {
          text: 'Nome',
          value: 'nome',
          sortable: false
        },
        {
          text: 'Marca',
          value: 'marca',
          sortable: false
        },
        {
          text: 'Categoria',
          value: 'categoria',
          sortable: false
        },
        {
          text: 'Tamanho',
          value: 'tamanho',
          sortable: false
        },
        {
          sortable: false,
          text: 'Qtd',
          value: 'qtd'
        },
        {
          sortable: false,
          text: 'Valor',
          value: 'valorCompra'
        },
        {
          sortable: false,
          text: ''
        }
      ],
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
    TiposBusiness.getAllTamanho()
      .then(response => {
        this.tamanhos = response.data
      })
    TiposBusiness.getAllCategoria()
      .then(response => {
        this.categorias = response.data
      })
    LojaBusiness.findAll().then((response) => {
        this.marcas = response.data;
      });
    },
    newItem () {
      this.$router.push('cad-produto')
    },
    editItem (item) {
      this.$router.push(`cad-produto/${item.id}`)
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
      ProdutoBusiness.delete(this.item.id)
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
      ProdutoBusiness.pagination(this.pagination.rowsPerPage, this.pagination.page - 1, this.pagination.sortBy || 'id', this.filtros)
        .then(response => {
          this.produtos = response.data.content
          this.totalItems = response.data.totalElements
        })
        .finally(() => {
          this.loadingBtn = false
          this.loading = false
        })

      this.reload()
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    }
  }
}
</script>
