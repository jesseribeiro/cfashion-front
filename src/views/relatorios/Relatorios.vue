

<template>
  <div class="">
    <div class="containWave">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320">
        <path
          fill="rgb(180, 10, 90)"
          fill-opacity="1"
          d="M0,224L40,229.3C80,235,160,245,240,250.7C320,256,400,256,480,229.3C560,203,640,149,720,128C800,107,880,117,960,144C1040,171,1120,213,1200,245.3C1280,277,1360,299,1400,309.3L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        />
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
          placeholder="Buscar por relatório"
          style="width: 70%"
          @click:clear="search = ''"
        />
      </div>
    </div>
    <div class="mt-1 ml-4 menuList">
      <div 
        v-for="(rel, i) in GET_RELATORIOS" 
        :key="i">
        <div 
          v-if="getLista(rel.lista, rel.code).length > 0" 
          class="menu-item">
          <v-icon class="menu-icone">{{ rel.icon }}</v-icon>
          <span class="menu-titulo">{{ rel.titulo }}</span>
        </div>
        <div class="containListSubMenu">
          <div
            v-for="(item, i) in getLista(rel.lista, rel.code)"
            :key="i"
            class="submenu-item"
          >
            <a 
              class="submenu-link" 
              @click="openRel(item)">{{ item.text }}</a>
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
      relatorios: [],
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
    color: rgb(180, 10, 90);
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
  color: rgb(180, 10, 90);
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