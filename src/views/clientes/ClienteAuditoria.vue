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
          title="Auditoria - Lançamentos do Cliente">
          <v-card class="elevation-0">
            <v-form
              @submit.prevent="pesquisar">
              <v-card-text>
                <v-layout
                  row
                  wrap>
                  <v-flex md5>
                    <v-text-field
                      v-model="filtros.dataInicial"
                      label="Data Inicial"
                      type="date"
                    />
                  </v-flex>
                  <v-flex md1>
                    <span class="layout fill-height align-center justify-center">a</span>
                  </v-flex>
                  <v-flex md5>
                    <v-text-field
                      v-model="filtros.dataFinal"
                      label="Data Final"
                      type="date"
                    />
                  </v-flex>
                  <v-flex md5>
                    <v-autocomplete
                      v-model="filtros.entity"
                      :items="entities"
                      item-value="id"
                      item-text="descricao"
                      label="Operação"
                    />
                  </v-flex>
                  <v-flex md1/>
                  <v-flex md5>
                    <v-autocomplete
                      v-model="filtros.operacao"
                      :items="operacoes"
                      item-value="id"
                      item-text="descricao"
                      label="Tipo"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :loading="loadingBtn"
                  color="primary"
                  type="submit">Pesquisar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </material-card>
      </v-flex>
      {{ items }}
      <v-flex md12>
        <v-card>
          <v-toolbar
            flat
            color="white">
            <v-toolbar-title>Auditorias</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical />
          </v-toolbar>
          <v-progress-linear
            :active="loading"
            color="light-blue"
            indeterminate
            height="3"
          />
          <v-data-table
            :headers="headers"
            :items="lancamentos"
            hide-actions
          >
            <template slot="items" slot-scope="{ item }">
              <tr>
                <td class="text-xs-center">
                  {{ item.dataHora | moment("DD/MM/YYYY") }}
                </td>
                <td>{{ item.usuario }}</td>
                <td>{{ item.operacao }}</td>
                <td><span v-html="printDetalhe(JSON.parse(item.clienteJSON))" /></td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { TiposBusiness } from '../../business'
import { TODAS_ID } from '../../constants'

export default {
  metaInfo: {
    titleTemplate: '%s - Auditoria'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filtros: {
        entity: 'ClienteBean',
        clienteId: null,
        lojaId: null,
        dataInicial: null,
        dataFinal: null,
        operacao: TODAS_ID
      },
      headers: [
        {
          sortable: false,
          text: 'Data/Hora',
          align: 'center',
          value: 'data'
        },
        {
          sortable: false,
          text: 'Usuário',
          align: 'left',
          value: 'usuario'
        },
        {
          sortable: false,
          text: 'Operação',
          value: 'valorVenda'
        },
        {
          sortable: false,
          text: 'Detalhes',
          value: 'detalhes'
        }
      ],
      items: [],
      lancamentos: [],
      loading: false,
      loadingBtn: false,
      operacoes: [],
      entities: []
    }
  },
  beforeMount () {
    this.filtros.clienteId = this.value.id
    this.filtros.lojaId = this.value.lojaId
    var promiseEntities = TiposBusiness.getAllEntitiesClientesAuditaveis()
      .then(response => {
        this.entities = this.entities.concat(response.data)
        this.entities.push({ descricao: 'Todas Operações' })
      })

    var promiseOperacoesAuditoria = TiposBusiness.getAllOperacoesAuditaveis()
      .then(response => {
        this.operacoes.push({ id: TODAS_ID, descricao: 'Todas' })
        this.operacoes = this.operacoes.concat(response.data)
      })

    Promise.all([
      promiseEntities,
      promiseOperacoesAuditoria
    ]).finally(() => {
      this.loading = false
    })
  },
  methods: {
    pesquisar () {
      if (!this.filtros.entity) {
        this.$root.showAlerta('Informe uma Operação')
        return
      }
      this.loadingBtn = true
      this.paginar()
    },
    paginar () {
      if (!this.filtros.entity) {
        return
      }
      this.loading = true
    },
    printDetalhe (item) {
      let detalhes = ''
      Object.keys(item).forEach(key => {
        if (!['id', 'cliente_id', 'rev', 'revtype', 'vendedor_id', 
        'repasse_id', 'dependente_id', 'limite_exclusivo_id',
        'acordo_id_algorix', 'renegociacao_origem_id', 'sequencial_carne_algorix' ].includes(key)) {
          if (key.indexOf('data') > -1) {
            detalhes += `<b>${key}: </b>`
            if (item[key]) {
              detalhes += this.$moment(item[key]).format('DD/MM/YYYY')
            }
          } else {
            detalhes += `<b>${key}: </b>`
            if (item[key]) {
              detalhes += item[key]
            }
          }
          detalhes += ` <br>`
        }
      })
      return detalhes
    }
  }
}
</script>
