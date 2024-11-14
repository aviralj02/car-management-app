import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

const addUser = async (coll: string, uid: string, userData: DBUser) => {
  let result = null;
  let error = null;

  try {
    await setDoc(doc(db, coll, uid), userData);
    result = true;
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default addUser;
