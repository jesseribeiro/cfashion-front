<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="show"
      persistent
      max-width="420">
      <v-form
        novalidate
        @submit.prevent="validateAlterarSenha">
        <v-card>
          <v-card-title class="headline">Alterar Senha</v-card-title>
          <v-card-text>
            Informe uma nova senha e clique em Confirmar
            <v-layout
              row
              wrap>
              <v-flex md6>
                <v-text-field
                  v-validate="'required'"
                  ref="senha"
                  v-model="senha"
                  :error-messages="errors.collect('Senha')"
                  :append-icon="showPasswd ? 'mdi-eye': 'mdi-eye-off'"
                  :rules="[rulesPasswd.required, rulesPasswd.min]"
                  :type="showPasswd ? 'text' : 'password'"
                  label="Senha"
                  name="senha"
                  data-vv-name="Senha"
                  hint="Mínimo de 6 caracteres"
                  counter
                  @click:append="showPasswd = !showPasswd"
                />
              </v-flex>
              <v-flex md6>
                <v-text-field
                  v-validate="'required|confirmed:senha'"
                  v-model="confirmaSenha"
                  :error-messages="errors.collect('Confirmar Senha')"
                  label="Confirmar Senha"
                  type="password"
                  name="confirmaSenha"
                  data-vv-name="Confirmar Senha"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              outline
              style="color: black !important"
              @click="closeAlterarSenha">Cancelar</v-btn>
            <v-btn
              :loading="loading"
              color="primary"
              type="submit">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import { UsuarioBusiness } from '../../business'
export default {
  props: {
    usuarioId: {
      type: Number,
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
      senha: '',
      confirmaSenha: '',
      showPasswd: false,
      rulesPasswd: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Mínimo de 6 caracteres'
      },
      loading: false
    }
  },
  methods: {
    closeAlterarSenha () {
      this.loading = false
      this.close()
    },
    confirmaAlterarSenha () {
      this.loading = true
      UsuarioBusiness.alterarSenha(this.usuarioId, this.senha)
        .then(response => {
          this.$root.showSucesso(response.data)
          this.closeAlterarSenha()
        }).catch(erro => {
          this.$root.showErro(erro.data)
          this.loading = false
        })
    },
    validateAlterarSenha () {
      this.$validator.validate().then((result) => {
        if (result && this.senha.length >= 6) {
          this.confirmaAlterarSenha()
        } else {
          this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
        }
      })
    }
  }
}
</script>
