import addCar from "@/firebase/utils/addCar";
import getAllCars from "@/firebase/utils/getAllCars";
import getUserCars from "@/firebase/utils/getUserCars";
import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const uploadPromises = body.images.map(async (file: string) => {
      const uploadedImage = await cloudinary.uploader.upload(file, {
        folder: "car-management-app",
      });
      return uploadedImage.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    body["images"] = uploadedUrls;

    const { result, error } = await addCar("cars", uuidv4(), {
      ...body,
      createdAt: new Date(),
    });

    if (result) {
      return Response.json({ message: "Car Created!" }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const uid = searchParams.get("uid");

  let err;

  try {
    if (uid && typeof uid === "string") {
      const { result, error } = await getUserCars("cars", uid);

      if (result) {
        return Response.json({ result }, { status: 200 });
      }

      err = error;
    } else {
      const { result, error } = await getAllCars("cars");

      if (result) {
        return Response.json({ result }, { status: 200 });
      }
      err = error;
    }

    return Response.json({ message: err }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
