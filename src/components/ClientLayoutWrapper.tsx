"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider, useUser } from "@/context/UserContext";

// 🔒 Auth Wrapper handles global login redirects safely
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  useEffect(() => {
    // Wait until user is loaded (avoid flickering)
    if (!isLoading) {
      const publicRoutes = ["/login", "/viewer"];
      const isPublic = publicRoutes.some((path) => pathname.startsWith(path));

      if (!user && !isPublic) {
        router.replace("/login");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading)
    return (
      <main className="flex items-center justify-center h-screen text-gray-300 text-lg">
        Loading...
      </main>
    );

  return <>{children}</>;
}

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
          <AuthWrapper>{children}</AuthWrapper>
        </GoogleOAuthProvider>
      )}
    </UserProvider>
  );
}
