/* eslint-disable no-extra-boolean-cast */
<template>
  <v-container
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex md12>
        <v-alert
          :value="!value.permitirEnvioSPC"
          type="warning"
        >
          <span class="subheading">ATENÇÃO: Esse cliente NÃO vai ser enviado para SPC/SERASA.</span>
        </v-alert>
      </v-flex>
      <v-flex md12>
        <v-expansion-panel
          v-model="flgNegativando"
          :disabled="!value.permitirEnvioSPC"
          expand
        >
          <v-expansion-panel-content
            class="primary">
            <template slot="actions">
              <v-icon color="white">mdi-chevron-down</v-icon>
            </template>
            <template
              slot="header">
              <div class="subtitle white--text">
                <v-icon color="white">mdi-account-off-outline</v-icon> Incluir/Excluir no SERASA/SPC/SPCA ONLINE
              </div>
            </template>
            <v-card class="elevation-0">
              <v-form
                ref="formNegativacao"
                @submit.prevent="incluirOrExcluirSubmit">
                <v-card-title
                  class="subtitle">
                  <p>Informe abaixo a data de <span class="title">inclusão ou retirada do SERASA/SPC/SPCA</span> e clique no botão <span class="title">OK</span>.</p>
                </v-card-title>
                <v-card-text>
                  <v-layout
                    row
                    wrap>
                    <v-flex md2>
                      <v-autocomplete
                        v-validate="'required'"
                        v-model="formNegativando.servicoSPC"
                        :items="servicoSPCList"
                        :error-messages="errors.collect('Tipo')"
                        item-value="id"
                        item-text="descricao"
                        label="Tipo"
                        data-vv-name="Tipo"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-validate="'required'"
                        v-model="formNegativando.operacao"
                        :items="operacoes"
                        :error-messages="errors.collect('Operação')"
                        item-value="id"
                        item-text="descricao"
                        data-vv-name="Operação"
                        label="Operação"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="formNegativando.data"
                        type="date"
                        label="Data"
                        readonly
                      />
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="formNegativando.observacao"
                        label="Observação"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    outline
                    style="color: black !important"
                    @click="cancelarNegativacao()">Cancelar</v-btn>
                  <v-btn
                    :loading="loadingBtn"
                    type="submit"
                    color="primary"
                  >OK</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md12>
        <material-card
          color="primary"
          flat
          full-width
          title="Consultas Cadastrais Realizadas">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="items"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td>{{ item.servicoSPC }}</td>
                  <td>{{ item.respostaRecebida }}</td>
                  <td class="text-xs-center">{{ item.classe }}</td>
                  <td class="text-xs-center">{{ item.dataConsulta | moment("DD/MM/YYYY H:mm") }}</td>
                  <td class="justify-end layout ma-2">
                    <v-icon
                      class="mr-2"
                      @click="visualizarDetalhe(item)"
                    >mdi-magnify</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="!$root.isNegoc()"
                color="primary"
                @click="dialogNovaConsulta = true"
              >Nova Consulta</v-btn>
            </v-card-actions>
          </v-card>
        </material-card>
      </v-flex>
    </v-layout>
    <template
      v-if="itemDetalhe">
      <v-card class="elevation-0">
        <v-card-title>
          <h3 class="headline mb-0">Detalhes Da Pesquisa Cadastral</h3>
        </v-card-title>
        <v-card-text>
          <v-layout
            row
            wrap>
            <v-flex md12>
              <span class="title">Cliente</span>
            </v-flex>
            <v-flex
              class="ml-2"
              md3>
              <core-label-value
                :label="'Nome do Cliente'"
                :value="value.nome"
              />
            </v-flex>
            <v-flex md3>
              <core-label-value
                :label="'Data Nascimento'"
                :value="value.dataNascimento | moment('DD/MM/YYYY')"
              />
            </v-flex>
            <v-flex md5>
              <core-label-value
                :label="'Endereço'"
                :value="printEndereco()"
              />
            </v-flex>
            <v-flex
              class="ml-2"
              md3>
              <core-label-value
                :label="'Quantidade Total de Ocorrências'"
                :value="itemDetalhe.quantidadeTotalOcorrencia ? itemDetalhe.quantidadeTotalOcorrencia : ''"
              />
            </v-flex>
            <v-flex
              md3>
              <core-label-value
                :label="'Valor Total de Ocorrências'"
                :value="itemDetalhe.valorTotalOcorrencia ? 'R$ ' + itemDetalhe.valorTotalOcorrencia.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''"
              />
            </v-flex>
            <v-flex md2>
              <core-label-value
                :label="'Situação CPF'"
                :value="itemDetalhe.situacaoCpf"
              />
            </v-flex>
            <v-flex md3>
              <core-label-value
                :label="'Situação no SPC Brasil'"
                :value="itemDetalhe.respostaRecebida ? itemDetalhe.respostaRecebida : ''"
              />
            </v-flex>
            <v-flex
              class="ml-2"
              md3>
              <core-label-value
                :label="'Score'"
                :value="itemDetalhe.score + ''"
              />
            </v-flex>
            <v-flex
              md3>
              <core-label-value
                :label="'Probabilidade'"
                :value="itemDetalhe.probabilidade ? itemDetalhe.probabilidade + '%' : '%'"
              />
            </v-flex>
            <v-flex md2>
              <core-label-value
                :label="'Classe'"
                :value="itemDetalhe.classe"
              />
            </v-flex>
            <v-flex md2>
              <core-label-value
                :label="'Tipo Cliente'"
                :value="itemDetalhe.tipoClienteScore ? itemDetalhe.tipoClienteScore : ''"
              />
            </v-flex>
            <v-flex md1>
              <core-label-value
                :label="'Horizonte'"
                :value="itemDetalhe.horizonte + ''"
              />
            </v-flex>
            <v-flex md12>
              <span class="title">Consulta</span>
            </v-flex>
            <v-flex
              class="ml-2"
              md3>
              <core-label-value
                :label="'Protocolo'"
                :value="itemDetalhe.protocolo ? itemDetalhe.protocolo : ''"
              />
            </v-flex>
            <v-flex md3>
              <core-label-value
                :label="'Operador'"
                :value="itemDetalhe.operador ? itemDetalhe.operador : ''"
              />
            </v-flex>
            <v-flex md3>
              <core-label-value
                :label="'Data/Hora'"
                :value="itemDetalhe.dataCadastro | moment('DD/MM/YYYY H:mm')"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-expansion-panel
        v-model="panel"
        expand
      >
        <v-expansion-panel-content
          :key="0"
          class="primary"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Ocorrências</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersOcorrencia"
              :items="itemDetalhe.ocorrencias"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-center">{{ item.dataInclusao | moment("DD/MM/YYYY") }}</td>
                  <td class="text-xs-center">{{ item.dataVencimento | moment("DD/MM/YYYY") }}</td>
                  <td
                    v-if="item.valor"
                    class="text-xs-right"
                  >{{ item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                  <td v-else>0</td>
                  <td class="text-xs-center">{{ item.contrato }}</td>
                  <td class="text-xs-left">{{ item.tipo }}</td>
                  <td class="text-xs-left">{{ item.informante }}</td>
                  <td class="text-xs-left">{{ item.cidadeInformante }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          :key="1"
          class="primary mt-1"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Alerta de Documentos</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersAlertaDocumentos"
              :items="itemDetalhe.alertaDocumentos"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-center">{{ item.dataInclusao | moment("DD/MM/YYYY") }}</td>
                  <td class="text-xs-center">{{ item.dataOcorrencia | moment("DD/MM/YYYY") }}</td>
                  <td class="text-xs-left">{{ item.entidadeOrigem }}</td>
                  <td class="text-xs-left">{{ item.motivo }}</td>
                  <td class="text-xs-left">
                    <v-chip
                      v-for="(doc, i) in item.tiposDocumentos.split(',')"
                      :key="i"
                      class="ml-0"
                      small
                    >
                      {{ doc }}
                    </v-chip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          :key="2"
          class="primary mt-1"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Ultimos Telefone Informado</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersUltimosTelefoneInformado"
              :items="itemDetalhe.ultimosTelefoneInformado"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-center">{{ item.ddd }}</td>
                  <td class="text-xs-left">{{ item.numero }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          :key="3"
          class="primary mt-1"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Ultimos Endereços Informado</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersUltimosEnderecosInformado"
              :items="itemDetalhe.ultimosEnderecosInformado"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-left">{{ item.logradouro }}</td>
                  <td class="text-xs-left">{{ item.numero }}</td>
                  <td class="text-xs-left">{{ item.bairro }}</td>
                  <td class="text-xs-left">{{ item.cep }}</td>
                  <td class="text-xs-left">{{ item.cidade }}</td>
                  <td class="text-xs-left">{{ item.uf }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          :key="4"
          class="primary mt-1"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Créditos Concedido</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersCreditosConcedido"
              :items="itemDetalhe.creditosConcedido"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-center">{{ item.ano }}</td>
                  <td class="text-xs-center">{{ item.mesVencimento }}</td>
                  <td class="text-xs-center">{{ item.quantidadeCredito }}</td>
                  <td
                    v-if="item.valor"
                    class="text-xs-right"
                  >{{ item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                  <td v-else>0</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          :key="5"
          class="primary mt-1"
        >
          <template slot="actions">
            <v-icon color="white">mdi-chevron-down</v-icon>
          </template>
          <template slot="header">
            <span class="title white--text">Consultas Anteriores</span>
          </template>
          <v-card>
            <v-data-table
              :headers="headersConsultasRealizada"
              :items="itemDetalhe.consultasRealizada"
              class="elevation-1 arrow-pagintion"
              hide-actions
            >
              <template
                slot="items"
                slot-scope="{ item }"
                ma-5>
                <tr>
                  <td class="text-xs-center">{{ item.dataConsulta | moment("DD/MM/YYYY") }}</td>
                  <td class="text-xs-left">{{ item.nomeAssociado }}</td>
                  <td class="text-xs-left">{{ item.nomeEntidade }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
    <core-progress-modal :show="loading" />
    <template
      v-if="dialogNovaConsulta">
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="dialogNovaConsulta"
          persistent
          max-width="390">
          <v-card>
            <v-card-title class="headline">Nova Consulta</v-card-title>
            <v-card-text>
              <p
                class="title"
              >
                Confirma a realização de uma nova consulta cadastral desse cliente?
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="dialogNovaConsulta = false">Cancelar</v-btn>
              <v-spacer/>

              <v-btn
                :loading="loadingBtn"
                color="primary"
                @click="confirmarNovaConsulta">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { TiposBusiness } from '../../business'
import dateUtils from '../../utils/dateUtils'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loadingBtn: false,
      dialogNovaConsulta: false,
      servicoSPCList: [],
      flgNegativando: [],
      itemDetalhe: null,
      paineis: 5,
      panel: [true, true, true, true, true, true], // para cada lista/painel precisa ter um registro dentro desse array
      formNegativando: {
        clienteId: null,
        lojaId: null,
        operacao: 'INCLUSAO',
        servicoSPC: null,
        data: dateUtils.currentDate(),
        observacao: null
      },
      operacoes: [
        { id: 'INCLUSAO', descricao: 'Inclusão' },
        { id: 'EXCLUSAO', descricao: 'Exclusão' }
      ],
      headers: [
        {
          sortable: false,
          text: 'Origem da Consulta'
        },
        {
          sortable: false,
          text: 'Resposta Recebida'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Grupo Risco'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Realizada em'
        },
        {
          sortable: false,
          text: ''
        }
      ],
      headersOcorrencia: [
        {
          sortable: false,
          align: 'center',
          text: 'Data Inclusão'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Data Vencto'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Valor'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Contrato'
        },
        {
          sortable: false,
          text: 'Tipo'
        },
        {
          sortable: false,
          text: 'Informante'
        },
        {
          sortable: false,
          text: 'Cidade'
        }
      ],
      headersAlertaDocumentos: [
        {
          sortable: false,
          align: 'center',
          text: 'Data Inclusão'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Data Ocorrência'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Entidade Origem'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Motivo'
        },
        {
          sortable: false,
          text: 'Documentos'
        }
      ],
      headersUltimosTelefoneInformado: [
        {
          sortable: false,
          align: 'center',
          text: 'DDD'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Número'
        }
      ],
      headersUltimosEnderecosInformado: [
        {
          sortable: false,
          align: 'left',
          text: 'Logradouro'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Número'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Bairro'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Cep'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Cidade'
        },
        {
          sortable: false,
          align: 'left',
          text: 'UF'
        }
      ],
      headersCreditosConcedido: [
        {
          sortable: false,
          align: 'center',
          text: 'Ano'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Mês Vencimento'
        },
        {
          sortable: false,
          align: 'center',
          text: 'Quantidade Crédito'
        },
        {
          sortable: false,
          align: 'right',
          text: 'Valor'
        }
      ],
      headersConsultasRealizada: [
        {
          sortable: false,
          align: 'center',
          text: 'Data Consulta'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Nome Associado'
        },
        {
          sortable: false,
          align: 'left',
          text: 'Nome Entidade'
        }
      ],
      items: [],
      totalItems: null
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.loading = true
    TiposBusiness.getAllServicoSPC()
      .then(response => { this.servicoSPCList = response.data })
      .catch(() => { this.$root.showErro('Não foi possível buscar as informações dos motores de créditos') })
      .finally(() => {
        this.loadListConsultas()
      })
  },
  methods: {
    incluirOrExcluirSubmit () {
      if (!this.$root.isAdmin()) {
        this.$root.showAlerta('Apenas Administradores podem incluir/excluir no SPC')
        return
      }  
      this.$validator.validate().then(result => {
        if (result) {
          this.loading = true
          this.formNegativando.clienteId = this.value.id
          this.formNegativando.lojaId = this.value.lojaId
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
      })
    },
    cancelarNegativacao () {
      this.flgNegativando = []
      this.formNegativando = {
        clienteId: null,
        lojaId: null,
        operacao: 'INCLUSAO',
        servicoSPC: null,
        data: dateUtils.currentDate(),
        observacao: null
      }
    },
    loadListConsultas () {
      this.loading = true
    },
    confirmarNovaConsulta () {
      this.loadingBtn = true
    },
    visualizarDetalhe (item) {
      this.loading = true
    },
    printEndereco () {
      return this.value.endereco.logradouro + ', ' + this.value.endereco.bairro + '/' + this.value.endereco.estado + ' CEP: ' + this.value.endereco.cep
    }
  }
}
</script>
