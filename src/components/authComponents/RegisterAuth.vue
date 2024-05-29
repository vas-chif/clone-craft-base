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
import { goToLogin } from '../../router/navigation';
import { CreateUser } from '../../service/AuthService';
import { SaveUserInfo } from '../../service/UserService';
import { SignInOrSignUpWithGoogle } from '../../service/AuthServiceWithGoogle';

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
    async google() {
      try {
        const user = await SignInOrSignUpWithGoogle();
        if (user) {
          const userInfo = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            address: null, // Assuming address is not provided by Google Sign-In
            metadata: user.metadata,
          };
          await SaveUserInfo(userInfo.uid, userInfo);
          goToLogin(this.$router, this); // Redirect to login page after successful registration
          console.log('User signed in with Google:', user);
        } else {
          console.error('Google sign-in did not return a valid user');
        }
      } catch (error) {
        console.error('Error during Google sign-in:', error);
      }
    },

    async submitForm() {
      try {
        const user = await CreateUser(
          this.formData.email,
          this.formData.password
        );
        if (user) {
          const userInfo = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: null, // Assuming phone number is not provided at registration
            address: null, // Assuming address is not provided at registration
            metadata: user.metadata,
          };
          await SaveUserInfo(userInfo.uid, userInfo);
          goToLogin(this.$router, this); // Redirect to login page after successful registration
        }
      } catch (error) {
        console.error('Failed to create user', error);
      }
    },
  },
};
</script>
