<template>
  <v-card class="elevation-0">
    <v-toolbar
      flat
      color="white">
      <v-toolbar-title>Cruzar dados do cliente</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical />
      <v-spacer />
      <v-btn
        :loading="loadingBtn"
        color="primary"
        @click="cruzarDados"
      >
        Cruzar Dados
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="dados"
        class="elevation-1 arrow-pagintion"
        hide-actions
      >
        <template
          slot="headers"
          scope="props"
        >
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="header.class"
              :align="header.align"
              :width="header.width"
            >
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template
          slot="items"
          scope="props"
        >
          <tr>
            <td>
              <v-icon
                @click="props.item.expanded = !props.item.expanded"
              >
                {{ props.item.expanded ? 'mdi-minus' : 'mdi-plus' }}
              </v-icon>
            </td>
            <td style="font-weight: 500">{{ props.item.descricao }}</td>
            <td
              style="font-weight: 500"
              class="text-xs-right"
            >{{ props.item.quantidade }}</td>
          </tr>
          <tr v-if="props.item.expanded">
            <td colspan="3">
              <v-data-table
                :headers="headersItems"
                :items="props.item.items"
                hide-actions
                class="elevation-1 arrow-pagintion"
              >
                <template
                  slot="items"
                  slot-scope="{ item }"
                  ma-5>
                  <tr>
                    <td class="text-xs-left">{{ item.redeNome }}</td>
                    <td class="text-xs-left">{{ item.lojaNome }}</td>
                    <td class="text-xs-left">{{ item.clienteNome }}</td>
                    <td class="text-xs-center">{{ item.cpf }}</td>
                    <td class="text-xs-center">{{ item.identidade }}</td>
                    <td class="text-xs-center">{{ item.dataCadastro | moment('DD/M/YYYY') }}</td>
                    <td class="text-xs-right">{{ item.saldoDevedor }}</td>
                    <td class="text-xs-center">{{ item.status }}</td>
                    <td class="text-xs-right">{{ item.diasAtraso }}</td>
                    <td class="text-xs-right">
                      <v-icon
                        class="mr-2"
                        @click="visualizarCliente(item)"
                      >
                        mdi-magnify
                      </v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { ClienteBusiness } from '../../business'
export default {
  // https://zaengle.com/blog/using-v-model-on-nested-vue-components
  props: {
    value: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  /*
  dados: [
    {
      descricao: '',
      quantidade: 0,
      items: [
        {
          redeId: 0,
          clienteId: 0,
          lojaId: 0,
          clienteNome: 0,
          lojaNome: 0,
          redeNome: 0,
          cpf: '',
          identidade: '',
          dataCadastro: '',
          saldoDevedor: '',
          status: '',
          diasAtraso: 0
        }
      ]
  ]
  */
  data () {
    return {
      panel: [this.expanded],
      loadingBtn: false,
      dados: [],
      headers: [
        {
          sortable: false,
          text: '',
          value: '',
          class: 'grey lighten-1',
          align: 'left',
          width: '2%'
        },
        {
          sortable: false,
          text: 'Informações Encontradas',
          value: 'informacao',
          class: 'grey lighten-1',
          align: 'left',
          width: '100%'
        },
        {
          sortable: false,
          text: 'Quantidade',
          value: 'quantidade',
          class: 'grey lighten-1',
          align: 'right'
        }
      ],
      headersItems: [
        {
          sortable: false,
          text: 'Rede',
          value: 'rede',
          class: 'grey lighten-1',
          align: 'left'
        },
        {
          sortable: false,
          text: 'Loja',
          value: 'loja',
          class: 'grey lighten-1',
          align: 'left'
        },
        {
          sortable: false,
          text: 'Nome Cliente',
          value: 'nome',
          class: 'grey lighten-1',
          align: 'left'
        },
        {
          sortable: false,
          text: 'CPF',
          value: 'cpf',
          class: 'grey lighten-1',
          align: 'center'
        },
        {
          sortable: false,
          text: 'Identidade',
          value: 'identidade',
          class: 'grey lighten-1',
          align: 'left'
        },
        {
          sortable: false,
          text: 'Cliente Desde',
          value: 'dataCadastro',
          class: 'grey lighten-1',
          align: 'center'
        },
        {
          sortable: false,
          text: 'Saldo Devedor',
          value: 'saldo',
          class: 'grey lighten-1',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Situação Contrato',
          value: 'status',
          class: 'grey lighten-1',
          align: 'left'
        },
        {
          sortable: false,
          text: 'Atraso',
          value: 'diasAtraso',
          class: 'grey lighten-1',
          align: 'right'
        },
        {
          sortable: false,
          text: '',
          value: '',
          class: 'grey lighten-1',
          align: 'right'
        }
      ]
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
  },
  methods: {
    cruzarDados () {
      this.loadingBtn = true
      ClienteBusiness.cruzarDadosCliente(this.value.id, this.value.lojaId)
        .then(response => {
          this.dados = response.data
          this.loadingBtn = false
          if (this.dados && this.dados.length === 0) {
            this.$root.showAlerta(this.$vuetify.t('$vuetify.Alerta.semResultado'))
          }
        }).catch(error => {
          this.loadingBtn = false
          this.$root.showErro(error.data)
        })
    },
    visualizarCliente (item) {
      this.$router.push(`/cad-cliente/${item.clienteId}/${item.lojaId}`)
      window.location.reload()
    }
  }
}
</script>
