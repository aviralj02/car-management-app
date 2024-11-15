import getCar from "@/firebase/utils/getCar";

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
