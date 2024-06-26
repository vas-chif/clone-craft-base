import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

/*method creatuser exported in  RegisterAuth.vur*/
export async function CreateUser(email: string, password: string) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log('User created: ', userCredential.user);

    await sendEmailVerification(userCredential.user);
    console.log('Verification email sent to:', userCredential.user.email);

    return userCredential.user;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
} // end function CreateUser
