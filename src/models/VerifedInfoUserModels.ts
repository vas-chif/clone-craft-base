import { UserInfo } from 'firebase/auth';

export interface VeriferdUserInfo extends UserInfo {
  uid: string;
  photoURL: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  address: string | null;
  email: string | null;
  emailVerified: boolean;
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}
