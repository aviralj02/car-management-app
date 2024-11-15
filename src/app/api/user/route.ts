import addUser from "@/firebase/utils/addUser";

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - uid
 *               - createdAt
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               uid:
 *                 type: string
 *                 description: Unique identifier for the user
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the user was created
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Created!"
 *       501:
 *         description: Error occurred while creating the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create user"
 */
export async function POST(req: Request) {
  const { email, name, uid, createdAt } = await req.json();

  try {
    const { result, error } = await addUser("users", uid, {
      email,
      name,
      createdAt,
    });

    if (result) {
      return Response.json({ message: "User Created!" }, { status: 200 });
    }

    return Response.json({ message: error }, { status: 501 });
  } catch (error) {
    console.log(error);
  }
}
