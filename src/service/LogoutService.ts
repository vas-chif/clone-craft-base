import { signOut } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

/*method  Logout export in HomePage.vue*/
export async function Logout() {
  try {
    await signOut(auth);
    console.log('Sign Out ok');
  } catch (error) {
    console.error('Error logging out: ', error);
    throw error; // Rethrow error so it can be handled by the caller
  }
} // end function Logout
