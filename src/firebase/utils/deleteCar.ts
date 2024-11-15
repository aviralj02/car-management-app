import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";

const deleteCar = async (coll: string, carId: string) => {
  let result = null;
  let error = null;

  const carDocRef = doc(db, coll, carId);

  try {
    await deleteDoc(carDocRef);

    result = true;
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default deleteCar;
