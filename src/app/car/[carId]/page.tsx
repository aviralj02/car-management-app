import CarInfoComponent from "@/components/CarInfoComponent";
import React from "react";

type Props = {
  params: Promise<{ carId: string }>;
};

const CarInfo = async ({ params }: Props) => {
  const { carId } = await params;

  const res = await fetch(`${process.env.BASE_URL}/api/car/${carId}`);
  const data = await res.json();

  return <CarInfoComponent car={data.result} carId={carId} />;
};

export default CarInfo;
