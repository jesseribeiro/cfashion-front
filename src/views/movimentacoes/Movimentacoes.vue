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
          color="primary"
          title="Adicionar Movimentação"
        >
          <v-card class="elevation-0">
            <v-card-text>
              <v-form>
                <v-layout
                  row
                  wrap
                >
                  <v-flex md8>
                    <v-text-field
                      v-model="filtros.descricao"
                      v-validate="'required'"
                      :error-messages="errors.collect('Descrição')"
                      label="Descrição"
                      data-vv-name="Descrição"
                      required
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model.lazy="filtros.valor"
                      v-formata-moeda="filtros.valor"
                      v-money="money"
                      v-validate="'required'"
                      :error-messages="errors.collect('Valor')"
                      data-vv-name="Valor"
                      suffix="R$"
                      reverse
                      label="Valor"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-autocomplete
                      v-model="filtros.tipo"
                      v-validate="'required'"
                      :items="tipos"
                      :error-messages="errors.collect('Tipo')"
                      label="Tipo"
                      item-value="descricao"
                      item-text="descricao"
                      clearable
                    />
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      v-model="filtros.dataLancamento"
                      v-validate="'required'"
                      label="Data"
                      type="date"
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
                @click="adicionar"
              >
                Adicionar
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
            <v-toolbar-title>Movimentações</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="light-blue"
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
              <td>{{ item.descricao }}</td>
              <td>{{ item.dataLancamento | moment("DD/MM/YYYY") }}</td>
              <td>{{ item.tipo }}</td>
              <td>{{ formatValorMonetario(item.valor) }}</td>
              <td class="justify-end layout ma-2">
                <v-icon
                  color="red"
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

              <v-card-text>Confirma a exclusão da Produto <span class="title">{{ item.tipo }}</span>? Essa operação não poderá ser desfeita.</v-card-text>

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
import { MovimentacaoBusiness } from '../../business'
import { MONEY, ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'
import DateUtils from '../../utils/dateUtils'
import numberUtils from '../../utils/numberUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Movimentações'
  },
  data () {
    return {
      money: MONEY,
      dialog: false,
      dialogAdd: false,
      item: null,
      loading: false,
      totalItems: 0,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
	      rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
        sortBy: 'dataLancamento'
      },
      filtros: {
        id: null,
        descricao: null,
        tipo: null,
        valor: null,
        dataLancamento: DateUtils.currentDate(),
      },
      produtos: [],
      tipos: [
        { id: 1, descricao: 'ENTRADA' },
        { id: 2, descricao: 'SAIDA' }
      ],
      headers: [
        {
          text: 'Nota',
          value: 'descricao',
          sortable: false
        },
        {
          text: 'Data',
          value: 'dataLancamento',
          sortable: false
        },
        {
          text: 'Tipo',
          value: 'tipo',
          sortable: false
        },
        {
          text: 'Valor',
          value: 'valor',
          sortable: false
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
      MovimentacaoBusiness.delete(this.item.id)
        .then(response => {
          this.$root.showSucesso(response.data)
          this.closeDialogDelete()
          this.paginar()
        })
        .catch(error => this.$root.showErro(error.data))
    },
    adicionar () {
      MovimentacaoBusiness.create(this.filtros)
        .then(response => {
          this.$root.showSucesso(response.data)
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
      MovimentacaoBusiness.pagination(
        this.pagination.rowsPerPage, 
        this.pagination.page - 1, 
        this.pagination.sortBy || 'dataLancamento', 
        this.filtros)
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
