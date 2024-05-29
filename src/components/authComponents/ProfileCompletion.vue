<template>
  <q-page class="flex q-pa-md">
    <q-form @submit="submitForm">
      <q-input
        outlined
        class="q-mb-md"
        type="text"
        label="Display Name"
        v-model="formData.displayName"
        autocomplete="name"
      />

      <q-input
        outlined
        class="q-mb-md"
        type="tel"
        label="Phone Number"
        v-model="formData.phoneNumber"
      />

      <q-input
        outlined
        class="q-mb-md"
        type="text"
        label="Address"
        v-model="formData.address"
      />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" label="Save" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { SaveUserInfo } from '../../service/UserService';
import { auth } from '../../boot/firebase';
import { goToHome } from '../../router/navigation';

export default {
  name: 'ProfileCompletion',
  data() {
    return {
      formData: {
        displayName: '',
        phoneNumber: '',
        address: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const user = auth.currentUser;
      if (user) {
        try {
          // await setDoc(doc(firestoreDb, 'users', user.uid), this.profileData, {
          //   merge: true,
          // });
          const userInfo = {
            displayName: this.formData.displayName,
            phoneNumber: this.formData.phoneNumber,
            address: this.formData.address,
          };
          await SaveUserInfo(user.uid, userInfo);
          goToHome(this.$router, this); // Redirect to home page after profile completion
        } catch (error) {
          console.error('Failed to save profile data', error);
        }
      } else {
        console.error('No user is currently logged in');
      }
    },
  },
};
</script>
