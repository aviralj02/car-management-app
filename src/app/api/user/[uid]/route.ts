import getUser from "@/firebase/utils/getUser";

/**
 * @swagger
 * /api/user/{uid}:
 *   get:
 *     summary: Retrieve a user's details by their UID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
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
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       501:
 *         description: Error occurred while retrieving the user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve user details"
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;

  console.log(uid);

  try {
    const { result, error } = await getUser("users", uid);

    if (result) {
      return Response.json({ result }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
