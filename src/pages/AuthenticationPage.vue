<!-- Auteticatione and regitration a new user -->

<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" @click="goToLogin" />
        <q-tab name="register" label="Register" @click="goToRegister" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <AuthComponent :tab="tab" />
        </q-tab-panel>
        <q-tab-panel name="register">
          <AuthComponent :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
/*eslint-disable*/
import AuthComponent from 'components/AuthComponent.vue';
import { computed } from 'vue';
import { goToLogin, goToRegister } from '../router/navigation';
export default {
  components: { AuthComponent },
  data() {
    return {
      tab: 'login',
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.selectRoutes(newRoute.path);
      },
    },
  },
  created() {
    this.selectRoutes(this.$route.path);
  },

  methods: {
    selectRoutes(path) {
      this.updateTabFromRoute(path);
    },
    updateTabFromRoute(path) {
      const routeSegments = path.split('/');
      this.tab = routeSegments[routeSegments.length - 1] || 'login';
    },
    goToLogin() {
      goToLogin(this.$router, this); // Utilizza la funzione importata
    },
    goToRegister() {
      goToRegister(this.$router, this); // Utilizza la funzione importata
    },
  },
};
</script>
