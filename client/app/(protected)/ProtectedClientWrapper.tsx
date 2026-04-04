"use client";

import { SocketProvider } from "@/context/SocketContext";
import AuthProvider from "../providers/AuthProvider";

export default function ProtectedClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </AuthProvider>
  );
}