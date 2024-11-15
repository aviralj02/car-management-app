import deleteCar from "@/firebase/utils/deleteCar";
import updateCarDetails from "@/firebase/utils/updateCarDetails";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const body = await req.json();
  const { carId } = await params;

  try {
    const uploadPromises = body.images.map(async (file: string) => {
      const uploadedImage = await cloudinary.uploader.upload(file, {
        folder: "car-management-app",
      });
      return uploadedImage.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    body["images"] = uploadedUrls;

    const { result, error } = await updateCarDetails("cars", carId, body);

    if (result) {
      return Response.json({ result }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const { carId } = await params;

  try {
    const { result, error } = await deleteCar("cars", carId);

    if (result) {
      return Response.json({ result }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
