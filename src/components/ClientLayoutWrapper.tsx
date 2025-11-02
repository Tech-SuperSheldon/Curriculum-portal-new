"use client";

import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "@/context/UserContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isViewer = pathname?.startsWith("/viewer");

  // Viewer pages (no Google provider)
  if (isViewer) {
    return <UserProvider>{children}</UserProvider>;
  }

  // All other pages (with Google provider)
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <UserProvider>{children}</UserProvider>
    </GoogleOAuthProvider>
  );
}
