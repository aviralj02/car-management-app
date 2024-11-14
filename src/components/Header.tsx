"use client";

import { Car, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthUserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {};

const Header = (props: Props) => {
  const { authUser, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CarManager</span>
        </Link>

        {authUser?.uid ? (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-3 hover:bg-muted rounded-full">
                  <User className="w-4 h-auto" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{authUser.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button asChild>
            <Link href="/log-in">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
