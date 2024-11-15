import addCar from "@/firebase/utils/addCar";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  const imagesLinks: string[] = [];

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
