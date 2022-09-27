<template>
  <v-content>
    <div id="core-view">
      <!-- Esse é para mostrar os aletas em geral -->
      <div>
        <v-snackbar
          :color="$root.type"
          :timeout="$root.timeout"
          v-model="$root.alert"
          top
          right
          dark
        >
          <v-icon
            color="white"
            class="mr-2"
          >
            {{ $root.icon }}
          </v-icon>
          <div>
            <span v-html="$root.message" />
          </div>
          <v-icon
            size="16"
            @click="$root.alert = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>
      </div>
      <!-- Os push notification -->
      <div>
        <v-snackbar
          v-model="$root.push"
          :timeout="0"
          top
          dark
        >
          <v-icon
            color="white"
            class="mr-2"
          >
            mdi-bell
          </v-icon>
          <div>
            <span v-html="$root.messagePush" />
          </div>
          <v-icon
            size="16"
            @click="$root.push = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>
      </div>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer/>
  </v-content>
</template>

<script>
export default {

}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
