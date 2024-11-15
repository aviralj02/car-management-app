import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

const addCar = async (coll: string, uid: string, carData: Car) => {
  let result = null;
  let error = null;

  try {
    await setDoc(doc(db, coll, uid), carData);
    result = true;
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default addCar;
