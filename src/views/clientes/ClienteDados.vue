<template>
  <v-container
    fluid
    grid-list-md
  >
    <core-progress-modal :show="loading" />
    <v-form
      v-if="!loading"
      ref="form2"
      v-model="valid"
      lazy-validation
      @submit.prevent="validateBeforeSubmit"
    >
      <v-layout
        row
        wrap
      >
        <v-flex sm12>
          <v-alert
            class="justify-content-center align-center orange lighten-5"
            :value="
              !value.permitirEnvioSPC ||
                value.ultimoHistoricoSPC ||
                temObservacao
            "
            color="warning"
            type="warning"
            outline
          >
            <p
              v-for="item in observacoesNotif"
              :key="item.id"
              class="subheading pa-0 ma-0"
            >
              {{ item.dataCadastro | moment("DD/MM/YYYY") }} -
              {{ item.descricao }}
            </p>
            <p
              v-if="!value.permitirEnvioSPC"
              class="subheading pa-0 ma-0"
            >
              ATENÇÃO: Esse cliente NÃO vai ser enviado para SPC/SERASA.
            </p>
            <p
              v-if="value.ultimoHistoricoSPC"
              class="subheading pa-0 ma-0"
            >
              CLIENTE NO {{ value.ultimoHistoricoSPC.servicoSPC }} DESDE
              {{
                $moment(value.ultimoHistoricoSPC.dataCadastro).format(
                  "DD/MM/YYYY"
                )
              }}
            </p>
          </v-alert>
        </v-flex>
        <v-flex md12>
          <v-expansion-panel
            v-model="panel"
            expand
          >
            <v-expansion-panel-content
              :key="0"
              class="primary"
            >
              <template slot="actions">
                <v-icon color="white">
                  mdi-chevron-down
                </v-icon>
              </template>
              <template slot="header">
                <span class="title white--text">Identificação</span>
              </template>
              <v-card class="elevation-0">
                <v-card-text>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex md3>
                      <v-text-field
                        v-model="value.nome"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nome')"
                        name="nome"
                        data-vv-name="Nome"
                        label="Nome"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.tipoDocumento"
                        v-validate="'required'"
                        :error-messages="errors.collect('Tipo de Documento')"
                        :items="tiposDocumentos"
                        label="Tipo de Documento"
                        name="tipoDocumento"
                        data-vv-name="Tipo de Documento"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md3>
                      <v-text-field
                        v-model="value.identidade"
                        v-validate="'required'"
                        :error-messages="errors.collect('Núm. Identidade')"
                        name="identidade"
                        data-vv-name="Núm. Identidade"
                        maxlength="15"
                        label="Núm. Identidade"
                      />
                    </v-flex>
                    <v-flex md1>
                      <v-text-field
                        v-model="value.orgaoEmissor"
                        v-validate="'required'"
                        :error-messages="errors.collect('Órgão Emissor')"
                        type="text"
                        name="orgaoEmissor"
                        data-vv-name="Órgão Emissor"
                        label="Órgão Emissor"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.dataEmissao"
                        v-validate="'required'"
                        :error-messages="errors.collect('Data Emissão')"
                        :rules="[rulesDate.dataFutura]"
                        type="date"
                        name="dataEmissao"
                        data-vv-name="Data Emissão"
                        label="Data Emissão"
                      />
                    </v-flex>
                    <v-flex md1>
                      <v-autocomplete
                        v-model="value.uf"
                        v-validate="'required'"
                        :error-messages="errors.collect('UF')"
                        :items="estados"
                        name="uf"
                        data-vv-name="UF"
                        label="UF"
                        item-text="uf"
                        item-value="uf"
                      />
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        v-model.trim="value.cpf"
                        v-mask="['###.###.###-##']"
                        v-validate="'required'"
                        :error-messages="errors.collect('CPF')"
                        readonly
                        type="text"
                        name="cpf"
                        data-vv-name="CPF"
                        label="CPF"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.dataNascimento"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nascimento')"
                        :rules="[rulesDate.dataFutura]"
                        type="date"
                        label="Nascimento"
                        name="dataNascimento"
                        data-vv-name="Nascimento"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.naturalEstado"
                        v-validate="'required'"
                        :error-messages="errors.collect('Estado Nascimento')"
                        :items="estados"
                        name="naturalEstado"
                        data-vv-name="Estado Nascimento"
                        label="Estado Nascimento"
                        item-text="uf"
                        item-value="uf"
                        @change="changeEstadoNascimento"
                      />
                    </v-flex>
                    <v-flex md3>
                      <v-autocomplete
                        v-model="value.naturalCidade"
                        v-validate="'required'"
                        :error-messages="errors.collect('Cidade Nascimento')"
                        :items="cidades"
                        :loading="loadingCidades"
                        label="Cidade Nascimento"
                        name="naturalCidade"
                        data-vv-name="Cidade Nascimento"
                        item-text="nome"
                        item-value="ibge"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.sexo"
                        v-validate="'required'"
                        :error-messages="errors.collect('Sexo')"
                        :items="sexos"
                        label="Sexo"
                        name="sexo"
                        data-vv-name="Sexo"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>

                    <v-flex md6>
                      <v-text-field
                        v-model="value.nomePai"
                        label="Nome do Pai"
                      />
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="value.nomeMae"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nome da Mãe')"
                        name="nomeMae"
                        data-vv-name="Nome da Mãe"
                        label="Nome da Mãe"
                      />
                    </v-flex>
                    <v-flex md3>
                      <v-autocomplete
                        v-model="value.estadoCivil"
                        v-validate="'required'"
                        :error-messages="errors.collect('Estado Civil')"
                        :items="estadosCivil"
                        label="Estado Civil"
                        name="estadoCivil"
                        data-vv-name="Estado Civil"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.dependentes"
                        v-validate="'required'"
                        :error-messages="errors.collect('Dependentes')"
                        :items="numDependentes"
                        label="Dependentes"
                        name="Dependentes"
                        data-vv-name="Dependentes"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.telResidencial"
                        v-validate="'required'"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        :error-messages="errors.collect('Tel. Residencial')"
                        label="Tel. Residencial"
                        name="telResidencial"
                        data-vv-name="Tel. Residencial"
                        hint="<span class='body-2 red--text'>Caso o cliente não tenha telefone fixo, incluir o celular de familiar!</span>"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.celular"
                        v-validate="'required'"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        :error-messages="errors.collect('Celular')"
                        label="Celular"
                        name="celular"
                        data-vv-name="Celular"
                        hint="<span class='body-2 red--text'>!Incluir o celular do cliente, qualquer informação será enviada para esse número!</span>"
                      />
                    </v-flex>
                    <v-flex md1>
                      <v-text-field
                        v-model="value.grupo"
                        label="Grupo"
                        type="text"
                        readonly
                        hint="Preenchida automaticamente pelo motor de crédito"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.segmentacao"
                        label="Segmento"
                        type="text"
                        readonly
                        hint="Preenchida automaticamente pelo motor de crédito"
                      />
                    </v-flex>

                    <v-flex md3>
                      <v-autocomplete
                        v-model="value.escolaridade"
                        :items="escolaridades"
                        label="Escolaridade"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md3>
                      <v-text-field
                        v-model="value.email"
                        v-validate="'required'"
                        :error-messages="errors.collect('Email')"
                        type="email"
                        label="Email"
                        name="email"
                        data-vv-name="Email"
                        hint="<span class='body-2 red--text'>!caso cliente não possua email, digitar nao@email.com.br</span>"
                      />
                    </v-flex>
                    <v-flex md3>
                      <v-autocomplete
                        v-model="value.provedor"
                        v-validate="'required'"
                        :error-messages="errors.collect('Provedor de Email')"
                        :items="provedor"
                        label="Provedor de Email"
                        name="provedor"
                        data-vv-name="Provedor de Email"
                        item-text="provedores"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      v-if="value.provedor == '7'"
                      md3
                    >
                      <v-text-field
                        v-model="value.outroProvedor"
                        label="Digite provedor de Email"
                        hint="Digite @ + provedor . Ex: @uol.com.br"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content
              v-if="editando && !loadingResumo"
              :key="1"
              class="primary mt-1"
            >
              <template slot="actions">
                <v-icon color="white">
                  mdi-chevron-down
                </v-icon>
              </template>
              <template slot="header">
                <span class="title white--text">Carteira do Cliente</span>
              </template>
              <v-card class="elevation-0">
                <v-card-text>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Rede'"
                        :value="resumoCliente.nomeRede"
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Empresa'"
                        :value="resumoCliente.nomeEmpresa"
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Loja'"
                        :value="resumoCliente.nomeLoja"
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Data Assinatura'"
                        :value="
                          resumoCliente.dataAssinatura | moment('DD/MM/YYYY')
                        "
                      />
                    </v-flex>

                    <v-flex
                      md6
                      xs12
                    >
                      <div>
                        <span class="body-2">Situação do Contrato</span><br>
                        <span
                          class="body-1"
                          v-html="situacaoContrato(resumoCliente)"
                        />
                        <v-btn
                          v-if="$root.isAdminSupComercial()"
                          class="ma-2"
                          color="red"
                          dark
                          @click="alterarStatus(resumoCliente)"
                        >
                          Alterar Status
                        </v-btn>
                      </div>
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        v-if="!flagIncluir"
                        :label="'Limite Crédito Compartilhado Total'"
                        :value="formatValorMonetario(value.limiteCompartilhado)"
                      />
                      <v-icon
                        v-if="$root.isAdminSup()"
                        outline
                        color="primary"
                        @click="incluirValor"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-btn
                        v-else
                        small
                        title="Solicitar liberação de crédito"
                        color="primary"
                        dark
                        @click="solicitarCredito()"
                      >
                        Solicitar crédito
                      </v-btn>
                      <template v-if="flagIncluir">
                        <v-text-field
                          v-model="limiteDisponivel"
                          v-money="money"
                          :error-messages="
                            errors.collect('Limite Crédito Compartilhado Total')
                          "
                          name="limiteCompartilhado"
                          data-vv-name="Limite Crédito Compartilhado Total"
                          prefix="R$"
                          label="Limite Crédito Compartilhado Total"
                        />
                        <v-btn
                          :loading="loadingBtn"
                          small
                          color="primary"
                          elevation="5"
                          dark
                          @click="alterarLimite"
                        >
                          <v-icon
                            dark
                            right
                          >
                            mdi-checkbox-marked
                          </v-icon>
                        </v-btn>
                        <v-btn
                          small
                          color="error"
                          elevation="5"
                          dark
                          @click="cancelarValor"
                        >
                          <v-icon
                            dark
                            right
                          >
                            mdi-close-box
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Limite Crédito Exclusivo Total'"
                        :value="
                          formatValorMonetario(resumoCliente.limiteExclusivo)
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Saldo Devedor Total'"
                        :value="
                          formatValorMonetario(resumoCliente.saldoDevedorTotal)
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Saldo Devedor no Mês'"
                        :value="
                          formatValorMonetario(resumoCliente.saldoDevedorMes)
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Saldo Disponível Compartilhado Total'"
                        :value="
                          formatValorMonetario(
                            resumoCliente.limiteCompartilhadoDisponivel
                          )
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Saldo Disponível Exclusivo Total'"
                        :value="
                          formatValorMonetario(
                            resumoCliente.limiteExclusivoDisponivel
                          )
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Última Compra em'"
                        :value="
                          resumoCliente.ultimaCompraEm | moment('DD/MM/YYYY')
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Total de Compras'"
                        :value="totalCompras()"
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Último Pagamento em'"
                        :value="
                          resumoCliente.ultimoPagamentoEm | moment('DD/MM/YYYY')
                        "
                      />
                    </v-flex>
                    <v-flex
                      md3
                      sm6
                      xs12
                    >
                      <core-label-value
                        :label="'Total de Pagamentos'"
                        :value="totalPagamentos()"
                      />
                    </v-flex>
                    <v-flex md12>
                      <v-card class="elevation-0">
                        <v-card-title>
                          <span class="title">Outras Contas do Cliente</span>
                        </v-card-title>
                        <v-card-text>
                          <v-data-table
                            :headers="headersOutrasLojas"
                            :items="resumoOutrasLojas"
                            hide-actions
                          >
                            <template
                              slot="items"
                              slot-scope="{ item }"
                            >
                              <tr>
                                <td>
                                  <span class="body-1">{{
                                    item.nomeLoja
                                  }}</span>
                                </td>
                                <td>
                                  <span
                                    class="body-1"
                                    v-html="situacaoContrato(item)"
                                  />
                                </td>
                                <td class="body-1 text-xs-right">
                                  <span class="body-1">{{
                                    formatValorMonetario(item.saldoDevedorTotal)
                                  }}</span>
                                </td>
                                <td class="body-1 text-xs-right">
                                  <span class="body-1">{{
                                    formatValorMonetario(
                                      item.limiteCompartilhadoDisponível -
                                        item.limiteExclusivoDisponível
                                    )
                                  }}</span>
                                </td>
                                <td class="body-1 text-xs-right">
                                  <span class="body-1">{{
                                    formatValorMonetario(item.limiteExclusivo)
                                  }}</span>
                                </td>
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
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <core-endereco
              v-if="value.endereco"
              v-model="value.endereco"
              :loading="loading"
              :disabled="disabled"
              :expanded="!cobranca"
              :class-panel="'mt-1'"
            >
              <v-layout
                row
                wrap
              >
                <v-flex md3>
                  <v-autocomplete
                    v-model="value.tipoResidencia"
                    v-validate="'required'"
                    :error-messages="errors.collect('Tipo de Residência')"
                    :items="tiposResidencia"
                    data-vv-name="Tipo de Residência"
                    name="tipoResidencia"
                    label="Tipo de Residência"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex
                  v-if="
                    value.tipoResidencia == 'A' || value.tipoResidencia == 'F'
                  "
                  md3
                >
                  <v-text-field
                    v-model="value.valorAluguel"
                    v-validate="'required'"
                    v-formata-moeda="value.valorAluguel"
                    v-money="money"
                    :error-messages="
                      errors.collect('Valor do Aluguel/Financiamento')
                    "
                    suffix="R$"
                    label="Valor Aluguel/Financiamento"
                    reverse
                  />
                </v-flex>
                <v-flex md3>
                  <v-text-field
                    v-model="value.resideDesde"
                    v-validate="'required'"
                    v-mask="['##/####']"
                    :error-messages="errors.collect('Reside desde')"
                    :rules="[rulesDesde.dataFutura]"
                    label="Reside desde MM/AAAA"
                  />
                </v-flex>
                <v-flex md12>
                  <v-checkbox
                    v-model="value.enderecoSecundario"
                    label="Adicionar endereço alternativo, priorizando para correspondência?"
                  />
                </v-flex>
              </v-layout>
            </core-endereco>
            <core-endereco-alternativo
              v-if="value.enderecoSecundario"
              v-model="value.enderecoAlternativo"
              :loading="loadingEndereco"
              :disabled="disabled"
              :expanded="!cobranca"
              :class-panel="'mt-1'"
            >
              <v-layout
                row
                wrap
              />
            </core-endereco-alternativo>

            <template>
              <v-expansion-panel-content
                :key="2"
                class="primary mt-1"
              >
                <template slot="actions">
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
                <template slot="header">
                  <span class="title white--text">Dados Profissionais</span>
                </template>
                <v-card class="elevation-0">
                  <v-card-text>
                    <v-layout
                      row
                      wrap
                    >
                      <v-flex md3>
                        <v-text-field
                          v-model="value.empresa"
                          v-validate="'required'"
                          :error-messages="errors.collect('Empresa')"
                          label="Empresa"
                          data-vv-name="Empresa"
                          name="empresa"
                          hint="<span class='body-2 red--text'>Cliente Autônomo ou Aposentado? Incluir nesse campo nome completo de parente próximo e no campo 'Tel. Comercial' telefone desse parente.</span>"
                        />
                      </v-flex>
                      <v-flex md3>
                        <v-text-field
                          v-model="value.trabalhaNessaEmpresaDesde"
                          v-validate="'required'"
                          v-mask="['##/####']"
                          :error-messages="
                            errors.collect(
                              'Trabalha Nessa Empresa desde MM/AAAA'
                            )
                          "
                          :rules="[rulesDesde.dataFutura]"
                          label="Trabalha Nessa Empresa desde MM/AAAA"
                          data-vv-name="Trabalha Nessa Empresa desde MM/AAAA"
                          name="trabalhaNessaEmpresaDesde"
                        />
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="value.telComercial"
                          v-validate="'required'"
                          v-mask="['(##) #### - ####', '(##) ##### - ####']"
                          :error-messages="errors.collect('Tel. Comercial')"
                          label="Tel. Comercial"
                          data-vv-name="Tel. Comercial"
                          name="telComercial"
                          hint="<span class='body-2 red--text'>
                            Cliente Assalariado: Incluir telefone da empresa que o cliente está trabalhando;
                            <br/>
                            <br/>
                            Cliente Autônomo: Incluir telefone de alguma pessoa que o cliente presta ou prestou serviço ou familiar
                            <br/>
                            <br/>
                            A veracidade da informação é de responsabilidade do lojista
                            </span>"
                        />
                      </v-flex>
                      <v-flex md1>
                        <v-text-field
                          v-model="value.ramal"
                          v-mask="['####']"
                          label="Ramal"
                        />
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="value.rendaPrincipal"
                          v-validate="'required'"
                          v-formata-moeda="value.rendaPrincipal"
                          v-money="money"
                          :error-messages="errors.collect('Renda Principal')"
                          suffix="R$"
                          label="Renda Principal"
                          reverse
                        />
                      </v-flex>
                      <v-flex md1>
                        <v-text-field
                          v-model="value.outrasRendas"
                          v-formata-moeda="value.outrasRendas"
                          v-money="money"
                          :error-messages="errors.collect('Outras Rendas')"
                          suffix="R$"
                          label="Outras Rendas"
                          reverse
                        />
                      </v-flex>
                      <v-flex md8>
                        <v-autocomplete
                          v-model="value.empregoCBO"
                          v-validate="'required'"
                          :error-messages="errors.collect('Emprego CBO')"
                          :items="empregosCBO"
                          label="Emprego CBO"
                          data-vv-name="Emprego CBO"
                          name="empregoCBO"
                          item-text="titulo"
                          item-value="id"
                        />
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </template>
            <v-expansion-panel-content
              :key="3"
              class="primary mt-1"
            >
              <template slot="actions">
                <v-icon color="white">
                  mdi-chevron-down
                </v-icon>
              </template>
              <template slot="header">
                <span class="title white--text">Referências Pessoais</span>
              </template>
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="caption">
                    Referência Pessoal 1 e 2: Incluir nome completo e telefone
                    de pessoas próximas (preferencialmente familiares).
                  </span>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex md8>
                      <v-text-field
                        v-model="value.nomeRef1"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nome Referência 1')"
                        label="Nome"
                        data-vv-name="Nome Referência 1"
                        name="nomeRef1"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.relacaoRef1"
                        v-validate="'required'"
                        :error-messages="errors.collect('Relação')"
                        :items="tiposReferenciasPessoais"
                        data-vv-name="Relação"
                        name="relacaoRef1"
                        label="Relação"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.telRef1"
                        v-validate="'required'"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        :error-messages="errors.collect('Telefone Contato')"
                        label="Telefone Contato"
                        data-vv-name="Telefone Contato"
                        name="telRef1"
                      />
                    </v-flex>

                    <v-flex md8>
                      <v-text-field
                        v-model="value.nomeRef2"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nome Referência 2')"
                        data-vv-name="Nome Referência 2"
                        name="nomeRef2"
                        label="Nome"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.relacaoRef2"
                        v-validate="'required'"
                        :error-messages="errors.collect('Relação')"
                        :items="tiposReferenciasPessoais"
                        label="Relação"
                        data-vv-name="Relação"
                        name="relacaoRef2"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.telRef2"
                        v-validate="'required'"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        :error-messages="errors.collect('Telefone Contato')"
                        label="Telefone Contato"
                        data-vv-name="Telefone Contato"
                        name="telRef2"
                      />
                    </v-flex>

                    <v-flex md8>
                      <v-text-field
                        v-model="value.nomeRef3"
                        label="Nome"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.relacaoRef3"
                        :items="tiposReferenciasPessoais"
                        label="Relação"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.telRef3"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        label="Telefone Contato"
                      />
                    </v-flex>

                    <v-flex md8>
                      <v-text-field
                        v-model="value.nomeRef4"
                        label="Nome"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-autocomplete
                        v-model="value.relacaoRef4"
                        :items="tiposReferenciasPessoais"
                        label="Relação"
                        item-value="id"
                        item-text="descricao"
                      />
                    </v-flex>
                    <v-flex md2>
                      <v-text-field
                        v-model="value.telRef4"
                        v-mask="['(##) #### - ####', '(##) ##### - ####']"
                        label="Telefone Contato"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <template v-if="$root.isRolesPratico() && !cobranca && editando">
              <v-expansion-panel-content
                :key="4"
                class="primary mt-1"
              >
                <template slot="actions">
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
                <template slot="header">
                  <span
                    class="title white--text"
                  >Permissão de Envio ao SPC/SERASA</span>
                </template>
                <v-card class="elevation-0">
                  <v-card-text>
                    <v-checkbox
                      v-model="value.permitirEnvioSPC"
                      label="Permitir o envio do cliente para SPC/SERASA"
                    />
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </template>

            <template v-if="$root.isRolesPratico() && !cobranca && editando">
              <v-expansion-panel-content
                :key="5"
                class="primary mt-1"
              >
                <template slot="actions">
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
                <template slot="header">
                  <span class="title white--text">Cadastro de Dependentes</span>
                </template>
                <v-card class="elevation-0">
                  <v-card-text>
                    <v-toolbar
                      flat
                      color="white"
                    >
                      <v-toolbar-title>Dependentes</v-toolbar-title>
                      <v-divider
                        class="mx-2"
                        inset
                        vertical
                      />
                      <v-spacer />
                      <v-btn
                        small
                        fab
                        color="primary"
                      >
                        <v-icon @click="novoDependente()">
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-data-table
                      :headers="headersDepen"
                      :items="dependentes"
                      hide-actions
                    >
                      <template
                        slot="items"
                        slot-scope="{ item }"
                      >
                        <tr>
                          <td>{{ item.nomeCompleto }}</td>
                          <td>{{ item.parentescoLabel }}</td>
                          <td>{{ item.cpf }}</td>
                          <td>{{ item.limiteMensal }}</td>
                          <td>{{ item.celular }}</td>
                          <td>{{ item.nomeMae }}</td>
                          <td>{{ item.email }}</td>
                          <td class="text-xs-center">
                            <v-icon
                              v-if="item.exibirMsg"
                              color="green"
                            >
                              mdi-checkbox-marked
                            </v-icon>
                          </td>
                          <td class="text-xs-center">
                            <v-icon
                              color="orange"
                              title="Alterar Dependente"
                              @click="openDialogAlterarDepen(item)"
                            >
                              mdi-pencil-box-outline
                            </v-icon>
                          </td>
                          <td class="text-xs-center">
                            <v-icon
                              color="error"
                              title="Excluir dependente"
                              @click="openDialogExcluirDepen(item)"
                            >
                              mdi-delete-outline
                            </v-icon>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </template>

            <template v-if="!cobranca && editando">
              <v-expansion-panel-content
                :key="6"
                class="primary mt-1"
              >
                <template slot="actions">
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
                <template slot="header">
                  <span class="title white--text">Observações</span>
                </template>
                <v-card class="elevation-0">
                  <v-toolbar
                    flat
                    color="white"
                  >
                    <v-toolbar-title>Observações</v-toolbar-title>
                    <v-divider
                      class="mx-2"
                      inset
                      vertical
                    />
                    <v-spacer />
                    <v-btn
                      small
                      fab
                      color="primary"
                    >
                      <v-icon @click="novaObservacao()">
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <v-data-table
                      :headers="headersObs"
                      :items="observacoes"
                      hide-actions
                    >
                      <template
                        slot="items"
                        slot-scope="{ item }"
                      >
                        <tr>
                          <td class="text-xs-center">
                            {{ item.dataCadastro | moment("DD/MM/YYYY") }}
                          </td>
                          <td>{{ item.assuntoObs }}</td>
                          <td>{{ item.descricao }}</td>
                          <td>{{ item.loja }}</td>
                          <td class="text-xs-center">
                            {{ item.exibirAte | moment("DD/MM/YYYY") }}
                          </td>
                          <td class="text-xs-center">
                            <v-icon
                              v-if="item.exibirMsg"
                              color="green"
                            >
                              mdi-checkbox-marked
                            </v-icon>
                          </td>
                          <td class="text-xs-center">
                            <v-icon
                              color="orange"
                              title="Alterar observacao"
                              @click="openDialogAlterar(item)"
                            >
                              mdi-pencil-box-outline
                            </v-icon>
                          </td>
                          <td class="text-xs-center">
                            <v-icon
                              color="error"
                              title="Excluir observacao"
                              @click="openDialogExcluir(item)"
                            >
                              mdi-delete-outline
                            </v-icon>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </template>

            <!-- CRUZAR DADOS -->
            <template v-if="$root.isRolesPratico() && editando">
              <v-expansion-panel-content
                :key="7"
                class="primary mt-1"
              >
                <template slot="actions">
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
                <template slot="header">
                  <span class="title white--text">Cruzar Dados</span>
                </template>
                <cliente-cruzar-dados
                  v-model="value"
                  :expanded="true"
                />
              </v-expansion-panel-content>
            </template>

            <template>
              <slot />
            </template>
          </v-expansion-panel>
        </v-flex>
        <v-flex
          v-if="!cobranca"
          md12
        >
          <v-layout class="justify-end">
            <v-btn
              dark
              @click="goBack"
            >
              {{
                editando ? "Sair" : "Voltar"
              }}
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="loadingBtn"
              type="submit"
              color="primary"
            >
              {{ editando ? "Salvar" : "Continuar" }}
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
    <template>
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="flagAddObs"
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Nova Observação
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md5>
                  <v-autocomplete
                    v-model="value.assuntoObs"
                    :items="listaAssuntos"
                    label="Assunto"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md1 />
                <v-flex md6>
                  <v-autocomplete
                    v-model="value.exibirNaLojaObs"
                    :items="listaLojas"
                    label="Exibir nas lojas"
                    item-value="id"
                    item-text="nomeFantasia"
                  />
                </v-flex>
                <v-flex md5>
                  <v-text-field
                    v-model="value.exibirAte"
                    label="Exibir até ?"
                    type="date"
                  />
                </v-flex>
                <v-flex md1 />
                <v-flex md6>
                  <v-checkbox
                    v-model="value.exibirMsg"
                    label="Exibir alerta a todos usuários?"
                  />
                </v-flex>
                <v-flex md12>
                  <v-textarea
                    v-model="value.observacao"
                    label="Observação"
                    counter
                    maxlength="250"
                  />
                </v-flex>
                <v-flex md12>
                  <v-layout class="justify-end">
                    <v-btn
                      color="primary"
                      @click="salvarObservacao"
                    >
                      Salvar
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template>
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="flagAddStatus"
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Alterar Status
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md12>
                  <v-autocomplete
                    v-model="status"
                    :items="listaStatus"
                    label="Status"
                    item-value="id"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md6>
                  <v-layout>
                    <v-btn
                      color="error"
                      @click="cancelarStatus"
                    >
                      Cancelar
                    </v-btn>
                  </v-layout>
                </v-flex>
                <v-flex md6>
                  <v-layout class="justify-end">
                    <v-btn
                      color="primary"
                      @click="salvarStatus"
                    >
                      Salvar
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template>
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="flagSolicitarCredito"
          max-width="390"
        >
          <v-card>
            <v-card-title
              class="headline"
            >
              Será enviado uma notificação para os operadores da Prático
              liberar crédito
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md6>
                  <v-layout>
                    <v-btn
                      color="error"
                      @click="cancelarSolicitacao"
                    >
                      Cancelar
                    </v-btn>
                  </v-layout>
                </v-flex>
                <v-flex md6>
                  <v-layout class="justify-end">
                    <v-btn
                      color="primary"
                      @click="confirmarSolicitacao"
                    >
                      OK
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template>
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-if="value.limitesPreAprovado"
          v-model="dialogLimiteCredito"
          max-width="390"
        >
          <v-card>
            <v-card-title
              class="headline"
            >
              Limite de Crédito Pré-Aprovado
            </v-card-title>

            <v-card-text>
              <v-spacer />
              <p
                class="title"
              >
                <span class="subheading">Primeira compra autorizada em</span>
                {{
                  "R$ " +
                    value.limitesPreAprovado.faixaFinal1.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })
                }}
                <template
                  v-if="
                    value.limitesPreAprovado.peEntrada1 &&
                      value.limitesPreAprovado.peEntrada1 > 0
                  "
                >
                  <span class="subheading">com entrada de </span>
                  {{
                    " R$ " +
                      (
                        value.limitesPreAprovado.faixaFinal1 *
                        (value.limitesPreAprovado.peEntrada1 / 100)
                      ).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) +
                      " (" +
                      value.limitesPreAprovado.peEntrada1.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      ) +
                      "%)"
                  }}
                </template>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                @click="dialogLimiteCredito = false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template v-if="dialogAlterar">
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogAlterar"
          persistent
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Alterar observação
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md5>
                  <v-autocomplete
                    v-model="itemSelecionado.assuntoObs"
                    v-validate="'required'"
                    :items="listaAssuntos"
                    label="Assunto"
                    item-text="descricao"
                  />
                </v-flex>
                <v-flex md1 />
                <v-flex md6>
                  <v-autocomplete
                    v-model="itemSelecionado.exibirNaLojaObs"
                    :items="listaLojas"
                    label="Exibir nas lojas"
                    item-value="id"
                    item-text="nomeFantasia"
                  />
                </v-flex>
                <v-flex md5>
                  <v-text-field
                    v-model="itemSelecionado.exibirAte"
                    label="Exibir até ?"
                    type="date"
                  />
                </v-flex>
                <v-flex md1 />
                <v-flex md6>
                  <v-checkbox
                    v-model="itemSelecionado.exibirMsg"
                    label="Exibir alerta a todos usuários?"
                  />
                </v-flex>
                <v-flex md12>
                  <v-textarea
                    v-model="itemSelecionado.descricao"
                    v-validate="'required'"
                    label="Observação"
                    counter
                    maxlength="250"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogAlterar"
              >
                Cancelar
              </v-btn>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="red"
                @click="confirmarAlterar"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template v-if="dialogExcluir">
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogExcluir"
          persistent
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Excluir Observação
            </v-card-title>
            <v-card-text>
              <v-layout
                row
                wrap
              >
                <v-flex md12>
                  <v-alert
                    :value="true"
                    color="warning"
                    type="warning"
                    outline
                  >
                    <span>Essa operação não poderá ser desfeita.</span>
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogExcluir"
              >
                Cancelar
              </v-btn>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="red"
                @click="confirmarExcluir"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template v-if="flagDepen">
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="flagDepen"
          persistent
          max-width="590"
        >
          <v-form
            ref="formDepen"
            lazy-validation
          >
            <v-card>
              <v-card-title class="headline">
                {{ depenDialogTitle }}
              </v-card-title>
              <v-card-text>
                <v-layout
                  row
                  wrap
                  pa-1
                  grid-list-md
                >
                  <v-flex md12>
                    <v-text-field
                      v-model="dependente.nomeCompleto"
                      v-validate="'required'"
                      label="Nome do dependente"
                      name="nomeDependente"
                      :rules="nameRules"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      v-model="dependente.cpf"
                      v-validate="'required'"
                      v-mask="['###.###.###-##']"
                      :rules="requiredRules"
                      :readonly="itemDepenSelecionado != null"
                      type="text"
                      name="cpfDependente"
                      label="CPF"
                      style="marginright: 10px"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      v-model="dependente.nomeMae"
                      label="Nome da mãe"
                      name="nomeMae"
                    />
                  </v-flex>
                  <v-flex md12>
                    <v-text-field
                      v-model="dependente.email"
                      type="email"
                      label="Email"
                      name="emailDependente"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      v-model="dependente.celular"
                      v-mask="['(##) #### - ####', '(##) ##### - ####']"
                      label="Telefone Contato"
                      name="telDependente"
                      style="marginright: 10px"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-autocomplete
                      v-model="dependente.parentesco"
                      v-validate="'required'"
                      :rules="requiredRules"
                      :items="tiposReferenciasPessoais"
                      name="parentescoDependente"
                      label="Parentesco"
                      item-value="id"
                      item-text="descricao"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      v-model="dependente.dataNascimento"
                      v-validate="'required'"
                      :rules="[rulesDate.dataFutura]"
                      type="date"
                      label="Nascimento"
                      name="dataNascimentoDependente"
                      style="marginright: 10px"
                    />
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      v-model="dependente.limiteMensal"
                      v-formata-moeda="dependente.limiteMensal"
                      v-money="money"
                      suffix="R$"
                      label="Limite Mensal"
                      reverse
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  outline
                  style="color: black !important"
                  @click="closeDialogAlterarDepen"
                >
                  Cancelar
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  :loading="loadingBtn"
                  @click="validateFormDependente"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-layout>
    </template>
    <template v-if="dialogExcluirDepen">
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogExcluirDepen"
          persistent
          max-width="390"
        >
          <v-card>
            <v-card-title class="headline">
              Excluir Dependente
            </v-card-title>
            <v-card-text>
              Confirma a exclusão do dependente
              <span class="title">{{ itemDepenSelecionado.nomeCompleto }}</span>? <br><br>
              Essa operação não poderá ser desfeita.
            </v-card-text>
            <v-card-actions>
              <v-btn
                outline
                style="color: black !important"
                @click="closeDialogExcluirDepen"
              >
                Cancelar
              </v-btn>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="red"
                @click="deletarDependente"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import {
  ClienteBusiness,
  EstadoBusiness,
  TiposBusiness,
  EnderecoBusiness,
  ClienteLojaBusiness,
} from "../../business";
import { MONEY, TODAS_ID } from "../../constants";
import numberUtils from "../../utils/numberUtils";
import dateUtils from "../../utils/dateUtils";

