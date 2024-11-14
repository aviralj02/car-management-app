type User = {
  uid: string;
  email: string;
};

interface AuthUser {
  authUser: User | null;
  loading: boolean;
  signInWithEmailAndPassword: Function;
  createUserWithEmailAndPassword: Function;
  signOut: Function;
}
