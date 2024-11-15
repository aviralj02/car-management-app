import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

const updateCarDetails = async (
  coll: string,
  carId: string,
  updatedCar: Partial<Car>
) => {
  let result = null;
  let error = null;

  const carDocRef = doc(db, coll, carId);

  try {
    await updateDoc(carDocRef, updatedCar);

    result = true;
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default updateCarDetails;
