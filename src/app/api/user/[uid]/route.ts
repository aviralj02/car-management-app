import getUser from "@/firebase/utils/getUser";

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
