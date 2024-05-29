<template>
  <q-page class="flex q-pa-md">
    <div v-if="userInfo">
      <q-card>
        <q-card-section class="row item-start"
          ><div class="col-auto">
            <q-img
              :src="userInfo.photoURL"
              alt="profile photo"
              class="profile-img"
              style="width: 100px; height: 100px; border-radius: 50%"
            />
          </div>

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
        </q-card-section>

        <q-card-section>
          <h4>Welcome {{ userInfo.displayName || userInfo.email }}</h4>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Email: {{ userInfo.email }}</q-item-label>
                <q-item-label></q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label
                  >Email Verified: {{ userInfo.emailVerified }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>
                  Last Sign-In:
                  {{ userInfo.metadata?.lastSignInTime }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Phone: {{ userInfo.phoneNumber }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Address: {{ userInfo.address }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-space />
  </q-page>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestoreDb } from '../boot/firebase';
import { Logout } from '../service/LogoutService';
import { goToBlank, goToProfileCompletion } from '../router/navigation';

export default {
  name: 'HomePage',
  data() {
    return { userInfo: null };
  },
  async created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestoreDb, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (!userData.displayName || !userData.address) {
            // Redirect to profile completion page if essential info is missing
            goToProfileCompletion(this.$router, this);
          } else {
            this.userInfo = {
              ...userData,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              metadata: {
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
              },
            };
          }
        }
      } else {
        this.userInfo = null;
      }
    });
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
