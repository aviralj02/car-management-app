"use client";
import { useAuth } from "@/context/AuthUserContext";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const AuthCallback = (props: Props) => {
  const { authUser } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  useEffect(() => {
    if (authUser?.uid) {
      router.push(origin ? `/${origin}` : "/dashboard");
    } else {
      router.push("sign-up");
    }
  }, [authUser]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};
export default AuthCallback;
