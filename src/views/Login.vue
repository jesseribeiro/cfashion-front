<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    class="mb-5">
    <v-layout
      wrap
      justify-center
      align-center>
      <div class="card-login">
        <v-form
          novalidate
          @submit.prevent="validateBeforeSubmit">
          <v-card>
            <div
              align="center"
              class="pt-3 mb-2">
              <v-img
                src="/img/logo.png"
                height="80"
                width="255"/>
            </div>
            <v-card-text>
              <v-text-field
                v-validate="'required'"
                v-model="username"
                :error-messages="errors.collect('Usuário')"
                data-vv-name="Usuário"
                label="Usuário"
                prepend-icon="mdi-account-circle"
                class="lowercase"
                required
              />
              <v-text-field
                v-validate="'required'"
                :error-messages="errors.collect('Senha')"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                v-model="password"
                data-vv-name="Senha"
                label="Senha"
                prepend-icon="mdi-lock"
                required
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                :loading="loadingBtn"
                color="primary"
                type="submit"
              >Entrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import LoginBusiness from '../business/LoginBusiness'
import { LOCALSTORAGE } from '../constants'

export default {
  metaInfo: {
    titleTemplate: '%s - Entrar'
  },
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      loadingBtn: false
    }
  },
  methods: {
    showErro (msg) {
      alert(msg)
    },
    validateBeforeSubmit () {
      this.$validator.validate()
        .then(result => {
          if (result) {
            this.login()
          } else {
            this.$root.showAlerta(this.$vuetify.t('$vuetify.Erro.camposObrigatorios'))
          }
        })
    },
    login () {
      const self = this
      this.loadingBtn = true
      LoginBusiness.login(this.username, this.password)
        .then(response => {
          localStorage.clear()
          let token = response.data
          let username = self.username
          localStorage.setItem(LOCALSTORAGE.JWT, JSON.stringify(token))
          localStorage.setItem(LOCALSTORAGE.LOGIN, username)
          this.$router.push('/home')

          this.$root.addTokenHeader()
        })
        .then(() => {
          LoginBusiness.getDadosUsuario(self.username)
            .then(response => {
              localStorage.setItem(LOCALSTORAGE.DADOS_USUARIO, JSON.stringify(response.data))
            })
            .finally(() => {
              window.location.reload()
            })
        })
        .finally(() => {
          this.loadingBtn = false
          this.$router.push('/home')
        })
    }
  }
}
</script>

<style scoped>
.container-login {
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*style="background: #6C7A89"*/
}

.card-login {
  width: 400px;
  height: 400px;
}
</style>
