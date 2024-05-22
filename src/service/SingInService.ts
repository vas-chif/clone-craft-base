import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

/*method  SignInExistingUser export in LoginAuth.vue*/
export const SignInExistingUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User logged in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
}; // end functin SignInExistingUser
