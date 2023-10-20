/* eslint-disable no-extra-boolean-cast */
// =========================================================
// * Vuetify Material Dashboard - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licenses under MIT

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

// Components
import "./components";

// Plugins
import "./plugins";
import { sync } from "vuex-router-sync";

// Application imports
import App from "./App";
import router from "@/router";
import store from "@/store";
import VeeValidate, { Validator } from "vee-validate";
import br from "vee-validate/dist/locale/pt_BR";
import VueTheMask from "vue-the-mask";
import money from "v-money";
import axios from "axios";
import { LOCALSTORAGE } from "./constants";
import VueApexCharts from "vue-apexcharts";
import VueHtmlToPaper from "vue-html-to-paper";
import VueSSE from "vue-sse";
import VueMeta from "vue-meta";
import "./registerServiceWorker";

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

Vue.use(VueSSE);

const options = {
  name: "_blank",
  specs: ["fullscreen=no", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "./styles/index.scss",
  ],
};

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

Vue.use(VueApexCharts);
Vue.component("Apexchart", VueApexCharts);

const moment = require("moment");
require("moment/locale/pt-br");
Vue.use(require("vue-moment"), {
  moment,
});

Vue.use(money, {
  precision: 2,
  decimal: ",",
  thousands: ".",
  masked: false,
});

console.log("Ambiente alterado: " + process.env.NODE_ENV);

// no branch dev tem q esta sempre essa url praticobackhomolog.trulogic.com.br
// no branch master tem q ser essa praticoback.trulogic.com.br
const URL_BASE = "http://localhost:9000/";

axios.defaults.baseURL = URL_BASE;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let containUrl = error.config.url;
    if (error.response.status === 401 && containUrl.indexOf("login") === -1) {
      // error.response.status === 403 ||
      localStorage.removeItem("JWT");
      window.location.reload();
    }
    if (
      error.request.responseType === "blob" &&
      error.response.data instanceof Blob &&
      error.response.data.type &&
      error.response.data.type.toLowerCase().indexOf("json") !== -1
    ) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          console.log("onload: ", reader.result);
          try {
            error.response.data = JSON.parse(reader.result);
          } catch (e) {
            error.response.data = reader.result;
          }
          console.log("message 2 : ", error.response.data);
          resolve(Promise.reject(error));
        };
        reader.onerror = () => {
          console.log("onerror", error);
          reject(error);
        };
        reader.readAsText(error.response.data);
      });
    }
    return Promise.reject(error.response);
  }
);

// Add a response interceptor

axios.interceptors.request.use(
  (config) => {
    if (
      config.baseURL === URL_BASE &&
      !config.headers.Authorization &&
      localStorage.getItem(LOCALSTORAGE.JWT)
    ) {
      let token = JSON.parse(localStorage.getItem(LOCALSTORAGE.JWT));
      config.headers.Authorization = token.tokenType + " " + token.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Vue.use(VueTheMask);

Vue.use(VeeValidate);

Validator.localize("pt-Br", br);

Validator.extend("maiorQueZero", {
  getMessage: (field) => "Valor deve ser maior que ZERO",
  validate: (value) => !!value && value > 0,
});
// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

const TIMEOUT_NOTIFICATION = 8000;

// utilizado para formatar a moeda quando é carregado a tela q já tem valor
// https://blog.bitsrc.io/a-guide-to-custom-directives-in-vue-46fc87abfd4f
Vue.directive("formata-moeda", {
  bind: function (el, binding) {
    let handler = function (e) {
      if (binding.value) {
        e.target.value = binding.value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });
        // el.removeEventListener('input', handler)
      }
      el.removeEventListener("input", handler);
    };
    el.addEventListener("input", handler);
  },
});

const funcaoNegativeDirectiva = (el, binding) => {
  try {
    if (Math.sign(parseFloat(binding.value)) === -1) {
      el.classList.add("red--text");
      el.classList.add("text--darken-1");
      el.classList.add("font-weight-bold");
    } else {
      el.classList.remove("red--text");
    }
  } catch (e) {}
};

Vue.directive("negative", {
  inserted: funcaoNegativeDirectiva,
  componentUpdated: funcaoNegativeDirectiva,
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: {
    type: "success",
    message: "",
    alert: false,
    icon: "",
    timeout: TIMEOUT_NOTIFICATION,
    messagePush: "",
    push: false,
  },
  methods: {
    urlBase() {
      return URL_BASE;
    },
    showAlerta(msg) {
      this.type = "warning";
      this.message = msg;
      this.icon = "mdi-exclamation";
      this.alert = true;
    },
    showInfo(msg) {
      this.type = "info";
      this.message = msg;
      this.icon = "mdi-information";
      this.alert = true;
    },
    showSucesso(msg) {
      this.type = "success";
      this.message = msg;
      this.icon = "mdi-check-circle";
      this.alert = true;
    },
    showErro(msg) {
      this.type = "error";
      this.message = msg;
      this.icon = "mdi-alert";
      this.alert = true;
    },
    reset() {
      this.type = "success";
      this.message = "";
      this.alert = false;
      this.icon = "";
    },
    addTokenHeader() {
      if (!!localStorage.getItem(LOCALSTORAGE.JWT)) {
        let token = JSON.parse(localStorage.getItem(LOCALSTORAGE.JWT));
        axios.defaults.headers.common["Authorization"] =
          token.tokenType + " " + token.accessToken;
      }
    },
    usuarioId() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario.id;
      }
      return "";
    },
    usuarioDados() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario;
      }
      return false;
    },
    usuarioLogin() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario.login;
      }
      return "";
    },
    isAdmin() {
      return this.roleAtiva() === "ADMIN";
    },
    isRolesPratico() {
      return ["ADMIN", "SUPERVISOR", "COMERCIAL", "NEGOCIADOR"].includes(
        this.roleAtiva()
      );
    },
    rolesLabel() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario.rolesLabel;
      }
      return "";
    },
    lojaId() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario.lojaId;
      }
      return "";
    },
    roles() {
      return this.rolesLabel().split(",");
    },
    roleAtiva() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        return dadosUsuario.roleAtiva;
      }
      return "";
    },
    setRoleAtiva(role) {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        let dadosUsuario = JSON.parse(
          localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)
        );
        dadosUsuario.roleAtiva = role;
        localStorage.setItem(
          LOCALSTORAGE.DADOS_USUARIO,
          JSON.stringify(dadosUsuario)
        );
      }
    },
    dadosUsuario() {
      if (!!localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO)) {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE.DADOS_USUARIO));
      }
      return null;
    },
  },
  render: (h) => h(App),
}).$mount("#app");
