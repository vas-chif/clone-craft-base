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
        @click="goToForgotPassword"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" label="Login" />
    </div>
  </q-form>
</template>

<script>
/*eslint-disable*/
import { goToHome, goToForgotPw } from '../../router/navigation';
import { SignInExistingUser } from '../../service/SingInService';
import { SignInOrSignUpWithGoogle } from '../../service/AuthServiceWithGoogle';

export default {
  name: 'LoginAuth',
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
    async google() {
      try {
        const user = await SignInOrSignUpWithGoogle();
        console.log('User signed in with Google:', user);
        goToHome(this.$router, this);
      } catch (error) {
        console.error('Error during Google sign-in:', error);
      }
    },
    async submitForm() {
      try {
        const user = await SignInExistingUser(
          this.formData.email,
          this.formData.password
        );
        if (user) {
          goToHome(this.$router, this);
        }
      } catch (error) {
        console.error('Failed to login', error);
      }
    },
    goToForgotPassword() {
      goToForgotPw(this.$router, this);
    },
    // validateEmail() {
    //   this.isEmailValid = this.$refs.resetPasswordForm.validate();
    // },
    /*method  signInExistingUser*/

    /*method  forgotPassword*/
    forgotPassword() {
      this.resetPwdDialog = true;
    },
  },
};
</script>
