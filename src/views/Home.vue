<template>
  <v-container fluid grid-list-md>
    <material-card color="primary" flat full-width title="Funcionalidades">
      <v-layout row wrap>
        <v-flex md3 lg2>
          <v-btn
            color="accent"
            icon
            outline
            @click="$router.push('lista-loja')"
          >
            <v-layout column>
              <v-icon>mdi-shopping</v-icon>
              Marcas
            </v-layout>
          </v-btn>
        </v-flex>
        <v-flex md3 lg2>
          <v-btn
            color="accent"
            icon
            outline
            @click="$router.push('lista-cliente')"
          >
            <v-layout column>
              <v-icon>mdi-card-account-details</v-icon>
              Clientes
            </v-layout>
          </v-btn>
        </v-flex>
        <v-flex md3 lg2>
          <v-btn
            color="accent"
            icon
            outline
            @click="$router.push('lista-produto')"
          >
            <v-layout
              column>
              <v-icon>mdi-tshirt-crew</v-icon>
              Produtos
            </v-layout>
          </v-btn>
        </v-flex>
        <v-flex md3 lg2>
          <v-btn color="accent" 
            icon 
            outline 
            @click="$router.push('vender')"
          >
            <v-layout column>
              <v-icon>mdi-cart</v-icon>
              Vender
            </v-layout>
          </v-btn>
        </v-flex>
        <v-flex md3 lg2>
          <v-btn
            color="accent"
            icon
            outline
            @click="$router.push('vendas')"
          >
            <v-layout column>
              <v-icon>mdi-credit-card-outline</v-icon>
              Vendas
            </v-layout>
          </v-btn>
        </v-flex>
        <v-flex md3 lg2>
          <v-btn
            color="accent"
            icon
            outline
            @click="$router.push('parcelas')"
          >
            <v-layout column>
              <v-icon>mdi-cash-multiple</v-icon>
              Parcelas
            </v-layout>
          </v-btn>
        </v-flex>
      </v-layout>
    </material-card>
  </v-container>
</template>
<script>
export default {
  metaInfo: {
    titleTemplate: "%s - Início",
  },
  data() {
    return {
      dadosUsuario: null,
    };
  },
  beforeMount() {
    // ! REGRA DE NEGOCIO ROLE
    this.dadosUsuario = this.$root.dadosUsuario();
    const roleAtiva = this.$root.roleAtiva().toUpperCase();
    if (roleAtiva !== "CREDIARISTA" && roleAtiva !== "PROPRIETARIO") {
      this.$router.push("/");
    }
  },
};
</script>
<style scoped>
.v-btn.v-btn--icon {
  line-height: 41px;
  padding: 0;
  width: 120px !important;
  height: 96px !important;
  font-size: 16px !important;
  /*color: #424242 !important; */
}
.v-btn .v-icon {
  font-size: 2.25rem !important;
  margin-top: 10px !important;
}
</style>
