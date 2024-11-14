import { Car } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CarManager</span>
        </Link>
        <Button asChild>
          <Link href="/log-in">Sign In</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
