"use client";

import PageWrapper from "@/components/PageWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserContext";
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

const MyCars = (props: Props) => {
  const { authUser } = useAuth();
  const [userCars, setUserCars] = useState<CarWithId[]>([]);

  const fetchUserCars = async () => {
    try {
      const res = await fetch(`/api/car/?uid=${authUser?.uid}`);
      const data = await res.json();

      setUserCars(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authUser?.uid) {
      fetchUserCars();
    }
  }, [authUser]);

  return (
    <ProtectedRoute>
      <PageWrapper className="my-8">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold mb-8 text-center">My Cars</h1>

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

        {userCars.length === 0 ? (
          <div className="grid items-center justify-center h-full animate-pulse">
            Nothing to show here...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userCars?.map((car: CarWithId) => (
              <CarComponent car={car} global={false} key={car.id} />
            ))}
          </div>
        )}
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default MyCars;
