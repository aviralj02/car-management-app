import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

const getUser = async (coll: string, uid: string) => {
  let result = null;
  let error = null;

  try {
    const userDoc = await getDoc(doc(db, coll, uid));
    result = userDoc.data();
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default getUser;
