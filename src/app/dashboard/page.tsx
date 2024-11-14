"use client";

import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { authUser } = useAuth();

  const router = useRouter();

  if (!authUser) {
    router.push("/auth-callback?origin=log-in");
  }

  return <div>{authUser?.email}</div>;
};

export default Dashboard;
