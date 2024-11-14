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

interface DBUser {
  email: string;
  name: string;
  createdAt: Date;
}

interface Car {
  title: string;
  company: string;
  dealer: string;
  description: string;
  car_type: string;
  createdAt: Date;
  isActive: boolean;
  images: string[];
  tags: string[];
}
