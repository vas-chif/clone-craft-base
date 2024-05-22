import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'src/boot/firebase';

/*method  signInWithGoogle export in LoginAuth.vue*/
export const SignInOrSignUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in with Google:', result.user);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
}; // end function signInWithGoogle