const ClienteCruzarDados = () => import("./ClienteCruzarDados.vue");

export default {
  components: {
    ClienteCruzarDados,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      requided: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false,
    // eslint-disable-next-line vue/require-default-prop
    editando: false,
    cobranca: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      startEndereco: false,
      panel: [true, true, true, true, true, true, true],
      loading: false,
      flagSolicitarCredito: false,
      loadingResumo: false,
      loadingResumoOutrasLojas: false,
      dialogAlterar: false,
      dialogExcluir: false,
      itemSelecionado: null,
      itemDepenSelecionado: null,
      depenDialogTitle: "Novo Dependente",
      valid: true,
      sexos: [],
      listaLojas: [],
      temObservacao: false,
      provedor: [],
      empregosCBO: [],
      tiposDocumentos: [],
      estadosCivil: [],
      numDependentes: [],
      escolaridades: [],
      tiposResidencia: [],
      tiposReferenciasPessoais: [],
      estados: [],
      cidades: [],
      observacoes: [],
      dependentes: [],
      observacoesNotif: [],
      limiteDisponivel: null,
      loadingCidades: false,
      money: MONEY,
      loadingBtn: false,
      loadingEndereco: false,
      flagAddObs: false,
      flagAddStatus: false,
      flagIncluir: false,
      flagDepen: false,
      dialogExcluirDepen: false,
      observacao: null,
      status: null,
      dependente: {
        id: null,
        clienteId: null,
        nomeCompleto: null,
        parentesco: null,
        cpf: null,
        limiteMensal: null,
        celular: null,
        operadora: null,
        nomeMae: null,
        email: null,
        dataNascimento: null,
      },
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) =>
          (v && v.length > 2) || "O nome deve conter no mínimo 3 caracteres",
      ],
      requiredRules: [(v) => !!v || "Campo obrigatório"],
      dialogLimiteCredito: false,
      resumoCliente: null,
      permitirEnvioSPC: true,
      resumoOutrasLojas: [],
      listaAssuntos: [],
      listaStatus: [],
      hoje: this.$moment().format("YYYY-MM-DD"),
      formCobranca: {
        dataAgendamento: null,
        tipoOcorrencia: null,
        dtAgendamento: null,
        horaAgendamento: null,
      },
      alteraStatus: 0,
      tiposOcorrencia: [],
      ocorrenciasCobranca: [],
      totalOcorrencias: 0,
      paginationCobranca: {
        rowsPerPage: 15,
      },
      rulesDate: {
        dataFutura: (value) => {
          return dateUtils.validaDataFutura(value);
        },
      },
      rulesDesde: {
        dataFutura: (value) => {
          if (!dateUtils.validaDesdeMMYYYY(value)) {
            return "O período tem que ser menor que a data atual";
          }
          return true;
        },
      },
      headersObs: [
        {
          sortable: false,
          text: "Data",
          value: "data",
          align: "center",
        },
        {
          sortable: false,
          text: "Assunto",
          value: "assuntoObs",
          align: "left",
        },
        {
          sortable: false,
          text: "Observação",
          value: "observacao",
          align: "left",
        },
        {
          sortable: false,
          text: "Loja exibição",
          value: "exibirNaLojaObs",
          align: "left",
        },
        {
          sortable: false,
          text: "Data exibição até",
          value: "exibirAte",
          align: "center",
        },
        {
          sortable: false,
          text: "Exibir Msg",
          value: "exibirMsg",
          align: "center",
        },
        {
          sortable: false,
          text: "Alterar",
          align: "center",
        },
        {
          sortable: false,
          text: "Excluir",
          align: "center",
        },
      ],
      headersDepen: [
        {
          sortable: false,
          text: "Nome",
          value: "nomeCompleto",
          align: "left",
        },
        {
          sortable: false,
          text: "Parentesco",
          value: "parentesco",
          align: "left",
        },
        {
          sortable: false,
          text: "CPF",
          value: "cpf",
          align: "left",
        },
        {
          sortable: false,
          text: "Limite Mensal",
          value: "limiteMensal",
          align: "left",
        },
        {
          sortable: false,
          text: "Celular",
          value: "celular",
          align: "left",
        },
        {
          sortable: false,
          text: "Nome Mãe",
          value: "nomeMae",
          align: "left",
        },
        {
          sortable: false,
          text: "E-mail",
          value: "email",
          align: "left",
        },
      ],
      headersOutrasLojas: [
        {
          sortable: false,
          text: "Nome Loja",
          value: "nomeLoja",
        },
        {
          sortable: false,
          text: "Situação",
          value: "situacao",
          align: "left",
        },
        {
          sortable: false,
          text: "Saldo Devedor",
          align: "right",
          value: "saldoDevedor",
          width: "20%",
        },
        {
          sortable: false,
          text: "Saldo Disponível",
          align: "right",
          value: "saldoDisponivel",
        },
        {
          sortable: false,
          text: "Limite Exclusivo",
          align: "right",
          value: "limiteExclusivo",
        },
      ],
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    paginationCobranca: {
      handler() {
        this.paginarCobranca();
      },
    },
  },
  beforeMount() {
    if (!this.editando && !this.value.jaTemCadastroNaLoja && !this.cobranca) {
      this.dialogLimiteCredito = true;
    }
    this.reload();
    if (this.cobranca) {
      this.panel = [true, true, false, true, true, true];
    }
  },
  mounted() {
    setTimeout(() => {
      this.startEndereco = true;
    }, 4000);
  },
  methods: {
    validateBeforeSubmit() {
      var self = this;
      this.$validator.validate().then((result) => {
        if (result) {
          if (
            numberUtils.convertStringToNumber(self.value.rendaPrincipal) < 100
          ) {
            this.$root.showAlerta(
              'A Renda Principal deve ser de no mínimo <span class="title">R$ 100,00</span>'
            );
            return;
          }
          if (this.validaTelefones()) {
            this.loadingBtn = true;
            ClienteBusiness.salvar(this.value)
              .then((response) => {
                this.$root.showSucesso("Dados enviados com sucesso");
                this.setData(response.data);
                this.nextStep();
              })
              .catch((erro) => {
                return this.$root.showErro(erro.data);
              })
              .finally(() => {
                this.loadingBtn = false;
              });
          } else {
            this.$root.showAlerta(
              "Todos os telefones informados precisam ser diferentes."
            );
          }
        } else {
          this.$root.showAlerta(
            this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
          );
        }
      });
    },
    validateFormDependente() {
      if (this.$refs.formDepen.validate()) {
        this.salvarDependente();
      } else {
        this.$root.showAlerta(
          this.$vuetify.t("$vuetify.Erro.camposObrigatorios")
        );
      }
    },
    limparCamposDependente() {
      this.dependente.id = null;
      this.dependente.nomeCompleto = null;
      this.dependente.clienteId = null;
      this.dependente.nomeCompleto = null;
      this.dependente.parentesco = null;
      this.dependente.cpf = null;
      this.dependente.limiteMensal = null;
      this.dependente.celular = null;
      this.dependente.operadora = null;
      this.dependente.nomeMae = null;
      this.dependente.email = null;
      this.dependente.dataNascimento = null;
    },
    openDialogAlterarDepen(item) {
      this.flagDepen = true;
      this.itemDepenSelecionado = { ...item };
      this.depenDialogTitle = "Alterar Dependente";
      this.dependente = this.itemDepenSelecionado;
    },
    closeDialogAlterarDepen() {
      this.flagDepen = false;
      this.limparCamposDependente();
    },
    validaTelefones() {
      return (
        this.value.telResidencial !== this.value.celular &&
        this.value.telResidencial !== this.value.telRef1 &&
        this.value.telResidencial !== this.value.telRef2 &&
        this.value.celular !== this.value.telRef1 &&
        this.value.celular !== this.value.telRef2 &&
        this.value.telRef1 !== this.value.telRef2
      );
    },
    cancelar() {
      this.$router.push("/lista-cliente");
    },
    alterarLimite() {
      this.loadingBtn = true;
      ClienteBusiness.alterarLimite(this.value.id, this.limiteDisponivel)
        .then((response) => {
          this.$root.showSucesso(response.data);
          this.flagIncluir = false;
          this.value.limiteCompartilhado = this.limiteDisponivel;
          this.reload();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    alterarStatus(_resumoCliente) {
      this.flagAddStatus = true;
      this.status = _resumoCliente.status;
    },
    cancelarStatus() {
      this.flagAddStatus = false;
    },
    salvarStatus() {
      this.loadingBtn = true;
      ClienteBusiness.alterarStatus(
        this.value.id,
        this.value.lojaId,
        this.status
      )
        .then((response) => {
          this.flagAddStatus = false;
          this.$root.showSucesso(response.data);
          this.reload();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    reload() {
      this.loading = true;
      this.numDependentes = [0, 1, 2, 3, 4, 5];
      TiposBusiness.getAllSexo().then((response) => {
        this.sexos = response.data;
      });
      TiposBusiness.getAllEstadoCivil().then((response) => {
        this.estadosCivil = response.data;
      });
      TiposBusiness.getAllEscolaridade().then((response) => {
        this.escolaridades = response.data;
      });
      TiposBusiness.getAllTipoResidencia().then((response) => {
        this.tiposResidencia = response.data;
      });
      TiposBusiness.getAllTipoReferenciaPessoal().then((response) => {
        this.tiposReferenciasPessoais = response.data;
      });
      TiposBusiness.getAllClienteTipoDoc().then((response) => {
        this.tiposDocumentos = response.data;
      });
      TiposBusiness.getAllAssuntoObservacoes().then((response) => {
        this.listaAssuntos = response.data;
      });
      TiposBusiness.getAllStatusCliente().then((response) => {
        this.listaStatus = response.data;
      });
      if (this.editando) {
        ClienteLojaBusiness.listAllLojasClientes(this.value.id).then(
          (response) => {
            this.listaLojas = response.data;
          }
        );
      }
      this.listaLojas.push({ id: TODAS_ID, nomeFantasia: "Todos" });

      if(this.value.enderecoSecundario) {
        this.loadingEndereco = true;
        EnderecoBusiness.findEndereco(this.value.id)
          .then((response) => {
            if (response.data) {
                this.value.enderecoAlternativo = response.data;
            }
          }).finally(() => {
            this.loadingEndereco = false;
          });
      }

      EstadoBusiness.findAll()
        .then((response) => {
          this.estados = response.data;
        })
        .catch(() =>
          this.$root.showAlerta(
            "Não foi possível buscar as informações de estado"
          )
        );
      this.carregarCidades(this.value.naturalEstado);
      if (this.editando) {
        this.loadResumoCliente();
        this.loadResumoClienteOutrasLojas();
      } else {
        this.loading = false;
      }
      this.loadObservacoes();
      this.loadDependentes();
      this.loadingBtn = false;
    },
    carregarCidades(estado) {
      this.value.naturalEstado = estado;
      if (this.value.naturalEstado) {
        this.loadingCidades = true;
        EstadoBusiness.getCidadesByUf(this.value.naturalEstado)
          .then((response) => {
            this.cidades = response.data;
          })
          .catch(() => {
            this.$root.showAlerta(
              "Não foi possível buscar as informações das cidades"
            );
          })
          .finally(() => {
            this.loadingCidades = false;
          });
      }
    },
    changeEstadoNascimento(estado) {
      console.log("changeEstadoNascimento");
      this.carregarCidades(estado);
      this.value.naturalCidade = null;
    },
    novaObservacao() {
      this.observacao = null;
      this.flagAddObs = true;
    },
    novoDependente() {
      this.itemDepenSelecionado = null;
      this.flagDepen = true;
      this.depenDialogTitle = "Novo Dependente";
      this.limparCamposDependente();
    },
    cancelarValor() {
      this.loadingBtn = true;
      this.flagIncluir = false;
      this.loadingBtn = false;
    },
    incluirValor() {
      console.log(this.formatValorMonetario(this.value.limiteCompartilhado));
      this.limiteDisponivel = this.formatValorMonetario(
        this.value.limiteCompartilhado
      );
      console.log(this.limiteDisponivel);
      this.loadingBtn = true;
      this.flagIncluir = true;
      this.loadingBtn = false;
    },
    salvarObservacao() {
      if (!this.$root.isAdminSupComercial()) {
        this.$root.showAlerta("Esse usuário não pode adicionar observação");
        return;
      }
      if (
        this.value.observacao == null ||
        this.value.assuntoObs == null ||
        this.value.descricao == ""
      ) {
        this.$root.showAlerta("Observação precisa ter descrição e assunto");
        return;
      }
      let _formObservacao = {
        descricao: this.observacao,
      };
      this.loading = true;
      ClienteBusiness.inserirObservacao(this.value.id, this.value)
        .then((response) => {
          this.loadObservacoes();
          this.flagAddObs = false;
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loading = false;
        });
    },
    loadResumoCliente() {
      this.loadingResumo = true;
      ClienteBusiness.loadResumoCliente(this.value.id, this.value.lojaId)
        .then((response) => {
          this.resumoCliente = response.data;
          this.loadingResumo = false;
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loadingResumo = false;
        });
    },
    loadResumoClienteOutrasLojas() {
      this.loadingResumoOutrasLojas = true;
      ClienteBusiness.loadResumoClienteOutrasLojas(
        this.value.id,
        this.value.lojaId
      )
        .then((response) => {
          this.resumoOutrasLojas = response.data;
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loadingResumoOutrasLojas = false;
        });
    },
    situacaoContrato(_resumoCliente) {
      let dadosSaida = "";

      if (_resumoCliente.atrasoDias) {
        dadosSaida +=
          "EM ATRASO desde " +
          this.$moment(_resumoCliente.atrasoVencto).format("DD/MM/YYYY") +
          " (" +
          _resumoCliente.atrasoDias +
          " dias) <br> ";
      }
      if (_resumoCliente.status) {
        let status = _resumoCliente.status;
        if (status === "NORMAL") {
          status = '<span class="green--text">NORMAL</span>';
        }
        if (status === "BLOQUEADO") {
          status = '<span class="red--text">BLOQUEADO</span>';
        }

        dadosSaida +=
          status +
          " desde " +
          this.$moment(_resumoCliente.dataStatus).format("DD/MM/YYYY") +
          "<br>";
      }
      if (_resumoCliente.maiorAtrasoAteHojeDias) {
        dadosSaida +=
          "MAIOR ATRASO ATÉ HOJE: " +
          _resumoCliente.maiorAtrasoAteHojeDias +
          " dia(s) - vencto " +
          this.$moment(_resumoCliente.maiorAtrasoAteHojeVencto).format(
            "DD/MM/YYYY"
          ) +
          "<br>";
      }
      if (_resumoCliente.maiorAtrasoPrim12mesesDias) {
        dadosSaida +=
          "MAIOR ATRASO PRIM. 12 MESES: " +
          _resumoCliente.maiorAtrasoPrim12mesesDias +
          " dia(s) - vencto " +
          this.$moment(_resumoCliente.maiorAtrasoPrim12mesesVencto).format(
            "DD/MM/YYYY"
          );
      }
      // 'EM ATRASO desde 14/04/2020 (91 dias) <br>' +
      // 'BLOQUEADO em 13/06/2020 as 00:35 (Em Cobrança)'
      // 'MAIOR ATRASO ATÉ HOJE: 92 dias(s) - vencto data'
      // 'MAIOR ATRASO PRIM. 12 MESES: 92 dias(s) - vencto data'

      return dadosSaida;
    },
    totalCompras() {
      if (this.resumoCliente.qtdTotalCompras) {
        return (
          this.resumoCliente.qtdTotalCompras +
          " compras(s) no total de " +
          this.formatValorMonetario(this.resumoCliente.vlTotalCompras)
        );
      }
      return "0";
    },
    totalPagamentos() {
      if (this.resumoCliente.qtdTotalPagamentos) {
        return (
          this.resumoCliente.qtdTotalPagamentos +
          " pagto(s) no total de " +
          this.formatValorMonetario(this.resumoCliente.vlTotalPagamentos)
        );
      }
      return "0";
    },
    formatValorMonetario(valor) {
      return "R$ " + numberUtils.formatValorMonetario(valor);
    },
    loadObservacoes() {
      this.loading = true;
      ClienteBusiness.getAllObservacao(this.value.id)
        .then((response) => {
          this.observacoes = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
      ClienteBusiness.getAllObservacaoNotif(this.value.id, this.value.lojaId)
        .then((response) => {
          this.observacoesNotif = response.data;
          if (response.data.length > 0) {
            this.temObservacao = true;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openDialogAlterar(item) {
      this.dialogAlterar = true;
      this.itemSelecionado = { ...item };
    },
    openDialogExcluir(item) {
      this.dialogExcluir = true;
      this.itemSelecionado = { ...item };
    },
    openDialogExcluirDepen(item) {
      this.dialogExcluirDepen = true;
      this.itemDepenSelecionado = { ...item };
    },
    closeDialogAlterar() {
      this.dialogAlterar = false;
      this.itemSelecionado = null;
    },
    closeDialogExcluir() {
      this.dialogExcluir = false;
      this.itemSelecionado = null;
    },
    closeDialogExcluirDepen() {
      this.dialogExcluirDepen = false;
      this.itemDepenSelecionado = null;
    },
    confirmarAlterar() {
      if (
        this.itemSelecionado.descricao == null ||
        this.itemSelecionado.assuntoObs == null ||
        this.itemSelecionado.descricao == ""
      ) {
        this.$root.showAlerta("Observação precisa ter descrição e assunto");
        return;
      }
      if (!this.$root.isAdminSup()) {
        this.$root.showAlerta("Esse usuário não pode alterar a observação");
        return;
      }
      this.loading = true;
      this.loadingBtn = true;
      ClienteBusiness.alterarObservacao(this.itemSelecionado)
        .then((response) => {
          this.$root.showSucesso(response.data);
          this.reload();
          this.closeDialogAlterar();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loading = false;
          this.loadingBtn = false;
        });
    },
    confirmarExcluir() {
      if (!this.$root.isAdminSup()) {
        this.$root.showAlerta("Esse usuário não pode excluir a observação");
        return;
      }
      this.loading = true;
      this.loadingBtn = true;
      ClienteBusiness.excluirObservacao(this.itemSelecionado)
        .then((response) => {
          this.$root.showSucesso(response.data);
          this.reload();
          this.closeDialogExcluir();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
          this.loading = false;
          this.loadingBtn = false;
        });
    },
    visualizarCliente(item) {
      if (this.cobranca) {
        this.$router.push(`/cliente-cobranca/${item.clienteId}/${item.lojaId}`);
      } else {
        this.$router.push(`/cad-cliente/${item.clienteId}/${item.lojaId}`);
      }
      this.loading = true;
      window.location.reload();
    },
    solicitarCredito() {
      this.flagSolicitarCredito = true;
    },
    cancelarSolicitacao() {
      this.flagSolicitarCredito = false;
    },
    confirmarSolicitacao() {
      this.loading = true;
      this.loadingBtn = true;
      ClienteBusiness.solicitarCredito(this.value.id, this.value.lojaId, false)
        .then((response) => {
          this.flagSolicitarCredito = false;
          this.$root.showSucesso(response.data);
          this.reload();
        })
        .catch((erro) => {
          this.$root.showErro(erro.data);
        })
        .finally(() => {
          this.loadingBtn = false;
          this.loading = false;
        });
    },
  },
};
</script>
