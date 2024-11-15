import getCar from "@/firebase/utils/getCar";

/**
 * @swagger
 * /api/car/{carId}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car to retrieve
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     company:
 *                       type: string
 *                     carType:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isActive:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *       501:
 *         description: Error occurred while fetching the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car not found"
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const { carId } = await params;

  try {
    const { result, error } = await getCar("cars", carId);

    if (result) {
      return Response.json({ result }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
