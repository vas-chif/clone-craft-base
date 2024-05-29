import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/*method  SignInExistingUser export in LoginAuth.vue*/
export const SignInExistingUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification
    await sendEmailVerification(userCredential.user); // Return the created user for potential further actions (optional)
    console.log('Email verification sent.');

    // console.log('User logged in:', userCredential.user);  //prinf info for any use
    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}; // end functin SignInExistingUser
