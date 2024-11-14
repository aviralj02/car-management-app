"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthUserContext";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { authUser } = useAuth();
  return <ProtectedRoute>{authUser?.email}</ProtectedRoute>;
};

export default Dashboard;
