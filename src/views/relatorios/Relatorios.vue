

<template>
  <div class="">
    <div class="containWave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="rgb(0, 99, 175)"
          fill-opacity="1"
          d="M0,224L40,229.3C80,235,160,245,240,250.7C320,256,400,256,480,229.3C560,203,640,149,720,128C800,107,880,117,960,144C1040,171,1120,213,1200,245.3C1280,277,1360,299,1400,309.3L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>
    <div style="margin-top: -150px; margin-left: 30px">
      <div class="title white--text">Relatórios</div>
      <div class="py-2 my-3 text-left">
        <v-text-field
          v-model="search"
          solo
          clear-icon="mdi-close-circle"
          clearable
          @click:clear="search = ''"
          placeholder="Buscar por relatório"
          style="width: 70%"
        />
      </div>
    </div>
    <div class="mt-1 ml-4 menuList">
      <div v-for="(rel, i) in GET_RELATORIOS" :key="i">
        <div class="menu-item" v-if="getLista(rel.lista, rel.code).length > 0">
          <v-icon class="menu-icone">{{ rel.icon }}</v-icon>
          <span class="menu-titulo">{{ rel.titulo }}</span>
        </div>
        <div class="containListSubMenu">
          <div
            v-for="(item, i) in getLista(rel.lista, rel.code)"
            :key="i"
            class="submenu-item"
          >
            <a class="submenu-link" @click="openRel(item)">{{ item.text }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Relatorios from "./listaMenu";
export default {
  name: "ListaDeRelatorios",
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
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/lista-produtos",
              text: "Lista de Produtos",
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
              to: "/lista-clientes",
              text: "Lista de Clientes",
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
              to: "/perfil-carteira",
              text: "Perfil da Carteira",
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
              to: "/clientes-novos",
              text: "Clientes Novos",
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
              to: "/analise-inadimplencia",
              text: "Análise de Inadimplência",
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
              to: "/inadimplencia-primeira-fatura",
              text: "Inadimplência na primeira fatura",
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
              to: "/inadimplencia-safra",
              text: "Inadimplência por safra",
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
              to: "/rel-gerenciais-resumo-faturamento",
              text: "Resumo Faturamento",
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
                "CREDIARISTA",
              ],
            },
            {
              to: "/idas-a-loja",
              text: "Compras por Idas à Loja",
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
              to: "/compras-perfil",
              text: "Compras por Perfil Cliente",
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
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-tipo-transacao",
              text: "Compras por tipo de transação",
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
                "CREDIARISTA",
              ],
            },
            {
              to: "/compras-recusadas-sintetico",
              text: "Recusadas Sintéticas",
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
              to: "/compras-recusadas-analitico",
              text: "Recusadas Analíticas",
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
              to: "/duplicidade",
              text: "Duplicidade de Autorizações",
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
            // {
            //   to: "/repique-loja",
            //   text: "Repique Loja",
            //   roles: [
            //     "ADMIN",
            //     "SUPERVISOR",
            //     "COMERCIAL",
            //     "NEGOCIADOR",
            //     "PROPRIETARIO",
            //     "PROPRIETARIO_RELATORIO",
            //     "CREDIARISTA",
            //   ],
            // },
            {
              to: "/recompra-loja",
              text: "Recompra Loja",
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
            "CREDIARISTA",
          ],
          lista: [
            {
              to: "/clientes-atraso",
              text: "Clientes em Atraso",
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
              to: "/limite-disponivel",
              text: "Limite Disponível por Cliente",
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
              to: "/rel-consulta-spc",
              text: "Consultas no SPC (Analítico)",
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
              to: "/resumo-consulta-spc",
              text: "Consultas no SPC (Resumo)",
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
              to: "/docs-armazenados",
              text: "Documentos Armazenados",
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/proposta-adesao",
              text: "Proposta de Adesão",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "PROPRIETARIO",
              ],
            },
            {
              to: "/rel-comprovante-quitacao",
              text: "Declaração Anual de Quitação",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "PROPRIETARIO",
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
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/cobranca-retorno-por-usuario",
              text: "Retorno por Usuário",
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/ultimas-cobrancas",
              text: "Últimas Cobranças",
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/rel-cliente-sem-cobranca",
              text: "Clientes sem cobrança ",
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/cobranca-por-usuario-analitico",
              text: "Cobrança por Usuário (Analítico)",
              roles: [
                "ADMIN", 
                "SUPERVISOR", 
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
            },
            {
              to: "/cobranca-por-usuario-sintetico",
              text: "Cobrança por Usuário (Sintético)",
              roles: [
                "ADMIN", 
                "SUPERVISOR",
                "COMERCIAL", 
                "NEGOCIADOR"
              ],
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
                "CREDIARISTA",
              ],
            },
          ],
        },
        {
          icon: "mdi-office",
          titulo: "Relatórios Redes e Lojas",
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
                "CREDIARISTA",
              ],
            },
            {
              to: "/empresas-lojas",
              text: "Empresas / Lojas",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR"
              ],
            },
            {
              to: "/rel-tarifa-por-loja",
              text: "Tarifa por loja",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR"
              ],
            },
            {
              to: "/tarifa-por-rede",
              text: "Tarifa por rede",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR"
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
              to: "/rel-usuario",
              text: "Relação de Usuários",
              roles: [
                "ADMIN",
                "SUPERVISOR",
                "COMERCIAL",
                "NEGOCIADOR",
                "PROPRIETARIO",
                "CREDIARISTA",
              ],
            },
          ],
        },
      ],
      search: "",
      listaEmpty: {},
    };
  },
  computed: {
    GET_RELATORIOS() {
      let roleAtiva = this.$root.roleAtiva().toUpperCase();
      let containerList = [...this.relatorios];
      let lista = containerList;
      return lista;
    },
  },
  mounted() {
    this.relatorios = Relatorios;
  },
  methods: {
    getLista(lista, code) {
      let menuItens = lista;
      return menuItens;
    },
    openRel(item) {
      this.$router.push(item.to);
    },
    relatoriosPermitidas(lista) {
      return lista;
    },
  },
};
</script>

<style lang="scss" scoped>
.containListSubMenu {
  
}
.containWave {
  min-height: 200px;
}
.menuList {
  display: flex;
  flex-direction: column;
}
.menu-item {
  padding: 5px 10px;
  display: flex;
  justify-items: center;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 20px;
  .menu-titulo {
    flex: 1;
    color: rgba(50, 50, 50, 1);
    font-weight: normal;
    font-size: 20px;
    padding: 0px;
  }
  .menu-icone {
    flex: none;
    color: rgb(0, 99, 175);
    background-color: rgba(0, 99, 175, 0.1);
    border-radius: 100%;
    padding: 8px;
    margin-right: 16px;
    font-size: 20px;
  }
}
.submenu-item {
  margin-top: 4px;
  font-size: 14px;
}
.submenu-link {
  padding: 4px;
  margin-left: 60px;
  //text-decoration: underline;
  color: rgb(0, 99, 175);
  transition: color 0.2s;
  &:hover {
    color: rgb(0, 110, 195);
    text-decoration: underline;
  }
}
.inputClean {
  border-radius: 5px;
  padding: 6px 12px;
  margin-left: 5px;
  background-color: white;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.3);
  .icon {
    color: red;
  }
}
.inputSearch {
  border-radius: 5px;
  padding: 8px 12px;
  background-color: white;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.3);
  width: 60%;
  margin: 0 auto;
  display: inline-block;
  font-weight: normal;
  outline: none;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  &:placeholder {
    color: rgba(190, 190, 190, 1);
  }
}
</style>