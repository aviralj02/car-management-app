"use client";

import { useAuth } from "@/context/AuthUserContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authUser?.uid) {
      router.push("/log-in");
    }
  }, [authUser]);

  if (loading) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
