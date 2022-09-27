 <template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="show"
      persistent
      max-width="340">
      <template
        v-if="!loading">
        <v-card>
          <v-card-text>
            <v-layout
              row
              wrap>
              <v-flex
                md6>
                <v-icon
                  @click="imprimir()">mdi-printer</v-icon>
              </v-flex>
              <v-flex
                md6
                class="text-md-right">
                <v-icon
                  color="red"
                  @click="close()">mdi-close</v-icon>
              </v-flex>
            </v-layout>
            <div
              id="printMe"
              style="text-transform: uppercase; width: 300px; border: 0px;">
              <pre
                id="viaEstabelecimento"
                align="center"
                style="width: 300px; border: 0px;"
                class="break-word caption"
              />
              <pre
                id="viaCliente"
                align="center"
                style="width: 300px; border: 0px;"
                class="break-word caption"
              />
            </div>
          </v-card-text>
        </v-card>
      </template>
      <v-card v-else>
        <core-progress-modal :show="loading" />
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import ClienteBusiness from '@/business/ClienteBusiness.js'
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      filePDF: null,
      panel: [this.expanded],
      dialog: false,
      loading: false
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  mounted () {
    console.log(this.value)
    this.imprimePdf();
  },
  methods: {
    imprimir () {
      this.$htmlToPaper('printMe')
    },
    imprimePdf () {
      ClienteBusiness.imprimeComprovante(this.value)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', response.headers['content-disposition'].split(';')[1].split('=')[1])
        document.body.appendChild(link)
        link.click()
      })
      .catch(erro => {
        console.log(erro)
        // if (erro && erro.response.data) {
        //  this.$root.showAlerta(erro.response.data.message)
        // } else {
        //  this.$root.showErro(this.$vuetify.t('$vuetify.Erro.carregarRelatorio'))
        // }
      })
    }
  }
}
</script>

<style>
  .break-word {
    word-wrap: break-word;
  }
</style>
