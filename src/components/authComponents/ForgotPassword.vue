<template>
  <q-form @submit="submitForm">
    <div class="flex flex-center">
      <q-card style="width: 800px; max-width: 40vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Reset Password</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closeForgotPasswor" />
        </q-card-section>
        <q-card-section class="q-pt-md">
          <q-form ref="resetPasswordForm">
            <q-input
              type="email"
              v-model="form.email"
              label="Email *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'La mail è obbligatoria',
                (val) =>
                  /.+@.+\..+/.test(val) || 'Please type a valid email address',
              ]"
              @input="validateEmail"
            />
          </q-form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <div class="row q-mt-xs">
            <q-btn
              class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
              label="Submit"
              color="primary"
              @click="resetPassword"
            />
            <!--[per disabilitatre il submit se la mail non è valida] =>:disable="!isEmailValid"  -->
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      form: {
        email: '',
      },
      isEmailValid: false,
    };
  },
  methods: {
    resetPassword() {
      // firebase reset password
      // if (this.isEmailValid) {
      console.log('PWD wil be reset, control the email');
      // }
    },
    validateEmail() {
      this.isEmailValid = this.$refs.resetPasswordForm.validate();
    },
    submitForm() {
      // this.$emit('submitForm', this.formData);
      this.createUser(this.formData.email, this.formData.password);
    },
    closeForgotPasswor() {
      this.tab = 'login';
      goToLogin(this.$router, this);
    },
  },
};
</script>
