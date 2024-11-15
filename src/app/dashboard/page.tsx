"use client";

import PageWrapper from "@/components/PageWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import CarComponent from "@/components/CarComponent";
import { Input } from "@/components/ui/input";

type Props = {};

const Dashboard = (props: Props) => {
  const [allCars, setAllCars] = useState<CarWithId[]>();
  const [currentCars, setCurrentCars] = useState<CarWithId[]>();
  const [search, setSearch] = useState<string>("");

  const fetchAllActiveCars = async () => {
    try {
      const res = await fetch("/api/car");
      const data = await res.json();

      setAllCars(data.result);
      setCurrentCars(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (search === "") {
      setCurrentCars(allCars);
    }
    const searchedNotes = allCars?.filter((car) => {
      return (
        (search && car.title.toLowerCase().includes(search)) ||
        car.description.toLowerCase().includes(search) ||
        car.car_type.toLowerCase().includes(search) ||
        car.company.toLowerCase().includes(search)
      );
    });
    setCurrentCars(searchedNotes);
  };

  useEffect(() => {
    fetchAllActiveCars();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <ProtectedRoute>
      <PageWrapper className="my-8">
        <div className="flex justify-between">
          <div className="flex flex-col items-start mb-8 gap-2 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center">All Cars</h1>

            <div className="relative m-0 w-full">
              <Input
                type="text"
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value.trim())
                }
                placeholder="Search Cars"
                className="pl-10"
              />

              <Search className="w-4 h-auto absolute left-3 bottom-3 text-muted-foreground" />
            </div>
          </div>

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
          {currentCars?.map((car: CarWithId) => (
            <CarComponent global car={car} key={car.id} />
          ))}
        </div>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default Dashboard;
