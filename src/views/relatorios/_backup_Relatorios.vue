<!-- eslint-disable vue/no-template-shadow -->
<template>
  <v-container 
    fluid 
    grid-list-md
  >
    <span class="title">Relatorios</span>
    <v-layout 
      row 
      wrap
    >
      <v-flex
        v-for="(rel, i) in relatoriosPermitidas(relatorios)"
        :key="i"
        sm12
        md6
      >
        <v-card>
          <v-card-title>
            <v-icon>{{ rel.icon }}</v-icon>
            <span class="title ml-2">{{ rel.titulo }}</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-tile
                v-for="(item, i) in relatoriosPermitidas(rel.lista)"
                :key="i"
                class="v-list-item"
                @click="openRel(item)"
              >
                <v-list-tile-content>
                  <v-btn 
                    flat 
                    small 
                    color="pink"
                  >
                    {{ item.text }}
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: "%s - Relatório",
  },
  data() {
    return {
      relatorios: [
        {
          icon: "mdi-monitor-dashboard",
          titulo: "Relatórios gerenciais",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/recupera-atrasados-v1",
              text: "Recuperação de Atrasados (Carnê - V1)",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/recupera-atrasados-v2",
              text: "Recuperação de Atrasados (Carnê - V2)",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/clientes-novos",
              text: "Clientes Novos",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/clientes-ativos",
              text: "Clientes Ativos",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/analise-inadimplencia",
              text: "Análise de Inadimplência",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/inadimplencia-primeira-fatura",
              text: "Inadimplência na primeira fatura",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-gerencial-recebiveis-por-vencimento",
              text: "Recebíveis por Vencimento",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/demonstrativo-resultado",
              text: "Demostrativo Resultado Por Exercício",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-gerenciais-resumo-inadimplencia",
              text: "Resumo Inadimplência",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/resumo-utilizacao",
              text: "Resumo Utilização",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            }
          ],
        },
        {
          icon: "mdi-cart",
          titulo: "Relatórios de compras",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/compras-clientes",
              text: "Compras por Clientes",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-lojas",
              text: "Compras por Lojas",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-parcelas",
              text: "Compras por Parcelas",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-vencimento",
              text: "Compras por Vencimento",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-ramo",
              text: "Compras por Ramo de Atividade",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-modalidade",
              text: "Compras por Modalidade",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-origem",
              text: "Compras por Origem",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-canceladas",
              text: "Compras Canceladas",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-credit-card-outline",
          titulo: "Relatórios pagamentos",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/pag-clientes",
              text: "Pagamento de Clientes",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/pag-local",
              text: "Pagamento por Local",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-card-account-details",
          titulo: "Relatórios clientes",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/rel-clientes",
              text: "Relação de Clientes",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/clientes-atraso",
              text: "Clientes em Atraso",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-headset",
          titulo: "Relatórios cobrança",
          roles: [
            "ADMIN", 
            "SUPERVISOR", 
            "COMERCIAL", 
            "NEGOCIADOR"],
          lista: [
            {
              to: "/defas-cobranca",
              text: "Defasagem Cobrança",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
            {
              to: "/cobranca-retorno-por-usuario",
              text: "Retorno por Usuário",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
            {
              to: "/rel-cliente-sem-cobranca",
              text: "Clientes sem cobrança ",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
            {
              to: "/cobranca-por-usuario-analitico",
              text: "Cobrança por Usuário (Analítico)",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
            {
              to: "/cobranca-por-usuario-sintetico",
              text: "Cobrança por Usuário (Sintético)",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
            {
              to: "/acordos-efetuados",
              text: "Acordos Efetuados e Acordos em atraso",
              roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
            },
          ],
        },
        {
          icon: "mdi-chart-histogram",
          titulo: "Relatórios movimento",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/mov-compras",
              text: "Movimento de Compras",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/mov-loja",
              text: "Movimento por Loja",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/mov-pagamentos",
              text: "Movimento de Pagamentos",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/mov-retornos-banco",
              text: "Movimento de Retornos do banco",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/mov-cobranca-registrada-analitico",
              text: "Movimento de Cobrança Registrada (Analítico)",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/mov-cobranca-registrada-sintetico",
              text: "Movimento de Cobrança Registrada (Sintético)",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-bank-transfer",
          titulo: "Relatórios repasse",
          roles: [
            "ADMIN",
            "SUPERVISOR",
            "COMERCIAL",
            "NEGOCIADOR",
            "PROPRIETARIO",
            "PROPRIETARIO_RELATORIO",
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/rel-repasse-lancamento-extra",
              text: "Repasse Lançamento Extra",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-repasse-lancamentos",
              text: "Relatório Repasse de Lançamentos Analíticos",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-repasse-pagamento-efetuado",
              text: "Repasse Pagto Efetuado",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-repasse-previsao-pagamento",
              text: "Repasse Previsão de Pagto",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-repasse-resumo-pagto",
              text: "Repasse Resumo de Pagto",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-cog",
          titulo: "Relatórios sistema",
          roles: ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"],
          lista: [
            {
              to: "/lojas-credenciadas",
              text: "Lojas credenciadas",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
            {
              to: "/rel-usuario",
              text: "Relação de Usuários",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "PROPRIETARIO_RELATORIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    openRel(item) {
      this.$router.push(item.to);
    },
    relatoriosPermitidas(lista) {
      return lista.filter((a) =>
        a.roles.includes(this.$root.roleAtiva().toUpperCase())
      );
    },
  },
};
</script>
