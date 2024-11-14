"use client";

import PageWrapper from "@/components/PageWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserContext";
import { Menu } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Props = {};

const Dashboard = (props: Props) => {
  const { authUser } = useAuth();
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default Dashboard;
