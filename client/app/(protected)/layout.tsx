// layout.tsx (Server Component)

export const dynamic = "force-dynamic";

import ProtectedClientWrapper from "./ProtectedClientWrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedClientWrapper>{children}</ProtectedClientWrapper>;
}