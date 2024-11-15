import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

const getCar = async (coll: string, carId: string) => {
  let result = null;
  let error = null;

  try {
    const carDoc = await getDoc(doc(db, coll, carId));
    result = carDoc.data();
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default getCar;
