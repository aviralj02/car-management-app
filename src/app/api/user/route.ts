import addUser from "@/firebase/utils/addUser";

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
