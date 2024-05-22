<template>
  <q-page class="flex q-pa-md">
    Welcome Home
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="handleLogout"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script>
import { Logout } from '../service/LogoutService';
import { goToBlank } from '../router/navigation';

export default {
  name: 'HomePage',
  data() {
    return {};
  },
  methods: {
    async handleLogout() {
      try {
        await Logout();
        // Redirect to the login page after logout
        goToBlank(this.$router, this);
      } catch (error) {
        console.error('Error logging out: ', error);
      }
    },
  },
};
</script>
