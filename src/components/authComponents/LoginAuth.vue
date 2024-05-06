<template>
  <q-form @submit="submitForm">
    <div class="text-center q-mb-lg">Sign in with</div>
    <div class="flex flex-center">
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        color="primary"
        size="md"
        label="Google"
        @click="google"
      />
    </div>

    <div class="text-center q-mb-lg">Sign in with credentials</div>
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
    <!--  @input="validateEmail" -->
    <q-input
      outlined
      class="q-mb-md"
      type="password"
      label="Password"
      autocomplete="current-password"
      v-model="formData.password"
    />

    <div class="text-center q-my-md">
      <q-btn
        flat
        label="Forgot Password?"
        color="green"
        class="text-capitalize rounded-borders"
        @click="goToForgotPw"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" label="Login" />
    </div>
  </q-form>
  <q-dialog v-model="resetPwdDialog">
    <ForgotPassword />
  </q-dialog>
</template>

<script>
/*eslint-disable*/
import ForgotPassword from './ForgotPassword.vue';
export default {
  name: 'LoginAuth',
  components: { ForgotPassword },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      resetPwdDialog: false,
    };
  },
  methods: {
    google() {
      console.log('google login & signup');
    },
    submitForm() {
      // this.$emit('submitForm', this.formData);
      this.signInExistingUser(this.formData.email, this.formData.password);
    },
    // validateEmail() {
    //   this.isEmailValid = this.$refs.resetPasswordForm.validate();
    // },
    /*method  signInExistingUser*/
    signInExistingUser(email, password) {
      console.log(email, password);
    },

    goToForgotPw() {
      this.tab = 'forgot-password';
      this.$router.push('/forgot-password'); // Navigate to the login page
    },
    /*method  forgotPassword*/
    forgotPassword() {
      this.resetPwdDialog = true;
    },
  },
};
</script>
