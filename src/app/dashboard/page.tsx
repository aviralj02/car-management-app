"use client";

import PageWrapper from "@/components/PageWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import CarComponent from "@/components/CarComponent";

type Props = {};

const Dashboard = (props: Props) => {
  const [allCars, setAllCars] = useState<CarWithId[]>();

  const fetchAllActiveCars = async () => {
    try {
      const res = await fetch("/api/car");
      const data = await res.json();

      setAllCars(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allCars && allCars[0].id);

  useEffect(() => {
    fetchAllActiveCars();
  }, []);

  return (
    <ProtectedRoute>
      <PageWrapper className="my-8">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold mb-8 text-center">All Cars</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary">
                <Menu className="w-4 h-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/create-car">New Car</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/mycars">My Cars</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">All Cars</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allCars?.map((car: CarWithId) => (
            <CarComponent global car={car} key={car.id} />
          ))}
        </div>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default Dashboard;
