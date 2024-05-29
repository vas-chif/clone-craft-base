import { doc, setDoc } from 'firebase/firestore';
import { firestoreDb } from '../boot/firebase';
import { VeriferdUserInfo } from '../models/VerifedInfoUserModels';

export async function SaveUserInfo(
  uid: string,
  user: Partial<VeriferdUserInfo>
) {
  try {
    // if (!auth.currentUser) {
    //   throw new Error('No authenticated user found');
    // }

    // if (typeof uid !== 'string') {
    //   throw new Error('Invalid user ID: must be a string');
    // }

    const userRef = doc(firestoreDb, 'users', uid);
    const userInfoToSave = {
      uid: uid,
      email: user.email || '',
      emailVerified: user.emailVerified || false,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      metadata: {
        creationTime: user.metadata?.creationTime || '',
        lastSignInTime: user.metadata?.lastSignInTime || '',
      },
    };
    await setDoc(userRef, userInfoToSave, { merge: true });

    console.log('User information saved to Firestore');
  } catch (error) {
    console.error('Error saving user information to Firestore:', error);

    throw error;
  }
}
