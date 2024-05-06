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
export default {
  components: { AuthComponent },
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    isHomePage() {
      return this.$router.path === `/`;
    },
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    goToLogin() {
      this.tab = 'login';
      this.$router.push('/login'); // Navigate to the login page
    },
    goToRegister() {
      this.tab = 'register';
      this.$router.push('/register'); // Navigate to the register page
    },
  },
};
</script>
