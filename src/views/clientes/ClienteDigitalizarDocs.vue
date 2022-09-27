<template>
  <v-container
    fluid
    grid-list-md>
    <core-progress-modal :show="loading" />
    <template v-if="!flgDigitalizando && !loading">
      <v-card
        class="
          amber
          lighten-5
          grey--text
          text--darken-2
          pa-4
          elevation-0
          noshadow
          text-center
        "
      >
        <span
          class="subheading"
        >Anexe abaixo os documentos digitalizados do cliente, formato: JPG,
        JPEG ou PNG.</span
        >
      </v-card>
      <v-form
        ref="form2"
        @submit.prevent="validateBeforeSubmit">

        <div class="uiSelect my-2 d-grid grid-cols-1-1">
          <div/>
          <div class="text-center">
            <v-btn
              :outline="selectedDocType !== 'RG'"
              color="primary"
              class="mx-1"
              @click="selectedDocType = 'RG'"
            >RG</v-btn
            >
            <v-btn
              :outline="selectedDocType !== 'CNH'"
              color="primary"
              class="mx-1"
              @click="selectedDocType = 'CNH'"
            >CNH</v-btn
            >
          </div>
        </div>

        <div
          class="
            d-grid
            grid-cols-1-1
            centralizaTudo
            my-4
            grey
            lighten-2
            pa-4
            rounded-1
          "
        >
          <v-card class="card-item">
            <div class="header-item pa-2">
              Proposta de Adesão
              <v-divider v-if="!docProposta" />
            </div>

            <div class="scopoImagem">
              <div
                v-if="!docProposta"
                class="iconSlot">
                <v-icon
                  class="icone"
                  size="100"
                  @click="openDigitalizar('P')"
                >mdi-file-plus</v-icon
                >
              </div>
              <v-img
                v-else
                :src="docProposta.path"
                class="imagemEnviada"
                @click="openDialog(docProposta.path)"
              />
            </div>

            <div class="px-3 py-1 text-right">
              <v-icon
                v-if="$root.isAdmin() && docProposta"
                color="red"
                @click="openDialogDelete(docProposta.anexoId)"
              >mdi-delete</v-icon
              >
            </div>
          </v-card>
          <div :class="{ 'd-grid grid-cols-1-1': selectedDocType == 'RG' }">
            <v-card
              v-show="selectedDocType == 'RG'"
              class="card-item">
              <div class="header-item pa-2">
                RG (frente)
                <v-divider v-if="!docRgFrente" />
              </div>

              <div class="scopoImagem">
                <div
                  v-if="!docRgFrente"
                  class="iconSlot">
                  <v-icon
                    class="icone"
                    size="100"
                    @click="openDigitalizar('F')"
                  >mdi-card-account-details</v-icon
                  >
                </div>
                <v-img
                  v-else
                  :src="docRgFrente.path"
                  class="imagemEnviada"
                  @click="openDialog(docRgFrente.path)"
                />
              </div>

              <div class="px-3 py-1 text-right">
                <v-icon
                  v-if="$root.isAdmin() && docRgFrente"
                  color="red"
                  @click="openDialogDelete(docRgFrente.anexoId)"
                >mdi-delete</v-icon
                >
              </div>
            </v-card>
            <v-card
              v-show="selectedDocType == 'RG'"
              class="card-item">
              <div class="header-item pa-2">
                RG (verso)
                <v-divider v-if="!docRgVerso" />
              </div>

              <div class="scopoImagem">
                <div
                  v-if="!docRgVerso"
                  class="iconSlot">
                  <v-icon
                    class="icone"
                    size="100"
                    @click="openDigitalizar('V')"
                  >mdi-card-plus</v-icon
                  >
                </div>
                <v-img
                  v-else
                  :src="docRgVerso.path"
                  class="imagemEnviada"
                  @click="openDialog(docRgVerso.path)"
                />
              </div>

              <div class="px-3 py-1 text-right">
                <v-icon
                  v-if="$root.isAdmin() && docRgVerso"
                  color="red"
                  @click="openDialogDelete(docRgVerso.anexoId)"
                >mdi-delete</v-icon
                >
              </div>
            </v-card>
            <v-card
              v-show="selectedDocType == 'CNH'"
              class="card-item">
              <div class="header-item pa-2">
                CNH
                <v-divider v-if="!docCnh" />
              </div>

              <div class="scopoImagem">
                <div
                  v-if="!docCnh"
                  class="iconSlot">
                  <v-icon
                    class="icone"
                    size="100"
                    @click="openDigitalizar('C')"
                  >mdi-card-plus</v-icon
                  >
                </div>
                <v-img
                  v-else
                  :src="docCnh.path"
                  class="imagemEnviada"
                  @click="openDialog(docCnh.path)"
                />
              </div>

              <div class="px-3 py-1 text-right">
                <v-icon
                  v-if="$root.isAdmin() && docCnh"
                  color="red"
                  @click="openDialogDelete(docCnh.anexoId)"
                >mdi-delete</v-icon
                >
              </div>
            </v-card>
          </div>
        </div>

        <div class="customDocs">
          <!-- Documentos existentes -->
          <v-card
            v-for="(doc, i) in docOutros"
            :key="i"
            class="card-item">
            <div class="header-item pa-2 text-center">
              Outros
              <v-divider />
            </div>

            <div class="scopoImagem">
              <div
                v-if="!doc"
                class="iconSlot">
                <v-icon
                  class="icone"
                  size="100"
                  @click="openDigitalizar('O')"
                >mdi-text-box-plus</v-icon
                >
              </div>
              <v-img
                v-else
                :src="doc.path"
                class="imagemEnviada"
                @click="openDialog(doc.path)"
              />
            </div>
            <div class="px-3 py-1 text-right">
              <v-icon
                v-if="$root.isAdmin() && doc"
                color="red"
                @click="openDialogDelete(doc.anexoId)"
              >mdi-delete</v-icon
              >
            </div>
          </v-card>
          <!-- Novo documento -->
          <v-card class="card-item">
            <div class="header-item pa-2 text-center">
              Outros
              <v-divider />
            </div>

            <div class="scopoImagem">
              <div class="iconSlot">
                <v-icon
                  class="icone"
                  size="100"
                  @click="openDigitalizar('O')"
                >mdi-text-box-plus</v-icon
                >
              </div>
            </div>
            <div class="px-3 py-1 text-right"/>
          </v-card>
        </div>

        <v-layout
          row
          wrap>
          <v-flex
            md12
            class="mt-5">
            <v-layout class="justify-end">
              <v-btn
                dark
                @click="goBack">{{
                  editando ? "Sair" : "Voltar"
                }}</v-btn>
              <v-btn
                :loading="loadingBtn"
                type="submit"
                color="primary">{{
                  editando ? "Salvar" : "Continuar"
                }}</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
    </template>

    <template v-if="flgDigitalizando && !loading">
      <core-digitalizar-documento
        :id="value.id"
        :loja-id="Number(value.lojaId)"
        :tipo="tipo"
        :callback="callbackDigitalizarDoc"
      />
    </template>

    <template v-if="currentImage && !loading">
      <v-dialog
        v-model="dialogImage"
        width="600"
        scrollable>
        <v-card>
          <v-card-text>
            <v-img :src="currentImage" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>

    <template v-if="!loading">
      <v-layout
        row
        justify-center>
        <v-dialog
          v-model="dialogDelete"
          max-width="390">
          <v-card>
            <v-card-title class="headline">Excluir Documento</v-card-title>

            <v-card-text
            >Confirma a exclusão do documento, essa operação não poderá ser
            desfeita?</v-card-text
            >

            <v-card-actions>
              <v-spacer />

              <v-btn
                color="primary"
                @click="closeDialogDelete"
              >Cancelar</v-btn>
              <v-btn
                :loading="loadingBtn"
                color="red"
                @click="deleteItem"
              >Excluir</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { ClienteBusiness, ClienteLojaBusiness } from '../../business'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    nextStep: {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    goBack: {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    setData: {
      type: Function,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    disabled: false,
    // eslint-disable-next-line vue/require-default-prop
    editando: false
  },
  data () {
    return {
      selectedDocType: 'RG',
      currentPage: 0,
      pageCount: 0,
      form: {},
      redes: [],
      empresas: [],
      lojas: [],
      filePDF: null,
      flgDigitalizando: false,
      tipo: null,
      docProposta: null,
      docRgFrente: null,
      docRgVerso: null,
      docCnh: null,
      docOutros: [],
      listDocIds: [],
      currentImage: null,
      dialogImage: false,
      dialogDelete: false,
      anexoId: null,
      loadingBtn: false,
      loading: false
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  beforeMount () {
    this.callbackDigitalizarDoc(true)
  },
  methods: {
    openDigitalizar (tipo) {
      this.tipo = tipo
      this.flgDigitalizando = true
    },
    validateBeforeSubmit () {
      if (
        !!this.docProposta &&
        ((!!this.docRgFrente && !!this.docRgVerso) || !!this.docCnh)
      ) {
        this.loadingBtn = true
        ClienteLojaBusiness.inserirClienteLoja({
          clienteId: this.value.id,
          lojaId: this.value.lojaId
        })
          .then(() => {
            this.loadingBtn = false
            this.nextStep()
          })
          .catch((erro) => {
            this.$root.showErro(erro.data)
          })
      } else {
        this.$root.showAlerta(
          'É obrigatório add a proposta de adesão e um documento com foto!'
        )
      }
    },
    callbackDigitalizarDoc (reload) {
      // passar a flgDigitalizando para false
      this.flgDigitalizando = false
      this.tipo = null
      if (reload) {
        this.loading = true
        this.listDocIds = null
        this.docProposta = null
        this.docRgFrente = null
        this.docCnh = null
        this.docRgVerso = null
        this.docOutros = []
        // carregar os documentos já digitalizados e mostrar como miniaturas
        ClienteBusiness.getAnexosOfCliente(this.value.id, this.value.lojaId)
          .then((response) => {
            this.listDocIds = response.data
            this.listDocIds.forEach((file) => {
              switch (file.tipoDocumento) {
                case 'P':
                  this.docProposta = file
                  break
                case 'F':
                  this.docRgFrente = file
                  break
                case 'V':
                  this.docRgVerso = file
                  break
                case 'C':
                  this.docCnh = file
                  break
                default:
                  this.docOutros.push(file)
              }
            })
          })
          .catch((error) => {
            this.$root.showErro(error.data)
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    openDialog (image) {
      this.currentImage = image
      this.dialogImage = true
    },
    openDialogDelete (anexoId) {
      this.anexoId = anexoId
      this.dialogDelete = true
    },
    closeDialogDelete () {
      this.item = null
      this.dialogDelete = false
    },
    deleteItem () {
      this.loadingBtn = true
      ClienteBusiness.deleteAnexo(this.value.id, this.anexoId)
        .then((response) => {
          this.anexoId = null
          this.dialogDelete = false
          this.$root.showSucesso('Registro excluido com sucesso')
          this.callbackDigitalizarDoc(true)
        })
        .catch((erro) => this.$root.showError(erro.data))
        .finally(() => {
          this.loadingBtn = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.customDocs {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  align-content: flex-start;
  flex-wrap: wrap;
}
.card-item {
  max-width: 250px;
  width: 250px;
  min-width: 250px;
  display: inline-block;
  margin: 5px;
  //grid-template-columns: 1fr;
  //grid-template-rows: auto 210px auto;
  .header-item {
    vertical-align: center;
    text-align: center;
    font-weight: bold;
  }
  .scopoImagem {
    width: 100%;
    height: 200px;
    max-height: 200px;
    min-height: 200px;
    text-align: center;
    align-content: center;
    vertical-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    .imagemEnviada {
      width: 90%;
      height: 200px;
      border-radius: 5px;
      display: inline-block;
    }
    .iconSlot {
      width: 90%;
      height: 200px;
      margin: 0 auto;
      background-color: rgba(50, 50, 50, 0.05);
      text-align: center;
      border-radius: 5px;
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      .icone {
        display: inline-block;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-content: center;
        align-items: center;
        align-self: center;
      }
    }
  }
}
</style>
