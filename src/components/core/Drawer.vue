<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      app
      clipped
      permanent
    >
      <v-list dense>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :title="link.text"
          class="v-list-item"
        >
        <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
      </v-list>
      <core-alterar-senha
        v-if="dialogAlterarSenha"
        :usuario-id="$root.usuarioId()"
        :show="dialogAlterarSenha"
        :close="closeAlterarSenha"
      />
    </v-navigation-drawer>
    <v-toolbar color="#FFFFFF" app clipped-left tile flat>
      <v-btn icon>
        <v-icon large color="#6B778C" @click="mini = !mini">mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
    </v-toolbar>
    <core-progress-modal :show="loading" />
    <template v-if="dialog">
      <core-dialog-notificacao :item="item" :close="closeDialog" />
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import EventBus from "../../utils/eventBus";
import { LOCALSTORAGE } from "../../constants";
import { UsuarioBusiness } from "../../business";

// roles: ADMIN, SUPERVISOR, COMERCIAL, NEGOCIADOR, PROPRIETARIO, CREDIARISTA, PROPRIETARIO_RELATORIO
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    mini: false,
    item: null,
    loading: false,
    drawer: true,
    roleAtiva: null,
    dialogAlterarSenha: false,
    listaCriticas: null,
    dialog: false,
    logo: "/favicon.ico",
    notificacoes: [],
    notificacaoCritica: null,
    title: null,
    responsive: false,
    temNotificacao: false,
    dadosUsuario: null,
    itensMenu: [],
    // eslint-disable-next-line no-dupe-keys
    links: [
      {
        to: "/home",
        icon: "mdi-home",
        text: "Início",
        roles: ["ADMIN", "SUPERVISOR", "CREDIARISTA"],
        children: [],
      },
      {
        to: "/lista-loja",
        icon: "mdi-shopping",
        text: "Marcas",
        roles: ["ADMIN", "SUPERVISOR", "CREDIARISTA"],
        children: [],
      },
      {
        to: "/lista-cliente",
        icon: "mdi-card-account-details",
        text: "Clientes",
        roles: ["ADMIN", "SUPERVISOR", "CREDIARISTA"],
        children: [],
      },   
      {
        to: "/lista-produto",
        icon: "mdi-tshirt-crew",
        text: "Produtos",
        roles: ["ADMIN", "SUPERVISOR", "CREDIARISTA"],
        children: [],
      },
      {
        to: "/vender",
        icon: "mdi-cart",
        text: "Vender",
        roles: ["ADMIN", "CREDIARISTA", "PROPRIETARIO"],
        children: [],
      },
      {
        to: "/vendas",
        icon: "mdi-credit-card-outline",
        text: "Vendas",
        roles: ["ADMIN", "SUPERVISOR", "CREDIARISTA"],
        children: [],
      },
      {
        to: "/parcelas",
        icon: "mdi-cash-multiple",
        text: "Parcelas",
        roles: ["ADMIN", "CREDIARISTA", "PROPRIETARIO"],
        children: [],
      },
      {
        to: "/relatorios",
        icon: "mdi-file-document",
        text: "Relatórios",
        roles: [
          "ADMIN",
          "SUPERVISOR",
          "NEGOCIADOR",
          "PROPRIETARIO",
          "PROPRIETARIO_RELATORIO",
        ],
      },
    ],
  }),
  computed: {
  },
  watch: {
    $route(val) {
      this.title = val.name;
    },
  },

  beforeMount() {
    this.roleAtiva = this.$root.roleAtiva();
    EventBus.$on("NOTIFICACAO_VISUALIZADA", (id) => {
      this.notificacoes = this.notificacoes.filter((item) => item.id !== id);
    });

    EventBus.$on("NOVAS_NOTIFICACOES", () => {
      this.loadNotificacoes();
    });

    this.title = this.$route.name;
    this.roleAtiva = this.$root.roleAtiva();
    this.dadosUsuario = this.$root.dadosUsuario();
    this.populaItensMenu();
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    username() {
      return localStorage.getItem(LOCALSTORAGE.LOGIN);
    },
    userProfile() {
      this.$router.push("user-profile");
    },
    roles() {
      return this.$root.roles();
    },
    changeRoleAtiva(item) {
      this.roleAtiva = item;
      UsuarioBusiness.updateRoleAtiva(this.$root.usuarioId(), this.roleAtiva)
        .then((response) => {
          this.$root.setRoleAtiva(this.roleAtiva);
          document.location.reload();
        })
        .catch(() =>
          this.$root.showErro("Erro ao alterar o perfil de acesso do usuário")
        );
    },
    openAlterarSenha() {
      this.dialogAlterarSenha = true;
    },
    closeAlterarSenha() {
      this.dialogAlterarSenha = false;
    },
    populaItensMenu() {
      // ! REGRA DE NEGOCIO - ROLE COMERCIAL
      const roleAtiva = this.$root.roleAtiva().toUpperCase();
      if (roleAtiva === "CREDIARISTA" || roleAtiva === "PROPRIETARIO") {
        this.itensMenu.push({ name: "Início", icon: "mdi-home", to: "/home" });
      }
    },
    onClickMenuItem(item) {
      if (item.name === "Sair") {
        this.logout();
      }
      if (item.name === "Dashboard") {
        this.$router.push("/");
      }
      if (item.name === "Início") {
        this.$router.push(item.to);
      }
      if (item.name === "Configuração") {
        this.$router.push("/config");
      }
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    logout() {
      localStorage.clear();
      window.location.reload();
    },
    openDialog(item) {
      this.item = item;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.notificacaoCritica = {};
    },
  },
};
</script>

<style scoped>
.v-toolbar {
  min-height: 30px !important;
  border-radius: 0px;
  margin-bottom: 15px;
}
</style>
