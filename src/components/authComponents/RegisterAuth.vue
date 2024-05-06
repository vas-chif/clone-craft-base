<template>
  <q-form @submit="submitForm">
    <div class="text-center q-mb-lg">Sign up with</div>

    <div class="flex flex-center">
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        color="primary"
        size="md"
        label="Google"
        @click="google"
      />
    </div>
    <div class="text-center q-mb-lg">Sign up with credentials</div>
    <q-input
      outlined
      class="q-mb-md"
      type="email"
      label="Email"
      v-model="formData.email"
      autocomplete="current-email"
      :rules="[
        (val) => !!val || 'La mail è obbligatoria',
        (val) => /.+@.+\..+/.test(val) || 'Please type a valid email address',
      ]"
      hint="Inserisci l'email"
    />
    <q-input
      outlined
      class="q-mb-md"
      type="password"
      label="Password"
      autocomplete="current-password"
      v-model="formData.password"
    />
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" label="Register" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'RegisterAuth',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    google() {
      console.log('google login & signup');
    },
    submitForm() {
      // this.$emit('submitForm', this.formData);
      this.createUser(this.formData.email, this.formData.password);
    },
    /*method createUser */
    createUser(email, password) {
      console.log(email, password);
    },
  },
};
</script>
