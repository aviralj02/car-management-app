import deleteCar from "@/firebase/utils/deleteCar";
import updateCarDetails from "@/firebase/utils/updateCarDetails";
import cloudinary from "@/lib/cloudinary";

/**
 * @swagger
 * /api/car/modify/{carId}:
 *   patch:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               carType:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Base64 strings or URLs of car images
 *               isActive:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Updated car details
 *       501:
 *         description: Error occurred while updating the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update car"
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const body = await req.json();
  const { carId } = await params;

  try {
    const uploadPromises = body.images.map(async (file: string) => {
      if (file.startsWith("data:")) {
        const uploadedImage = await cloudinary.uploader.upload(file, {
          folder: "car-management-app",
        });
        return uploadedImage.secure_url;
      }

      return file;
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

/**
 * @swagger
 * /api/car/modify/{carId}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car Deleted Successfully!"
 *       501:
 *         description: Error occurred while deleting the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete car"
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const { carId } = await params;

  try {
    const { result, error } = await deleteCar("cars", carId);

    if (result) {
      return Response.json(
        { message: "Car Deleted Successfully!" },
        { status: 200 }
      );
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
