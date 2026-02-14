"use client";

import { SocketProvider } from "@/context/SocketContext";
import AuthProvider from "../providers/AuthProvider";
;

export default function ProtectedLayout({
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
