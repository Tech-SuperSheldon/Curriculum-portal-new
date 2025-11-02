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

  return (
    <UserProvider>
      {isViewer ? (
        children
      ) : (
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          {children}
        </GoogleOAuthProvider>
      )}
    </UserProvider>
  );
}
