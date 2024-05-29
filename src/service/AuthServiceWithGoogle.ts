import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'src/boot/firebase';

/*method  signInWithGoogle export in LoginAuth.vue*/
export const SignInOrSignUpWithGoogle = async () => {
  try {
    const poWindow = await signInWithPopup(auth, provider);
    console.log('User signed in with Google:', poWindow.user);
    return poWindow.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
}; // end function signInWithGoogle
