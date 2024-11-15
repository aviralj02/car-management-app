import addCar from "@/firebase/utils/addCar";
import getAllCars from "@/firebase/utils/getAllCars";
import getUserCars from "@/firebase/utils/getUserCars";
import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

/**
 * @swagger
 * /api/car:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
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
 *                   description: Base64 strings of car images
 *               isActive:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *               - description
 *               - company
 *               - carType
 *               - images
 *     responses:
 *       200:
 *         description: Car added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car Created!"
 *       501:
 *         description: Error occurred while adding the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to add car"
 */
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

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars or cars by a specific user (based on query parameter `uid`)
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: uid
 *         required: false
 *         schema:
 *           type: string
 *         description: The unique identifier of the user. If provided, fetches only the cars listed by that user.
 *     responses:
 *       200:
 *         description: Successfully fetched cars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       carId:
 *                         type: string
 *                         description: Unique identifier of the car.
 *                       title:
 *                         type: string
 *                         description: The title of the car.
 *                       description:
 *                         type: string
 *                         description: A detailed description of the car.
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: A list of image URLs associated with the car.
 *                       company:
 *                         type: string
 *                         description: The manufacturer or company of the car.
 *                       car_type:
 *                         type: string
 *                         description: The type/category of the car (e.g., sedan, SUV).
 *                       isActive:
 *                         type: boolean
 *                         description: Whether the car listing is active.
 *       501:
 *         description: Error fetching cars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch cars"
 */
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
