<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container 
    fluid 
    grid-list-md
  >
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <div class="title pb-3">
      {{ titulo }}
    </div>
    <v-form 
      ref="form2" 
      @submit.prevent="emitSubmit()"
    >
      <v-layout 
        row 
        wrap
      >
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout 
                row 
                wrap
              >
                <v-flex md12>
                  <core-filtro-rede-empresa-loja
                    v-model="filtros"
                    :show-todas="true"
                    :obrigatorio="true"
                  />
                </v-flex>
                <slot />
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-layout class="justify-end">
            <v-btn 
              :loading="loadingBtn" 
              type="submit" 
              color="pink"
            >
              Gerar
            </v-btn>
          </v-layout>
        </v-flex>
        <core-progress-modal :show="loading" />
        <embed
          v-if="filePdf && filePdf.length > 0"
          id="plugin"
          :src="filePdf"
          width="100%"
          height="1000px"
          name="plugin"
          type="application/pdf"
        >
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    titulo: {
      required: true,
      type: String,
    },
    loading: {
      required: true,
      default: false,
      type: Boolean,
    },
    loadingBtn: {
      required: true,
      default: false,
      type: Boolean,
    },
    filePdf: {
      default: "",
      required: true,
      type: String,
    },
    filtros: {
      required: true,
      type: Object,
    },
  },
  methods: {
    emitSubmit() {
      this.$emit("validateBeforeSubmit");
    },
  },
};
</script>

<style>
</style>