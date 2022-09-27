//Padronização de casos de repetições do javascript & regras
import vTitulo from "./components/vTitulo.vue"
export const DefaultInterface = {
  components: {
    vTitulo
  },
  data() {
    return {
      loading: false,
      loadingBtn: false,
    }
  }
}

import {
  TODAS_ID
} from "@/constants";
export const RedeEmpresaLoja = {
  data() {
    return {
      filtros: {
        redeId: null,
        empresaId: null,
        lojaId: null,
      }
    }
  },
  methods: {
    validaRedeEmpresa() {
      if (!this.filtros.redeId && this.filtros.redeId === TODAS_ID) {
        this.$root.showAlerta("Selecione uma rede!");
        return false;
      } else if (!this.filtros.empresaId && this.filtros.empresaId === TODAS_ID) {
        this.$root.showAlerta("Selecione uma empresa!");
        return false;
      } else if (!this.filtros.lojaId) {
          this.$root.showAlerta('Selecione uma loja!')
          return false;
      } else {
        return true;
      }
    }
  }
}

const defaultType = "PDF";
import {
  TiposBusiness
} from "@/business";
export const MethodsTypeReport = {
  data() {
    return {
      filtros: {
        tipoRel: defaultType
      },
      tiposRel: [],
      filePDF: null
    }
  },
  beforeMount() {
    TiposBusiness.getAllTiposRelatorio().then((response) => {
      this.tiposRel = response.data;
    });
  }
}