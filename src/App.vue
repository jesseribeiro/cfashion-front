<template>
  <v-app>
    <template>
      <!-- <core-filter /> -->

      <!--<core-toolbar />-->

      <core-drawer />

      <core-view />
    </template>
  </v-app>
</template>

<script>
export default {
  metaInfo: {
    title: "Cristã Fashion ",
    titleTemplate: "%s",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

<style>
.arrow-pagintion .v-btn {
  color: #a10c5e !important;
}
.v-stepper__content {
  top: 0;
  padding: 0px;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  width: 100%;
}
</style>
