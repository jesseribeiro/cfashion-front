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
        <v-card>
          <v-toolbar
            flat
            color="white"
          >
            <v-toolbar-title>Comissões</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            />
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
            :total-items="totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :rows-per-page-text="pagination.rowsPerPageText"
            item-key="id"
            class="elevation-1"
          >
            <template
              slot="items"
              slot-scope="{ item }"
              ma-5
            >
              <td class="text-xs-center">
                {{ item.tipo }}
              </td>
              <td class="text-xs-center">
                {{ formatValorMonetario(item.comissao) }}
              </td>
              <td class="text-xs-center">
                <v-btn
                  color="primary"
                  @click="openDialogPagar(item)"
                >
                  Editar
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>

      <template
        v-if="dialogPagar"
      >
        <v-layout
          row
          justify-center
        >
          <v-dialog
            v-model="dialogPagar"
            persistent
            max-width="400"
          >
            <v-card>
              <v-card-title class="headline">
                Editar Comissao
              </v-card-title>
              <v-card-text>
                <v-layout
                  row
                  wrap
                >
                  <v-flex md12>
                    <v-text-field
                      v-model.lazy="itemSelecionado.comissao"
                      v-formata-moeda="itemSelecionado.comissao"
                      v-money="money"
                      box
                      type="tel"
                      prefix="R$"
                      label="Comissão"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogPagar"
                >
                  Cancelar
                </v-btn>
                <v-spacer />

                <v-btn
                  :loading="loadingBtn"
                  color="red"
                  @click="confirmarPagar"
                >
                  Confirmar
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
import { ComissaoBusiness } from '../../business'
import { ROWS_PER_PAGE, ROWS_PER_PAGE_ITEMS } from '../../constants'
import numberUtils from '../../utils/numberUtils'

export default {
  metaInfo: {
    titleTemplate: '%s - Comissões'
  },
  data () {
    return {
      selected: [],
      dialogCancelar: false,
      dialogPagar: false,
      comissaoId: null,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
	      rowsPerPageItems: ROWS_PER_PAGE_ITEMS,
        sortBy: 'id'
      },
      headers: [
        {
          sortable: false,
          text: 'Tipo',
          align: 'center',
          value: 'Tipo'
        },
        {
          sortable: false,
          text: 'Comissão',
          align: 'center',
          value: 'comissao'
        },
        {
          sortable: false,
          text: 'Ações',
          align: 'center',
        },
      ],
      items: [],
      totalItems: null,
      loading: false,
      loadingBtn: false,
      itemSelecionado: null
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
    this.loadingBtn = true
    this.paginar()
  },
  methods: {
    closeDialogPagar () {
      this.dialogPagar = false
      this.comissaoId = null
      this.itemSelecionado = null
    },
    confirmarPagar () {
      this.loading = true
      ComissaoBusiness.update(this.itemSelecionado)
        .then(response => {
          this.$root.showSucesso('Operação realizada com sucesso')
          this.paginar()
        }).catch(erro => {
          this.$root.showErro(erro.data)
        }).finally(() => {
          this.loading = false
          this.closeDialogPagar()
        })
    },
    openDialogPagar (item) {
      this.dialogPagar = true
      this.comissaoId = item.id
      this.itemSelecionado = { ...item }
      this.itemSelecionado.comissao = this.formatValorMonetario(this.itemSelecionado.comissao)
    },
    paginar () {
      this.loading = true
      ComissaoBusiness.pagination(
        this.pagination.rowsPerPage, 
        this.pagination.page - 1, 
        this.pagination.sortBy || 'id'
      )
        .then(response => {
          this.items = response.data.content
          this.totalItems = response.data.totalElements
        }).catch(error => {
          this.$root.showErro(error.data)
        })
        .finally(() => {
          this.loadingBtn = false
          this.loading = false
        })
    },
    formatValorMonetario (valor) {
      return numberUtils.formatValorMonetario(valor)
    }
  }
}
</script>
