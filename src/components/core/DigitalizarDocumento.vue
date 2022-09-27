<template>
  <v-container
    fluid
    grid-list-md>
    <v-form
      novalidate
      enctype="multipart/form-data"
      @submit.prevent="validateBeforeSubmit">
      <v-layout
        row
        wrap>
        <v-flex md12>
          <v-card class="elevation-0">
            <v-card-text>
              <v-layout
                row
                wrap>
                <v-flex md12>
                  <v-layout column>
                    <span class="body-2">Selecione o documento a ser digitalizado</span>
                    <v-image-input
                      v-model="file"
                      v-validate="'required'"
                      :image-quality="0.85"
                      :image-height="800"
                      :image-width="600"
                      :full-height="true"
                      :full-width="true"
                      class="arrow-pagintion"
                      clearable
                      image-format="jpeg"
                      clear-icon="mdi-close"
                      error-icon="mdi-alert-circle"
                      success-icon="mdi-upload"
                      image-min-scaling="contain"
                      required
                      @file-info="onFileInfo"
                    />
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-layout class="justify-end">
            <v-btn
              outline
              style="color: black !important"
              @click="cancelar">Cancelar</v-btn>
            <v-btn
              :loading="loadingBtn"
              type="submit"
              color="primary"
            >Enviar</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
import { ClienteBusiness } from '../../business'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    lojaId: {
      type: Number,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false
  },
  data () {
    return {
      file: null,
      loadingBtn: false,
      extensions: [
        "image/png",
        "image/jpg",
        "image/jpeg"
      ]
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loadingBtn = true
          let formData = new FormData()
          formData.append('file', this.file)
          formData.append('nome', 'documento-digitalizado')
          formData.append('tipo', this.tipo)

          ClienteBusiness.uploadDocumento(this.id, this.lojaId, formData)
            .then(response => {
              this.$root.showSucesso('Documento digitalizado com sucesso')
              this.callback(true)
            })
            .catch(error => this.$root.showErro(error.data))
            .finally(() => {
              this.loadingBtn = false
            })
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
      })
    },
    onFileInfo (e) {
      if(!this.extensions.includes(e.type)) {
        this.$root.showAlerta(`Formato de arquivo não suportado!<br><span class='body-2'>Formatos suportados: png, jpg, jpeg </span>`)
        this.file = null
      }
    },
    cancelar () {
      this.callback(false)
    }
  }
}
</script>
