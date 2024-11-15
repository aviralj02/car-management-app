import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

const getAllCars = async (coll: string) => {
  let result = null;
  let error = null;

  const carsCollectionRef = collection(db, coll);
  const carsQuery = query(carsCollectionRef, where("isActive", "==", true));

  try {
    const response = await getDocs(carsQuery);
    result = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default getAllCars;
